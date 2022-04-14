import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

function Cart(props) {
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
    console.log("...ordering");
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

  return (
    <Modal onCartClose={props.onCartClose}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
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
    </Modal>
  );
}
export default Cart;
