import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
    };

    const incrementQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
    };

    const decrementQuantity = (id) => {
        let updatedCart = cart
            .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0);
        updateCart(updatedCart);
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        updateCart(updatedCart);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) return;

        setOrderPlaced(true);

        // Clear cart after a short delay
        setTimeout(() => {
            setCart([]);
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("storage"));
        }, 500);

        // Hide order confirmation after 3 seconds
        setTimeout(() => {
            setOrderPlaced(false);
        }, 3000);
    };

    return (
        <div className="container mt-5 py-5">
            {/* Order Confirmation Modal */}
            {orderPlaced && (
                <div
                    className="modal d-flex align-items-center justify-content-center show"
                    tabIndex="-1"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1050,
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-warning text-white p-4 rounded">
                            <h4 className="text-center">Order Placed Successfully!</h4>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                                alt="Order Placed"
                                className="mx-auto d-block my-2"
                                style={{ width: "50px", height: "50px" }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {cart.length === 0 ? (
                <div className="text-center py-5 mt-5">
                    <h2>Your cart is empty!</h2>
                    <Link to="/home" className="btn btn-outline-warning mt-3">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="row">
                        {cart.map((item) => (
                            <div key={item.id} className="col-md-4 col-sm-6 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="card-img-top"
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="fw-bold text-success">${item.price}</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => decrementQuantity(item.id)}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => incrementQuantity(item.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-outline-danger mt-3"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary */}
                    <div className="mt-4 p-3 border rounded shadow-sm text-center">
                        <h4>Order Summary</h4>
                        <p>Total Items: {totalItems}</p>
                        <p>Shipping: $30.00</p>
                        <h5>
                            <strong>Total: ${(totalAmount + 30).toFixed(2)}</strong>
                        </h5>
                        <button className="btn btn-success w-40 mt-2" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default Cart;
