import React, { useState } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import SideNavigation from '../components/SideNav';
import Navbar from "../components/NavBar";
import ProfileInfo from "./profile_pages/ProfileInfo"; // Import the SideNavigation component
import OrderHistory from "./profile_pages/OrderHistory";
import orders, {orderHistory} from "../utils/demos";
import MyRestaurant from "./profile_pages/MyRestaurant";

const Profile = () => {
    // State to track the currently selected navigation item
    const [selectedOption, setSelectedOption] = useState('Edit Profile');

    // Handler function to update selected navigation
    const handleNavigation = (option) => {
        setSelectedOption(option);
    };

    // Content for each section
    const renderContent = () => {
        switch (selectedOption) {
            case 'Edit Profile':
                return <ProfileInfo />;
            case 'Order History':
                return <OrderHistory orders={orderHistory()}/>;
            case 'My Restaurants':
                return <MyRestaurant />;
            case 'Delivery':
                return <Text>Track or manage your delivery details here.</Text>;
            default:
                return <Text>Select an option to see more details.</Text>;
        }
    };

    return (
        <Flex direction="column" m="50px">
            <Navbar/>
            <Flex justify="space-between" mt="80px">
                {/* Side Navigation */}
                <SideNavigation onSelect={handleNavigation} />

                {/* Main Content */}
                <Box flex="1" px={24} >
                    <Heading size="lg" mb={4} >
                        {selectedOption}
                    </Heading>
                    <Box

                        boxShadow="sm"
                        borderRadius="md"
                    >
                        {renderContent()}
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Profile;
