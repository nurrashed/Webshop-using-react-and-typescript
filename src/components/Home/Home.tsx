import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Grid} from 'semantic-ui-react';
import '../Home/Home.css'

export interface IMovie{
    id:number,
    name:string,
    description:number,
    imageUrl:string,
    price: number
}

interface IDataprops{
    updateMovie(movie:IMovie): void;
}

export default function Home(props:IDataprops) {

    const defaultValue:IMovie[]=[];
    const [movies, setMovies]=useState(defaultValue);
    //const [cart, setCart] = useState(defaultValue);
    useEffect(()=>{
        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
            .then(result=>{
                    setMovies(result.data);
            })
    }, []);
    
  
    
function clickHandel(movie:IMovie){
    props.updateMovie(movie);
};
    


let movieHtml = movies.map((movie:IMovie)=>{
    return(
        <Grid.Column key={movie.id}>
            <Card className="cardHeight">
                <Card.Content>
                        <Card.Header>{movie.name}</Card.Header>
                    
                        <Card.Description>
                        <img className="image" src={movie.imageUrl} alt="Movie"/>
                        <p>Price: {movie.price}</p>
                        <button type='button' onClick={()=>clickHandel(movie)}>Add to Cart</button>
                        </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>  
    )
})


return (
    <>
        <h1>Movies</h1>
        
        
        <Grid columns={3}>
            {movieHtml}
        </Grid>
    </>
);
}

