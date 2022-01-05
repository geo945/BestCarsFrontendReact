import {Link} from "react-router-dom";
import './Register.css'
import {userRegister} from "../../Service/auth-service";
import {useState} from "react";
import { urls} from "../../Routing/routes";

const Register = () => {
    //register form states
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    //on register submit
    const onSubmit = async (e: any) => {
        e.preventDefault();
        let id: number;
        let role: string;
        let personCode: string;
        if(password !== confPassword){
            alert("Passwords doesn't match");
            return;
        }

        try {
            // @ts-ignore
            const result = await userRegister({id,role,personCode,username, firstName, lastName,email,phoneNumber, password, imageUrl});
            console.log(result);
        }catch(e: any){
            alert(e.statusText);
            return;
        }

        //clear register form
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfPassword('');
        setImageUrl('');
        document.getElementById("onSuccessRegister")!.click();
    }

    return(
        <div style={{maxWidth:'600px'}} className="container">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="registerUsername">Username</label>
                    <input type="text" value={username} name="username" className="form-control" id="registerUsername" placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="registerFirstName">First name</label>
                    <input type="text" value={firstName} name="firstName" className="form-control" id="registerFirstName" placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="registerLastName">Last name</label>
                    <input type="text" value={lastName} name="lastName" className="form-control" id="registerLastName" placeholder="Last name"
                           onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="registerEmail">Email address</label>
                    <input type="email" value={email} name="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"
                           onChange={(e) => setEmail(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="registerPhone">Phone number</label>
                    <input type="text" value={phoneNumber} name="phoneNumber" className="form-control" id="registerPhone" aria-describedby="emailHelp" placeholder="Enter phone number"
                           onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword">Password</label>
                    <input type="password" value={password} name="password" className="form-control" id="registerPassword" placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="registerConfPassword">Confirm Password</label>
                    <input type="password" value={confPassword} name="confPassword" className="form-control" id="registerConfPassword" placeholder="Confirm password"
                           onChange={(e) => setConfPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="registerImageUrl">Profile image url</label>
                    <input type="text" value={imageUrl} name="imageUrl" className="form-control" id="registerImageUrl" placeholder="Profile image url"
                           onChange={(e) => setImageUrl(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/login'><button className="btn btn-primary" style={{marginLeft: '20px'}}>Login</button></Link>
                <Link hidden id="onSuccessRegister" to={urls.loginPage}/>
            </form>
        </div>
    );
}

export default Register;