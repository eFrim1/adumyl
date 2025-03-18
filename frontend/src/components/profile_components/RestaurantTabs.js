import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import OverviewTab from "./OverviewTab";
import MenuTab from "./MenuTab";
import OrdersTab from "./OrdersTab";

const RestaurantTabs = ({ restaurant, onUpdate }) => {
    return (
        <Tabs>
            <TabList>
                <Tab>Overview</Tab>
                <Tab>Menu Items</Tab>
                <Tab>Orders</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <OverviewTab restaurant={restaurant} onUpdate={onUpdate} />
                </TabPanel>
                <TabPanel>
                    <MenuTab restaurantId={restaurant.id} />
                </TabPanel>
                <TabPanel>
                    <OrdersTab />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default RestaurantTabs;
