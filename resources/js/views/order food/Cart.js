import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
    const [cart, setCart] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [currentRestaurant, setCurrentRestaurant] = useState();

    // logged in user
    const user = useSelector(state => state.usersReducer.user);
    const deleted = useSelector(state => state.ordersReducer.deleted);
    const dispatch = useDispatch();

    const history = useHistory();

    console.log({ 'restaurant': currentRestaurant, 'user': user });

    useEffect(() => {
        axios.get('/api/getcart', { params: { user: user && user.id } })
            .then(response => {
                console.log(response.data);
                setCart(response.data);
                setCurrentRestaurant(response.data.items.map(item => item.menu_item.restaurant_id)[0]);
                dispatch({ type: "DELETE_ONE", deleted: false })
            })
            .catch(error => {
                console.log(error);
            })
    }, [user, deleted])

    const order = () => {
        console.log('pressed order');
        dispatch({ type: "RESTAURANT", id: currentRestaurant })
        history.push('/payment');
    }

    const deleteOne = ({ item }) => {
        console.log(item.menu_item.id);
        axios.post('/api/deleteone', { user: user.id, menu_item: item.menu_item.id })
            .then(response => {
                console.log(response);
                dispatch({ type: "DELETE_ONE", deleted: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <h1>Cart</h1>
            {!cart ? 'Nothing added to cart yet' : cart.items.map((item, index) => (
                <div key={index}>
                    <strong>{item.menu_item.title}</strong>
                    <p>{item.menu_item.description}</p>
                    <p>{item.menu_item.price} DKK</p>
                    <button onClick={() => deleteOne({ item })} className="green-button">Delete</button>
                </div>
            ))}
            <br />
            <h3>Total: {cart.total} DKK</h3>
            <br />
            <button className="green-button" onClick={order}>Order</button>
        </div >
    )
}

export default Cart;

if (document.getElementById('cart')) {
    ReactDOM.render(<Cart />, document.getElementById('cart'));
}