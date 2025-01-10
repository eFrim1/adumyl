import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {ChakraProvider, extendTheme, withDefaultColorScheme} from '@chakra-ui/react'


import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile"
import DeliveryTracker from "./pages/DeliveryTracker";
import HelpPage from "./pages/HelpPage";
import MenuPage from "./pages/MenuPage";

const theme = extendTheme(
    {
        colors: {
            green: {
                50: '#e6f5e9', // lightest shade
                100: '#c4e2c8',
                200: '#a1d1a6',
                300: '#7ec184',
                400: '#5cb062',
                500: '#3b9f40', // Default shade
                600: '#2d7d32', // Darker shade
                700: '#205a25',
                800: '#123716',
                900: '#05150a', // Darkest shade
            },
        },
        config: {
            initialColorMode: 'dark', // Default to dark mode
            useSystemColorMode: false, // Do not follow system color mode
        },
    },
    withDefaultColorScheme({ colorScheme: 'green' })
);

function App() {
  return (
      <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/restaurant/" element={<MenuPage />}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/delivery_tracker" element={<DeliveryTracker />}/>
              <Route path="/help" element={<HelpPage />}/>
          </Routes>
      </ChakraProvider>
  );
}

export default App;