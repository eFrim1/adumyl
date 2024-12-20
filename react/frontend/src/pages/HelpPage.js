import React, { useState } from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Flex,
    Divider,
    Heading,
} from "@chakra-ui/react";
import Navbar from "../components/NavBar";

const HelpPage = () => {

    return (
        <Flex flexDirection="column" m="50px">
            <Navbar />
            <VStack m={8} spacing={8} align="stretch">
                {/* Page Header */}
                <Heading as="h1" size="xl" >
                    Help & Support
                </Heading>

                {/* FAQs Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Frequently Asked Questions
                    </Heading>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontWeight="bold">Q: How do I place an order?</Text>
                            <Text>A: Browse the menu, add items to your cart, and proceed to checkout.</Text>
                        </Box>
                        <Divider />
                        <Box>
                            <Text fontWeight="bold">Q: How can I track my delivery?</Text>
                            <Text>A: Use the Delivery Tracker feature to see the status of your order in real time.</Text>
                        </Box>
                        <Divider />
                        <Box>
                            <Text fontWeight="bold">Q: What payment methods are supported?</Text>
                            <Text>A: We accept credit cards, debit cards, and cash on delivery.</Text>
                        </Box>
                    </VStack>
                </Box>

                {/* Contact Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Contact Us
                    </Heading>
                    <Text>If you have additional questions, feel free to reach out to us:</Text>
                    <VStack align="stretch" mt={4} spacing={2}>
                        <HStack>
                            <Text fontWeight="bold">Phone:</Text>
                            <Text>+1 234 567 890</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Email:</Text>
                            <Text>support@adumyl.com</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Address:</Text>
                            <Text>25th Baritiu Street, Cluj, Romania</Text>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
        </Flex>
    );
};

export default HelpPage;
