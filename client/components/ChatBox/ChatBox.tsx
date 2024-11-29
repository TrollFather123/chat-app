/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import { parseCookies } from "nookies";

const ChatBoxWrapper = styled(Box)`
  width: calc(100% - 330px);
  padding: 20px 30px;
`;

type IMessageContent = {
  roomId: string;
  senderId: string;
  message: string;
};

interface Props {
  roomId: string;
}
const ChatBox = ({ roomId }: Props) => {
  const socket = io(process.env.NEXT_APP_BACKEND_URL);
  const cookies = parseCookies();
  const currentUser = cookies["user_id"];

  const [inputValue, setInputValue] = useState("");
  const [joinedRoomId, setJoinedRoomId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server:", socket.id);
    });

    socket.on("sendMessages", (data: IMessageContent[]) => {
      console.log("Incoming messages:", data);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
      console.log("Disconnected from the server!");
    };
  }, []);

  useEffect(() => {
    if (roomId && currentUser) {
      setJoinedRoomId(currentUser.slice(-5) + "room" + roomId.slice(-5));
    }
  }, [roomId, currentUser]);

  useEffect(() => {
    socket.emit("joinRoom", joinedRoomId);
  }, [joinedRoomId]);

  // Handle sending messages
  const handleMessages = (e: any) => {
    e.preventDefault();
    const payload = {
      message: inputValue,
      roomId: joinedRoomId,
      senderId: currentUser,
    };
    socket.emit("recivedMessages", payload);
    setInputValue("");
  };

  return (
    <ChatBoxWrapper>
      {!roomId ? (
        <Typography variant="h4">No chats to show</Typography>
      ) : (
        <Box
          sx={{
            position: "relative",
            minHeight: "100%",
          }}
        >
          <Box
            sx={{
              height: "calc(100vh - 170px)",
            }}
          >
            <Typography variant="h5">{roomId}</Typography>
          </Box>

          <TextField
            placeholder="Enter Text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            value={inputValue}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleMessages} disableRipple>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
            }}
          />
        </Box>
      )}
    </ChatBoxWrapper>
  );
};

export default ChatBox;
