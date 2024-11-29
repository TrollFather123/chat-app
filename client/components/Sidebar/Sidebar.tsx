import { getUsers } from "@/api/functions";
import { Box, List, ListItem, styled, Theme, Typography } from "@mui/material";
import { parseCookies } from "nookies";
import React from "react";
import { useQuery } from "react-query";

const SidebarWrapper = styled(Box)`
  width: 330px;
  background-color: aliceblue;
`;

interface Props {
  handleSetRoomIdCallback: (data: string) => void;
}
const Sidebar = ({ handleSetRoomIdCallback }: Props) => {
  const { data: users } = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
  });

  const cookies = parseCookies();
  const currentUser = cookies["user_id"];

  return (
    <SidebarWrapper>
      <List>
        {!!users?.data &&
          users?.data &&
          users?.data
            ?.filter((_user) => _user?._id !== currentUser)
            ?.map((user) => (
              <ListItem
                onClick={() => handleSetRoomIdCallback(user?._id)}
                key={user?._id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rebeccapurple",
                    color: (theme: Theme) => theme.palette.common.white,
                  },
                }}
              >
                <Typography variant="h6">{user?.name}</Typography>
              </ListItem>
            ))}
      </List>
    </SidebarWrapper>
  );
};

export default Sidebar;
