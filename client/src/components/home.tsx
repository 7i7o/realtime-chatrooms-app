import { Button, Heading, Input, Select, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }: any) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chat", { replace: true });
  };

  return (
    <VStack
      spacing="3"
      p="4"
      background="blackAlpha.300"
      borderRadius="lg"
      boxShadow="dark-lg"
    >
      <Heading as="h1">Chat Rooms</Heading>
      <Input
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <Select onChange={(e) => setRoom(e.target.value)}>
        <option value="">--- Select a Room ---</option>
        <option value="javascript">JavaScript</option>
        <option value="node">Node</option>
        <option value="express">Express</option>
        <option value="react">React</option>
      </Select>
      <Button colorScheme="brand" variant="outline" w="100%" onClick={joinRoom}>
        Join Room
      </Button>
    </VStack>
  );
};

export default Home;
