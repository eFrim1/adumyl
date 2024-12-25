import {useState} from "react";
import {
    Flex,
    Grid,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Image,
} from "@chakra-ui/react";
import SimpleFileUpload  from 'react-simple-file-upload'

const RegisterForm = ({ onRegister }) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [formData, setFormData] = useState({
        name: "Ceva Bun",
        address: "Strada Avram Iancu nr 25",
        phone_number: "0744556677",
        operating_hours: "8-16",
        days: "Mon,Tue,Wed",
        image_url: "",
    });

    const handleToggleDay = (day) => {
        const daysArray = formData.days.split(","); // Split string into array
        if (daysArray.includes(day)) {
            // Remove the day if already selected
            setFormData({
                ...formData,
                days: daysArray.filter((d) => d !== day).join(","),
            });
        } else {
            // Add the day if not already selected
            setFormData({
                ...formData,
                days: [...daysArray, day].join(","),
            });
        }
    };

    const handleFileUpload = (url) => {
        setFormData((prev) => ({ ...prev, image_url: url }));
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </FormControl>

                {/* Address */}
                <FormControl w="400px">
                    <FormLabel>Address</FormLabel>
                    <Input
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                        }
                    />
                </FormControl>

                {/* Contact Number */}
                <FormControl w="400px">
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                        value={formData.phone_number}
                        onChange={(e) =>
                            setFormData({ ...formData, phone_number: e.target.value })
                        }
                    />
                </FormControl>

                {/* Operating Hours */}
                <FormControl w="400px">
                    <FormLabel>Operating Hours</FormLabel>
                    <Input
                        value={formData.operating_hours}
                        onChange={(e) =>
                            setFormData({ ...formData, operating_hours: e.target.value })
                        }
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
                                colorScheme={
                                    formData.days.includes(day) ? "green" : "gray"
                                } // Highlight selected days
                                variant={formData.days.includes(day) ? "solid" : "ghost"}
                            >
                                {day.charAt(0).toUpperCase()}
                            </Button>
                        ))}
                    </Flex>
                </FormControl>

                {/* Upload Image */}
                <FormControl w="400px">
                    <FormLabel>Upload Image</FormLabel>
                    <SimpleFileUpload
                        apiKey="4618361b73da62e072a28b73ea22db4a"
                        onSuccess={handleFileUpload}
                    />
                </FormControl>

                <Button
                    colorScheme="green"
                    onClick={handleSubmit}
                    w="400px"
                    mt={8}
                >
                    Register
                </Button>

                {formData.image_url && (
                    <Box mt={2}>
                        <Image src={formData.image_url} alt="Preview" />
                    </Box>
                )}
            </Grid>
        </Flex>
    );
};
export default RegisterForm;
