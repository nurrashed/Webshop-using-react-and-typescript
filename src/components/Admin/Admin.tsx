import React, {useEffect, useState} from 'react';
import axios from 'axios';
interface IOrder{
    id:number,
    createdBy: string
} 
export default function Admin() {

    
    const defaultOrder:IOrder[]=[];
    const [orders, setOrders] = useState(defaultOrder);
    useEffect(()=>{
        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=5490')
            .then(result=>{
                setOrders(result.data);
    })
    },[]);

    async function deleteOrder(id: number) { 
        axios.delete(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`)
            .then(result => {
            console.log(result);
            const filteredOrders = orders.filter(item => item.id !== id);
            setOrders(filteredOrders);
        }); 
    };

   let orderHtml = orders.map((order:IOrder)=>{
        return(
            <div key={order.id}>
                <p>Order id is: {order.id} and created by: {order.createdBy}</p>
                <button type='button' onClick={()=>deleteOrder(order.id)}>Delete Order</button>
            </div>
        );
   });
   
    return (
        <>
            {orderHtml}
        </>
    );
}