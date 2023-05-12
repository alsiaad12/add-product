import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './add.css'
const AddProducts = () => {
  const [products, setProducts] = useState({
    SKU: '',
    Name: '',
    Price: '',
    Type: 'DVD',
    size: '',
    weight: '',
    height: '',
    width: '',
    length: '',
  })
  const changes = (e) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({ ...prevProducts, [name]: value }));
  };
  let nav = useNavigate();
  const routeChange = () => {
    const path = "/";
    nav(path);
  };
  function validateData(sku, name, price, type, size, height, width, length, weight) {
    const skuPattern = /^[A-Za-z]+$/;
    const numberPattern = /^\d+$/;
    const errors = {};

    if (!skuPattern.test(sku)) {
      errors.sku = 'SKU must contain only letters';
    }
    if (!skuPattern.test(name)) {
      errors.name = 'Name must contain only letters';
    }

    if (type === 'DVD') {
      if (!numberPattern.test(size)) {
        errors.size = 'Size must contain only numbers';
      }
    }
    else if (type === 'Book') {
      if (!numberPattern.test(weight)) {
        errors.weight = 'Weight must contain only numbers';
      }
    }
    else if (type === 'Furniture') {
      if (!numberPattern.test(height)) {
        errors.height = 'Height must contain only numbers';
      }
      if (!numberPattern.test(width)) {
        errors.width = 'Width must contain only numbers';
      }
      if (!numberPattern.test(length)) {
        errors.length = 'Length must contain only numbers';
      }
    }
    else {
      errors.type = 'Type must be DVD, Book, or Furniture';
    }

    return Object.keys(errors).length > 0 ? errors : true;
  }

  const addProduct = (e) => {
    e.preventDefault();
    axios.post('http://localhost/add.php', JSON.stringify(products)).catch((error) => console.log(error))
  }
  const typeSwitcher = {
    'DVD': <label htmlFor="size">Size (in MB):<input type="number" id="size" name="size" value={products.size} onChange={changes} /></label>,
    'Book': <label htmlFor="weight">Weight (in Kg):<input type="number" id="weight" name="weight" value={products.weight} onChange={changes} /></label>,
    'Furniture': <>
      <label htmlFor="height">Height (in cm):<input type="number" id="height" name="height" value={products.height} onChange={changes} /></label>
      <label htmlFor="width">Width (in cm):<input type="number" id="width" name="width" value={products.width} onChange={changes} /></label>
      <label htmlFor="length">Length (in cm):<input type="number" id="length" name="length" value={products.length} onChange={changes} /></label>
    </>,
  };


  return (
    <div>
      <form id="product_form">
        <header>
          <h1 className="page-title">Product List</h1>
          <div>
            <button type="submit" onClick={e => addProduct(e)}>Save</button>
            <button type="button" onClick={routeChange}>Cancel</button>
          </div>
        </header>
        <label>SKU:
          <input type="text" value={products.SKU} onChange={changes} id="sku" name="SKU" required />
        </label>
        <label>Name:
          <input type="text" id="name" name="Name" value={products.Name} onChange={changes} required />
        </label>
        <label>Price:
          <input type="number" id="price" name="Price" value={products.Price} onChange={changes} required />
        </label>
        <label>Type Switcher:
          <select id="productType" name="Type" onChange={changes}>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
        </label>
        {typeSwitcher[products.Type]}
      </form>
    </div>
  )
}

export default AddProducts