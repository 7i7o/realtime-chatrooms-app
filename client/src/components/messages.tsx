import { Spacer, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface IMsg {
  username: string;
  message: string;
  __createdtime__: string;
  id: string;
}

const Messages = ({ socket, username, room }: any) => {
  const [messages, setMessages] = useState<IMsg[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data: IMsg) => {
      console.log(data);

      setMessages((msgs) => [
        ...msgs,
        {
          username: data.username,
          message: data.message,
          __createdtime__: data.__createdtime__,
          id: data.username,
        },
      ]);
    });
    socket.on("last_messages", (lastMessages: any) => {
      let parsedMessages = JSON.parse(lastMessages);
      console.log("LastMessages: ", parsedMessages);
      parsedMessages = parsedMessages.sort(
        (a: IMsg, b: IMsg) =>
          parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
      );
      setMessages((msgs) => [...parsedMessages, ...msgs]);
    });
    // Remove event listener on component unmount
    return () => {
      socket.off("receive_message");
      socket.off("last_messages");
    };
  }, [socket]);

  const timestampToText = (t: string) => {
    const date = new Date(parseInt(t));
    return date.toLocaleString();
  };

  return (
    <Stack direction="column" spacing={2} w={{ base: "sm", md: "md" }}>
      {messages.map((msg: IMsg, i) => (
        <Stack
          direction="column"
          bg="blackAlpha.100"
          rounded="lg"
          boxShadow="md"
          px={4}
          py={2}
          key={i}
        >
          <Stack direction="row">
            <Text>{msg.username}</Text>
            <Spacer />
            <Text textAlign="right">
              {timestampToText(msg.__createdtime__)}
            </Text>
          </Stack>
          <Text>{msg.message}</Text>
        </Stack>
      ))}
    </Stack>
  );
};

export default Messages;
