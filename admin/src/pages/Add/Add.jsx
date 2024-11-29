import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'

const Add = () => {

    const [image,setImage] = useState(false);

  return (
    <div className='add'>
        <form className='flex-col'>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name="description" rows="6" placeholder='Write content here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name="category">
                        <option value="Rice Dishes">Rice Dishes</option>
                        <option value="Fried Rice">Fried Rice</option>
                        <option value="Noodle">Noodle</option>
                        <option value="Burger">Burger</option>
                        <option value="Kudapan">Kudapan</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input type="Number" name='price' placeholder='RM10'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add