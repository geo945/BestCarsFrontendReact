import './PendingOffers.css'
import { useEffect } from "react";
import {getAllOffers, deleteCarOffer, approveCarOffer} from "../../Service/car-service";
import {Car} from "../../Model/Car";
import { useState } from "react";


const PendingOffers = () => {
    const [cars, setCars] = useState<Car[]>([]);

    //load car offers
    useEffect(
        () =>{
            getAllOffers()
                .then( (value) => setCars(value) )
                .catch( () => alert("Something went wrong !") );
        },[]);

    //deny car offer
    const onDelete = async (carId: number) => {
        try{
            //send request to delete offer
            await deleteCarOffer(carId)
                .then( (response: Car) => console.log("Everything went ok and the car offer was deleted!") )
                .catch( (error) => alert("Something went wrong!\nError: " + error) );

            //update pending offers page
            await getAllOffers()
                .then( (value) => setCars(value) )
                .catch( () => alert("Something went wrong !") );
        }catch (e: any){
            alert(e.statusText);
        }
    }

    //approve car offer
    const onApprove = async (car: Car) => {
        try{
            //send request to update car offer to make it approved
            await approveCarOffer(car)
                .then( (car: Car) => console.log("Everything went ok and the car offer was approved!") )
                .catch( (error) => alert("Something went wrong!\nError: " + error) );

            //update pending offers page
            await getAllOffers()
                .then( (value) => setCars(value) )
                .catch( () => alert("Something went wrong !") );
        }catch (e: any){
            alert(e.statusText);
        }
    }

    return(
        <div className="background">
            {
                cars
                    .filter( (el) => !el.approved )
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
                                <p onClick={() => onApprove(el)} style={{color: 'firebrick', fontWeight: 'bold'}}>{el?.price} EUR<button  className="buton" style={{backgroundColor: 'green',marginLeft: '50px'}}>Approve</button>
                                <button onClick={() => onDelete(el?.id)} className="buton" style={{backgroundColor: 'red'}}>Delete</button>
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

export default PendingOffers;