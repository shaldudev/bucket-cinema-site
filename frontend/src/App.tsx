import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import API from "./api";
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import { CssVarsThemeOptions, Experimental_CssVarsProvider, Theme, ThemeOptions, ThemeProvider, createTheme, experimental_extendTheme } from '@mui/material/styles';
import { User } from './@types/user';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserContext from './userContext';
import Leaderboard from './pages/Leaderboard';
import Navigation from './components/Navigation';
import Logout from './pages/Logout';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#d581ca'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
}

const darkTheme = createTheme(themeOptions);

const options: CssVarsThemeOptions = {
  cssVarPrefix: 'app',
  colorSchemes: {
    dark: {
      ... themeOptions,
    }
  }
}

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [user, setUser] = React.useState<null | User>(null);

  React.useEffect(() => {

    async function checkAuth() {

      if (user != null) return;

      //get user from cookie
      const sessionId = Cookies.get('sessionid');
      const userId = Cookies.get('userid');

      if (!userId || !sessionId) return;

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

    }

    checkAuth();

  }, []);



  const setCredits = (credits: number) => {
    setUser({ ...user!, credits });
  };

  return (
    <Router>
      <ThemeProvider  theme={darkTheme}>
        <CssBaseline />
        <Experimental_CssVarsProvider defaultColorScheme={'dark'} defaultMode='dark' theme={experimental_extendTheme(options)}>


          <UserContext.Provider value={{ user, setCredits }}>
            <Navigation />
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/u/:id" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/logout" element={<Logout />} />

            </Routes>

          </UserContext.Provider>
        </Experimental_CssVarsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
