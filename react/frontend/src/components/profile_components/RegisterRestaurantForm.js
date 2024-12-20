import {useState} from "react";
import {
    Flex,
    Grid,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Button,
    Box,
    Image,
} from "@chakra-ui/react";

const RegisterForm = ({onRegister}) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [formData, setFormData] = useState({
        name: "Ceva Bun",
        address: "Strada Avram Iancu nr 25",
        contact: "0744556677",
        operatingHours: "8-16",
        days: ["Mon", "Tue", "Wed"],
        image: null,
    });

    const handleToggleDay = (day) => {
        setFormData((prev) => ({
            ...prev,
            days: prev.days.includes(day)
                ? prev.days.filter((d) => d !== day)
                : [...prev.days, day],
        }));
    };

    const handleFileUpload = (event) => {
        setFormData((prev) => ({...prev, image: event.target.files[0]}));
    };

    const handleSubmit = () => {
        onRegister(formData);
    };

    return (
        <Flex spacing={4} flexDirection="column" h="700px">
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                {/* Restaurant Name */}
                <FormControl w="400px">
                    <FormLabel>Restaurant Name</FormLabel>
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </FormControl>

                {/* Address */}
                <FormControl w="400px">
                    <FormLabel>Address</FormLabel>
                    <Input
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </FormControl>

                {/* Contact Number */}
                <FormControl w="400px">
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    />
                </FormControl>

                {/* Operating Hours */}
                <FormControl w="400px">
                    <FormLabel>Operating Hours</FormLabel>
                    <Input
                        value={formData.operatingHours}
                        onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                    />
                </FormControl>
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
                <FormControl w="400px" mr="200px">
                    <FormLabel>Upload Image</FormLabel>
                    <Input type="file" accept="image/*" onChange={handleFileUpload} variant="unstyled"/>
                </FormControl>
                <Button colorScheme="green" onClick={handleSubmit} w="400px" mt={8}>
                    Register
                </Button>
                {formData.image && (
                    <Box mt={2}>
                        <Image src={URL.createObjectURL(formData.image)} alt="Preview"/>
                    </Box>
                )}
            </Grid>
            <Flex mt={8} flexDirection="row" justifyContent="space-between">

                {/* Upload Image */}


            </Flex>

        </Flex>
    );
};

export default RegisterForm;
