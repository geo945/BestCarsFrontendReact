import React, {useContext, useState} from "react";
import {Navbar, Container, NavDropdown, Nav, Form, FormControl, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Person} from "../../Model/Person";
import { useEffect } from "react";
import './Header.css'
import { addCarOffer } from "../../Service/car-service";
import {IsLoggedIn} from "../../App";
import {Car} from "../../Model/Car";

const Header = () => {
    //app Title
    const Title='BestCars';

    let user: Person = JSON.parse(localStorage.getItem("user")!);

    //Add car form fields
    const [title, setTitle] = useState('');
    const [carYear, setFabricationYear] = useState('');
    const [miles, setMileage] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [city, setCity] = useState('');
    const [carPrice, setPrice] = useState('');
    const [file, setSelectedFiles] = useState<any>();

    //context
    const myContext = useContext(IsLoggedIn);

    useEffect( () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        user = JSON.parse(localStorage.getItem("user")!);
    },[myContext.isLogged]);

   const onLogout = () =>{
       localStorage.clear();
       myContext.setLoggedIn(!myContext.isLogged);
    }

   const onAddCarModal = () => {
        const container = document.getElementById("bar");
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target', '#addCarModal');
        container?.appendChild(button);
        button.click();
    }

   const onAddCar = async (e: any) => {

        e.preventDefault();
        try{
            let person: Person = JSON.parse(localStorage.getItem("user")!);
            if( isNaN(parseInt(carYear)) && isNaN(parseInt(miles)) && isNaN(parseInt(carPrice)) ) {
                alert("Invalid input");
                return;
            }
            let fabricationYear: number = parseInt(carYear);
            let mileage: number = parseFloat(miles);
            let price: number = parseInt(carPrice);
            await addCarOffer({title,fabricationYear,mileage,fuelType,city,price, person})
                .then( (response: Car) => console.log("Everything went ok!"))
                .catch( () => alert("Something went wrong!"));
        }catch (e: any){
            console.log(e.statusText);
        }

        //clear
       setTitle('');
       setFabricationYear('');
       setMileage('');
       setFuelType('');
       setCity('');
       setPrice('');
       //setSelectedFiles([]);
   }

   //onFileSelect for car offer
    const fileSelectedHandler = (event: any) => {
       setSelectedFiles(event.target.files);
       console.log(event.target.files);
    }

    return (
        <div style={{backgroundColor: '#363636 '}} id="bar">
        <Navbar>
            <Container  fluid>
                <Link to='/' style={{color:'white',marginRight: '10px',cursor: 'pointer',textDecoration: 'none'}} >{Title}</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px'}} navbarScroll>
                        { !user?.username &&
                            <Link to='/login' style={user?.username ? {color:'white',marginTop: '8px',textDecoration: 'none'} : {color:'white',textDecoration: 'none'} } >Login | Register</Link>
                            }
                        { user?.username && <NavDropdown title={user?.username}  style={{color: 'white !important'}} id="navbarScrollingDropdown">
                            <NavDropdown.Item onClick={onAddCarModal} style={{color: 'red', fontWeight: 'bold'}}>Sell now !</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Link to='/settings/profile' style={{textDecoration: 'none', marginLeft: '15px', color: 'steelblue'}}>Settings</Link>
                        </NavDropdown>}
                        { user?.role === "ADMIN" && <Link to='/seeUsers' style={{textDecoration: 'none', marginTop: '8px', color: 'white'}} >See Users</Link> }
                        { user?.role === "ADMIN" && <Link to='/pendingOffers' style={{textDecoration: 'none', marginTop: '8px',marginLeft: '10px', color: 'white'}} >Pending Offers</Link> }
                        { user?.username && <Link to='/login' style={{textDecoration: 'none', marginTop: '8px',marginLeft: '10px', color: 'white'}} onClick={onLogout}>Logout</Link> }
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <div className="modal fade" id="addCarModal"  role="dialog" aria-labelledby="addCarModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCarModalLabel">Welcome</h5>
                        </div>
                        <form onSubmit={onAddCar} encType='multipart/form-data'>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="titleModal">Ad title</label>
                                    <input type="text" name="title" value={title} className="form-control" id="titleModal" placeholder="Enter ad title"
                                    onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="yearModal">Fabrication year</label>
                                    <input type="text" name="fabricationYear" value={carYear} className="form-control" id="yearModal" placeholder="Enter fabrication year"
                                           onChange={(e) => setFabricationYear(e.target.value)  }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="milesModal">Current mileage</label>
                                    <input type="text" name="mileage" value={miles} className="form-control" id="milesModal" placeholder="Enter current mileage"
                                           onChange={(e) => setMileage(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fuelModal">Fuel type</label>
                                    <input type="text" name="fuelType" value={fuelType} className="form-control" id="fuelModal" placeholder="Enter fuel type"
                                           onChange={(e) => setFuelType(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cityModal">Enter city</label>
                                    <input type="text" name="city" value={city} className="form-control" id="cityModal" placeholder="Enter city"
                                           onChange={(e) => setCity(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priceModal">Enter price</label>
                                    <input type="number" name="price" value={carPrice} className="form-control" id="priceModal" placeholder="Enter price"
                                           onChange={(e) =>  setPrice(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="file">Add car photos</label>
                                    <input onChange={fileSelectedHandler} type="file" name="file" className="form-control" id="file" placeholder="Ad photos"/>
                                </div>
                                <input hidden type="text" name="image"/>
                                <div className="modal-footer">
                                    <button style={{backgroundColor: 'red', border: 'red'}} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button style={{backgroundColor: 'green', border: 'green'}}  type="submit" className="btn btn-primary">Add car</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header;