import React, {useEffect, useState} from "react";
import {Person} from "../../Model/Person";
import {updateUser} from "../../Service/person-service";
import './Profile.css'

const Profile = () => {

    const [user, setUser] = useState<Person>();
    const [fullName, setFullName] = useState<string>();

    //fields for update account settings
    const [email, setEmail] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');



    useEffect(
        () => {
            setUser(JSON.parse(localStorage.getItem("user")!));
            setFullName(JSON.parse(localStorage.getItem("user")!).firstName + " " + JSON.parse(localStorage.getItem("user")!).lastName);
            setEmail(JSON.parse(localStorage.getItem("user")!).email);
            setPhoneNumber(JSON.parse(localStorage.getItem("user")!).phoneNumber);
            setImageUrl(JSON.parse(localStorage.getItem("user")!).imageUrl);
        },[]);

    //update user info
    const onUpdateInfo = async () => {
        let id = user?.id!;
        let username = user?.username!;
        let firstName = user?.firstName!;
        let lastName = user?.lastName!;
        let password = user?.password!;
        let personCode = user?.personCode!;
        let role = user?.role!;
        try{
            await updateUser({id, username, firstName, lastName, email, password, personCode, imageUrl, phoneNumber, role})
                .then((response: Person) => {
                    localStorage.setItem("user", JSON.stringify(response));
                    setUser(JSON.parse(localStorage.getItem("user")!));
                    setEmail(JSON.parse(localStorage.getItem("user")!).email);
                    setPhoneNumber(JSON.parse(localStorage.getItem("user")!).phoneNumber);
                    setImageUrl(JSON.parse(localStorage.getItem("user")!).imageUrl);
                    console.log("Everything went ok!");
                })
                .catch((err) => console.log("Something went wrong"))
        }catch (e: any){
            alert(e.statusText);
        }
    }

    //reset changes
    const resetChanges = () => {
        //updated states to update component
        setEmail(user?.email!);
        setPhoneNumber(user?.phoneNumber!);
        setImageUrl(user?.imageUrl!);
    }

    return(
        <div className="tab-pane active" id="profile">
            <h6>YOUR PROFILE INFORMATION</h6>
            <hr/>
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" className="form-control" id="fullName"
                       aria-describedby="fullNameHelp" placeholder="Enter your full name"
                       defaultValue={fullName} disabled={true}/>
                <small id="fullNameHelp" className="form-text text-muted">Your name may
                    appear around here where you are mentioned. You can change or remove
                    it at any time.</small>
            </div>
            <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} type="text" name="email" className="form-control" id="email"
                               onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" id="phone"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imgUrl">Image url</label>
                        <input type="text" className="form-control" id="imgUrl"
                               placeholder="Enter your image url"
                               value={imageUrl}
                               onChange={(e) => setImageUrl(e.target.value)}/>
                    </div>
                    <button onClick={onUpdateInfo} type="button" className="btn btn-primary">Update Profile</button>
                    <button onClick={resetChanges} id="reset" type="reset" className="btn btn-light">Reset Changes</button>
            </form>
        </div>
    )
}

export default Profile;