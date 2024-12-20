import React, { useState } from "react";
import { Box, Heading, Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import RegisterRestaurantForm from "../../components/profile_components/RegisterRestaurantForm";
import RestaurantTabs from "../../components/profile_components/RestaurantTabs";

const MyRestaurant = () => {
    const [restaurant, setRestaurant] = useState(null);

    const handleRegisterRestaurant = (restaurantData) => {
        setRestaurant(restaurantData);
    };

    return (
        <Box p={6}>
            {!restaurant ? (
                <RegisterRestaurantForm onRegister={handleRegisterRestaurant} />
            ) : (
                <RestaurantTabs restaurant={restaurant} onUpdate={setRestaurant} />
            )}
        </Box>
    );
};

export default MyRestaurant;
