import React from 'react';
import { useGroceryList } from '../context/GroceryListContext';

const GroceryListPage = () => {
  const { groceryList, removeFromGroceryList } = useGroceryList();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 Your Grocery List</h2>
      {groceryList.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul>
          {groceryList.map((item) => (
            <li key={item.id}>
             {item.name} – {item.amount} {item.unit}{' '}
              <button onClick={() => removeFromGroceryList(item)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroceryListPage;
