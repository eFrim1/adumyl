import {
    Text,
    Flex,
    Box,
    Progress,
    VStack,
    HStack,
    Avatar,
    Divider,
    CircularProgress,
    CircularProgressLabel
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/NavBar";
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';

import { Restaurant03Icon} from "hugeicons-react";
import {IconCheck, IconHome, IconX} from "@tabler/icons-react";

import { useLocation } from "react-router-dom";

export default function DeliveryTracker () {
    const location = useLocation();
    const delivery = location.state?.delivery; // Access delivery data from state
    
    // Ensure delivery is provided
    
    if (!delivery) {
        return (
            <Flex flexDirection="column" m="50px">
                <Navbar />
                <Text fontSize="2xl" fontWeight="bold" m={8}>
                    Delivery Tracker
                </Text>
                <Box border="1px solid #e2e8f0" borderRadius="md" p={6} boxShadow="md" textAlign="center">
                    <Text fontSize="lg" color="gray.500">
                        No delivery details available.
                    </Text>
                </Box>
            </Flex>
        );
    }

    // Destructure fields from the delivery prop
    const {
        order_id,
        restaurant_coordinates,
        delivery_coordinates,
        restaurant_address,
        delivery_address,
        deliveryAgent,
        stages,
        currentStage,
        estimatedTime,
    } = delivery;

    console.log("Received delivery in DeliveryTracker:", delivery);

    // Calculate progress percentage
    const progressPercentage = ((currentStage + 1) / stages.length) * 100;

    return (
        <Flex flexDirection="column" m="50px">
            <Text fontSize="2xl" fontWeight="bold" mb={8}>
                Delivery Tracker
            </Text>
            <Box border="1px solid #e2e8f0" borderRadius="md" p={6} boxShadow="md" mb={6}>
                {/* Order Details */}
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                    Order ID: {order_id}
                </Text>
                <Text color="gray.600" mb={4}>
                    Estimated Delivery Time: <strong>{estimatedTime}</strong>
                </Text>
                <Divider mb={4} />

                {/* Progress Timeline */}
                <Text fontWeight="bold" mb={4}>
                    Delivery Status
                </Text>
                <VStack align="stretch" spacing={4}>
                    {stages.map((stage, index) => (
                        <HStack key={stage} spacing={4} align="center">

                            {/* Circular Progress for Current Stage */}
                            {index === currentStage ? (
                                <CircularProgress isIndeterminate color="green.300" size="24px" />
                            ) : (
                                <Box
                                    w={6}
                                    h={6}
                                    borderRadius="full"
                                    bg={index <= currentStage ? "green.500" : "gray.300"}
                                />
                            )}
                            <Text fontWeight={index <= currentStage ? "bold" : "normal"}>
                                {stage}
                            </Text>
                        </HStack>
                    ))}
                </VStack>

                {/* Overall Progress Bar */}
                <Progress
                    value={progressPercentage}
                    size="sm"
                    colorScheme="green"
                    mt={6}
                />
            </Box>

            {/* Map Section */}
            <Box borderRadius="md" h="46vh" bg="gray.100">
                    <APIProvider apiKey="AIzaSyDsiA5juM_mFN2zVywsvZV-wqFqa4HfCRE">
                        <Map
                            defaultZoom={12}
                            defaultCenter={restaurant_coordinates}
                            mapId="ec541952d070ac6e"
                            mapContainerStyle={{width: "100%", height: "100%"}}
                        >
                            <AdvancedMarker position={restaurant_coordinates}>
                                <Restaurant03Icon color="red" size={40}/>
                            </AdvancedMarker>

                            <AdvancedMarker position={delivery_coordinates}>
                                <IconHome color="orange" size={40}/>
                            </AdvancedMarker>

                        </Map>
                    </APIProvider>
            </Box>
        </Flex>
    );
}
