import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProducts from './add-products/AddProducts';
import Home from './home/Home';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add-product' element={<AddProducts />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;