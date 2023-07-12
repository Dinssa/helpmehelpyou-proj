import { Link } from "react-router-dom"
import './Nav.css'
import * as userService from '../../../utilities/users-service';
import { Dropdown } from 'react-bootstrap';

export default function Nav({user, setUser}){

    function handleLogOut(){
        userService.logOut();
        setUser(null)
    }

    return (
        <nav className="bg-primary text-white">
            <div className="page-title">
                <Link to="/"><h3 className="ms-3 p-1">helpmehelpyou</h3></Link>
            </div>
            
            { user ? 
                <>
                <ul className="NavList">
                    <li className="NavItem">
                        <Link to="#"><i className="fa-solid fa-bell"></i></Link>
                    </li>
                    <li className="NavItem">
                        <Link to="#"><i className="fa-solid fa-envelope"></i></Link>
                    </li>

                    { user.roles.includes('Freelancer') ?
                        <>
                        <li className="NavItem">
                            <Link to="/projects">Projects</Link>
                            </li>
                            <li className="NavItem">
                                <Link to="/templates">Templates</Link>
                            </li>
                        </>
                        :
                        <></>
                    }

                    { user.roles.includes('Client') ?
                        <>
                        <li className="NavItem">
                            <Link to="/forms">Forms</Link>
                        </li>
                        </>
                        :
                        <></>
                    }
                </ul>
                <div>
                    { user.avatar ?
                        <div className="avatar">
                            <img src={user.avatar} alt="User avatar" className=""/>
                        </div> 
                    :   
                        <div className="default-icon">
                            <i className="fa-solid fa-user"></i>
                        </div>
                    }
                </div>
                <Dropdown id="nav-dropdown">
                    <Dropdown.Toggle variant="" id="dropdown-btn">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                        <Dropdown.Item href="" onClick={handleLogOut}>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </>
                
            :
                <ul className="NavList">
                    <li className="NavItem">
                        <Link to="/clients">Clients</Link>
                    </li>
                    <li className="NavItem">
                        <Link to="/freelancers">Freelancers</Link>
                    </li>
                    <li className="NavItem signin">
                        <Link to="/auth">Sign In</Link>
                    </li>
                </ul>
            }
            
        </nav>
    )
}