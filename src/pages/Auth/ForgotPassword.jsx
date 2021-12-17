import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { API } from '../../helper';

function ForgotPassword() {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailText, setEmailText] = useState({
    emailInput: '',
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmailText({ [name]: value });
  };

  const sendEmailBtnHandler = async () => {
    setLoading(true);
    await axios
      .post(`${API}/password/forgot`, {
        email: emailText.emailInput,
      })
      .then((mess) => {
        <p>{mess.message}</p>;
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const userGlobal = useSelector((state) => state.userGlobal);

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
              Account Recovery
            </Typography>
            <Typography component="h1" variant="h5" fontSize="16px" mt={1}>
              Recover your password account
            </Typography>
            <Box p={5} component="form" noValidate sx={{ mt: 1, width: 450 }}>
              <Alert
                severity="error"
                sx={{ marginBottom: '24px' }}
                style={{ display: showAlert ? '' : 'none' }}
              >
                {userGlobal?.message}
              </Alert>
              <TextField
                type="text"
                variant="standard"
                margin="dense"
                fullWidth
                id="email"
                name="emailInput"
                size="small"
                label="Email"
                onChange={inputHandler}
              />

              <Box className="d-flex justify-content-center" mt={4}>
                {/* <Link to="/login" className={classes.link}>
                  <Button fullWidth>Go Back</Button>
                </Link> */}
                <Button onClick={sendEmailBtnHandler} variant="contained">
                  Send
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
