import {Flex, Heading, Box, Text, Button, Spacer, HStack, IconButton} from "@chakra-ui/react"
import {IconHeart, IconShoppingCart, IconUser} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <Flex as="nav" p="20px" px="30px" alignItems="center" bg="gray.900" borderRadius="10px">
            <Heading as="h2">Adumyl</Heading>
            <Spacer />

            <Flex>
                <HStack>
                    <Button variant="ghost" color="white" onClick={() => handleNavigation("/home")}>
                        Restaurants
                    </Button>
                    <Button variant="ghost" color="white" onClick={() => handleNavigation("/delivery_tracker")}>
                        Delivery Tracker
                    </Button>
                    <Button variant="ghost" color="white" onClick={() => handleNavigation("/help")}>
                        Help
                    </Button>
                </HStack>
            </Flex>

            <Spacer/>

            <Flex>
                <HStack spacing="20px">
                    <IconButton
                        variant='ghost'
                        colorScheme='red'
                        aria-label="Favourites"
                        icon={<IconHeart/>}>
                    </IconButton>
                    <IconButton
                        variant='ghost'
                        colorScheme='green'
                        aria-label="Cart"
                        icon={<IconShoppingCart/>}>
                    </IconButton>
                    <IconButton
                        variant='ghost'
                        colorScheme='white'
                        aria-label="User"
                        icon={<IconUser/>}
                        onClick={() => handleNavigation("/profile")}
                    >
                    </IconButton>
                </HStack>
            </Flex>
        </Flex>
    )
}