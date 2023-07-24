import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import API from "./api";
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { User } from './@types/user';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserContext from './userContext';
import Leaderboard from './pages/Leaderboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1b1b1b'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const hrefLink = API_URL + '/user/auth/steam';

  const [user, setUser] = React.useState<null | User>(null);

  React.useEffect(() => {

    async function checkAuth() {

      if (user != null) return;

      //get user from cookie
      const sessionId = Cookies.get('sessionid');
      const userId = Cookies.get('userid');

      if (userId == null || sessionId == null || userId == '' || sessionId == '') return;

      try {
        const response = await API.get(`/user/${userId}`);
        if (response.status === 200) {
          if (response.data.authenticated === true) {
            setUser(response.data.user);
            return;
          }
        }
      } catch (error) {

        Cookies.remove('sessionid');
        Cookies.remove('steamid');
      }

      Cookies.remove('sessionid');
      Cookies.remove('steamid');
    }

    checkAuth();

  }, []);

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UserContext.Provider value={{ user }}>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/u/:id" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard/>} />

          </Routes>

        </UserContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
