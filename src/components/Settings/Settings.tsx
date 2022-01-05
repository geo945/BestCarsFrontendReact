import './Settings.css'
import {Route} from "react-router-dom";
import Profile from "../Profile/Profile";
import Account_Settings from "../Account_Settings/Account_Settings";
import Security from "../Security/Security";
import Notification from "../Notification/Notification";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Person} from "../../Model/Person";

const Settings = () => {

    const [user, setUser] = useState<Person>();

    useEffect(
        () => {
            setUser(JSON.parse(localStorage.getItem("user")!));
        },[]);

    return(

        <div className="settings-container">

            <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><Link id="settingsMenuLink" to="/">Home</Link></li>
                    <li className="breadcrumb-item active" id="settingsMenuLink">{user?.username}</li>
                    <li className="breadcrumb-item active" aria-current="page" id="settingsMenuLink">Profile Settings</li>
                </ol>
            </nav>

            <div className="row gutters-sm">
                <div className="col-md-4 d-none d-md-block">
                    <div className="card">
                        <div className="card-body">
                            <nav className="nav flex-column nav-pills nav-gap-y-1">
                                <Link id="link" to="/settings/profile" >Profile Settings</Link>
                                <hr/>
                                <Link id="link" to="/settings/account" >Account Settings</Link>
                                <hr/>
                                <Link id="link" to="/settings/security" >Security</Link>
                                <hr/>
                                <Link id="link" to="/settings/notification">Notification</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body tab-content">
                           <Route exact path="/settings/profile" component={Profile} />
                           <Route exact path="/settings/account" component={Account_Settings} />
                           <Route exact path="/settings/security" component={Security} />
                           <Route exact path="/settings/notification" component={Notification} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings;