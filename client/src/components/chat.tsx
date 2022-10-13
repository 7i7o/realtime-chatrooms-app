import { Container, Stack } from "@chakra-ui/react";
import Messages from "./messages";
import Room from "./room";
import SendMessage from "./sendMessage";

const Chat = ({ username, room, socket }: any) => {
  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <Room socket={socket} username={username} room={room} />
        <Stack direction="column">
          <Messages socket={socket} username={username} room={room} />
          <SendMessage socket={socket} username={username} room={room} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Chat;
