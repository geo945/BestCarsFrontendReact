import { useState, useEffect } from "react";
import {Car} from "../../Model/Car";
import { getAllOffers } from "../../Service/car-service";

const Home = () => {
    //contains all the car offers fetched from db
    const [cars, setCars] = useState<Car[]>([]);

    //jsx button phone default value
    const defaultPhoneNumberValue = 'See phone number';

    useEffect(
        () => {
            getAllOffers()
                .then( (value) => setCars(value))
                .catch( () => alert("Something went wrong !") );
        },[]);

    const changeText = (car: Car) => {
        if(document.getElementById("" + car.id)!.innerText === defaultPhoneNumberValue) {
            document.getElementById("" + car.id)!.innerText = car.person.phoneNumber;
        }else{
            document.getElementById("" + car.id)!.innerText = defaultPhoneNumberValue;
        }
    }

    return(
        <div className="background">
            {
                cars
                    .filter( (el) => el.approved )
                    .map( (el) =>
                        <div key={el.id}>
                            <div className="container" id="container" >
                                <div className="row">
                                    <div className="column">
                                        <div className="img">
                                            <img style={{borderRadius: '10px'}} src={require('../../resources/bmw.jpg')} className="pic" alt=""/>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <p style={{fontWeight: 'bold'}}>{el?.title}</p>
                                        <hr/>
                                        <small className="inf">{el?.fabricationYear} <span className="span">&middot;</span> {el?.mileage} km <span className="span">&middot;</span> {el?.fuelType}<br/></small>
                                        <small><i className="fa fa-map-marker" aria-hidden="true">{el?.city}</i><br/></small>
                                        <p  style={{color: 'firebrick', fontWeight: 'bold'}}>{el?.price} EUR
                                            <button onClick={() => changeText(el)} id={"" + el.id} className="buton" style={{backgroundColor: 'blue',marginLeft: '50px'}}>{defaultPhoneNumberValue}</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

            }
        </div>
    );
}

export default Home;