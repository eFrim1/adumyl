import React, {useState} from "react";
import {Box, VStack, Text, Grid, IconButton} from "@chakra-ui/react";
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import { Restaurant03Icon} from "hugeicons-react";
import {IconCheck, IconHome, IconX} from "@tabler/icons-react";
import DeliveryTracker from "../../pages/DeliveryTracker";

export default function DeliveryManagement({ onAccept }) {
    const [requests, setRequests] = useState([
    {
        orderId: 1, 
        restaurantCoordinates: {lat: 40.7128, lng: -74.006}, // Example coordinates for New York
        deliveryCoordinates: {lat: 40.73061, lng: -73.935242}, // Example delivery address
        restaurantAddress: "123 Main St, New York, NY", 
        deliveryAddress: "456 Elm St, Brooklyn, NY",
    }, 
    {
        orderId: 2, 
        restaurantCoordinates: {lat: 34.0522, lng: -118.2437}, // Example coordinates for Los Angeles
        deliveryCoordintes: {lat: 34.0522, lng: -118.2537}, // Example delivery address
        restaurantAddress: "789 Sunset Blvd, Los Angeles, CA", 
        deliveryAddress: "101 Hollywood Ave, Los Angeles, CA",
    },
    ]);

    // Display the first request
    const currentRequest = requests.length > 0 ? requests[0] : {};
    console.log("Curr Request: ", currentRequest)
    
    const handleAccept = (id) => {
        const acceptedRequest = requests.find((req) => req.orderId === id);
        setRequests((prev) => prev.filter((req) => req.orderId !== id));
        onAccept(acceptedRequest); // Notify parent about the accepted request
    };

    const handleDecline = (id) => {
        setRequests((prev) => prev.filter((req) => req.orderId !== id));
    };

    return (<Box p={2}>
        <VStack spacing={6} align="stretch">
            {/* Current Delivery Request */}
            {currentRequest ? (<>
                {/* Pass currentRequest as the delivery prop to DeliveryTracker */}
                <DeliveryTracker delivery = {currentRequest} />

                <Box>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        Delivery Request #{currentRequest.orderId}
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
                                onClick={() => handleAccept(currentRequest.orderId)}
                                aria-label="accept"
                                w="40px"
                                variant="ghost"
                            >
                                Accept
                            </IconButton>
                            <Text mb={2}>{currentRequest.restaurantAddress}</Text>
                            <Text>{currentRequest.deliveryAddress}</Text>
                            <IconButton
                                icon={<IconX size="1"/>}
                                aria-label="decline"
                                colorScheme="red"
                                onClick={() => handleDecline(currentRequest.orderId)}
                                w="40px"
                                variant="ghost"
                            >
                                Decline
                            </IconButton>
                        </Grid>
                    </Box>

                </Box>

                {/* Map Section */}
                <Box borderRadius="md" h="46vh" bg="gray.100">
                    <APIProvider apiKey="AIzaSyDsiA5juM_mFN2zVywsvZV-wqFqa4HfCRE">
                        <Map
                            defaultZoom={12}
                            defaultCenter={currentRequest.restaurantCoordinates}
                            mapId="ec541952d070ac6e"
                            mapContainerStyle={{width: "100%", height: "100%"}}
                        >
                            <AdvancedMarker position={currentRequest.restaurantCoordinates}>
                                <Restaurant03Icon color="red" size={40}/>
                            </AdvancedMarker>

                            <AdvancedMarker position={currentRequest.deliveryCoordinates}>
                                <IconHome color="orange" size={40}/>
                            </AdvancedMarker>

                        </Map>
                    </APIProvider>
                </Box>

            </>) : (<Text fontSize="xl" fontWeight="bold" textAlign="center">
                No delivery requests available.
            </Text>)}
        </VStack>
    </Box>);
}
