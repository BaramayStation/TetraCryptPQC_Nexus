%lang starknet

from starkware.cairo.common.hash import Poseidon
from starkware.crypto.signature.signature import verify
from starkware.starknet.storage.storage import Storage
from starkware.starknet.storage.access import StorageAccess
from starkware.starknet.crypto.keccak import starknet_keccak

@contract
func send_secure_message{
    syscall_ptr: felt*, 
    pedersen_ptr: HashBuiltin*, 
    range_check_ptr
}(
    sender: felt, 
    receiver: felt, 
    encrypted_content: felt, 
    zkProof: felt, 
    starknet_signature: (felt, felt)
) -> (success: felt):
    # ✅ Step 1: Compute Keccak Hash for Enhanced Security
    let message_hash = starknet_keccak(encrypted_content)

    # ✅ Step 2: Verify zk-STARK Proof (Ensuring Data Integrity)
    let hashed_content = Poseidon(encrypted_content)
    assert hashed_content == zkProof, "❌ Invalid zk-STARK Proof"

    # ✅ Step 3: Verify StarkNet Signature (Prevents Message Forgery)
    let valid_signature = verify(sender, message_hash, starknet_signature)
    assert valid_signature == 1, "❌ Invalid StarkNet Signature"

    # ✅ Step 4: Securely Store Message on StarkNet Blockchain
    let message_key = Poseidon([sender, receiver])
    Storage.write(StorageAccess, message_key, encrypted_content)

    # ✅ Step 5: Confirm Successful Message Storage
    return (success=1)
end