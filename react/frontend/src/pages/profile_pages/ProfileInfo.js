import React, {useState} from 'react';
import {
    Box,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    useToast, HStack,
    Grid,
} from '@chakra-ui/react';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
    });

    const toast = useToast();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock save function
        toast({
            title: 'Profile Updated',
            description: 'Your profile information has been successfully updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Flex pt={16} bg="gray.800" flexDirection="column">
            {/* Form for personal information */}
            <form onSubmit={handleSubmit}>
                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={6}>
                    {/* First Name */}
                    <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                        />
                    </FormControl>

                    {/* Last Name */}
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                        />
                    </FormControl>

                    {/* Email */}
                    <FormControl isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                        />
                    </FormControl>

                    {/* Phone Number */}
                    <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </FormControl>
                </Grid>
                <Box pt={16}></Box>

                <Button
                    type="submit"
                    w="300px"
                    colorScheme="green"
                >
                    Save Changes
                </Button>

            </form>

            <Box pt={16}></Box>

            {/* Form for password change */}
            <form onSubmit={handleSubmit}>
                <Grid templateColumns="1fr" gap={6}>
                    {/* Current Password */}
                    <FormControl w="625px">
                        <FormLabel>Current Password</FormLabel>
                        <Input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter your current password"
                        />
                    </FormControl>

                    {/* New Password */}
                    <FormControl w="625px">
                        <FormLabel>New Password</FormLabel>
                        <Input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                        />
                    </FormControl>
                </Grid>
                <Box pt={16}></Box>

                    <Button
                        type="submit"
                        w="300px"
                        colorScheme="green"
                    >
                        Change Password
                    </Button>
            </form>
        </Flex>

    );
};

export default EditProfilePage;
