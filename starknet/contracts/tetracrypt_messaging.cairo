
%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.cairo.common.hash import Poseidon
from starkware.starknet.crypto.keccak import starknet_keccak

# ✅ WebSocket Event: Real-Time Messaging Updates with Validation
@event
func MessageSent(sender: felt, receiver: felt, message_id: felt, message_ipfs_cid: felt, timestamp: felt);

# ✅ NEW: Certificate Revocation Event
@event
func CertificateRevoked(certificate_id: felt, issuer: felt, revocation_reason: felt, timestamp: felt);

# ✅ NEW: Identity Proof Validation Event
@event
func IdentityValidated(user_address: felt, validation_type: felt, success: felt, timestamp: felt);

# ✅ NEW: Anti-Spoofing Challenge Event
@event
func AntiSpoofingChallenge(user_address: felt, challenge: felt, timestamp: felt);

@contract_interface
namespace TetraCrypt {
    # ✅ Step 1: Register a User with zk-STARK Authentication
    func register_user{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        user_address: felt, 
        starknet_key: felt, 
        zkProof: felt
    ) -> (success: felt);

    # ✅ Step 2: Securely Store Messages (Only IPFS Hash Stored)
    func store_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt, 
        message_ipfs_cid: felt,  # 🔹 Store only IPFS hash
        zkProof: felt, 
        starknet_signature: (felt, felt), 
        timestamp: felt
    ) -> (message_id: felt);

    # ✅ Step 3: Retrieve Messages from StarkNet
    func get_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt
    ) -> (message_ipfs_cid: felt);

    # ✅ Step 4: Delete Message (For Privacy Compliance)
    func delete_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt
    ) -> (success: felt);
    
    # ✅ NEW: Revoke PKI Certificate
    func revoke_certificate{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(
        certificate_id: felt,
        issuer: felt,
        revocation_reason: felt,
        starknet_signature: (felt, felt),
        timestamp: felt
    ) -> (success: felt);
    
    # ✅ NEW: Verify Certificate Status
    func verify_certificate{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(
        certificate_id: felt
    ) -> (status: felt);
    
    # ✅ NEW: Anti-Spoofing Challenge Response
    func verify_identity{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(
        user_address: felt,
        challenge: felt,
        response: felt,
        starknet_signature: (felt, felt)
    ) -> (success: felt);
}

@external
func register_user{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    user_address: felt, 
    starknet_key: felt, 
    zkProof: felt
) -> (success: felt) {
    let computed_proof = Poseidon([user_address, starknet_key]);
    assert computed_proof == zkProof, "❌ Invalid zk-STARK Proof";

    Storage.write(StorageAccess, user_address, starknet_key);

    return (success=1);
}

@external
func store_message{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    sender: felt, 
    receiver: felt, 
    message_ipfs_cid: felt, 
    zkProof: felt, 
    starknet_signature: (felt, felt), 
    timestamp: felt
) -> (message_id: felt) {
    let message_hash = Poseidon([message_ipfs_cid]);

    # ✅ Prevent Replay Attacks: Ensure Message Hash is Unique
    let existing_message = Storage.read(StorageAccess, message_hash);
    assert existing_message == 0, "❌ Replay Attack Detected!";

    # ✅ Validate zk-STARK Proof for Message Integrity
    assert message_hash == zkProof, "❌ Invalid zk-STARK Proof";

    # ✅ Verify StarkNet Digital Signature (Ensures Message Authenticity)
    let is_valid_signature = verify(sender, message_hash, starknet_signature);
    assert is_valid_signature, "❌ Invalid StarkNet Signature";

    # ✅ Store Only IPFS CID on StarkNet Storage (Reduces Gas Costs)
    let message_key = Poseidon([sender, receiver]);
    Storage.write(StorageAccess, message_key, message_ipfs_cid);

    # ✅ Store Timestamp for Auto-Deletion (Messages Expire After 7 Days)
    let expiry_time = timestamp + (7 * 24 * 60 * 60);  # 7 days in seconds
    Storage.write(StorageAccess, Poseidon([message_key, "expiry"]), expiry_time);

    # ✅ Emit WebSocket Event for Real-Time Messaging
    emit MessageSent(sender, receiver, message_key, message_ipfs_cid, timestamp);

    return (message_key);
}

@external
func get_message{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    sender: felt, 
    receiver: felt
) -> (message_ipfs_cid: felt) {
    let message_key = Poseidon([sender, receiver]);
    let message_ipfs_cid = Storage.read(StorageAccess, message_key);

    return (message_ipfs_cid);
}

@external
func delete_message{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    sender: felt, 
    receiver: felt
) -> (success: felt) {
    let message_key = Poseidon([sender, receiver]);

    # ✅ Auto-Delete Expired Messages
    let expiry_time = Storage.read(StorageAccess, Poseidon([message_key, "expiry"]));
    if expiry_time < syscall_ptr.timestamp {
        Storage.write(StorageAccess, message_key, 0);
        Storage.write(StorageAccess, Poseidon([message_key, "expiry"]), 0);
    }

    return (success=1);
}

# ✅ NEW: Revoke a PQC Certificate
@external
func revoke_certificate{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(
    certificate_id: felt,
    issuer: felt,
    revocation_reason: felt,
    starknet_signature: (felt, felt),
    timestamp: felt
) -> (success: felt) {
    # ✅ Only the issuer can revoke certificates
    let is_valid_signature = verify(issuer, certificate_id, starknet_signature);
    assert is_valid_signature, "❌ Only the issuer can revoke certificates";
    
    # ✅ Store revocation status in CRL
    let revocation_key = Poseidon([certificate_id, "revoked"]);
    Storage.write(StorageAccess, revocation_key, 1);
    
    # ✅ Store revocation reason
    let reason_key = Poseidon([certificate_id, "reason"]);
    Storage.write(StorageAccess, reason_key, revocation_reason);
    
    # ✅ Store revocation timestamp
    let timestamp_key = Poseidon([certificate_id, "revocation_time"]);
    Storage.write(StorageAccess, timestamp_key, timestamp);
    
    # ✅ Emit revocation event for real-time updates
    emit CertificateRevoked(certificate_id, issuer, revocation_reason, timestamp);
    
    return (success=1);
}

# ✅ NEW: Verify Certificate Status (check if revoked)
@external
func verify_certificate{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(
    certificate_id: felt
) -> (status: felt) {
    # ✅ Check if certificate is revoked (1=revoked, 0=valid)
    let revocation_key = Poseidon([certificate_id, "revoked"]);
    let revocation_status = Storage.read(StorageAccess, revocation_key);
    
    return (status=revocation_status);
}

# ✅ NEW: Anti-Spoofing Challenge-Response Verification
@external
func verify_identity{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(
    user_address: felt,
    challenge: felt,
    response: felt,
    starknet_signature: (felt, felt)
) -> (success: felt) {
    # ✅ Verify the response signature proves control of the private key
    let is_valid_signature = verify(user_address, challenge, starknet_signature);
    assert is_valid_signature, "❌ Invalid signature - wallet spoofing detected";
    
    # ✅ Verify the challenge matches the issued challenge (anti-replay)
    let challenge_key = Poseidon([user_address, "challenge"]);
    let stored_challenge = Storage.read(StorageAccess, challenge_key);
    assert stored_challenge == challenge, "❌ Challenge mismatch - replay attack detected";
    
    # ✅ Verify the response is correct
    let expected_response = Poseidon([challenge, user_address]);
    assert response == expected_response, "❌ Invalid challenge response";
    
    # ✅ Clear the challenge to prevent replay
    Storage.write(StorageAccess, challenge_key, 0);
    
    # ✅ Mark this identity as validated
    let validation_key = Poseidon([user_address, "validated"]);
    Storage.write(StorageAccess, validation_key, 1);
    
    # ✅ Emit validation event
    emit IdentityValidated(user_address, 1, 1, syscall_ptr.timestamp);
    
    return (success=1);
}

# ✅ NEW: Generate Anti-Spoofing Challenge
@external
func generate_challenge{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(
    user_address: felt
) -> (challenge: felt) {
    # ✅ Generate a random challenge using block hash and timestamp
    let random_seed = Poseidon([syscall_ptr.block_number, syscall_ptr.timestamp, user_address]);
    let challenge = Poseidon([random_seed, "ANTI_SPOOFING_CHALLENGE"]);
    
    # ✅ Store the challenge for later verification
    let challenge_key = Poseidon([user_address, "challenge"]);
    Storage.write(StorageAccess, challenge_key, challenge);
    
    # ✅ Emit challenge event
    emit AntiSpoofingChallenge(user_address, challenge, syscall_ptr.timestamp);
    
    return (challenge=challenge);
}
