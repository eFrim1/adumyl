import React from 'react';
import { Box, VStack, Text, Icon, Flex, Button } from '@chakra-ui/react';
import { FaUserEdit, FaHistory, FaUtensils, FaTruck } from 'react-icons/fa';

const SideNavigation = ({ onSelect }) => {
    // Navigation items
    const navItems = [
        { id: 1, label: 'Edit Profile', icon: FaUserEdit },
        { id: 2, label: 'Order History', icon: FaHistory },
        { id: 3, label: 'My Restaurants', icon: FaUtensils },
        { id: 4, label: 'Delivery', icon: FaTruck },
    ];

    return (
        <Box
            p={4}
            w="350px"
            borderRadius="lg"
            boxShadow="lg"
            bg="gray.900"
        >
            {/* Header */}
            <Flex align="center" justify="center" mb={8}>
                <Text fontSize="xl" fontWeight="bold">
                    Profile
                </Text>
            </Flex>

            {/* Navigation Items */}
            <VStack align="stretch" spacing={6} h="700px">
                {navItems.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        colorScheme="white"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={item.icon} boxSize={5} />}
                        onClick={() => onSelect(item.label)} // Pass clicked label to parent
                        size="lg"
                    >
                        {item.label}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};

export default SideNavigation;
