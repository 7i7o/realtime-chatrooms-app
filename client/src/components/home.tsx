import { Button, Heading, Input, Select, VStack } from "@chakra-ui/react";

const Home = ({ username, setUsername, room, setRoom, socket }: any) => {
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
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
      <Button variant="outline" w="100%">
        Join Room
      </Button>
    </VStack>
  );
};

export default Home;