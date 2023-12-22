import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [products, setProducsts] = useState([])
    const [cart, setCart] = useState([])

    useEffect( () =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducsts(data))
    },[])

    useEffect( ()=> {
        const storedCart = getShoppingCart();
        console.log(storedCart);
    }, [])

    const handleAddtoCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                                    key={product.id}
                                    product={product}
                                    handleAddtoCart={handleAddtoCart}
               
                                    ></Product>)
                }
            </div>
            <div className="order-summary">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;