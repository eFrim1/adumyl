import React, {useState} from "react";
import {Box, Button, VStack, Text, IconButton, HStack, Flex, useToast,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {IconBike, IconCar} from "@tabler/icons-react";
import {fetchDeliveryRequests, registerCourier} from "../../services/delivery";

export default function RegisterDelivery({ onRegister }) {
    const [vehicle, setVehicle] = useState("car");
    const toast = useToast();

    const handleRegister = async () => {
        if (!vehicle) {
            toast({
                title: "Error",
                description: "No vehicle selected",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        try {
            const courier = await registerCourier(vehicle);
            onRegister(courier); // Pass the registered courier to the parent
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to register.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    return (
        <Flex p={6} flexDirection="column">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Choose your type of transport
            </Text>
            <HStack spacing={4}>
                <IconButton
                    colorScheme={vehicle === "car" ? "green" : "gray"}
                    onClick={() => setVehicle("car")}
                    icon={<IconCar />}
                    aria-label="car"
                />
                <IconButton
                    colorScheme={vehicle === "bike" ? "green" : "gray"}
                    onClick={() => setVehicle("bike")}
                    icon={<IconBike />}
                    aria-label="bike"
                />
            </HStack>
            <Button
                mt={6}
                colorScheme="green"
                size="lg"
                onClick={handleRegister}
                w="300px"
            >
                Register as Courier
            </Button>
        </Flex>
    );
}

