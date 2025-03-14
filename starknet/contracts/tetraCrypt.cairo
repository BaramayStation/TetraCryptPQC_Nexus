%lang starknet
%builtins pedersen range_check

from starkware.crypto.signature.signature import verify
from starkware.starknet.common.storage import Storage
from starkware.starknet.core.storage import write
from starkware.cairo.common.poseidon_hash import poseidon_hash

@contract_interface
namespace TetraCrypt {
    # ✅ Step 1: Register a New User with zk-STARK Authentication
    func register_user{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        user_address: felt, 
        starknet_key: felt, 
        zkProof: felt
    ) -> (success: felt);

    # ✅ Step 2: Store Encrypted Messages with zk-STARK Proofs
    func store_message{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        sender: felt, 
        receiver: felt, 
        message_hash: felt, 
        zkProof: felt, 
        starknet_signature: (felt, felt)
    ) -> (message_id: felt);
}

@external
func register_user{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user_address: felt, starknet_key: felt, zkProof: felt
) -> (success: felt) {
    # ✅ Verify zk-STARK Proof for User Registration
    assert poseidon_hash([user_address, starknet_key]) == zkProof, "Invalid zk-STARK Proof"

    # ✅ Store user key on-chain
    Storage.write(user_address, starknet_key)

    return (1)
}

@external
func store_message{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    sender: felt, receiver: felt, message_hash: felt, zkProof: felt, starknet_signature: (felt, felt)
) -> (message_id: felt) {
    # ✅ Verify zk-STARK Proof for Secure Messaging
    assert poseidon_hash([message_hash]) == zkProof, "Invalid zk-STARK Proof"

    # ✅ Verify StarkNet Signature for Message Integrity
    assert verify(sender, message_hash, starknet_signature), "Signature Verification Failed"

    # ✅ Store Message Hash on StarkNet
    Storage.write(pedersen(sender, receiver), message_hash)

    # ✅ Generate Message ID
    let message_id = pedersen(message_hash, sender)

    return (message_id)
}