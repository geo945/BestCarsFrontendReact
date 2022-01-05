import Header from "./components/Header/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {createContext, useState} from "react";
import React from "react";
import PendingOffers from "./components/PendingOffers/PendingOffers";
import Home from "./components/Home/Home";
import SeeUsers from "./components/SeeAllUsers/SeeUsers";
import Settings from "./components/Settings/Settings";

export const IsLoggedIn = createContext<{isLogged?: boolean | null, setLoggedIn(value: boolean | null): void }>({
    setLoggedIn() {}
});

function App() {
    const [isLogged, setLoggedIn] = useState<boolean | null>(false);

    //provideru tine valori, accesibile doar copiilor pe care ii are
    return (

      <Router>
          <IsLoggedIn.Provider value={{isLogged, setLoggedIn}} >
              <Header />
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/pendingOffers' component={PendingOffers} />
              <Route exact path='/seeUsers' component={SeeUsers} />
              <Route path='/settings' component={Settings} />
              <Footer />
          </IsLoggedIn.Provider>
      </Router>
  );
}

export default App;
