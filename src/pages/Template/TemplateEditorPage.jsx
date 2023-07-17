import './TemplateEditorPage.css'

import { useState, useEffect } from 'react';

// API
import { getTemplate, updateTemplate, deleteTemplate } from '../../utilities/templates-service';

export default function TemplateEditorPage(){
    // get query from url
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

    if (!query.get('q')){
        return (
            <div>
                <h1>Template Editor</h1>
                <p>No template selected</p>
            </div>
        )
    }

    return (
    <div>
        <h1>Template Editor</h1>
        <p>Template ID: {query.get('q')}</p>
        <p>Template Name: {template.name}</p>
        <p>Template Description: {template.desc}</p>
    </div>
    )
}