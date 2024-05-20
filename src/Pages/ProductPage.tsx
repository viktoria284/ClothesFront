import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './ProductPage.css';

interface ProductVariant {
  productVariantId: string;
  color: string;
  size: string;
  stockQuantity: number;
}

interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

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
    const cartItem = {
      productId: product!.productId,
      productVariantId: product!.variants.find(v => v.color === selectedColor && v.size === selectedSize)!.productVariantId,
      quantity: 1, // Assuming 1 item for simplicity
      price: product!.price,
    };

    axios.post('https://localhost:7200/api/cart', cartItem)
      .then(response => {
        alert('Product added to cart!');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const availableColors = product ? Array.from(new Set((product.variants || []).map(v => v.color))) : [];
  const availableSizes = selectedColor && product ? (product.variants || []).filter(v => v.color === selectedColor).map(v => v.size) : [];
  
  return (
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
            <Form.Group controlId="colorSelect">
              <Form.Label>Color</Form.Label>
              <Form.Control as="select" value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
                <option value="">Select a color</option>
                {availableColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="sizeSelect">
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)} disabled={!selectedColor}>
                <option value="">Select a size</option>
                {availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleAddToCart} disabled={!selectedColor || !selectedSize}>
              Add to Cart
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
