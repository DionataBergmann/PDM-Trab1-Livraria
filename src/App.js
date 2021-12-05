import React, { useState } from 'react'
import AppBar from './AppBar'
import AppBody from './AppBody'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ClienteContext } from './ClienteContext'
import UserLogin from './UserLogin';

const App = () => {
  const [dados, setDados] = useState({})
  return (
    <div className="container-fluid">
      <ClienteContext.Provider value={{dados, setDados}}>
      <Router>
      <AppBar />
      <Switch>
      {/* <AppBar /> */}
      <Route path="/" exact>
      <AppBody />
      </Route>

      <Route path="/login">
            <UserLogin />
          </Route>

      </Switch>
      </Router>
      </ClienteContext.Provider>
    </div>
  );
}

export default App;
