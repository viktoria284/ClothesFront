import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useAppSelector } from '../Store/Hooks';
import { selectAuth } from '../Store/AuthSlice';
import { Link } from 'react-router-dom';

  const MyNavbar: React.FC = () => {
    const { user } = useAppSelector(selectAuth);
    
    return (
      <Navbar className="bg-primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Our Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Navbar.Text>
              {user?.userName ? (
                <>Signed in as: <a href="#profile">{user.userName}</a></>
              ) : (
                <Link to="/login">Sign in</Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default MyNavbar;