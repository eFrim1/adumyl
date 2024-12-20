import React, {useState} from "react";
import {Box, Button, VStack, Text, IconButton, HStack, Flex,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {IconBike, IconCar} from "@tabler/icons-react";

export default function RegisterDelivery({onRegister}) {
    const [vehicle, setVehicle] = useState("car");

    const handleRegister = () => {
        if (!vehicle) {
            alert("Please select a vehicle type before registering.");
            return;
        }
        onRegister(vehicle);
    };

    return (
        <Flex p={6} flexDirection="column" >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Chose your type of transport
            </Text>
            <HStack spacing={4}>
                <IconButton
                    colorScheme={vehicle === "car" ? "green" : "gray"}
                    onClick={() => setVehicle("car")}
                    icon={<IconCar/>}
                    aria-label="car">
                </IconButton>
                <IconButton
                    colorScheme={vehicle === "bike" ? "green" : "gray"}
                    onClick={() => setVehicle("bike")}
                    icon={<IconBike/>}
                    aria-label="bike">
                </IconButton>
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
