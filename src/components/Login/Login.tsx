import './Login.css'
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import { userLogin } from "../../Service/auth-service";
import {Person} from "../../Model/Person";
import {IsLoggedIn} from "../../App";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const myContext = useContext(IsLoggedIn);//ca sa pot sa il folosesc

    const onLogin = async (e: any) => {

        e.preventDefault();
        try{
            const user: Person = await userLogin({username, password});
            if(user.username !== username){
                alert('Invalid credentials !');
                return;
            }
            localStorage.setItem("user", JSON.stringify(user));
            myContext.setLoggedIn(!myContext.isLogged);

        }catch (e: any){
            alert(e.message);
            setUsername('');
            setPassword('');
            return;
        }

        //clear
        setUsername('');
        setPassword('');

        document.getElementById("onSuccessLogin")!.click();
    }


    return(
        <div style={{
            maxWidth: '500px',
            border: '1px solid steelblue',
            marginTop: '150px',
            marginBottom: '150px',
            overflow: 'auto',
            padding: '30px',
            borderRadius: '20px',
            position: 'relative',
            height: '270px',
            maxHeight: '270px'
        }} className="container" id="container">
            <form onSubmit={onLogin}>
                <div className="form-group">
                    <label htmlFor="loginUsername">Username</label>
                    <input value={username} type="text" name="username" className="form-control" id="loginUsername" aria-describedby="emailHelp" placeholder="Enter email"
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input value={password} type="password" name="password" className="form-control" id="loginPassword" placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
                <Link to='/register'><button className="btn btn-primary" style={{marginLeft: '20px'}}>Register</button></Link>
                <Link hidden to='/' id="onSuccessLogin">HomePage</Link>
            </form>
        </div>
    )
}

export default Login;