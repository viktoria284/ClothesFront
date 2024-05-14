import '../styles.css';
import CardList from '../Components/CardList';
import '../Components/CardList.css';

const MainPage = () => {
  return (
    <div className='container'>
      <div className="main-title">
        <h1>Main Page</h1>
      </div>
      <CardList/>
    </div>
  );
}

export default MainPage;
