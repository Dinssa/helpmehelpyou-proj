import './NewTemplateBar.css'
import { useState, useEffect } from 'react';

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
    <div className="NewTemplateBar">
        <h5>Create a new template</h5>
        <div className='blank-template option'>
            <div>From Scratch</div>
            <div><i className="fa-regular fa-note-sticky"></i></div>
        </div>
        <div className='defaultTemplates'>
            <ul>
                {defaultTemplates.map((template, idx) =>
                    <li key={idx} className='defaultTemplateOption option'>
                        <div>{template.name}</div>
                        <div><i className={template.icon}></i></div>
                    </li>
                )}
            </ul>
        </div>
    </div>
    )
}