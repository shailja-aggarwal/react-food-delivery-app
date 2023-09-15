import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
 const loadedMeals = [];
 const [meals, setMeals] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [httpError, setHttpError] = useState(null);

  useEffect(()=> {
    fetch('https://react-http-8b934-default-rtdb.firebaseio.com/meals.json')
    .then((res) => res.json())
    .then((data) => {
      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    })
  }, []);

  if(isLoading){
    return <section className={classes.mealsLoading}>Loading...</section>
  }

  if(httpError){
    return (<section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>)
  }

    const mealsList = meals.map(meal => <MealItem key = {meal.id} name = {meal.name} description = {meal.description} price = {meal.price} id = {meal.id}/>)

    return (<section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>)
}

export default AvailableMeals;