import './FormPage.css'

import { useLocation } from 'react-router-dom'

export default function FormPage(){

    const query = new URLSearchParams(useLocation().search)
    console.log(query.get('f'))

    
    return <h1>FormsPage</h1>
}