import React,{useState} from 'react';
import Home, {IMovie} from './components/Home/Home'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export interface ICartItem{
  product: IMovie;
  amount: number;
}
function App() {

  const defaultValue:ICartItem[]=[]; 
  const [cart, setCart] = useState(defaultValue);

  const addToCart =(movie:IMovie):void=>{
    let found = false;
    let tempCart = cart;
    for(let i=0; i<tempCart.length; i++){
      if(tempCart[i].product.id===movie.id){
        tempCart[i].amount++; 
        found = true;
      }
    }
  
  if(found===false){
    let newCartItem:ICartItem = {
      product: movie,
      amount: 1
    }
    setCart([...cart, newCartItem]);
  } else {
      setCart(tempCart);
    /* console.log('tempCart: ', tempCart.length); */
  }
  console.log('Cart: ', cart.length);
  }
  
  /* Remove from Cart */
  function removeFromCart(movie:IMovie){
    let tempCart = cart;
    let found = false;
    tempCart.forEach((item)=>{
      if(item.product.id === movie.id && item.amount > 1){
        item.amount--;
        found = true;
      }
      
    });
    if(found===false){
      const newCartItem =tempCart.slice().filter((x) => x.product.id !== movie.id);
      setCart(newCartItem);
    } else{
      setCart([...tempCart]);
    }
  };

/* Clearing the cart after order */

const clearItemForm = (()=>{
  setCart([]);
});

  return (
    <div className="App">
    
    <Router>
      <Header></Header>
      <Switch>
      <Route path='/admin'>
      <Admin></Admin>
      </Route>
      <Route path='/cart'>
      <Cart 
        message={cart}
        removeItem={removeFromCart}
        clearItem={clearItemForm}
      />

      
      </Route>
      <Route path='/' exact={true}>
        <Home updateMovie={addToCart}></Home>
        </Route>
          </Switch>
    </Router>
          <Footer></Footer>
    </div>
  );
}

export default App;
