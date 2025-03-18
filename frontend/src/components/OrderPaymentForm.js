import {Button, FormControl, FormLabel, Input, Radio, RadioGroup, Stack} from "@chakra-ui/react";

const OrderPaymentForm = ({paymentMethod, setPaymentMethod, cardDetails, setCardDetails, handleOrder}) => {
    return(
        <Stack mt={4} ml={20}>
            <RadioGroup size="" value={paymentMethod} onChange={setPaymentMethod}>
                <Stack direction="column">
                    <Radio size="lg" value="cash" colorScheme="green">
                        Cash
                    </Radio>
                    <Radio size="lg" value="card" colorScheme="green">
                        Card to courier
                    </Radio>
                    <Radio size="lg" value="card" colorScheme="green">
                        Card online
                    </Radio>
                </Stack>
            </RadioGroup>


                <Stack mt={4} ml={20}>
                    <FormControl isRequired maxW="400px">
                        <FormLabel color="white">Card Number</FormLabel>
                        <Input
                            value={cardDetails.cardNumber}
                            onChange={(e) =>
                                setCardDetails({...cardDetails, cardNumber: e.target.value})
                            }
                        />
                    </FormControl>
                    <FormControl isRequired maxW="400px">
                        <FormLabel color="white">Expiry Date</FormLabel>
                        <Input
                            value={cardDetails.expiryDate}
                            onChange={(e) =>
                                setCardDetails({...cardDetails, expiryDate: e.target.value})
                            }
                        />
                    </FormControl>
                    <FormControl isRequired maxW="400px">
                        <FormLabel color="white">CVV</FormLabel>
                        <Input
                            value={cardDetails.cvv}
                            onChange={(e) =>
                                setCardDetails({...cardDetails, cvv: e.target.value})
                            }
                        />
                    </FormControl>
                </Stack>

            <Button colorScheme="green" onClick={handleOrder} mt={8} maxW="400px">
                Place Order
            </Button>
        </Stack>
    )
}

export default OrderPaymentForm;