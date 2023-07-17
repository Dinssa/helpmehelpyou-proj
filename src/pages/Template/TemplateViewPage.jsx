import './TemplateViewPage.css'

import { useState, useEffect } from 'react';

// API
import { getTemplate } from '../../utilities/templates-service';

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
        <h1>Template View</h1>
        <p>Template ID: {query.get('q')}</p>
        <p>Template Name: {template.name}</p>
        <p>Template Description: {template.desc}</p>
    </div>
    )
}