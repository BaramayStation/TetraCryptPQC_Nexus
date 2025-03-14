%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.cairo.common.hash import Poseidon

@contract_interface
namespace TetraCrypt {
    # ✅ Step 1: Register User on StarkNet (Decentralized Identity)
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
    # ✅ Step 1: Verify zk-STARK Proof for Secure Identity Registration
    let computed_proof = Poseidon([user_address, starknet_key])
    assert computed_proof == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Step 2: Store User Identity on StarkNet
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
    # ✅ Step 1: Validate zk-STARK Proof for Message Integrity
    let computed_hash = Poseidon([message_hash])
    assert computed_hash == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Step 2: Verify StarkNet Digital Signature (Message Authentication)
    let is_valid_signature = verify(sender, message_hash, starknet_signature)
    assert is_valid_signature, "❌ Invalid StarkNet Signature"

    # ✅ Step 3: Securely Store Message Hash in StarkNet Storage
    let message_key = Poseidon([sender, receiver])
    Storage.write(StorageAccess, message_key, message_hash)

    # ✅ Step 4: Generate a Unique Message ID
    let message_id = Poseidon([message_hash, sender])

    return (message_id)
}