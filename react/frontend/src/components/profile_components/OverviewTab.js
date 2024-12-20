import React, {useState} from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Text, Flex,
    Grid,
} from "@chakra-ui/react";

const OverviewTab = ({restaurant, onUpdate}) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // Initialize formData with the restaurant prop
    const [formData, setFormData] = useState(restaurant);

    // Handle form submission
    const handleSubmit = () => {
        onUpdate(formData);
    };

    const handleToggleDay = (day) => {
        setFormData((prev) => ({
            ...prev,
            days: prev.days.includes(day)
                ? prev.days.filter((d) => d !== day)
                : [...prev.days, day],
        }));
    };

    return (
        <VStack spacing={4} align="stretch">
            {/* Restaurant Name */}
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                <FormControl>
                    <FormLabel>Restaurant Name</FormLabel>
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </FormControl>

                {/* Address */}
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </FormControl>

                {/* Contact Number */}
                <FormControl>
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    />
                </FormControl>

                {/* Operating Hours */}
                <FormControl>
                    <FormLabel>Operating Hours</FormLabel>
                    <Input
                        value={formData.operatingHours}
                        onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                    />
                </FormControl>

                {/* Operating Days */}
                <FormControl w="400px">
                    <FormLabel>Operating Days</FormLabel>
                    <Flex flexDirection="row" justifyContent="space-between">
                        {daysOfWeek.map((day) => (
                            <Button
                                key={day}
                                onClick={() => handleToggleDay(day)}
                                colorScheme={formData.days.includes(day) ? "green" : "gray"}
                                variant={formData.days.includes(day) ? "solid" : "shadow"}
                                textColor={day === "Sun" ? "red.400" : "white"}
                            >
                                {day.charAt(0).toUpperCase()}
                            </Button>
                        ))}
                    </Flex>
                </FormControl>
            </Grid>
            <Button colorScheme="green" onClick={handleSubmit} w="300px" mt={4}>
                Update Info
            </Button>

            {/* Summary Information */}
            <Box mt={4}>
                <Text fontWeight="bold" fontSize="lg">
                    Restaurant Statistics
                </Text>
                <Text>Total Sales: $1,350</Text>
                <Text>Total Orders: 40</Text>
                <Text>Average Rating: 4.2</Text>
            </Box>
        </VStack>
    );
};

export default OverviewTab;
