import {Button, FormControl, FormLabel, HStack, Input, Stack} from "@chakra-ui/react";


const OrderAddressForm = ({deliveryAddress, setDeliveryAddress, handleNext}) => {
    return(
        <Stack mt={4} ml={20}>
            <FormControl isRequired maxW="400px">
                <FormLabel color="white">City</FormLabel>
                <Input
                    value={deliveryAddress.city}
                    onChange={(e) =>
                        setDeliveryAddress({...deliveryAddress, city: e.target.value})
                    }
                />
            </FormControl>
            <FormControl isRequired maxW="400px">
                <FormLabel color="white">Street</FormLabel>
                <Input
                    value={deliveryAddress.street}
                    onChange={(e) =>
                        setDeliveryAddress({...deliveryAddress, street: e.target.value})
                    }
                />
            </FormControl>
            <HStack>
                <FormControl isRequired maxW="195px">
                    <FormLabel color="white">Number</FormLabel>
                    <Input
                        value={deliveryAddress.number}
                        onChange={(e) =>
                            setDeliveryAddress({...deliveryAddress, number: e.target.value})
                        }
                    />
                </FormControl>
                <FormControl maxW="195px">
                    <FormLabel color="white">Floor</FormLabel>
                    <Input
                        value={deliveryAddress.floor}
                        onChange={(e) =>
                            setDeliveryAddress({...deliveryAddress, floor: e.target.value})
                        }
                    />
                </FormControl>
            </HStack>
            <Button colorScheme="green" onClick={handleNext} maxW="400px" mt={8}>
                Proceed to Payment
            </Button>
        </Stack>
    );
}

export default OrderAddressForm;