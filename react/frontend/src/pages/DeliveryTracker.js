import {
    Text,
    Flex,
} from "@chakra-ui/react";
import Navbar from "../components/NavBar";

const DeliveryTracker = () => {

    return (
        <Flex flexDirection="column" m="50px">
            <Navbar/>
            <Text fontSize="2xl" fontWeight="bold" m={8}>
                Delivery Tracker
            </Text>
        </Flex>
    );
};

export default DeliveryTracker;
