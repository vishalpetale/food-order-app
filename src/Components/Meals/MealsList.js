import { useState, useEffect } from "react";
import classes from "./MealsList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMeals = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://food-order-app-4abf9-default-rtdb.firebaseio.com/meals.json"
      );
      console.log(response);

      if (!response.ok)
        throw new Error(`Unable to get Meals. ${response.status}`);

      const data = await response.json();

      const meals = [];

      for (const key in data) {
        meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setIsLoading(false);
      setMeals(meals);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  const AvailableMealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let mealsContent = <p>No meals are available.</p>;

  if (isLoading) {
    mealsContent = <p>Loading...</p>;
  }
  if (meals.length > 0) {
    mealsContent = <ul>{AvailableMealsList}</ul>;
  }
  if (error) {
    mealsContent = (
      <p className={classes["meals-error"]}>{`${error}. Please try again.`}</p>
    );
  }

  return (
    <>
      <Card className={classes.meals}>{mealsContent}</Card>;
    </>
  );
}
export default MealsList;
