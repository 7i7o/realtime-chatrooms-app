// import "./App.css";
import ColorModeToggle from "./components/colorModeToggle";
import { Box, Center, HStack, Spacer, Text } from "@chakra-ui/react";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhos[:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  return (
    <Router>
      <Box p="10" w="100%" h="100vh">
        <HStack w="100%">
          <Text>
            Room: {room} - Username: {username}
          </Text>
          <Spacer /> <ColorModeToggle />
        </HStack>
        <Routes>
          <Route
            path="/"
            element={
              <Center mt="10">
                <Home
                  username={username}
                  setUsername={setUsername}
                  room={room}
                  setRoom={setRoom}
                  socket={socket}
                />
              </Center>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
