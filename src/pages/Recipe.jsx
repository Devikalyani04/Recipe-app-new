import {useEffect,useState} from 'react';
import styled from "styled-components";
import {useParams} from "react-router-dom";
import React from "react";
import {PieChart, Pie, Cell, Tooltip as PieTooltip,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip,} from "recharts";
import fetchYoutubeVideo from "../utils/fetchYoutubeVideo";
import { useContext } from 'react';
import { GroceryListContext } from '../context/GroceryListContext';
import { Link } from 'react-router-dom';



function Recipe(){

  let params=useParams();
  const [details,setDetails]=useState({});

  const[activeTab,setActiveTab]=useState('instructions');

  const [nutrition, setNutrition] = useState(null);



  const[scale,setScale]=useState(1);

  const [youtubeLink, setYoutubeLink] = useState(null);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const { addToGroceryList } = useContext(GroceryListContext);



  const fetchDetails = async ()=>{
    const data=await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);

    const detailData=await data.json();
    setDetails(detailData);

    /*setSelectedIngredients(detailData.extendedIngredients.map((ing) => ing.id));*/

    // Instead of storing IDs, store the full display string like "1 cup flour"
  /*setSelectedIngredients(
  detailData.extendedIngredients.map(
    (ing) =>
      `${Math.round((ing.amount * scale + Number.EPSILON) * 100) / 100} ${ing.unit} ${ing.name}`
  )
);*/


    const nutritionData = await fetch(
  `https://api.spoonacular.com/recipes/${params.name}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`
);
const parsedNutrition = await nutritionData.json();
setNutrition(parsedNutrition);

  const video = await fetchYoutubeVideo(detailData.title + " recipe");
  setYoutubeLink(video);

  };


  useEffect(()=>{
    fetchDetails();
  },[params.name]);


  const getPieData = () => {
  if (!nutrition) return [];
  return [
    { name: "Protein", value: parseFloat(nutrition.protein) || 0 },
    { name: "Carbs", value: parseFloat(nutrition.carbs) || 0 },
    { name: "Fat", value: parseFloat(nutrition.fat) || 0 },
  ];
};

const getBarData = () => {
  if (!nutrition) return [];
  const combined = [...(nutrition.bad || []), ...(nutrition.good || [])];
  return combined.map((item) => ({
    name: item.title,
    amount: parseFloat(item.amount),
  }));
};

/*const toggleIngredient = (id) => {
  setSelectedIngredients((prevSelected) =>
    prevSelected.includes(id)
      ? prevSelected.filter((i) => i !== id)
      : [...prevSelected, id]
  );
};*/

/*const toggleIngredient = (ingredientString) => {
  setSelectedIngredients((prevSelected) =>
    prevSelected.includes(ingredientString)
      ? prevSelected.filter((item) => item !== ingredientString)
      : [...prevSelected, ingredientString]
  );
};*/

const toggleIngredient = (ingredientObj) => {
  setSelectedIngredients((prevSelected) => {
    const alreadySelected = prevSelected.some(
      (item) => item.id === ingredientObj.id
    );

    if (alreadySelected) {
      return prevSelected.filter((item) => item.id !== ingredientObj.id);
    } else {
      return [...prevSelected, ingredientObj];
    }
  });
};



  /*const handleAddToGroceryList = () => {
    const ingredientsToAdd = details.extendedIngredients
      .filter((ingredient) => selectedIngredients.includes(ingredient.id))
      .map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount:
          Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100,
        unit: ingredient.unit,
      }));

    addRecipeIngredients(ingredientsToAdd);
  };*/

  const handleAddToGroceryList = () => {
 addToGroceryList(selectedIngredients); // Pass as array of strings
  alert("Selected ingredients added to grocery list!");
};



  
return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>

      <Info>
        <div className="tab-buttons">
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        </div>

        {/*{activeTab === "instructions" && (
          <div>
         
             <h2 style={{ marginTop: '2rem' }}>Instructions</h2>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}*/}

        {activeTab === "instructions" && details.analyzedInstructions?.length > 0 && (
  <div>
    <h2 style={{ marginTop: '2rem' }}>Instructions</h2>
    <ul className="step-list">
      {details.analyzedInstructions[0].steps.map((step) => (
    <li key={step.number} className="step-item">
      <strong>Step {step.number}:</strong> {step.step}
    </li>
      ))}
    </ul>

   {/* Nutrient Chart Section */}
   <h2 style={{ marginTop: '3rem' }}>Nutrient Chart</h2>

    <ChartWrapper>
      <ChartSection>
        <h4>Macronutrients (Pie Chart)</h4>
        <PieChart width={300} height={300}>
          <Pie
            data={getPieData()}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label

          >
            {getPieData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
            ))}
          </Pie>
          <PieTooltip />
        </PieChart>
      </ChartSection>

      <ChartSection>
        <h4>All Nutrients (Bar Chart)</h4>
        <BarChart width={700} height={350} data={getBarData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={90} />
          <YAxis />
          <BarTooltip />
          <Bar dataKey="amount">
              {getBarData().map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} // Cycle through 3 colors
    />
  ))}
</Bar>
        </BarChart>
      </ChartSection>
    </ChartWrapper>

{youtubeLink && (
  <YouTubeSection>
    <h3>{'\u{1F60A}'}Wanna see how it's made? Watch it on YouTube!</h3>
    <YouTubeLink href={youtubeLink} target="_blank" rel="noopener noreferrer">
      {youtubeLink}
    </YouTubeLink>
  </YouTubeSection>
)}


  </div>
)}





 {activeTab === 'ingredients' && (
          <div>


    <ScaleWrapper>
  <ScaleLabel>Scale Recipe: {scale}×</ScaleLabel>
  <ScaleSlider
    type="range"
    min="0.5"
    max="3"
    step="0.25"
    value={scale}
    onChange={(e) => setScale(parseFloat(e.target.value))}
  />
  <div>
    {[0.5, 1, 1.5, 2, 3].map((val) => (
      <ScaleButton key={val} onClick={() => setScale(val)} active={scale === val}>
        {val}×
      </ScaleButton>
    ))}
  </div>
</ScaleWrapper>

 {details.servings && (
      <ServingsText>
        <strong>Servings:</strong> {Math.round(details.servings * scale)}
      </ServingsText>
    )}

    {/*<ul>
      {details.extendedIngredients.map((ingredient) => (
        <li key={ingredient.id}>
          {Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100} {ingredient.unit} {ingredient.name}
        </li>
      ))}
    </ul>*/}

   {/*<ul>
  {details.extendedIngredients.map((ingredient) => (
    <li key={ingredient.id}>
      <label>
        <input
          type="checkbox"
          checked={selectedIngredients.includes(ingredient.id)}
          onChange={() => toggleIngredient(ingredient.id)}
        />
        {Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100} {ingredient.unit} {ingredient.name}
      </label>
    </li>
  ))}
</ul>*/}


{/*<ul>
  {details.extendedIngredients.map((ingredient) => {
    const ingredientString = `${Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100} ${ingredient.unit} ${ingredient.name}`;
    return (
      <li key={ingredient.id}>
        <label>
          <input
            type="checkbox"
            checked={selectedIngredients.includes(ingredientString)}
            onChange={() => toggleIngredient(ingredientString)}
          />
          {ingredientString}
        </label>
      </li>
    );
  })}
</ul>*/}

{/*<ul>
  {details.extendedIngredients.map((ingredient) => {
    const ingredientObj = {
      id: ingredient.id,
      name: ingredient.name,
      amount: Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100,
      unit: ingredient.unit,
    };

    const isChecked = selectedIngredients.some(
      (item) => item.id === ingredient.id
    );

    return (
      <li key={ingredient.id}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleIngredient(ingredientObj)}
          />
          {ingredientObj.name} – {ingredientObj.amount} {ingredientObj.unit}
        </label>
      </li>
    );
  })}
</ul>*/}

{/*<ul>
  {details.extendedIngredients.map((ingredient) => {
    const ingredientObj = {
      id: ingredient.id,
      name: ingredient.name,
      amount: Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100,
      unit: ingredient.unit,
    };

    const displayString = `${ingredientObj.amount} ${ingredientObj.unit} ${ingredientObj.name}`;

    const isChecked = selectedIngredients.some(
      (item) => item.id === ingredientObj.id
    );

    return (
      <li key={ingredient.id}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleIngredient(ingredientObj)}
          />
          {displayString}
        </label>
      </li>
    );
  })}
</ul>*/}


<ul>
  {details.extendedIngredients.map((ingredient, index) => {
    const ingredientObj = {
      id: `${ingredient.id}-${index}`, // make unique with index
      name: ingredient.name,
      amount: Math.round((ingredient.amount * scale + Number.EPSILON) * 100) / 100,
      unit: ingredient.unit,
    };

    const displayString = `${ingredientObj.amount} ${ingredientObj.unit} ${ingredientObj.name}`;

    const isChecked = selectedIngredients.some(
      (item) => item.id === ingredientObj.id
    );

    return (
      <li key={ingredientObj.id}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleIngredient(ingredientObj)}
          />
          {displayString}
        </label>
      </li>
    );
  })}
</ul>




<GroceryButton onClick={handleAddToGroceryList}>
              🛒 Add Selected to Grocery List
            </GroceryButton>

  <Link to="/grocery-list">
  <button>📋 View Grocery List</button>
</Link>
         
  </div>
)}
     

    </Info>
    </DetailWrapper>

  



  );
}




const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column; /* STACKS everything vertically */
  align-items: center;
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 800px;
    border-radius: 1rem;
    margin-bottom: 2rem;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  li {
    font-size: 1.2rem;
    line-height: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  .step-list {
    list-style: decimal;
    padding-left: 1.5rem;
  }

  .step-item {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height:1.6rem
`;


const Button=styled.button`
padding:1rem 2rem;
color:#313131;
background:white;
border:2px solid black;
margin-right:1rem;
font-weight:600;
cursor:pointer;
`;


const GroceryButton = styled.button`
  padding: 1rem 1rem;
  color: black; 
  background: lightgreen; 
  border: 2px solid black;
  margin-left:1rem;
  font-weight: 600;
  cursor: pointer;
`;
/*const Info=styled.div`
margin-left:10rem;

h3 {
    font-size: 0.9rem;
  }
`;*/

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .tab-buttons {
    display:flex;
    gap:1rem;
    margin-bottom: 1.5rem;
  }

  div,
  ul {
    max-width: 800px;
    text-align: left;
  }

 
`;


const ScaleWrapper = styled.div`
  margin: 1rem 0;
`;

const ScaleLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const ScaleSlider = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;








const ScaleButton = styled.button`
  margin-right: 8px;
  padding: 6px 12px;
  border: 1px solid #313131;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#313131" : "white")};
  color: ${({ active }) => (active ? "white" : "#313131")};
`;

const ServingsText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0 1rem 0;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 2rem;
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YouTubeSection = styled.div`
 
  text-align: center;
  
  h3 {
    margin-bottom: 0.3rem;  
  }
`;

const YouTubeLink = styled.a`
  display: inline-block;
  margin-top:0.2rem;
  font-size: 1rem;
  color: #1a73e8;
  text-decoration: underline;

  &:hover {
    color: #0b59d8;
  }
`;




export default Recipe;

  