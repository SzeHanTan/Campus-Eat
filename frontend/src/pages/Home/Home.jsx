import React, { useState } from 'react';
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import GroupDiscountPopup from '../../components/GroupDiscountPopup/GroupDiscountPopup';

function Home() {
  
    const [category,setCategory] = useState("All");
    return (
      <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <GroupDiscountPopup/>
      </div>
    );
  }




export default Home
