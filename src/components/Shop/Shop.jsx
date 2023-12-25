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

    useEffect( () =>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for(const id in storedCart){
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            } 
            console.log('added Product',addedProduct)
        }
        setCart(savedCart);
    }, [products])

    const handleAddtoCart = (product) =>{
        // cart.push(product);
        let newCart = [];
        // const newCart = [...cart, product];
        // if product exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

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