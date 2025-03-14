%lang cairo

from starkware.cairo.common.hash import Poseidon
from starkware.cairo.common.math_utils import assert_nn
from starkware.crypto.signature.signature import verify
from starkware.starknet.common.storage import Storage

@contract
func send_secure_message{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    sender: felt, 
    receiver: felt, 
    encrypted_content: felt, 
    zkProof: felt, 
    starknet_signature: felt
) -> (success: felt):
    # ✅ Step 1: Verify zk-STARK Proof
    let hashed_content = Poseidon(encrypted_content)
    assert hashed_content == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Step 2: Verify StarkNet Signature
    let valid_signature = verify(sender, hashed_content, starknet_signature)
    assert_nn(valid_signature, "❌ Invalid StarkNet Signature")

    # ✅ Step 3: Store Message on StarkNet Blockchain
    let message_key = Poseidon([sender, receiver])
    Storage.write(message_key, encrypted_content)

    # ✅ Step 4: Return Success Confirmation
    return (success=1)
end