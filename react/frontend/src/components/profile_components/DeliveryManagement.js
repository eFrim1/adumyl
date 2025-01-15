import React, {useEffect, useState} from "react";
import {Box, VStack, Text, Grid, IconButton, useToast, Button, CloseButton} from "@chakra-ui/react";
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import { Restaurant03Icon} from "hugeicons-react";
import {IconCheck, IconHome, IconX} from "@tabler/icons-react";
import {acceptDeliveryRequest, fetchDeliveryRequests} from "../../services/delivery";
import getCoords from "../../utils/geocode";
import {updateOrderStatus} from "../../services/orders";


export default function DeliveryManagement() {
    const [requests, setRequests] = useState([]);
    const [accepted, setAccepted] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await fetchDeliveryRequests(); // API call to fetch delivery requests

                // Geocode addresses to get coordinates
                const geocodedRequests = await Promise.all(
                    data.map(async (request) => {
                        const restaurantCoords = await getCoords(request.restaurant_address);
                        const deliveryCoords = await getCoords(request.address);

                        return {
                            ...request,
                            restaurant_coords: restaurantCoords,
                            delivery_coords: deliveryCoords,
                        };
                    })
                );

                setRequests(geocodedRequests);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to fetch delivery requests.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchRequests();
    }, [toast]);


    // Display the first request
    const currentRequest = requests.length > 0 ? requests[0] : null;

    const handleAccept = async (id) => {
        try {
            await acceptDeliveryRequest(id); // API call to accept the request
            setAccepted(true);
            toast({
                title: "Request Accepted",
                description: `Delivery request #${id} has been accepted.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to accept the delivery request.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDecline = (id) => {
        setRequests((prev) => prev.filter((req) => req.id !== id));
    };

    const handleComplete = async () => {
        const id = currentRequest.id;
        try {
            await updateOrderStatus(id, "delivered");
            setAccepted(true);
            setAccepted(false);
            setRequests((prev) => prev.filter((req) => req.id !== id));
            toast({
                title: "Request Accepted",
                description: `Delivery request #${id} has been delivered.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed set status.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (<Box p={2}>
        <VStack spacing={6} align="stretch">
            {/* Current Delivery Request */}

            {accepted?
                <Button onClick={handleComplete}>Delivered</Button>
                :
                (currentRequest ? (<>
                <Box>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        Delivery Request #{currentRequest.id}
                    </Text>
                    <Box p={4} bg="gray.900" borderRadius="md" boxShadow="sm">
                        <Grid templateColumns="repeat(3, 1fr)">
                            <Text fontWeight="bold" color="green.300">
                                Restaurant Address:
                            </Text>
                            <Text fontWeight="bold" color="green.300">
                                Delivery Address:
                            </Text>
                            <IconButton
                                icon={<IconCheck/>}
                                colorScheme="green"
                                onClick={() => handleAccept(currentRequest.id)}
                                aria-label="accept"
                                w="40px"
                                variant="ghost"
                            >
                                Accept
                            </IconButton>
                            <Text mb={2}>{currentRequest.restaurant_address}</Text>
                            <Text>{currentRequest.address}</Text>
                            <CloseButton
                                onClick={() => handleDecline(currentRequest.id)}
                                w="40px"
                                colorScheme="red"
                            >
                            </CloseButton>
                        </Grid>
                    </Box>

                </Box>

                {/* Map Section */}
                <Box borderRadius="md" h="46vh" bg="gray.100">
                    {currentRequest.restaurant_coords && <APIProvider apiKey="AIzaSyDsiA5juM_mFN2zVywsvZV-wqFqa4HfCRE">
                        <Map
                            defaultZoom={12}
                            defaultCenter={currentRequest.restaurant_coords}
                            mapId="ec541952d070ac6e"
                            mapContainerStyle={{width: "100%", height: "100%"}}
                        >
                            <AdvancedMarker position={currentRequest.restaurant_coords}>
                                <Restaurant03Icon color="red" size={40}/>
                            </AdvancedMarker>

                            <AdvancedMarker position={currentRequest.delivery_coords}>
                                <IconHome color="orange" size={40}/>
                            </AdvancedMarker>

                        </Map>
                    </APIProvider>}
                </Box>
            </>) : (<Text fontSize="xl" fontWeight="bold" textAlign="center">
                No delivery requests available.
            </Text>))}
        </VStack>
    </Box>);
}
