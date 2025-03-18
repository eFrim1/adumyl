import {
    Text,
    Flex,
    Box,
    Progress,
    VStack,
    HStack,
    Divider,
    CircularProgress,
    Stepper,
    StepIndicator,
    Step,
    StepStatus,
    StepDescription,
    StepTitle,
    StepSeparator,
    StepNumber,
    StepIcon, useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import { Restaurant03Icon} from "hugeicons-react";
import {IconHome} from "@tabler/icons-react";
import {fetchOrderById} from "../services/orders";
import {useOrder} from "./OrderContext";
import getCoords from "../utils/geocode";

export default function DeliveryTracker() {
    const steps = [
        { title: "Order Placed", description: "Your order has been placed." },
        { title: "Out for Delivery", description: "Your order is on its way." },
        { title: "Delivered", description: "Your order has been delivered." },
    ];

    const { order, waitingTime } = useOrder(); // Context to track the order
    const [activeStep, setActiveStep] = useState(0);
    const [delivery, setDelivery] = useState(null);
    const toast = useToast();

    useEffect(() => {
        if (!order?.id) {
            setActiveStep(2);
            return;
        }

        // Poll for order status
        const interval = setInterval(async () => {
            try {
                const updatedOrder = await fetchOrderById(order.id); // Replace with your API call
                const restaurantCoords = await getCoords(updatedOrder[0].restaurant_address || "");
                const deliveryCoords = await getCoords(updatedOrder[0].address || "");

                // Create a new delivery object with geocoded coordinates
                const newDelivery = {
                    ...updatedOrder[0],
                    restaurant_coords: restaurantCoords,
                    delivery_coords: deliveryCoords,
                };
                setDelivery(newDelivery);
                // Update the stepper based on the order status
                const statusToStep = {
                    "preparing": 0,
                    "out_for_delivery": 1,
                    "delivered": 2,
                };
                setActiveStep(statusToStep[delivery.status]);

                if (updatedOrder.status === "delivered") {
                    toast({
                        title: "Order Delivered",
                        description: "Your order has been successfully delivered!",
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
        }, 3000);

        return () => clearInterval(interval);
    }, [order, toast, delivery]);

    if (!order?.id) {
        return (
            <Flex flexDirection="column" m="50px">
                <Navbar />
                <Text fontSize="2xl" fontWeight="bold" m={8}>
                    Delivery Tracker
                </Text>
                <Box border="1px solid #e2e8f0" borderRadius="md" p={6} boxShadow="md" textAlign="center">
                    <Text fontSize="lg" color="gray.500">
                        No active order to track.
                    </Text>
                </Box>
            </Flex>
        );
    }

    return (
        <Flex flexDirection="column" m="50px">
            <Navbar />
            <Flex direction="column" pt="50px">
                <Box flex={1} p={4} bg="gray.900" borderRadius="md" boxShadow="lg" mr={8}>
                    <Stepper size="lg" index={activeStep} mx={6} mt={6}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink="0">
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 && (
                        <Flex flexDir="column" p={6}>
                            <Text fontWeight="bold" fontSize="lg">
                                Your order is being prepared. Estimated time: {waitingTime || "N/A"} minutes.
                            </Text>
                        </Flex>
                    )}
                    {activeStep === 1 && (
                        <Flex flexDir="column" p={6}>
                            <Text fontWeight="bold" fontSize="lg">
                                Your order is on its way! You can track it below.
                            </Text>
                        </Flex>
                    )}
                    {activeStep === 2 && (
                        <Flex flexDir="column" p={6}>
                            <Text fontWeight="bold" fontSize="lg">
                                Your order has been delivered. Enjoy your meal!
                            </Text>
                        </Flex>
                    )}
                </Box>

                {/* Map Section */}
                <Box borderRadius="md" h="46vh" bg="gray.100">
                    {delivery?.restaurant_coords && <APIProvider apiKey="AIzaSyDsiA5juM_mFN2zVywsvZV-wqFqa4HfCRE">
                        <Map
                            defaultZoom={12}
                            defaultCenter={delivery.restaurant_coords}
                            mapId="ec541952d070ac6e"
                            mapContainerStyle={{width: "100%", height: "100%"}}
                        >
                            <AdvancedMarker position={delivery.restaurant_coords}>
                                <Restaurant03Icon color="red" size={40}/>
                            </AdvancedMarker>

                            <AdvancedMarker position={delivery.delivery_coords}>
                                <IconHome color="orange" size={40}/>
                            </AdvancedMarker>

                        </Map>
                    </APIProvider>}
                </Box>
            </Flex>
        </Flex>
    );
}

