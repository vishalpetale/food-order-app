import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const validatePincode = (pin) => pin.trim().length === 6; //update validation using regular expression.
const validateMobile = (mobile) => mobile.trim().length === 10;

function Checkout(props) {
  const nameRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();
  const mobileRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    pincode: true,
    mobile: true,
  });

  const handleCheckout = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const pincode = pincodeRef.current.value;
    const mobile = mobileRef.current.value;

    const nameIsValid = !isEmpty(name);
    const addressIsValid = !isEmpty(address);
    const pincodeIsValid = validatePincode(pincode);
    const mobileIsValid = validateMobile(mobile);

    const formIsValid =
      nameIsValid && addressIsValid && pincodeIsValid && mobileIsValid;

    if (!formIsValid) {
      setFormValidity({
        name: nameIsValid,
        address: addressIsValid,
        pincode: pincodeIsValid,
        mobile: mobileIsValid,
      });
      return;
    }

    props.onSubmitOrder({
      name,
      address,
      pincode,
      mobile,
    });
  };

  const nameClass = `${classes.control} ${
    !formValidity.name && classes.invalid
  }`;
  const addressClass = `${classes.control} ${
    !formValidity.address && classes.invalid
  }`;
  const pincodeClass = `${classes.control} ${
    !formValidity.pincode && classes.invalid
  }`;
  const mobileClass = `${classes.control} ${
    !formValidity.mobile && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={handleCheckout}>
      <div className={nameClass}>
        <label htmlFor="name">Your name</label>
        <input ref={nameRef} id="name" type="text"></input>
        {!formValidity.name && <p>Please enter valid name.</p>}
      </div>
      <div className={addressClass}>
        <label htmlFor="address">Address</label>
        <input ref={addressRef} id="address" type="text"></input>
        {!formValidity.address && <p>Please enter valid address.</p>}
      </div>
      <div className={pincodeClass}>
        <label htmlFor="pincode">Pincode</label>
        <input ref={pincodeRef} id="pincode" type="text" maxLength="6"></input>
        {!formValidity.pincode && (
          <p>Please enter valid pincode (6 digit long)</p>
        )}
      </div>
      <div className={mobileClass}>
        <label htmlFor="mobile">Mobile</label>
        <input
          ref={mobileRef}
          id="mobile"
          type="tel"
          minLength="10"
          maxLength="10"
        ></input>
        {!formValidity.mobile && (
          <p>Please enter valid mobile number(10 digits long).</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}
export default Checkout;
