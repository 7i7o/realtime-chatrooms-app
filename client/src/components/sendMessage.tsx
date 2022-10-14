import { Button, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const SendMessage = ({ socket, username, room }: any) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now().toString();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <Stack direction="row">
      <Input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button
        colorScheme="brand"
        onClick={sendMessage}
        rightIcon={<AiOutlineSend />}
      >
        Send
      </Button>
    </Stack>
  );
};

export default SendMessage;
