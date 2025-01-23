/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';

export default function ButtonAppBar() {
  const cookies = parseCookies();
  const currentUser = cookies["user_id"];

  const handleLogout = () =>{
    destroyCookie(null,"user_id",{
      path:"/"
    })
    destroyCookie(null,"token",{
      path:"/"
    })
    router.push("/login")
  }

  console.log(currentUser,"currentUser")
  const router = useRouter()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={()=> {
            currentUser ? handleLogout() : router.push("/login")
          }}>{currentUser? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
