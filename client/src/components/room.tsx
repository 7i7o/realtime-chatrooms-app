import {
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorModeToggle from "./colorModeToggle";
import { IMsg } from "./messages";

const Room = ({ socket, username, room }: any) => {
  const [users, setUsers] = useState<IMsg[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data: any) => {
      console.log(data);
      setUsers(data);
    });
    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now().toString();
    socket.emit("leave_room", { username, room, __createdtime__ });
    navigate("/", { replace: true });
  };

  return (
    <Stack direction="column" w={60}>
      <Flex direction="row" w="100%">
        {/* <Spacer /> */}
        <ColorModeToggle />
      </Flex>
      <Heading
        as="h2"
        size="lg"
        bg="blackAlpha.200"
        rounded="lg"
        px={3}
        py={2}
        boxShadow="lg"
      >
        {room}
      </Heading>
      <Button onClick={leaveRoom} w="100%">
        Leave
      </Button>
      {users.length > 0 && (
        <Heading as="h5" size="md">
          Users
        </Heading>
      )}
      <List>
        {users.map((user, i) => (
          <ListItem
            key={i}
            fontWeight={username === user.username ? "bold" : "normal"}
          >
            {user.username}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default Room;
