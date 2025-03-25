import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

        //  If no products were viewed, show "No Product Selected."
        if (!id) {
            setLoading(false);
            setProduct(null);
            return;
        }

        //  If a product ID is available, fetch the details
        if (id) {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                    setError(false);
                })
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id]);

    //  No product selected
    if (!id && !product) {
        return (
            <div className="text-center py-5 mt-5">
                <h2>No Product Selected.</h2>
                <p>Please visit the home page and select a product.</p>
                <Link to="/home" className="btn btn-outline-secondary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    //  Loading state
    if (loading) {
        return <p className="text-center py-5 mt-5">Loading product details...</p>;
    }

    //  Error state
    if (error || !product) {
        return (
            <div className="text-center py-5 mt-5">
                <h2>Product Not Found.</h2>
                <Link to="/home" className="btn btn-outline-secondary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...product,
                quantity: 1,
                image: product.thumbnail 
            });
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("storage")); 
    };



    return (
        <div>
            <div className="container py-5 mt-5">
                <h1 className="text-center mb-4 py-4 mt-2">Everything You Need, Right at Your Fingertips!</h1>
                <div className="row border border-secondary mt-2 p-3">
                    <div className="col-md-6">
                        <img className="img-fluid" src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className="col-md-6">
                        <h3 className="p-2">{product.title}</h3>
                        <span className="bg-info text-light p-1">Price: ${product.price}</span>
                        <h4 className="py-3">Category: {product.category}</h4>
                        <p className="p-2">{product.description}</p>
                        <button className="btn btn-outline-warning px-3 py-2" onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
