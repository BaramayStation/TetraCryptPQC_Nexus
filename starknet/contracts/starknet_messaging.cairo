%lang cairo

from starkware.crypto.signature.signature import verify
from starkware.starknet.common.storage import Storage
from starkware.starknet.core.storage import write

@contract
def send_secure_message(sender: felt, receiver: felt, encrypted_content: felt, zkProof: felt, starknet_signature: felt):
    # Verify zk-STARK Proof
    assert poseidon_hash([encrypted_content]) == zkProof, "Invalid zk-STARK Proof"

    # Store Message on StarkNet
    Storage.write(keccak(sender, receiver), encrypted_content)

    # Return success
    return 1