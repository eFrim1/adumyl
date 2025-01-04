import React, {useState} from "react";
import {Box, Button, VStack, Text, IconButton, HStack, Flex,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {IconBike, IconCar} from "@tabler/icons-react";

export default function RegisterDelivery({ onRegister }) {
    const [vehicle, setVehicle] = useState("car");

    const handleRegister = () => {
        if (!vehicle) {
            alert("Please select a vehicle type before registering.");
            return;
        }

        // Create courier object
        const courier = {
            vehicle,
            name: "Syed Ali Imran Zaidi",
            phone: "+40 767 123 123",
            avatar: "https://scontent.ftsr1-1.fna.fbcdn.net/v/t39.30808-6/252896066_289127746408703_2872477600717462919_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=B2ouf8LoeFIQ7kNvgERqade&_nc_zt=23&_nc_ht=scontent.ftsr1-1.fna&_nc_gid=AzjEDYpvHcasYpVqHA1kiMJ&oh=00_AYAJdQiUWXBpSE4W5lTvlNHJhoPN7Z5sNMgCLySE4P-LwQ&oe=677E2BD3",
        };

        // Pass the registered courier (with agent details) to the parent component
        onRegister(courier);
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
