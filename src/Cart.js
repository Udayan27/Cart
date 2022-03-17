import React from "react";
import CartItem from "./CartItem";
const Cart = (props) => {
  const { products } = props;
  return (
    <div className="Cart">
      {products.map((products) => {
        return (
          <CartItem
            products={products}
            onIncreaseValue={props.onIncreaseValue}
            onDecreaseValue={props.onDecreaseValue}
            onDeleteValue={props.onDeleteValue}
            key={products.id}
          />
        );
      })}
    </div>
  );
};

export default Cart;
