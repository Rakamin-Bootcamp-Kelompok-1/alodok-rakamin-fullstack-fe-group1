import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoute from './routes/AppRoute';
import axios from 'axios';
import { API } from './helper';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenParse = JSON.parse(token);

    const getSession = () => {
      axios
        .get(`${API}/token_authenticate`, {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        })
        .then((result) => {
          delete result.data.password;
          localStorage.setItem('userLoggedIn', JSON.stringify(result.data));
          dispatch({
            type: 'USER_LOGIN',
            payload: result.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // fetch(`${API}/token_authenticate`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((response) => {
    //     let dataResult = response.data;
    //     console.log(dataResult);
    //     dispatch({
    //       type: 'USER_LOGIN',
    //       payload: dataResult,
    //     });

    getSession();
  }, []);

  return (
    <div>
      <AppRoute />
    </div>
  );
};

export default App;
// hehe
