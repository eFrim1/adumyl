import {Flex, Heading, Box, Text, Button, Spacer, HStack, IconButton} from "@chakra-ui/react"
import {IconHeart, IconShoppingCart, IconUser} from "@tabler/icons-react";

export default function Navbar() {
    return (
        <Flex as="nav" p="20px" px="30px" alignItems="center" bg="gray.900" borderRadius="10px">
            <Heading as="h2">Adumyl</Heading>
            <Spacer />

            <Flex>
                <HStack>
                    <Button variant="ghost" colorScheme="white">
                        Restaurants
                    </Button>
                    <Button variant="ghost" colorScheme="white">
                        Delivery Tracker
                    </Button>
                    <Button variant="ghost" colorScheme="white">
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
                        icon={<IconUser/>}>
                    </IconButton>
                </HStack>
            </Flex>
        </Flex>
    )
}