import { Link } from "react-router-dom"

export default function Nav(){
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/orders">Order History</Link>
                </li>
                <li>
                    <Link to="/orders/new">New Order</Link>
                </li>
            </ul>
        </nav>
    )
}