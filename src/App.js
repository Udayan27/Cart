import React from "react";
import Cart from "./Cart";
import NavBar from "./NavBar";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
  }
  componentDidMount() {
    const querysnapshot = query(collection(db, "products"));
    onSnapshot(querysnapshot, (snapshot) => {
      console.log(snapshot);
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({
          products,
          loading: false,
        });
      });
    });
  }
  addProduct = () => {
    let product = addDoc(collection(db, "products"), {
      price: 799,
      title: "Washing Machine",
      Qty: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5nEHYsPPL5on6r4cUzjPFDVCIqBfR14eMew&usqp=CAU",
    });
    product.then((docRef) => {
      console.log("product added", docRef);
    });
  };
  increaseValue = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].Qty += 1;
    // this.setState({
    //   products
    // });
    const docRef = doc(db, "products", products[index].id);
    updateDoc(docRef, {
      Qty: products[index].Qty + 1,
    }).then(() => {
      console.log("updated successfully");
    });
  };

  decreaseValue = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].Qty === 1) {
      return;
    }
    // products[index].Qty -= 1;
    // this.setState({
    //   products
    // });
    const docRef = doc(db, "products", products[index].id);
    updateDoc(docRef, {
      Qty: products[index].Qty - 1,
    }).then(() => {
      console.log("updated successfully");
    });
  };

  deleteValue = (id) => {
    // const { products } = this.state
    // const index = products.indexOf(product);
    // const items = products.filter((item) => item.id !== id);
    // this.setState({
    //   products: items
    // });
    const docRef = doc(db, "products", id);
    deleteDoc(docRef).then(() => {
      console.log("deleted successfully");
    });
  };

  GetCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.Qty;
    });
    return count;
  };
  GetPrice = () => {
    const { products } = this.state;
    let price = 0;
    products.forEach((product) => {
      price += product.price * product.Qty;
    });
    return price;
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <NavBar count={this.GetCount()} />
        <Cart
          products={products}
          onIncreaseValue={this.increaseValue}
          onDecreaseValue={this.decreaseValue}
          onDeleteValue={this.deleteValue}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>
          Total price: ${this.GetPrice()}
        </div>
        <button
          onClick={this.addProduct}
          id="Add"
          style={{ padding: 5, fontSize: 20, margin: 20 }}
        >
          Add Washing Machine
        </button>
      </div>
    );
  }
}

export default App;
