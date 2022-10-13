import {
  Button,
  Container,
  Heading,
  List,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <Stack direction="column">
      <Heading as="h2" size="lg">
        {room}
      </Heading>
      <Container>
        {users.length > 0 && (
          <Heading as="h5" size="sm">
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
        <Button onClick={leaveRoom} w="100%">
          Leave
        </Button>
      </Container>
    </Stack>
  );
};

export default Room;
