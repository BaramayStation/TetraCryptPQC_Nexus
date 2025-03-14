%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.cairo.common.hash import Poseidon
from starkware.starknet.crypto.keccak import starknet_keccak

# ✅ WebSocket Event: Message Sent
@event
func MessageSent(sender: felt, receiver: felt, message_id: felt, encrypted_content: felt);

@contract_interface
namespace TetraCrypt {
    func register_user{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        user_address: felt, 
        starknet_key: felt, 
        zkProof: felt
    ) -> (success: felt);

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

    func get_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt
    ) -> (encrypted_content: felt);

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
    encrypted_content: felt, 
    zkProof: felt, 
    starknet_signature: (felt, felt)
) -> (message_id: felt) {
    let keccak_hash = starknet_keccak(encrypted_content);
    let computed_hash = Poseidon([encrypted_content]);
    assert computed_hash == zkProof, "❌ Invalid zk-STARK Proof";

    let is_valid_signature = verify(sender, keccak_hash, starknet_signature);
    assert is_valid_signature, "❌ Invalid StarkNet Signature";

    let message_key = Poseidon([sender, receiver]);
    Storage.write(StorageAccess, message_key, encrypted_content);

    let message_id = Poseidon([encrypted_content, sender]);

    # 🔹 Emit WebSocket Event for Real-Time Messaging
    emit MessageSent(sender, receiver, message_id, encrypted_content);

    return (message_id);
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
    let message_key = Poseidon([sender, receiver]);
    let encrypted_content = Storage.read(StorageAccess, message_key);

    return (encrypted_content);
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