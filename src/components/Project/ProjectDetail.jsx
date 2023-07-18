import './ProjectDetail.css'

// API
import { getForm } from '../../utilities/forms-service';
import { userIndex as TemplateUserIndex } from '../../utilities/templates-service';
import { useEffect, useState } from 'react';

export default function ProjectDetail({project}){

    const [forms, setForms] = useState([]);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        async function fetchForms() {
            if (!project) return;
            const fetchedForms = await Promise.all(project.forms.map(form => getForm(form)))
            setForms(fetchedForms);
        }
        async function fetchTemplates() {
            if (!project) return;
            const fetchedTemplates = await TemplateUserIndex();
            setTemplates(fetchedTemplates);
        }
        fetchForms();
        fetchTemplates();
    }, [project])

    if (!project) return (
        <div className='NullProjectDetail'>
            <p>Select a project<br/>to view details</p>
        </div>
    )

    console.log(forms)
    console.log(templates)

    function handleAddForm() {
        console.log('add form')
    }

    return (
        <div className='ProjectDetail d-flex flex-column'>
            <div className='ProjectDetail-header'>
                <div className='ProjectDetail-header-name'><h1>{project.name}</h1></div>
                <div className='ProjectDetail-header-actions'>
                    <ul>
                        { project.links?.website && <li><a href={project.links.website} target='_blank' rel='noreferrer' className='link-third'><i class="fa-solid fa-globe"></i></a></li>}
                        { project.links?.google_drive && <li><a href={project.links.google_drive} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-google-drive"></i></a></li>}
                        { project.links?.facebook && <li><a href={project.links.facebook} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-facebook"></i></a></li>}
                        { project.links?.instagram && <li><a href={project.links.instagram} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-instagram"></i></a></li>}
                        { project.links?.twitter && <li><a href={project.links.twitter} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-twitter"></i></a></li>}
                        { project.links?.other_link && <li><a href={project.links.other_link} target='_blank' rel='noreferrer' className='link-third'><i class="fa-solid fa-link"></i></a></li>}
                    </ul>
                </div>
            </div>
            <hr/>
            <p className='text-muted'>{project.desc}</p>
            <div className='ProjectDetail-forms d-flex flex-column'>
                <div className='ProjectDetail-forms-header d-flex justify-content-between'>
                    <h4>Project Forms</h4>
                    <button className='btn btn-outline-fourth projectBtn' onClick={handleAddForm}><i class="fa-solid fa-square-plus"></i> Add Form</button>
                </div>
                <div className='ProjectDetail-forms-list'>
                    <ul>
                        {forms.length === 0 && <li>No forms found</li>}
                        {forms.map(form => <li key={form.id}>{form.name}</li>)}
                    </ul>
                </div>
            </div>
            <div className='ProjectDetail-controls'>
                <div>
                    <button className='btn btn-outline-info projectBtn'><i class="fa-solid fa-square-plus"></i> Edit</button>
                    <button className='btn btn-outline-fourth projectBtn ms-2'><i class="fa-solid fa-copy"></i> Clone</button>
                </div>
                <div>
                <button className='btn btn-outline-warning projectBtn'><i class="fa-solid fa-box-archive"></i> Archive</button>
                <button className='btn btn-outline-danger projectBtn ms-2'><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </div>
        </div>
    )
}