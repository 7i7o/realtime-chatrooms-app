import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Heading,
  Hide,
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
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

  const getRoomData = () => (
    <Stack direction="column">
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
      <Button
        colorScheme="brand"
        onClick={leaveRoom}
        w="100%"
        variant="outline"
      >
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

  return (
    <Stack direction="column" w={{ base: 12, md: 60 }} h="94vh">
      <Show above="md">{getRoomData()}</Show>
      <Hide above="md">
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button colorScheme="brand">
              <HamburgerIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>{getRoomData()}</PopoverBody>
          </PopoverContent>
        </Popover>
      </Hide>
      <Spacer />
      <Flex>
        <ColorModeToggle />
      </Flex>
    </Stack>
  );
};

export default Room;
