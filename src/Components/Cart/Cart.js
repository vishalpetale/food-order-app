import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

function Cart(props) {
  const [checkout, setCheckout] = useState(false);
  const [sendingReq, setSendingReq] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const cartCtx = useContext(CartContext);
  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasitems = cartCtx.items.length > 0;

  const handleAddCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const handleOrder = () => {
    setCheckout(true);
  };

  const handleSubmitOrder = async (userData) => {
    try {
      setSendingReq(true);

      const response = await fetch(
        "https://food-order-app-4abf9-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userData,
            orderItems: cartCtx.items,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not place order. Please try later."
        );
      }

      setSendingReq(false);
      setIsSubmitted(true);
      cartCtx.clearCart();

      console.log("Order is Placed successfully.");
    } catch (error) {
      setError(`${error.message}. Please try again.`);
    }
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onAdd={handleAddCartItem.bind(null, item)}
      onRemove={handleRemoveCartItem.bind(null, item.id)}
    ></CartItem>
  ));

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onCartClose} className={classes["button-alt"]}>
        Close
      </button>
      {hasitems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {checkout && (
        <Checkout
          onCancel={props.onCartClose}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {!checkout && modalActions}
    </>
  );

  const sendingReqContent = (
    <p className={classes["info-text"]}>Sending order data....</p>
  );

  const isSubmittedContent = (
    <>
      <p className={classes["info-text"]}>Order is placed successfully.</p>
      <div className={classes.actions}>
        <button onClick={props.onCartClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );
  const isErrorContent = <p className={classes["info-text"]}>{error}</p>;

  return (
    <Modal onCartClose={props.onCartClose}>
      {sendingReq && !error && sendingReqContent}
      {error && isErrorContent}
      {isSubmitted && isSubmittedContent}
      {!sendingReq && !isSubmitted && cartContent}
    </Modal>
  );
}
export default Cart;
