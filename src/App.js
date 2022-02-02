import React from "react";
import Cart from "./Cart";
import NavBar from "./NavBar";
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDYfm3PiDzaOvMgeJg9xpIukd8DI-o3DWQ",
  authDomain: "cart-96ee3.firebaseapp.com",
  projectId: "cart-96ee3",
  storageBucket: "cart-96ee3.appspot.com",
  messagingSenderId: "1079760011925",
  appId: "1:1079760011925:web:6565310cc487118957919c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: [],
      loading: true

    }

  }
  componentDidMount() {
    const querysnapshot = getDocs(collection(db, 'products'));
    querysnapshot.then((snapshot) => {
      console.log(snapshot)
      snapshot.docs.map((doc) => {
        console.log(doc.data())
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        })

        this.setState({
          products,
          loading: false
        })

      })
    })
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
    if (products[index].Qty === 1) {
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
  GetCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.Qty;
    });
    return count;
  }
  GetPrice = () => {
    const { products } = this.state;
    let price = 0;
    products.forEach((product) => {
      price += product.price * product.Qty;
    });
    return price;
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <NavBar count={this.GetCount()} />
        <Cart products={products} onIncreaseValue={this.increaseValue}
          onDecreaseValue={this.decreaseValue} onDeleteValue={this.deleteValue} />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>
          Total price: ${this.GetPrice()}

        </div>
      </div>
    );
  }
}

export default App;
