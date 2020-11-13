import React,{ChangeEvent, useState} from 'react';
import { Card, Grid, Item} from 'semantic-ui-react';
import {ICartItem} from '../../App';
import Axios from 'axios';


interface IMovie{
  id:number,
  name:string,
  description:number,
  imageUrl:string,
  price: number
}

interface ICartProps{
  message: ICartItem[];
  removeItem(movie:IMovie):void;
  clearItem():void;
} 




export default function Cart(props:ICartProps) {

  console.log(props);
  const [customerEmail, setCustomerEmail] = useState('');

  const tempMessage = props.message;
  const clearMovie = () =>{
    props.clearItem();
  }

  function updateCustomerEmail(e:ChangeEvent<HTMLInputElement>){
    setCustomerEmail(e.target.value);
  }

  let totalPrice = props.message.reduce((a, c)=> a + ((c.amount) * c.product.price) , 0)


  let orderMovies = props.message.map((movie: ICartItem) => {
    return(
      {
      id: 0,
      productId: movie.product.id,
      product: null,
      amount: movie.amount,
      orderId: 0
      }
    ); 
  });

  async function checkOut() {
 
    let params = {
      id: 0,
      companyId: 5490,
      created: new Date(),
      createdBy: customerEmail,
      paymentMethod: "mastercard",
      totalPrice: props.message.reduce((a, c)=> a + ((c.amount) * c.product.price) , 0),
      status: 0,
      orderRows: orderMovies
    }
    let res = await Axios.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
    params)
    console.log(res.data)
    clearMovie();
  };


  let movieHtml = props.message.map((movie:ICartItem)=>{
    return(
      <Grid.Column key= {movie.product.id}>
          <Card className="cardHeight">
              <Card.Content>
                <Card.Header>{movie.product.name}</Card.Header>                  
                <Card.Description>
                      <img className="image" src={movie.product.imageUrl} alt="Movie image"/>
                      <p>Price: {movie.product.price} x {movie.amount}</p>
                      {/* <button type='button' onClick={()=>clickHandel(movie)}>Add to Cart</button> */}
                </Card.Description>
              </Card.Content>
          </Card>
          <div>Number of product: {movie.amount}</div>
          <button type='button' onClick={()=>props.removeItem(movie.product)}>Delete</button>
          
      </Grid.Column>
      
  )})

 
  return (
    <>
        
        {/* <p>{JSON.stringify(props.message)}</p> */}
        <Grid columns={3}>
            {movieHtml}            
        </Grid>
        <p>Total Price: {totalPrice} </p>
        <input type='text' id='email' onChange={updateCustomerEmail}></input>
        <button type='button' onClick={()=>checkOut()}>Proceed</button>
    </>

    
  );
}
