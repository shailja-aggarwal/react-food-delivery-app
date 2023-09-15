import classes from './Checkout.module.css'
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';

const isFiveChars = value => value.trim().length === 5

const Checkout = props => {

    const [formInputs, setFormInputs] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    }); 


    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;  

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredPostal)
        const enteredPostalIsValid = true

        setFormInputs({
            name:enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid 
        
        if(!formIsValid){
            return;
        }  
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        });
    }

    return (
        <form onSubmit={confirmHandler} className= {classes.form}>
            <div className={`${classes.control} ${formInputs.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type="text" id="name" ref={nameInputRef}></input>
                {!formInputs.name && <p>Please Enter a Valid Name</p>}
            </div>
            <div className={`${classes.control} ${formInputs.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type="text" id="street" ref={streetInputRef}></input>
                {!formInputs.street && <p>Please Enter a Valid Street</p>}
            </div>
            <div className={`${classes.control} ${formInputs.postalCode ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef}></input>
                {!formInputs.postalCode && <p>Please Enter a Valid Postal Code</p>}
            </div>
            <div className={`${classes.control} ${formInputs.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type="text" id="city" ref={cityInputRef}></input>
                {!formInputs.city && <p>Please Enter a Valid City</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>

        </form>

    )
}

export default Checkout