import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardList.css';

interface Product {
    productId: number;
    productName: string;
    description: string;
    imageData: string;
}

function CardList() {
    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:7200/api/Products/wImages')
      .then(response => response.json())
      .then(data => {
        console.log('Products:', data);
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);


  return (
    <div className="card-list">
        {products.map(product => (
            <Card key={product.productId} style={{ width: '18rem' }}>
                <div className="card-img-container">
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${product.imageData}`} />
                </div>
                <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        ))}
    </div>
);
}

export default CardList;
