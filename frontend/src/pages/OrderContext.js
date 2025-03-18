import {createContext, useContext, useState} from "react";

const OrderContext = createContext({});
const CartContext = createContext({});
const RestaurantContext = createContext({});

export const AppProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [waitingTime, setWaitingTime] = useState(0);
    const [restaurant, setRestaurant] = useState([]);

    return (
        <OrderContext.Provider value={{order, setOrder, waitingTime, setWaitingTime}}>
            <RestaurantContext.Provider value={{restaurant, setRestaurant}}>
                <CartContext.Provider value={{cart, setCart}}>
                    {children}
                </CartContext.Provider>
            </RestaurantContext.Provider>
        </OrderContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)
export const useOrder = () => useContext(OrderContext)
export const useRestaurant = () => useContext(RestaurantContext)