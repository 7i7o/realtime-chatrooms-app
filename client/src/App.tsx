// import "./App.css";
import ColorModeToggle from "./components/colorModeToggle";
import { Box, Center, HStack, Spacer, Text } from "@chakra-ui/react";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/chat";

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const socket = io("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  return (
    <Router>
      <Box py="2vh" w="100%" h="100vh">
        {/* <HStack w="100%">
          <Text>
            Room: {room} - Username: {username}
          </Text>
          <Spacer /> <ColorModeToggle />
        </HStack> */}
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
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
