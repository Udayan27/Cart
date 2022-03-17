import React from "react";
const CartItem = (props) => {
  const { price, title, Qty, img } = props.products;
  return (
    <div className="cart-item">
      <div className="left-block">
        <img alt="Item-img" style={styles.Image} src={img} />
      </div>
      <div className="right-block">
        <div>{title}</div>
        <div style={{ color: "grey" }}>${price}</div>
        <div style={{ color: "grey" }}>Qty:{Qty}</div>
        <div className="class-item-actions">
          {/*buttons*/}
          <img
            alt="Increase"
            className="actions-icon"
            src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
            onClick={() => {
              props.onIncreaseValue(props.products);
            }}
          />
          <img
            alt="Decrease"
            className="actions-icon"
            src="https://cdn-icons-png.flaticon.com/128/561/561179.png"
            onClick={() => {
              props.onDecreaseValue(props.products);
            }}
          />
          <img
            alt="Delete"
            className="actions-icon"
            src="https://cdn-icons.flaticon.com/png/128/484/premium/484611.png?token=exp=1643871130~hmac=c2192870abbfdad71b695b6aff7e7428"
            onClick={() => {
              props.onDeleteValue(props.products.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  Image: {
    height: 110,
    width: 110,
    borderRadius: 6,
    background: "blue",
  },
};

export default CartItem;
