/*import { createContext, useState } from 'react';

export const GroceryListContext = createContext();

export const GroceryListProvider = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState([]);

  const addRecipeIngredients = (ingredients) => {
    setGroceryItems((prevItems) => {
      const merged = [...prevItems];

      ingredients.forEach((newItem) => {
        const existing = merged.find(
          (item) => item.name === newItem.name && item.unit === newItem.unit
        );

        if (existing) {
          existing.amount += newItem.amount;
        } else {
          merged.push({ ...newItem });
        }
      });

      return merged;
    });
  };

  return (
    <GroceryListContext.Provider value={{ groceryItems, addRecipeIngredients }}>
      {children}
    </GroceryListContext.Provider>
  );
};*/


// context/GroceryListContext.js
/*import React, { createContext, useState } from "react";

export const GroceryListContext = createContext();

export const GroceryListProvider = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState([]);

  const addRecipeIngredients = (ingredients) => {
    setGroceryItems((prevItems) => [...prevItems, ...ingredients]);
  };

  const removeIngredient = (id) => {
    setGroceryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <GroceryListContext.Provider value={{ groceryItems, addRecipeIngredients, removeIngredient }}>
      {children}
    </GroceryListContext.Provider>
  );
};*/

import React, { createContext, useContext, useState } from 'react';

export const GroceryListContext = createContext();

export const GroceryListProvider = ({ children }) => {
  const [groceryList, setGroceryList] = useState([]);

  const addToGroceryList = (items) => {
    setGroceryList((prev) => [...prev, ...items]);
  };

  /*const removeFromGroceryList = (itemToRemove) => {
    setGroceryList((prev) =>
      prev.filter((item) => item !== itemToRemove)
    );
  };*/

  const removeFromGroceryList = (itemToRemove) => {
  setGroceryList((prev) =>
    prev.filter((item) => item.id !== itemToRemove.id)
  );
};


  return (
    <GroceryListContext.Provider value={{ groceryList, addToGroceryList, removeFromGroceryList }}>
      {children}
    </GroceryListContext.Provider>
  );
};

export const useGroceryList = () => useContext(GroceryListContext);



