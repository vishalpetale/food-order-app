import React from "react";
import MealsImg from "../../assets/meals.jpg";
import Logo from "../../assets/logo.png";
import HeaderCardButton from "./HeaderCartButton";
import classes from "./Header.module.css";
function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={Logo}></img>
          <h1>The Food Order App</h1>
        </div>
        <HeaderCardButton onCartOpen={props.onCartOpen} />
      </header>
      <div className={classes["main-image"]}>
        <img src={MealsImg} alt="A Table Full Of Delicious Food" />
      </div>
    </>
  );
}
export default Header;
