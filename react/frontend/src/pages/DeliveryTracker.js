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

import Navbar from "../components/NavBar";

export default function DeliveryTracker ({ delivery }) {
    // Use the passed delivery details
    //const {orderId, restaurantCoordinates, deliveryCoordinates, restaurantAddress, deliveryAddress } = delivery;

    // Mock data
    const order = {
        id: "NO12345",
        status: "Out for Delivery",
        estimatedTime: "12:30 PM",
        deliveryAgent: {
            name: "Syed Ali Imran Zaidi",
            phone: "+40 767 123 123",
            avatar: "https://bit.ly/4fvdzBi"
        },
        stages: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"],
        currentStage: 2 // Index of "Out for Delivery"
    };

    return (
        <Flex flexDirection="column" m="50px">
            <Navbar />
            <Text fontSize="2xl" fontWeight="bold" m={8}>
                Delivery Tracker
            </Text>
            <Box border="1px solid #e2e8f0" borderRadius="md" p={6} boxShadow="md">
                {/* Order Details */}
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                    Order ID: {order.id}
                </Text>
                <Text color="gray.600" mb={4}>
                    Estimated Delivery Time: <strong>{order.estimatedTime}</strong>
                </Text>
                <Divider mb={4} />
                
                {/* Progress Timeline */}
                <Text fontWeight="bold" mb={4}>
                    Delivery Status
                </Text>
                <VStack align="stretch" spacing={4}>
                    {order.stages.map((stage, index) => (
                        <HStack key={stage} spacing={4} align="center">
                        {/* Circular Progress for Current Stage */}
                        {index === order.currentStage ? (
                            <CircularProgress isIndeterminate color="green.300" size="24px" />
                        ) : (
                            <Box
                                w={6}
                                h={6}
                                borderRadius="full"
                                bg={index <= order.currentStage ? "green.500" : "gray.300"}
                            />
                        )}
                            <Text fontWeight={index <= order.currentStage ? "bold" : "normal"}>
                                {stage}
                            </Text>
                        </HStack>
                    ))}
                </VStack>

                {/* Optional: Progress Bar */}
                <Progress
                    value={((order.currentStage + 1) / order.stages.length) * 100}
                    size="sm"
                    colorScheme="green"
                    mt={6}
                />

                <Divider mt={6} mb={4} />

                {/* Delivery Agent Info */}
                <Text fontWeight="bold" mb={2}>
                    Delivery Agent
                </Text>
                <HStack>
                    <Avatar src={order.deliveryAgent.avatar} name={order.deliveryAgent.name} />
                    <Box>
                        <Text>{order.deliveryAgent.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                            {order.deliveryAgent.phone}
                        </Text>
                    </Box>
                </HStack>
            </Box>
        </Flex>
    );
}
