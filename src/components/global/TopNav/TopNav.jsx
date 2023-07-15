import './TopNav.css'
import * as userService from '../../../utilities/users-service';
import { Navbar, Nav, Dropdown, Container, Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'

export default function TopNav({user, setUser}) {

    function handleLogOut(){
        userService.logOut();
        setUser(null)
    }

    const expand = 'md';
    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Navbar expand={expand} className="bg-primary mb-3 navbar" variant='light'>
          <Container fluid>
            <Navbar.Brand href="">
                <Link to="/" className='page-title'>
                    <h3 className="p-1">helpmehelpyou</h3>
                </Link>
            </Navbar.Brand>
            { user && (
            <Nav className="ms-auto me-2 d-flex flex-row">
                    <Nav.Link href="#">
                        <li className="NavItem">
                        <Link to="#">
                            <i className="fa-solid fa-bell"></i>
                        </Link>
                        </li>
                    </Nav.Link>
            </Nav>
            )}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="bg-primary"
              style={{ maxWidth: !isMd ? '300px' : 'none' }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='text-white ms-2'>
                  <h2>helpmehelpyou</h2>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                    { user ? 
                        <>
                            { user.roles.includes('Freelancer') &&
                                <>
                                    <li className="NavItem ">
                                        <NavLink to="/projects" activeClassName="active" >Projects</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/templates" activeClassName="active">Templates</NavLink>
                                    </li>
                                </>
                            }
                            { user.roles.includes('Client') &&
                                <>
                                    <li className="NavItem">
                                        <NavLink to="/forms" activeClassName="active">Forms</NavLink>
                                    </li>
                                </>
                            }
                            {isMd ? 
                                <div className='d-flex flex-row ms-3 mt-4 mt-md-2 justify-content-center align-items-center'>
                                    { user.avatar ?
                                        <div className="avatar">
                                            <img src={user.avatar} alt="User avatar" className=""/>
                                        </div> 
                                    :   
                                        <div className="default-icon">
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                    }
                                    
                                    <div className='text-white'>
                                        <Dropdown id="nav-dropdown">
                                            <Dropdown.Toggle variant="" id="dropdown-btn">
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="">
                                                    <NavLink to="/profile" activeClassName="active">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>Profile</span>
                                                        <i className="fa-regular fa-address-card"></i>
                                                    </div>
                                                    </NavLink>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="">
                                                    <NavLink to="/settings" activeClassName="active">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>Settings</span>
                                                        <i className="fa-solid fa-gear"></i>
                                                    </div>
                                                    </NavLink>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="">
                                                    <NavLink to="#signout" activeClassName="active" onClick={handleLogOut}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>Sign Out</span>
                                                        <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                                                    </div>
                                                    </NavLink>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                             : 
                                <div className='d-flex flex-column mt-4 mt-md-2 justify-content-center align-items-center border-top pt-4'>
                                    <div className='d-flex flex-row align-items-center mt-2 mb-3'>
                                        { user.avatar ?
                                            <div className="avatar">
                                                <img src={user.avatar} alt="User avatar" className=""/>
                                            </div> 
                                        :   
                                            <div className="default-icon">
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                        }
                                        <div className='text-white ms-3'>
                                            <h4>{user.name}</h4>
                                        </div>
                                    </div>
                                    <li className="NavItem">
                                        <NavLink to="/profile" activeClassName="active" className="m-0 mt-2">Profile</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/settings" activeClassName="active" className="m-0" >Settings</NavLink>
                                    </li>   
                                    <li className="NavItem">
                                        <NavLink to="" onClick={handleLogOut} activeClassName="active" className="m-0">Sign Out</NavLink>
                                    </li>                                   
                                </div>
                            }
                        </>
                    :
                        <>
                            <Nav.Link>
                                <li className="NavItem">
                                    <NavLink to="/clients" activeClassName="active">Clients</NavLink>
                                </li>
                            </Nav.Link>
                            <Nav.Link>
                                <li className="NavItem">
                                    <NavLink to="/freelancers" activeClassName="active">Freelancers</NavLink>
                                </li>
                            </Nav.Link>
                            <Nav.Link>
                                <li className="NavItem signin">
                                    <Link to="/auth">Sign In</Link>
                                </li>
                            </Nav.Link>
                        </>
                    }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
}