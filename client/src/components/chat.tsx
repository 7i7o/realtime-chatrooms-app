import { Box, Center, Container, DrawerBody, Flex, Stack } from "@chakra-ui/react";
import Messages from "./messages";
import Room from "./room";
import SendMessage from "./sendMessage";

const Chat = ({ username, room, socket }: any) => {
  return (
    <Center>
      <Stack direction="row" spacing={2} px={10} py={5}>
        <Room socket={socket} username={username} room={room} />
        <Stack direction="column">
          <Flex w="100%" overflowY='auto'>
            <Messages socket={socket} username={username} room={room} />
          </Flex>
          <SendMessage socket={socket} username={username} room={room} />
        </Stack>
      </Stack>
    </Center>
  );
};

export default Chat;
