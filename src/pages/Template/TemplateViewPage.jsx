import './TemplateViewPage.css'

import { useState, useEffect } from 'react';

// API
import { getTemplate } from '../../utilities/templates-service';

// Components
import TemplateViewer from '../../components/Template/TemplateViewer';

export default function TemplateViewPage(){
    const query = new URLSearchParams(window.location.search);

    const [fields, setFields] = useState([])
    const [template, setTemplate] = useState({})

    useEffect(() => {
        async function fetchTemplate() {
            try {
                const fetchedTemplate = await getTemplate(query.get('q'))
                setTemplate(fetchedTemplate);
                setFields(fetchedTemplate.fields);
            } catch (err) {
                throw err;
            }
        }

        if (query.get('q')){
            fetchTemplate();
        }
    }, [])

    return (
    <div>
        <h1>{template.name}</h1>
        <p className='text-muted small'> {query.get('q')}</p>
        <p>Description: {template.desc}</p>
        <TemplateViewer fields={fields} />
    </div>
    )
}