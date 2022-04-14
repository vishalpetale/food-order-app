import classes from "./CartItem.module.css";
function CartItem(props) {
  const price = `₹ ${props.price.toFixed(2)}`;

  return (
    <div className={classes["cart-item"]}>
      <div className={classes.item}>
        <h2>{props.name}</h2>
        <span>{price}</span>
      </div>
      <div className={classes.amount}>
        <div>{`x ${props.amount}`}</div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </div>
  );
}
export default CartItem;
