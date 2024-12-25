import React, { useState } from "react";
import {
    VStack,
    Grid,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useToast,
} from "@chakra-ui/react";
import { addMenuItem, deleteMenuItem, updateMenuItem } from "../../services/menuItem";

const MenuTab = ({ restaurantId }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: "",
        ingredients: "",
        price: "",
        weight: "",
        prep_time: "",
        restaurant: restaurantId,
    });
    const toast = useToast();

    const fetchMenuItems = async () => {
        // Fetch menu items logic (optional)
    };

    const handleAddItem = async () => {
        try {
            const createdItem = await addMenuItem(newItem);
            setMenuItems((prev) => [...prev, createdItem]);
            setNewItem({
                name: "",
                ingredients: "",
                price: "",
                weight: "",
                prep_time: "",
                restaurant: restaurantId,
            });
            toast({
                title: "Success",
                description: "Menu item added successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to add menu item.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteMenuItem(id);
            setMenuItems((prev) => prev.filter((item) => item.id !== id));
            toast({
                title: "Success",
                description: "Menu item deleted successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to delete menu item.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        value={newItem.name}
                        onChange={(e) =>
                            setNewItem((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Ingredients</FormLabel>
                    <Input
                        value={newItem.ingredients}
                        onChange={(e) =>
                            setNewItem((prev) => ({ ...prev, ingredients: e.target.value }))
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Price</FormLabel>
                    <InputGroup>
                        <Input
                            value={newItem.price}
                            onChange={(e) =>
                                setNewItem((prev) => ({ ...prev, price: e.target.value }))
                            }
                        />
                        <InputLeftElement>$</InputLeftElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Weight</FormLabel>
                    <InputGroup>
                        <Input
                            value={newItem.weight}
                            onChange={(e) =>
                                setNewItem((prev) => ({ ...prev, weight: e.target.value }))
                            }
                        />
                        <InputRightElement>g</InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Preparation time</FormLabel>
                    <InputGroup>
                        <Input
                            value={newItem.prepTime}
                            onChange={(e) =>
                                setNewItem((prev) => ({ ...prev, prep_time: e.target.value }))
                            }
                        />
                        <InputRightElement>min</InputRightElement>
                    </InputGroup>
                </FormControl>
            </Grid>
            <Button colorScheme="green" onClick={handleAddItem} w="200px">
                Add Item
            </Button>

            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Ingredients</Th>
                        <Th>Price</Th>
                        <Th>Weight</Th>
                        <Th>Preparation time</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {menuItems.map((item) => (
                        <Tr key={item.id}>
                            <Td>{item.name}</Td>
                            <Td>{item.ingredients}</Td>
                            <Td>${item.price}</Td>
                            <Td>{item.weight} g</Td>
                            <Td>{item.prep_time} min</Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    X
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    );
};

export default MenuTab;