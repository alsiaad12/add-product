import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Product from "./product";
import axios from 'axios';

const Home = () => {
    let nav = useNavigate();
    let [db_products, setDb_products] = useState([]);
    const routeChange = () => {
        const path = "/add-product";
        nav(path);
    };
    const deleteProduct = () => {
        axios.get('http://localhost/sql_delete.php')
    }
    useEffect(() => {
        console.log('called')
        axios.get('http://localhost/sql_get.php').then(response => setDb_products(response.data))
      },[])
    return (
        <div>
            <header>
                <h1 className="page-title">Product List</h1>
                <div className="btn-container">
                    <button className="add-product-btn" onClick={routeChange} >ADD</button>
                    <button className="mass-delete-btn">MASS DELETE</button>
                </div>
            </header>
            {db_products.map(data => <Product key={data.sku} Product={data} />)}
        </div>
    );
};

export default Home;