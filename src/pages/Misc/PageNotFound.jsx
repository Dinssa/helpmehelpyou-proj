import './PageNotFound.css'

import { Link } from 'react-router-dom'

export default function PageNotFound(){
    return (
    <>
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>

        <p>Try going back to the previous page or go to our <Link to="/">homepage</Link>.</p>        
    </>
    )
}