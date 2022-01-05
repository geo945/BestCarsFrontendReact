import './SeeUsers.css'
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import {Person} from "../../Model/Person";
import {deletePerson, getAllUsers, updateUser} from "../../Service/person-service";

const SeeUsers = () => {
    //contains all users fetched from db
    const [users, setUsers] = useState<Person[]>([]);

    //edit modal fields
    const [id, setId] = useState<number>(0);
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [personCode, setPersonCode] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [role, setRole] = useState<string>('');

    //on init - fetching all users
    useEffect(
        () => {
            getAllUsers()
                .then( (el: Person[]) => setUsers(el) )
                .catch( (error) => console.log("Something went wrong! Couldn't load users.") )
        },[]);

    //open Edit user modal
    const onOpenModal = (person: Person, mode: string) => {
        const container = document.getElementById("usersContainer");
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle','modal');

        if(mode === 'edit') {
            setId(person.id);
            setUsername(person.username);
            setFirstName(person.firstName);
            setLastName(person.lastName);
            setEmail(person.email);
            setPassword(person.password)
            setPersonCode(person.personCode);
            setImageUrl(person.imageUrl);
            setPhoneNumber(person.phoneNumber);
            setRole(person.role);
            button.setAttribute('data-target', '#editUserModal');
        }else if(mode === 'delete'){
            setId(person.id);
            setUsername(person.username);
            button.setAttribute('data-target', '#deleteUserModal');
        }

        container?.appendChild(button);
        button.click();
    }

    //on submit edit modal
    const onEditUser = async () => {
        try{
            //update user
            await updateUser({id, username, firstName, lastName, email, password, personCode, imageUrl, phoneNumber, role})
                .then( (reponse: Person) => console.log("Person successfully updated!") )
                .catch( (error) => console.log("Something went wrong! Couldn't update user.") )
        }catch (e: any){
            alert(e.statusText);
        }

        //clear
        setId(0);
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPersonCode('');
        setImageUrl('');
        setPhoneNumber('');
        setRole('');
    }

    //delete user
    const deleteUser = async () => {
        //delete request
        try{
            //delete from database
            await deletePerson(id)
                .then( (response: Person) => console.log("User successfully deleted!") )
                .catch( (error) => console.log("Something went wrong! Couldn't delete user.") )
            //update component
            await getAllUsers()
                .then( (el: Person[]) => setUsers(el) )
                .catch( (error) => console.log("Something went wrong! Couldn't load users.") )
        }catch (e: any){
            alert(e.statusText);
        }

        //clear
        setId(0);
        setUsername('');
    }


    return(
        <div id="usersContainer">

            <div className="usersRow-4" style={{margin: 'auto', padding: '20px'}}>
                <div id="center">
                    {
                        users.map( (user: Person) =>
                        <div key={user?.id} className="column-4" style={{marginRight: '5px', marginBottom: '5px'}}>
                            <Card style={{width: '18rem', height: '450px', maxHeight: '450px'}}>
                                <Card.Img variant="top" style={{height: '100px', width: '100px', margin: 'auto'}}
                                          src={user?.imageUrl}/>
                                <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
                                <Card.Body>
                                    <Card.Title>{user?.firstName} {user?.lastName}</Card.Title>
                                    <hr/>
                                    <Card.Text>Username: {user?.username}</Card.Text>
                                    <hr/>
                                    <Card.Text>Email: {user?.email}</Card.Text>
                                    <hr/>
                                    <Card.Text>Phone: {user?.phoneNumber}</Card.Text>
                                    <hr/>
                                    <Card.Text>Role: {user?.role}<FontAwesomeIcon onClick={() => onOpenModal(user,'edit')} icon={faUserEdit}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'blue',
                                        marginLeft: '100px',
                                        marginRight: '10px'
                                    }}/>{ user?.role !== 'ADMIN' && <FontAwesomeIcon onClick={() => onOpenModal(user,'delete')} icon={faMinusCircle} style={{cursor: 'pointer', color: 'red'}}/>}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        )
                    }
                </div>
            </div>

            <div className="modal fade" id="editUserModal"  role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editUserModalLabel">Welcome</h5>
                        </div>
                        <form onSubmit={() => onEditUser()} encType='multipart/form-data'>
                            <div className="modal-body">
                                <input defaultValue={id} hidden type="number" name="id"  className="form-control" id="idModal"/>
                                <div className="form-group">
                                    <label htmlFor="usernameModal">Username:</label>
                                    <input value={username} type="text" name="username" className="form-control" id="usernameModal"
                                         onChange={(e)=> setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstNameModal">First name:</label>
                                    <input value={firstName} type="text" name="firstName"  className="form-control" id="firstNameModal"
                                           onChange={(e)=> setFirstName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastNameModal">Last name:</label>
                                    <input value={lastName} type="text" name="lastName"  className="form-control" id="lastNameModal"
                                           onChange={(e)=> setLastName(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailModal">Email:</label>
                                    <input value={email} type="text" name="email"  className="form-control" id="emailModal"
                                           onChange={(e)=> setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneModal">Phone number:</label>
                                    <input value={phoneNumber} type="text" name="phoneNumber"  className="form-control" id="phoneModal"
                                           onChange={(e)=> setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="roleModal">Role:</label>
                                    <select value={role} onChange={(e)=> setRole(e.target.value)}>
                                        <option>ADMIN</option>
                                        <option>USER</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button style={{backgroundColor: 'red', border: 'red'}} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button style={{backgroundColor: 'green', border: 'green'}} type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteUserModal" role="dialog"
                 aria-labelledby="deleteModelLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModelLabel">Delete User</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete user {username} ?</p>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                <button className="btn btn-danger" onClick={deleteUser} data-dismiss="modal">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SeeUsers;