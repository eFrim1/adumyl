import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import {loginUser, registerUser} from '../services/auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [viewLogin, setViewLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  const toggleLogin = (status) => {
    setViewLogin(status);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Password validation for sign-up
    if (!viewLogin && password !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = viewLogin
        ? { email, password } // Login payload
        : { first_name: firstName, last_name: lastName, email, password, password_confirm: confirmPassword }; // Sign-up payload

    try {
      if(viewLogin){
        await loginUser(payload);
      }else {
        await registerUser(payload);
      }
      toast({
        title: 'Success',
        description: viewLogin ? 'Login successful!' : 'Sign-up successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setSuccess(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const debugLogin = async () => {
    const payload = {
      email: 'test56@gmail.com',
      password: 'test2',
    };
    await loginUser(payload);
    setSuccess(true);
  };

  if (success) {
    return <Navigate to="/home" />;
  }

  return (
      <Container maxW="container.sm" p="5" mt="10">
        <Box  p={8} rounded="lg" shadow="lg">
          <Heading textAlign="center" mb={6}>
            Adumyl
          </Heading>

          {/* Tabs for Sign Up / Sign In */}
          <Flex justify="center" mb={4}>
            <Button
                variant={viewLogin ? 'outline' : 'solid'}
                mr={2}
                onClick={() => toggleLogin(false)}
            >
              Sign Up
            </Button>
            <Button
                variant={viewLogin ? 'solid' : 'outline'}
                onClick={() => toggleLogin(true)}
            >
              Sign In
            </Button>
          </Flex>


          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {!viewLogin && (
                  <>
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleChange}
                      />
                    </FormControl>
                  </>
              )}

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
              </FormControl>
              {!viewLogin && (
                  <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                  </FormControl>
              )}

              <Button type="submit" size="lg" w="full">
                {viewLogin ? 'Sign In' : "Let's Start"}
              </Button>
              <Button type="button" size="lg" variant="outline" w="full" onClick={debugLogin}>
                Debug Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
  );
};

export default Login;
