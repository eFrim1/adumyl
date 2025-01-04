import React, {useEffect, useState} from "react";
import {Box, Button, VStack, Text, Grid, IconButton} from "@chakra-ui/react";
import {IconCheck, IconHome, IconX} from "@tabler/icons-react";
import DeliveryTracker from "../../pages/DeliveryTracker";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeliveryManagement({ courier }) {
    const [requests, setRequests] = useState([]);
    const [acceptedRequest, setAcceptedRequest] = useState(null);
    const navigate = useNavigate(); // Use React Router's navigate

    // Fetch Delivery objects from the backend API
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/delivery/1/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched delivery data:", data);
                setRequests([data]);   //!because we need data as array not object!
            })
            .catch((error) => console.error("Error fetching deliveries:", error));
    }, []);

    // Handle accept request
    const handleAccept = (order_id) => {
        const acceptedRequest = requests.find((req) => req.order_id === order_id);
        if (acceptedRequest) {
            console.log("Accepted request:", acceptedRequest);
            setAcceptedRequest(acceptedRequest);
        }
        setRequests((prev) => prev.filter((req) => req.order_id !== order_id));
    };

    // Handle decline request
    const handleDecline = (order_id) => {
        setRequests(prev => prev.filter(req => req.order_id !== order_id));
    };

    const handleNavigateToTracker = () => {
        navigate("/delivery_tracker", { state: { delivery: acceptedRequest } }); // Pass data via state
        console.log("Path found");
    };

    return (
        <Box p={4}>
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    Delivery System
                </Text>
                {/* Render requests */}
                {requests.length > 0 ? (
                    requests.map((req) => (
                        <Box key={req.order_id} border="1px solid #ccc" borderRadius="md" p={4}>
                            <Text>Order ID: {req.order_id}</Text>
                            <Button
                                onClick={() => handleAccept(req.order_id)}
                                colorScheme="green"
                                mt={2}
                            >
                                Accept Delivery
                            </Button>
                        </Box>
                    ))
                ) : (
                    <Text>No delivery requests available.</Text>
                )}

                {/* Navigate to DeliveryTracker if a delivery is accepted */}
                {acceptedRequest && (
                    <Button
                        onClick={handleNavigateToTracker}
                        colorScheme="blue"
                        mt={4}
                    >
                        Go to Delivery Tracker
                    </Button>
                )}
            </VStack>
        </Box>
    );
}
