import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Card, CardContent, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../../helper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  // Redux
  const userGlobal = useSelector((state) => state.userGlobal);
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [user, setUser] = useState({
    dataUser: {},
  });

  const loginBtnHandler = () => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: login.email, password: login.password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        // console.log(data.token);
        let dataResult = data.user;
        setUser({ ...user, dataUser: dataResult });
        dispatch({
          type: 'USER_LOGIN',
          payload: dataResult,
        });
      });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // Logged In
  if (userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card variant="elevation" elevation={0} sx={{ borderRadius: 6 }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="Login Logo"
              sx={{ m: 4, bgcolor: '#3e9c99', width: 75, height: 75 }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              MediKuy Login
            </Typography>
            <Box component="form" noValidate sx={{ width: 450, px: 5, py: 2 }}>
              <Box sx={{ height: 48, my: 1 }}></Box>
              <Typography>Email or Username</Typography>
              <TextField
                type="text"
                variant="outlined"
                margin="dense"
                fullWidth
                id="email"
                name="email"
                size="small"
                onChange={inputHandler}
              />
              <Typography>Password</Typography>
              <TextField
                type="password"
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="password"
                size="small"
                onChange={inputHandler}
              />
              {/* <ButtonPrimary fullWidth>Sign In</ButtonPrimary> */}
              <Button
                className="mt-2"
                variant="contained"
                color="primary"
                onClick={loginBtnHandler}
              >
                Sign in
              </Button>

              <Box alignItems="center" mt={4}>
                <Link to="/forgot-password" className=" text-decoration-none">
                  <Button
                    variant="outlined"
                    className="text-decoration-none"
                    color="error"
                  >
                    Forgot Password?
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button className="m-2" variant="outlined">
                    Sign Up
                  </Button>
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
