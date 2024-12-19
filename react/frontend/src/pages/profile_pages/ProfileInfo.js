import React, { useState } from 'react';
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        <Flex  pt={16} bg="gray.800">
            <Box
                w="full"

                bg="gray.800"

                boxShadow="md"
                borderRadius="lg"
            >

                <form onSubmit={handleSubmit}>
                    <Flex flexDirection="row" justifyContent="space-between">
                    <VStack spacing={4}>
                        {/* First Name */}
                        <FormControl isRequired minW="400px">
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
                    </VStack>
                    <VStack spacing={4} px="150px">

                        {/* Email */}
                        <FormControl isRequired minW="400px">
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
                    </VStack>
                    </Flex>
                    <Box pt={16}></Box>
                        <Button
                            type="submit"
                            size="lg"
                            w="300px"
                        >
                            Save Changes
                        </Button>
                </form>
                <Box pt={16}></Box>

                    <form onSubmit={handleSubmit}>
                        <Flex flexDirection="column" justifyContent="left">
                        {/* Current Password */}
                        <FormControl pb={4} maxW="400px">
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
                        <FormControl maxW="400px">
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                            />
                        </FormControl>
                </Flex>
                        <Box pt={16}></Box>
                        {/* Submit Button */}
                        <Button
                            type="submit"

                            size="lg"
                            w="300px"
                        >
                            Change Password
                        </Button>

                </form>
            </Box>
        </Flex>
    );
};

export default EditProfilePage;
