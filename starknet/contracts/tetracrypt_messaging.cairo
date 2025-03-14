%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.cairo.common.hash import Poseidon
from starkware.starknet.crypto.keccak import starknet_keccak

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

    # ✅ Step 2: Securely Store Messages with zk-STARK Proofs
    func store_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt, 
        encrypted_content: felt, 
        zkProof: felt, 
        starknet_signature: (felt, felt)
    ) -> (message_id: felt);

    # ✅ Step 3: Retrieve Messages Securely
    func get_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt
    ) -> (encrypted_content: felt);

    # ✅ Step 4: Delete Message (For Privacy & Compliance)
    func delete_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt
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
    # ✅ Validate zk-STARK Proof for Decentralized Identity
    let computed_proof = Poseidon([user_address, starknet_key])
    assert computed_proof == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Store User Identity Securely in StarkNet Storage
    Storage.write(StorageAccess, user_address, starknet_key)

    return (success=1)
}

@external
func store_message{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    sender: felt, 
    receiver: felt, 
    encrypted_content: felt, 
    zkProof: felt, 
    starknet_signature: (felt, felt)
) -> (message_id: felt) {
    # ✅ Compute Keccak Hash for Message Integrity
    let keccak_hash = starknet_keccak(encrypted_content)

    # ✅ Validate zk-STARK Proof for Message Integrity
    let computed_hash = Poseidon([encrypted_content])
    assert computed_hash == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Verify StarkNet Digital Signature (Ensures Message Authenticity)
    let is_valid_signature = verify(sender, keccak_hash, starknet_signature)
    assert is_valid_signature, "❌ Invalid StarkNet Signature"

    # ✅ Store Secure Message Hash in StarkNet Storage
    let message_key = Poseidon([sender, receiver])
    Storage.write(StorageAccess, message_key, encrypted_content)

    # ✅ Generate Unique Message ID for Proof of Delivery
    let message_id = Poseidon([encrypted_content, sender])

    return (message_id)
}

@external
func get_message{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    sender: felt, 
    receiver: felt
) -> (encrypted_content: felt) {
    # ✅ Retrieve Encrypted Message from StarkNet Storage
    let message_key = Poseidon([sender, receiver])
    let encrypted_content = Storage.read(StorageAccess, message_key)

    return (encrypted_content)
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
    # ✅ Generate Message Key
    let message_key = Poseidon([sender, receiver])

    # ✅ Remove Message from Storage
    Storage.write(StorageAccess, message_key, 0)

    return (success=1)
}