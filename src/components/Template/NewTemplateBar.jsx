import './NewTemplateBar.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { defaultIndex } from '../../utilities/templates-service';

export default function NewTemplateBar(){

    const [defaultTemplates, setDefaultTemplates] = useState([])

    

    useEffect(() => {
        async function getDefaultIndex() {
        setDefaultTemplates(await defaultIndex());
    }
        getDefaultIndex();
    }, []);

    return (
        <div className='NewTemplateBar'>
             <div className="TemplateBar">
                <h5>Create a new template</h5>
                <Link to='/template/editor' className='link'>
                    <div className='blank-template option'>
                        <div>From Scratch</div>
                        <div><i className="fa-regular fa-note-sticky"></i></div>
                    </div>
                </Link>
                <div className='defaultTemplates'>
                    <ul>
                        {defaultTemplates.map((template, idx) =>
                            <Link key={template.id} to={`/template/editor?q=${template.id}`} className='link'>
                                <li key={idx} className='defaultTemplateOption option'>
                                    <div>{template.name}</div>
                                    <div><i className={template.icon}></i></div>
                                </li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </div>
   
    )
}