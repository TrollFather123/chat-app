import ChatBox from "@/components/ChatBox/ChatBox";
import Sidebar from "@/components/Sidebar/Sidebar";
import Wrapper from "@/components/Wrapper/Wrapper";
import { Stack } from "@mui/material";
import React, { useCallback, useState } from "react";

const Index = () => {
  const [roomId, setRoomId] = useState("");



  const handleSetRoomIdCallback = useCallback((data: string) => {
    setRoomId(data);
  }, []);

  return (
    <Wrapper>
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          height: "calc(100vh - 64px)",
        }}
      >
        <Sidebar handleSetRoomIdCallback={handleSetRoomIdCallback} />
        <ChatBox roomId={roomId} />
      </Stack>
    </Wrapper>
  );
};

export default Index;
