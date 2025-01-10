import {
    Box,
    Flex,
    Step, StepDescription, StepIcon,
    StepIndicator,
    StepNumber,
    Stepper, StepSeparator,
    StepStatus,
    StepTitle,
    Text, useSteps,
    useToast,
} from "@chakra-ui/react";
import {useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useCart} from "./CartContext";
import Navbar from "../components/NavBar";
import OrderAddressForm from "../components/OrderAddresForm";
import OrderPaymentForm from "../components/OrderPaymentForm";


const PlaceOrderPage = () => {
    const steps = [
        { title: 'Address', description: 'Delivery address' },
        { title: 'Payment', description: 'Payment method' },
        { title: 'Order', description: 'Placing order' },
    ]
    const { activeStep, setActiveStep} = useSteps({
        index: 1,
        count: steps.length,
    })

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
        if (activeStep === 0 && !deliveryAddress.city.trim()) {
            toast({
                title: "Error",
                description: "Please complete the delivery address.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setActiveStep((prevStep) => prevStep + 1);
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

    const onOrderSubmit = () => {

    }

    return (
        <Flex direction="column" m="50px">
            <Navbar/>
            <Flex direction="row" pt="50px">
                <Box flex={1} p={4} bg="gray.900" borderRadius="md" boxShadow="lg" mr={8}>
                    <Stepper size='lg' index={activeStep} mx={6} mt={6}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0'>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===0 && <OrderAddressForm deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} handleNext={handleNext} />}
                    {activeStep===1 && <OrderPaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} cardDetails={cardDetails} setCardDetails={setCardDetails} handleOrder={handleOrder} /> }
                    {activeStep===2 &&
                        <Flex flexDir="column">
                            <Text>Tour order has been placed</Text>
                            <Text>Thank you for your time</Text>
                        </Flex>
                    }
                </Box>

                <Box w="350px">
                    <ShoppingCart cart={cart}/>
                </Box>
            </Flex>
        </Flex>
    );
};

export default PlaceOrderPage;
