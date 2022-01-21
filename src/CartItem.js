import React from "react";
class CartItem extends React.Component {
    constructor() {
        super()
        this.state = {
            price: 999,
            title: "Samsung",
            Qty: 1,
            img: " "
        }

    }
    increaseValue=()=> {
        var quantity=this.state.Qty;
        quantity++;
        this.setState({
            Qty:quantity
        })
    }
    decreaseValue=()=> {
        var quantity=this.state.Qty;
        if (quantity==0)
        alert("Nothing to remove")
        if (quantity>0)
        quantity--;
        this.setState({
            Qty:quantity
        })
    }
    deleteValue=()=> {
        var quantity=this.state.Qty;
        quantity=0;
        this.setState({
            Qty:quantity
        })
    }
  
    render() {
        const { price, title, Qty, img } = this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.Image} />
                </div>
                <div className="right-block">
                    <div>{title}</div>
                    <div>${price}</div>
                    <div>Qty:{Qty}</div>
                    <div className="class-item-actions">
                        {/*buttons*/}
                        <img 
                        alt="Increase" className="actions-icon" 
                        src="https://cdn-icons.flaticon.com/png/128/2569/premium/2569195.png?token=exp=1642771786~hmac=a64f099f0591d6253301b895422cd620"
                        onClick={this.increaseValue} 
                        />
                        <img 
                        alt="Decrease" 
                        className="actions-icon" 
                        src="https://cdn-icons.flaticon.com/png/128/2569/premium/2569198.png?token=exp=1642771845~hmac=3eb167be9c5598ccb149ee7ebb5ce277"
                        onClick={this.decreaseValue}/>
                        <img 
                        alt="Delete"
                        className="actions-icon" 
                        src="https://cdn-icons.flaticon.com/png/128/3687/premium/3687412.png?token=exp=1642771514~hmac=0d45541b84746ffa1fdc983722d1a0ce" 
                        onClick={this.deleteValue}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
const styles = {
    Image: {
        height: 110,
        width: 110,
        borderRadius: 6,
        background: "blue"
    }
}








export default CartItem;