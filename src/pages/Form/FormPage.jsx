import './FormPage.css'

import { useLocation } from 'react-router-dom'

// API
import { getFormByUUID } from '../../utilities/forms-service';
import { useEffect, useState } from 'react';

// Components
import TemplateViewer from '../../components/Template/TemplateViewer';

export default function FormPage(){

    const query = new URLSearchParams(useLocation().search);
    const formUUID = query.get('f');

    const [form, setForm] = useState(null);
    const [formFields, setFormFields] = useState(null);
    const [formData, setformData] = useState(null);

    useEffect(() => {
        async function getFormById(){
            const form = await getFormByUUID(formUUID);
            console.log(form);
            setForm(form);
            setFormFields(form.fields);
        }
        getFormById();
    }, [formUUID])

    const handleOnSubmit = (form) => {
        console.log(form)
    }

    return (
        <main className="FormPage pt-5">
            <TemplateViewer fields={formFields} disable={false} onSubmit={handleOnSubmit} />
        </main>
    )
}