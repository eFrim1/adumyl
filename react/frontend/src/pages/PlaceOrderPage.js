import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Step,
    StepIndicator,
    StepNumber,
    Stepper,
    StepStatus,
    StepTitle,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useCart} from "./CartContext";
import Navbar from "../components/NavBar";

const PlaceOrderPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState({
        city: "",
        street: "",
        number: "",
        floor: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const toast = useToast();
    const {cart} = useCart();

    const handleNext = () => {
        if (currentStep === 0 && !deliveryAddress.city.trim()) {
            toast({
                title: "Error",
                description: "Please complete the delivery address.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleOrder = () => {
        if (paymentMethod === "Card online" && !cardDetails.cardNumber.trim()) {
            toast({
                title: "Error",
                description: "Please complete the card details.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Submit order
        onOrderSubmit({
            cart,
            deliveryAddress,
            paymentMethod,
            cardDetails: paymentMethod === "Card online" ? cardDetails : null,
        });

        toast({
            title: "Success",
            description: "Your order has been placed!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const onOrderSubmit = () =>{

    }

    return (
        <Flex direction="column" m="50px">
        <Navbar />
        <Flex direction="row" pt="50px">
            {/* Stepper Section */}
            <Box flex={1} p={4} bg="gray.900" borderRadius="md" boxShadow="lg" mr={8}>
                <Stepper index={currentStep} colorScheme="green" size="lg" orientation="vertical">
                    {/* Step 1: Delivery Address */}
                    <Step>
                        <StepIndicator>
                            <StepNumber />
                        </StepIndicator>
                        <StepTitle>Delivery Address</StepTitle>
                        <StepStatus>{currentStep > 0 ? "Completed" : "In Progress"}</StepStatus>
                        {currentStep === 0 && (
                            <Stack mt={4}>
                                <FormControl isRequired>
                                    <FormLabel color="white">City</FormLabel>
                                    <Input
                                        value={deliveryAddress.city}
                                        onChange={(e) =>
                                            setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                                        }
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel color="white">Street</FormLabel>
                                    <Input
                                        value={deliveryAddress.street}
                                        onChange={(e) =>
                                            setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
                                        }
                                    />
                                </FormControl>
                                <HStack>
                                    <FormControl isRequired>
                                        <FormLabel color="white">Number</FormLabel>
                                        <Input
                                            value={deliveryAddress.number}
                                            onChange={(e) =>
                                                setDeliveryAddress({ ...deliveryAddress, number: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white">Floor</FormLabel>
                                        <Input
                                            value={deliveryAddress.floor}
                                            onChange={(e) =>
                                                setDeliveryAddress({ ...deliveryAddress, floor: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                </HStack>
                                <Button colorScheme="green" onClick={handleNext}>
                                    Proceed to Payment
                                </Button>
                            </Stack>
                        )}
                    </Step>

                    {/* Step 2: Payment Method */}
                    <Step>
                        <StepIndicator>
                            <StepNumber />
                        </StepIndicator>
                        <StepTitle>Payment Method</StepTitle>
                        <StepStatus>{currentStep > 1 ? "Completed" : "In Progress"}</StepStatus>
                        {currentStep === 1 && (
                            <Stack mt={4}>
                                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                                    <Stack direction="column">
                                        <Radio value="Cash" colorScheme="green">
                                            Cash
                                        </Radio>
                                        <Radio value="Card to courier" colorScheme="green">
                                            Card to courier
                                        </Radio>
                                        <Radio value="Card online" colorScheme="green">
                                            Card online
                                        </Radio>
                                    </Stack>
                                </RadioGroup>

                                {paymentMethod === "Card online" && (
                                    <Stack mt={4}>
                                        <FormControl isRequired>
                                            <FormLabel color="white">Card Number</FormLabel>
                                            <Input
                                                value={cardDetails.cardNumber}
                                                onChange={(e) =>
                                                    setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                                                }
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel color="white">Expiry Date</FormLabel>
                                            <Input
                                                value={cardDetails.expiryDate}
                                                onChange={(e) =>
                                                    setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                                                }
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel color="white">CVV</FormLabel>
                                            <Input
                                                value={cardDetails.cvv}
                                                onChange={(e) =>
                                                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                                                }
                                            />
                                        </FormControl>
                                    </Stack>
                                )}
                                <Button colorScheme="green" onClick={handleOrder}>
                                    Place Order
                                </Button>
                            </Stack>
                        )}
                    </Step>
                </Stepper>
            </Box>

            {/* Shopping Cart Section */}
            <Box w="350px">
                <ShoppingCart cart={cart} />
            </Box>
        </Flex>
        </Flex>
    );
};

export default PlaceOrderPage;
