import React, {useEffect, useState} from "react";
import {Person} from "../../Model/Person";
import {deletePerson, updateUser} from "../../Service/person-service";
import { useContext } from "react";
import {IsLoggedIn} from "../../App";
import { Link } from "react-router-dom"

const Account_Settings = () => {
    //current user
    const [user, setUser] = useState<Person>();
    //to logout in case o delete account
    const myContext = useContext(IsLoggedIn);

    //to update username
    const [username, setUsername] = useState<string>('');

    useEffect(
        () => {
            setUser(JSON.parse(localStorage.getItem("user")!));
            setUsername(JSON.parse(localStorage.getItem("user")!).username);
        },[]);

    //open delete modal
    const openDeleteModal = () => {
        const container = document.getElementById("accountSettingsContainer");
        //create modal button and click it to open the modal
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target', '#deleteUserModal');
        container?.appendChild(button);
        button.click();
    }

    //delete account
    const deleteAccount = async () => {
        let id = user?.id!;
        try{
            await deletePerson(id)
                .then((response: Person) => {
                    localStorage.clear();
                    myContext.setLoggedIn(!myContext.isLogged);
                    document.getElementById("logout")!.click();
                    console.log("Everything went ok!");
                })
                .catch((err) => console.log("Something went wrong!"))
        }catch (e: any){
            alert(e.statusText);
        }
    }

    //update username
    const updateUsername = async () => {
        let id = user?.id!;
        let firstName = user?.firstName!;
        let lastName = user?.lastName!;
        let email = user?.email!;
        let password = user?.password!;
        let imageUrl = user?.imageUrl!;
        let phoneNumber = user?.phoneNumber!;
        let role = user?.role!;
        let personCode = user?.personCode!;
        try{
            await updateUser({id, username, firstName, lastName, email, password, personCode, imageUrl, phoneNumber, role})
                .then((response: Person) => {
                    localStorage.setItem("user", JSON.stringify(response));
                    setUser(JSON.parse(localStorage.getItem("user")!));
                    myContext.setLoggedIn(!myContext.isLogged);
                    console.log("Everything went well!");
                })
                .catch(() => console.log("Something went wrong!"));
        }catch (e: any){
            alert(e.statusText);
        }
    }

    return(
        <div id="accountSettingsContainer">

            <div className="tab-pane active" id="account">
                <h6>ACCOUNT SETTINGS</h6>
                <hr/>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input  type="text" name="username" className="form-control" id="username"
                               placeholder="Enter your username"
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <small className="form-text text-muted">After changing your username, your old username becomes available for anyone else to claim.</small>
                        <br/>
                    </div>
                    <button onClick={updateUsername} type="button" className="btn btn-primary">Update username</button>

                    <hr/>
                    <div className="form-group">
                        <label className="d-block text-danger">Delete Account</label>
                        <p className="text-muted font-size-sm">Once you delete your account,
                            there is no going back. Please be certain.</p>
                    </div>
                    <button onClick={openDeleteModal} className="btn btn-danger" type="button">Delete Account</button>

            </div>
            <Link hidden id="logout" to="/"/>
            <div className="modal fade" id="deleteUserModal" role="dialog"
                 aria-labelledby="deleteModelLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModelLabel">Delete User</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete your account ?</p>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                <button className="btn btn-danger" onClick={deleteAccount} data-dismiss="modal">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Account_Settings;