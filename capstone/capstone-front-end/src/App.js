import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SelectDorm from './pages/SelectDorm';
import SelectFloor from './pages/SelectFloor';
import SelectTeam from './pages/SelectTeam';
import SelectRoom6 from './pages/SelectRoom6';
import SelectRoom5 from './pages/SelectRoom5';
import SelectRoom4 from './pages/SelectRoom4';
import SelectRoom3 from './pages/SelectRoom3';
import SelectRoom2 from './pages/SelectRoom2';
import SelectRoom1 from './pages/SelectRoom1';
import SelectRooms from './pages/SelectRooms';
import ExcelUpload from './pages/ExcelUpload';
import Layout from './components/Layout';
import MinimalLayout from './components/MinimalLayout'
import { createTheme, ThemeProvider } from '@material-ui/core';
import RouteWithLayout  from './components/RouteWithLayout';
import {inject, observer} from 'mobx-react'


const theme = createTheme({
  palette: {
    primary: {
      main: '#065C9B'
    }
  },
    typography: {
      fontFamily: 'NanumSquareRound',
      fontSize: 16,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    }
})

function App() {
  const token = localStorage.getItem('accessToken');
  
  // if (!token) {
  //   return <Login />
  // }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Switch>
          <Redirect exact from="/" to="/Login" />
          <Route path="/Login" component={Login}>
              <Login />
          </Route>
          <Layout>
            <Route path="/SelectDorm" component={SelectDorm}>
              <SelectDorm />
            </Route>
            <Route path="/ExcelUpload" component={ExcelUpload}>
              <ExcelUpload />
            </Route>
            <Route path="/SelectFloor" component={SelectFloor}>
              <SelectFloor />
            </Route>
            <Route path="/SelectRoom6" component={SelectRoom6}>
              <SelectRoom6 />
            </Route>
            <Route path="/SelectRoom5" component={SelectRoom5}>
              <SelectRoom5 />
            </Route>
            <Route path="/SelectRoom4" component={SelectRoom4}>
              <SelectRoom4 />
            </Route>
            <Route path="/SelectRoom3" component={SelectRoom3}>
              <SelectRoom3 />
            </Route>
            <Route path="/SelectRoom2" component={SelectRoom2}>
              <SelectRoom2 />
            </Route>
            <Route path="/SelectRoom1" component={SelectRoom1}>
              <SelectRoom1 />
            </Route>
            <Route path="/SelectRooms" component={SelectRooms}>
              <SelectRooms />
            </Route>
            {/* <Route path="/SelectTeam" component={SelectTeam}>
              <SelectTeam />
            </Route> */}
            </Layout>
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;