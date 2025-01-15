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
import {useEffect, useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useCart, useOrder, useRestaurant} from "./OrderContext";
import Navbar from "../components/NavBar";
import OrderAddressForm from "../components/OrderAddresForm";
import OrderPaymentForm from "../components/OrderPaymentForm";
import {addOrder, addOrderItem, fetchOrderById} from "../services/orders";


const PlaceOrderPage = () => {
    const steps = [
        { title: 'Address', description: 'Delivery address' },
        { title: 'Payment', description: 'Payment method' },
        { title: 'Order', description: 'Placing order' },
    ]
    const { activeStep, setActiveStep} = useSteps({
        index: 0,
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
    const {cart, setCart} = useCart();
    const {order, setOrder, waitingTime, setWaitingTime} = useOrder();
    const {restaurant} = useRestaurant();


    useEffect(() => {
        if (!order || activeStep !== 2) return;

        const interval = setInterval(async () => {
            try {
                const updatedOrder = await fetchOrderById(order.id); // Replace with your API call
                if (updatedOrder[0].status !== "preparing") {
                    setOrder(updatedOrder[0]);
                    setActiveStep(0); // Allow the user to make another order
                    toast({
                        title: "Order Updated",
                        description: `Your order is now ${updatedOrder[0].status}.`,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("Error fetching order status:", error);
                clearInterval(interval);
            }
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on unmount or when order changes
    }, [order, activeStep, setOrder, setActiveStep, toast]);

    useEffect(() => {
        if (order?.status === "preparing" || order?.status === "out_for_delivery") {
            setActiveStep(2);
        } else {
            setActiveStep(0); // Default to the first step if no active order
        }
    }, [order, setActiveStep]);


    const handleNext = () => {
        if (activeStep === 0 && !handleAddres()) {
            return;
        }else if(activeStep === 1 && !handleOrder()){
            return;
        }
        setActiveStep(activeStep+1);
    };
    const handleAddres = () => {
        if(!deliveryAddress.city.trim()) {
            toast({
                title: "Error",
                description: "Please complete the delivery address.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false
        }

        return true;
    }
    const handleOrder = async () => {
        if (paymentMethod === "Card online" && !cardDetails.cardNumber.trim()) {
            toast({
                title: "Error",
                description: "Please complete the card details.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false
        }
        if(!cart){
            toast({
                title: "Error",
                description: "Cart is empty",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false
        }
        try {
            setWaitingTime(cart.reduce((acc, curr) => {
                return acc+ curr.prep_time;
            }, 0));
            await onOrderSubmit();
            return true;
        }catch (error){
            return false;
        }
    };

    const onOrderSubmit = async () => {
        try {
            // Create order payload
            const orderPayload = {
                restaurant: restaurant.id,
                address: `${deliveryAddress.city}, ${deliveryAddress.street} ${deliveryAddress.number}, ${deliveryAddress.floor}`,
                total_price: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
                payment_method: paymentMethod,
                status: "preparing",
            };

            // Send order to backend and get the order ID
            const orderResponse = await addOrder(orderPayload); // API call for the order
            setOrder(orderResponse); // Save order details in context

            // Create payload for order items
            const orderItemsPayload = cart.map((item) => ({
                order: orderResponse.id, // Use the created order ID
                menu_item: item.id,
                quantity: item.quantity,
            }));

            // Send order items to the backend
            await Promise.all(orderItemsPayload.map((item) => addOrderItem(item)))// API call for each order item
            setCart([]);

        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to place the order.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            throw error;
        }
    };

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
                    {activeStep===1 && <OrderPaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} cardDetails={cardDetails} setCardDetails={setCardDetails} handleOrder={handleNext} /> }
                    {activeStep===2 &&
                        <Flex flexDir="column" p={20} justifyContent="center" alignItems="center">
                            <Text fontWeight="bold" fontSize="28">Thank you for your order, your order has been placed</Text>
                            <Text fontWeight="bold" fontSize="20">Your waiting time is approximately: {waitingTime} minutes</Text>
                            <Text fontWeight="bold" fontSize="20">While you wait, you can track your order on the delivery tracker page</Text>
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
