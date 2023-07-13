import { Link, NavLink } from "react-router-dom"
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

                    { user.roles.includes('Freelancer') ?
                        <>
                            <li className="NavItem ">
                                <NavLink to="/projects" activeClassName="active">Projects</NavLink>
                            </li>
                            <li className="NavItem">
                                <NavLink to="/templates" activeClassName="active">Templates</NavLink>
                            </li>
                        </>
                        :
                        <></>
                    }

                    { user.roles.includes('Client') ?
                        <>
                        <li className="NavItem">
                            <NavLink to="/forms" activeClassName="active">Forms</NavLink>
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
                        <NavLink to="/clients" activeClassName="active">Clients</NavLink>
                    </li>
                    <li className="NavItem">
                        <NavLink to="/freelancers" activeClassName="active">Freelancers</NavLink>
                    </li>
                    <li className="NavItem signin">
                        <Link to="/auth">Sign In</Link>
                    </li>
                </ul>
            }
            
        </nav>
    )
}