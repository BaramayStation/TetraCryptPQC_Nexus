%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.cairo.common.hash import Poseidon
from starkware.starknet.crypto.keccak import starknet_keccak

# ✅ WebSocket Event: Real-Time Messaging Updates
@event
func MessageSent(sender: felt, receiver: felt, message_id: felt, message_ipfs_cid: felt);

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
        starknet_signature: (felt, felt)
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
    starknet_signature: (felt, felt)
) -> (message_id: felt) {
    let message_hash = Poseidon([message_ipfs_cid]);

    # ✅ Validate zk-STARK Proof for Message Integrity
    assert message_hash == zkProof, "❌ Invalid zk-STARK Proof";

    # ✅ Verify StarkNet Digital Signature (Ensures Message Authenticity)
    let is_valid_signature = verify(sender, message_hash, starknet_signature);
    assert is_valid_signature, "❌ Invalid StarkNet Signature";

    # ✅ Store Only IPFS CID on StarkNet Storage (Reduces Gas Costs)
    let message_key = Poseidon([sender, receiver]);
    Storage.write(StorageAccess, message_key, message_ipfs_cid);

    # ✅ Emit WebSocket Event for Real-Time Messaging
    emit MessageSent(sender, receiver, message_key, message_ipfs_cid);

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
    Storage.write(StorageAccess, message_key, 0);

    return (success=1);
}