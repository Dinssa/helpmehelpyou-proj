import { Link } from "react-router-dom"
import './Nav.css'
import * as userService from '../../../utilities/users-service';

export default function Nav({user, setUser}){

    function handleLogOut(){
        userService.logOut();
        setUser(null)
    }


    return (
        <nav>
            <ul className="NavList">
                <li className="NavItem">
                    <Link to="/orders">Order History</Link>
                </li>
                <li className="NavItem">
                    <Link to="/orders/new">New Order</Link>
                </li>
            </ul>
            <ul className="AccountList">
                <li className="NavItem">
                    <span>Welcome, {user.name}</span>
                </li>
                <li className="NavItem">
                    <Link to="" onClick={handleLogOut}>Log Out</Link>
                </li>
            </ul>
        </nav>
    )
}