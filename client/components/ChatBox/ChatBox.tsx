/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  styled,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { getRoomChats } from "@/api/functions";
import moment from "moment";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

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

  const { data: allChats, refetch } = useQuery({
    queryKey: ["getAllChats", joinedRoomId],
    queryFn: () => getRoomChats(joinedRoomId),
  });

  // const str = "674ac9e834e3bc9435781eea_674ace0c34e3bc9435781f35"

  console.log(allChats?.data, roomId, "allChats");

  const generateRoomId = (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join("_");
  };

  useEffect(() => {
    if (roomId && currentUser) {
      setJoinedRoomId(generateRoomId(roomId, currentUser));
    }
  }, [roomId, currentUser]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server:", socket.id);
    });
    if (joinedRoomId) {
      socket.emit("joinRoom", joinedRoomId);
    }
    // Listen for messages
    socket.on("sendMessages", () => {
      refetch();
    });

    socket.on("readMessages", () => {
      refetch();
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
      console.log("Disconnected from the server!");
    };
  }, [joinedRoomId]);

  useEffect(() => {
    if (allChats?.data && allChats?.data.length) {
      allChats?.data.forEach((msg) => {
        if (msg?.senderId === roomId) {
          console.log("yes");
          socket.emit("markAsRead", msg?._id, joinedRoomId);
        }
      });
    }
  }, [allChats?.data?.length]);

  // Handle sending messages
  const handleMessages = (e: any) => {
    e.preventDefault();
    const payload: IMessageContent = {
      message: inputValue,
      roomId: joinedRoomId,
      senderId: currentUser,
    };
    socket.emit("recivedMessages", payload);
    setInputValue("");
  };

  return (
    <ChatBoxWrapper>
      {!joinedRoomId ? (
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
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* <Typography variant="h5">{joinedRoomId}</Typography> */}
            <List disablePadding>
              {!!allChats?.data && allChats?.data?.length ? (
                allChats?.data?.map((msg) => (
                  <ListItem
                    key={msg?._id}
                    sx={{
                      width: "100%",
                      justifyContent:
                        msg?.senderId === currentUser
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <Paper
                      sx={{
                        padding: "10px",
                        boxShadow:
                          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        textAlign:
                          msg?.senderId === currentUser ? "right" : "left",
                        borderRadius:
                          msg?.senderId === currentUser
                            ? "10px 0 10px 10px"
                            : "0 10px 10px 10px",
                        backgroundColor:
                          msg?.senderId === currentUser
                            ? (theme: Theme) => theme.palette.primary.light
                            : (theme: Theme) => theme.palette.common.white,
                      }}
                    >
                      <Typography variant="h6">{msg?.message}</Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                        }}
                      >
                        {moment(msg?.createdAt).format("MM/DD/YYYY ")}
                      </Typography>
                      {msg?.senderId === currentUser && (
                        <>
                          {msg?.read ? (
                            <i>
                              {
                                <DoneAllIcon
                                  sx={{
                                    width: "12px",
                                    height: "12px",
                                  }}
                                />
                              }
                            </i>
                          ) : (
                            <i>
                              {
                                <DoneIcon
                                  sx={{
                                    width: "12px",
                                    height: "12px",
                                  }}
                                />
                              }
                            </i>
                          )}
                        </>
                      )}
                    </Paper>
                  </ListItem>
                ))
              ) : (
                <Typography variant="h5"> No chats to show</Typography>
              )}
            </List>
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
