import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import './CartPage.css';
import { useAppSelector } from '../Store/Hooks';
import MyNavbar from '../Components/Navbar';

interface CartItem {
  cartItemId: string;
  productVariantId: string;
  productName: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userId = useAppSelector(state => state.auth.user?.userId);

  useEffect(() => {
    if (userId) {
      axios.get(`https://localhost:7200/api/cart/${userId}`)
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [userId]);

  const handleRemoveFromCart = (cartItemId: string) => {
    axios.delete(`https://localhost:7200/api/cart/${cartItemId}`)
      .then(response => {
        setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleQuantityChange = (cartItemId: string, change: number) => {
    const item = cartItems.find(item => item.cartItemId === cartItemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity < 1) return;
  
      // Проверка доступного количества на складе
      axios.get(`https://localhost:7200/api/cart/productVariant/${item.productVariantId}`)
        .then(response => {
          const availableStock = response.data.stockQuantity;
          if (availableStock < 1) { ////проблемы!!!!!
            alert('Not enough stock available');
            return;
          }
  
          // Отправка запроса на изменение количества
          axios.put(`https://localhost:7200/api/cart/quantity/${cartItemId}`, newQuantity, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log('Quantity update response:', response.data);
            setCartItems(cartItems.map(item => {
              if (item.cartItemId === cartItemId) {
                return { ...item, quantity: newQuantity };
              }
              return item;
            }));
          })
          .catch(error => {
            console.error('Error updating quantity:', error);
            alert('Error updating quantity: ' + error.message);
          });
        })
        .catch(error => {
          console.error('Error fetching stock quantity:', error);
          alert('Error fetching stock quantity: ' + error.message);
        });
    }
  };
  

  return (
    <div>
      <MyNavbar />
      <Container className="cart-page">
        <h1>Your Cart</h1>
        <Row className="card-list">
          {cartItems.map(item => (
            <Card key={item.cartItemId} className="cart-card">
              <div className="card-img-container">
                <Card.Img variant="top" src={`data:image/jpeg;base64,${item.image}`} />
              </div>
              <Card.Body>
                <div className="card-header">
                  <Card.Title>{item.productName}</Card.Title>
                  <Card.Text className="price">${item.price.toFixed(2)}</Card.Text>
                </div>
                <Card.Text>Size: {item.size}</Card.Text>
                <div className="quantity-control">
                  <Button variant="outline-primary" onClick={() => handleQuantityChange(item.cartItemId, -1)} disabled={item.quantity <= 1}>-</Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button variant="outline-primary" onClick={() => handleQuantityChange(item.cartItemId, 1)}>+</Button>
                </div>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.cartItemId)}>Remove</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
