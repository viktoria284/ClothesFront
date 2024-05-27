import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './ProductPage.css';
import { useAppSelector } from '../Store/Hooks';
import MyNavbar from '../Components/Navbar';

interface ProductVariant {
  productVariantId: string;
  size: string;
  stockQuantity: number;
}

interface Product {
  productId: number;
  productName: string;
  description: string;
  color: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const user = useAppSelector((state: any) => state.auth.user);

  useEffect(() => {
    axios.get(`https://localhost:7200/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const productVariant = product!.variants.find(v => v.size === selectedSize);
    if (!productVariant) {
      alert('Selected size is not available.');
      return;
    }
    //проверка по количеству!!!!
    if (quantity > productVariant.stockQuantity) {
      alert('Requested quantity is not available.');
      return;
    }
    
    const cartItem = {
      userId: user.userId,
      productVariantId: productVariant.productVariantId,
      size: selectedSize,
      quantity,
    };

    {/*axios.post('https://localhost:7200/api/cart/toCart', cartItem)
    console.log('User:', user);
  console.log('Cart Item to be sent:', cartItem);*/}

    axios.post('https://localhost:7200/api/cart/toCart', cartItem)
      .then(response => {
        alert('Product added to cart!');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const availableSizes = product.variants.map(variant => variant.size);

  return (
    <div>
    <MyNavbar />
    <Container className="product-page">
      <Row>
        <Col md={6}>
          {product.images.map((image, index) => {
            const imageUrl = `data:image/png;base64,${image}`;
            return <Image key={index} src={imageUrl} alt={product.productName} fluid />;
          })}
        </Col>
        <Col md={6}>
          <h1>{product.productName}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
          <Form>
            <Form.Group controlId="sizeSelect">
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                <option value="">Select a size</option>
                {availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="quantity-control">
              <Button variant="outline-primary" onClick={() => handleQuantityChange(-1)}>-</Button>
              <span className="quantity">{quantity}</span>
              <Button variant="outline-primary" onClick={() => handleQuantityChange(1)}>+</Button>
            </div>
            <Button variant="primary" onClick={handleAddToCart} disabled={!selectedSize}>
              Add to Cart
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ProductPage;
