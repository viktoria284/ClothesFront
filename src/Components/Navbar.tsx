import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useAppDispatch, useAppSelector } from '../Store/Hooks';
import { logout, selectAuth } from '../Store/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';

  const MyNavbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectAuth).user;

    const handleBrandClick = () => {
      navigate('/');
    };
  
    const handleUserClick = () => {
      navigate('/cart');
    };
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/');
    };
    
    return (
      <Navbar className="bg-primary" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
          ENTENDER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            {user ? (
              <>
                <Navbar.Text>
                  Signed in as: <a onClick={handleUserClick} style={{ cursor: 'pointer' }}>{user.userName}</a>
                </Navbar.Text>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default MyNavbar;