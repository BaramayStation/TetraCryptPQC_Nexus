%lang starknet

@contract_interface
namespace TetraCrypt {
    func register_user{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        user_address: felt, starknet_key: felt
    ) -> (success: felt);

    func store_message{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        sender: felt, receiver: felt, message_hash: felt
    ) -> (message_id: felt);
}