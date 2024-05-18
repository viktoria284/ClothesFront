import '../styles.css';
import CardList, { Product } from '../Components/CardList';
import '../Components/CardList.css';
import { useState } from 'react';
import MyNavbar from '../Components/Navbar';

const MainPage = () => {
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  
  return (
    <div>
      <MyNavbar />
      <div className='mainPage'>
        <div className='container'>
          <div className="main-title">
            <h1>Main Page</h1>
          </div>
          <CardList onProductsLoaded={setLoadedProducts} />
          <p>{`Loaded products: ${loadedProducts.length}`}</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
