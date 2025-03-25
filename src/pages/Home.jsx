import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then(response => {
                setLoading(false);
                setError("");
                setProducts(response.data.products);
                localStorage.setItem("viewedProducts", JSON.stringify(response.data.products)); // Store products
            })
            .catch(() => {
                setLoading(false);
                setError("Something Went Wrong");
                setProducts([]);
            });
    }, []);

    return (
        <div className="container py-5 mt-5">
            <h3 className="text-center">"Quality Products, Great Prices – Start Shopping Now!"</h3>
            {loading && (
                <div className="loading-container">
                    <div className="wave-loader">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <p className="loading-text mt-5">Loading, please wait...</p>
                </div>
            )}
            {error && <p className="text-danger text-center">{error}</p>}

            <div className="row mt-4 custom-grid"> 
                {products.map(product => (
                    <div key={product.id} className="col-12 col-6 col-md-4 col-lg-2 custom-col">
                        <Link to={`/productDetails/${product.id}`}>
                            <div className="card h-100 shadow-sm">
                                <img src={product.thumbnail} alt={product.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body d-flex flex-column p-2">
                                    <h6 className="card-title mb-1" style={{ fontSize: "14px" }}>{product.title.slice(0, 12)}...</h6>
                                    <p className="card-text text-muted" style={{ fontSize: "12px", height: "40px", overflow: "hidden" }}>{product.description.slice(0, 45)}...</p>
                                    <p className="text-success fw-bold mb-1" style={{ fontSize: "14px" }}>${product.price}</p>
                                    <Link to={`/productDetails/${product.id}`} className="btn btn-dark btn-sm">View</Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
