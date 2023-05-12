import React from 'react'
import './product.css'
const Product = ({ Product }) => {
    const typeSwitcher = {
        'DVD': <p>size： {Product.size}</p>,
        'Book': <p>weight {Product.weight}</p>,
        'Furniture': <p>Dimensions: {Product.height}x{Product.width}x{Product.length}</p>,
    };
    return (
        <div className="product">
            <input type="checkbox" className=".delete-checkbox" />
            <div className='data'>
                <p className="sku">{Product.SKU}</p>
                <p className="name">{Product.Name}</p>
                <p className="price">{Product.Price} $</p>
                {typeSwitcher[Product.Type]}
            </div>
        </div>
    )
}

export default Product