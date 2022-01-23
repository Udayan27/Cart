import React from "react";
import CartItem from "./CartItem";
class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [
                {
                    price: 1999,
                    title: "AlienWare",
                    Qty: 1,
                    img: " ",
                    id: 1
                },
                {
                    price: 999,
                    title: "Samsung",
                    Qty: 1,
                    img: " ",
                    id: 2

                },
                {
                    price: 599,
                    title: "Rolex",
                    Qty: 1,
                    img: " ",
                    id: 3
                }
            ]
        }

    }
    increaseValue = (product) => {
        const { products } = this.state
        const index = products.indexOf(product);
        products[index].Qty += 1;
        this.setState({
            products
        });
    }
    decreaseValue = (product) => {
        const { products } = this.state
        const index = products.indexOf(product);
        if (products[index].Qty === 0) {
            return;
        }
        products[index].Qty -= 1;
        this.setState({
            products
        });
    }
    deleteValue = (id) => {
        const { products } = this.state
        const items = products.filter((item) => item.id !== id);
        this.setState({
            products: items
        });
    }
    render() {
        const { products } = this.state
        return (
            <div className="Cart">
                {
                    products.map((products) => {
                        return (
                            <CartItem products={products} onIncreaseValue={this.increaseValue}
                                onDecreaseValue={this.decreaseValue}
                                onDeleteValue={this.deleteValue}
                                key={products.id} />

                        )
                    })

                }


            </div>
        )

    }
}
export default Cart;