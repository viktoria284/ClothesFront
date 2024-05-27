import { useState, useEffect } from 'react';
import './CardList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export interface Product {
    productId: number;
    productName: string;
    /*description: string;*/
    image: string;
    price: number; 
}

interface CardListProps {
  onProductsLoaded: (products: Product[]) => void;
}

function CardList({ onProductsLoaded }: CardListProps) {
    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:7200/api/products/forCard')
      .then(response => response.json())
      .then(data => {
        console.log('Products:', data);
        setProducts(data);
        onProductsLoaded(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [onProductsLoaded]);


  return (
    <div className="card-list">
        {products.map(product => (
            <Card key={product.productId}  className="product-card">
                <div className="card-img-container">
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${product.image}`} />
                </div>
                <Link to={`/product/${product.productId}`} className="product-link">
                <Card.Body>
                  <Card.Title className="product-name">{product.productName}</Card.Title>
                  <Card.Text className="price">${product.price.toFixed(2)}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
        ))}
    </div>
);
}

export default CardList;
