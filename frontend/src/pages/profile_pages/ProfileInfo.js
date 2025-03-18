import React, {useEffect, useState} from "react";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Grid, Center, Spinner, Text,
} from "@chakra-ui/react";
import {getUser, updatePassword, updateProfile} from "../../services/user";
import {getRestaurant} from "../../services/restaurant"; // Import the API function

const EditProfilePage = () => {
    const [userForm, setUserForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    });

    const [passwordForm, setPasswordForm] = useState({
        password: "",
        password_confirm: "",
    })
    const [loading, setLoading] = useState(true);

    const toast = useToast();

    useEffect(() => {
        // Fetch restaurant details on component mount
        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUserForm(data);
                console.log(data);
            } catch (error) {
                if (error.response?.status !== 404) {
                    toast({
                        title: "Error",
                        description: error.message || "An error occurred. Please try again.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchUser();
    }, [toast]);

    const handleChangeUserForm = (e) => {
        const {name, value} = e.target;
        setUserForm({...userForm, [name]: value});
    };

    const handleChangePasswordForm = (e) => {
        const {name, value} = e.target;
        setPasswordForm({...passwordForm, [name]: value});
    };


    const handleChangeProfile = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                first_name: userForm.first_name,
                last_name: userForm.last_name,
                email: userForm.email,
                phone_number: userForm.phone_number,
                password: userForm.newPassword,
            };

            await updateProfile(payload);

            toast({
                title: "Profile Updated",
                description: "Your profile information has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                password: passwordForm.password,
                password_confirm: passwordForm.password_confirm,
            };

            await updatePassword(payload);

            toast({
                title: "Password Updated",
                description: "Your password has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" />
                <Text m={4}>  Loading Profile Info...</Text>
            </Center>
        );
    }

    return (
        <Flex pt={16} bg="gray.800" flexDirection="column">
            <form onSubmit={handleChangeProfile}>
                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={6}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            value={userForm.first_name}
                            onChange={handleChangeUserForm}
                            placeholder="Enter your first name"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            type="text"
                            name="lastName"
                            value={userForm.last_name}
                            onChange={handleChangeUserForm}
                            placeholder="Enter your last name"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={userForm.email}
                            onChange={handleChangeUserForm}
                            placeholder="Enter your email address"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            type="tel"
                            name="phone"
                            value={userForm.phone_number}
                            onChange={handleChangeUserForm}
                            placeholder="Enter your phone number"
                        />
                    </FormControl>
                </Grid>

                <Box pt={14}></Box>

                <Button type="submit" w="300px" colorScheme="green">
                    Save Changes
                </Button>
            </form>
            <Box pt={16}></Box>
            <form onSubmit={handleChangePassword}>
                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={passwordForm.password}
                            onChange={handleChangePasswordForm}
                            placeholder="Confirm Password"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            name="password_confirm"
                            value={passwordForm.password_confirm}
                            onChange={handleChangePasswordForm}
                            placeholder="Password"
                        />
                    </FormControl>
                </Grid>
                <Box pt={14}></Box>
                <Button type="submit" w="300px" colorScheme="green">
                    Update Password
                </Button>
            </form>

        </Flex>
    );
};

export default EditProfilePage;
