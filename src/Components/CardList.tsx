import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardList.css';
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
            <Card key={product.productId} style={{ width: '18rem' }}>
                <div className="card-img-container">
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${product.image}`} />
                </div>
                <Card.Body>
                  <div className="card-header">
                    <Card.Title>{product.productName}</Card.Title>
                  </div>
                  {/* <Card.Text>{product.description}</Card.Text> */}
                  <Card.Text className="price">${product.price.toFixed(2)}</Card.Text>
                  <Link to={`/product/${product.productId}`}>
                      <Button variant="primary">View Product</Button>
                  </Link>
                </Card.Body>
            </Card>
        ))}
    </div>
);
}

export default CardList;
