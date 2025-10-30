


/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DishType = () => {
  const { typeName } = useParams(); // e.g., "Main-Course"
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDishType = async () => {
    try {
      setLoading(true);
      const formattedType = typeName.replace("-", " ").toLowerCase(); // "Main-Course" -> "main course"
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${formattedType}&addRecipeInformation=true&number=9`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      console.error("Error fetching dish type recipes:", err);
      setError("Failed to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishType();
  }, [typeName]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-grid">
      <h2>{typeName.replace("-", " ")}</h2>
      <div className="grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishType;*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function DishType() {
  const { typeName } = useParams(); 
  const [recipes, setRecipes] = useState([]);

  const getDishType = async () => {
    const formattedType = typeName.replace("-", " ").toLowerCase();
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${formattedType}&addRecipeInformation=true&number=9`
    );
    const data = await response.json();
    console.log("Recipes data:", data);
    console.log("API key:", process.env.REACT_APP_API_KEY);

    setRecipes(data.results);
  };

  useEffect(() => {
    getDishType();
  }, [typeName]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {recipes.map((item) => (
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 400px;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default DishType;



