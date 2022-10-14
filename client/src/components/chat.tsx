import {
  Box,
  Center,
  Container,
  DrawerBody,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Messages from "./messages";
import Room from "./room";
import SendMessage from "./sendMessage";

const Chat = ({ username, room, socket }: any) => {
  return (
    <Center>
      <Stack direction="row" spacing={2} px={10} py={0} h="96vh">
        <Room socket={socket} username={username} room={room} />
        <Stack direction="column" h="96vh">
          <Flex w="100%" overflowY="scroll">
            <Messages socket={socket} username={username} room={room} />
          </Flex>
          <Spacer />
          <SendMessage socket={socket} username={username} room={room} />
        </Stack>
      </Stack>
    </Center>
  );
};

export default Chat;
