import React, { useState, useEffect } from 'react';
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

function Home() {
  console.log("Home component is rendering");
  const [state, setState] = useState(initialState);
  useEffect(() => {
    console.log("useEffect is running");
  }, []);
  // Rest of your component code
  const Home = () => {

    const [category,setCategory] = useState("All");
    return (
      <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
      </div>
    )
  }
}



export default Home
