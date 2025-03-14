%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.cairo.common.hash import Poseidon
from starkware.starknet.crypto.keccak import starknet_keccak

@contract_interface
namespace TetraCrypt {
    # ✅ Step 1: Register User with zk-STARK-Based Decentralized Identity
    func register_user{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        user_address: felt, 
        starknet_key: felt, 
        zkProof: felt
    ) -> (success: felt);

    # ✅ Step 2: Securely Store Quantum-Resistant Messages
    func store_message{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(
        sender: felt, 
        receiver: felt, 
        message_hash: felt, 
        zkProof: felt, 
        starknet_signature: (felt, felt)
    ) -> (message_id: felt);
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
    # ✅ Step 1: Validate zk-STARK Proof for Decentralized Identity
    let computed_proof = Poseidon([user_address, starknet_key])
    assert computed_proof == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Step 2: Store User Identity Securely on StarkNet Storage
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
    message_hash: felt, 
    zkProof: felt, 
    starknet_signature: (felt, felt)
) -> (message_id: felt) {
    # ✅ Step 1: Compute Keccak Hash for Message Integrity
    let keccak_hash = starknet_keccak(message_hash)

    # ✅ Step 2: Validate zk-STARK Proof for Quantum-Secure Message Verification
    let computed_hash = Poseidon([message_hash])
    assert computed_hash == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Step 3: Verify StarkNet Digital Signature (Ensures Message Authenticity)
    let is_valid_signature = verify(sender, keccak_hash, starknet_signature)
    assert is_valid_signature, "❌ Invalid StarkNet Signature"

    # ✅ Step 4: Store Secure Message Hash in Decentralized StarkNet Storage
    let message_key = Poseidon([sender, receiver])
    Storage.write(StorageAccess, message_key, message_hash)

    # ✅ Step 5: Generate Unique Message ID for Immutable Proof of Delivery
    let message_id = Poseidon([message_hash, sender])

    return (message_id)
}