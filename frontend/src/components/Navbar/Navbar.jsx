import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {

    const [menu,setmenu] = useState("home");

    const{getTotalCartAmount}=useContext(StoreContext);

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=>setmenu("home")} className={menu==="home"?"active":""}>home</li>
        <li onClick={()=>setmenu("menu")}className={menu==="menu"?"active":""}>menu</li>
        <li onClick={()=>setmenu("group-discount")}className={menu==="group-discount"?"active":""}>group discount</li>
        <li onClick={()=>setmenu("contact us")}className={menu==="contact-us"?"active":""}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
