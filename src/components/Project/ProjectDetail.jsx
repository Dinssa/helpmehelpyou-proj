import './ProjectDetail.css'

// API
import { getForm } from '../../utilities/forms-service';
import { userIndex as TemplateUserIndex } from '../../utilities/templates-service';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'

// Components
import DeleteProjectModal from './Modals/DeleteProjectModal';
import ArchiveProjectModal from './Modals/ArchiveProjectModal';
import UnarchiveProjectModal from './Modals/UnarchiveProjectModal';
import AddFormModal from './Modals/AddFormModal';

export default function ProjectDetail({project, onDelete, onArchive, onUnarchive, onAddForm}){

    useEffect(() => {
        console.log('updated project')
    }, [project])

    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    const [forms, setForms] = useState([]);
    const [templates, setTemplates] = useState([]);

    const [showDeleteProjectModal, setDeleteProjectModal] = useState(false);
    const [showArchiveProjectModal, setArchiveProjectModal] = useState(false);
    const [showUnarchiveProjectModal, setUnarchiveProjectModal] = useState(false);
    const [showAddFormModal, setAddFormModal] = useState(false);

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
        <div className={`NullProjectDetail ${isMd ? '' : 'mobile'}`}>
            <p>Select a project<br/>to view details</p>
        </div>
    )

    function handleDeleteProject() {
        onDelete(project.id)
    }

    function handleArchiveProject(){
        onArchive(project.id)
    }

    function handleUnarchiveProject(){
        onUnarchive(project.id)
    }

    function handleAddFormToProject(templateId, formName) {
        onAddForm(templateId, formName)
    }

    const handleCopyUrlClick = async (shortUrl) => {
        await navigator.clipboard.writeText(shortUrl);
    };
    

    return (
        <div className='ProjectDetail d-flex flex-column'>
            <div className='ProjectDetail-header w-100'>
                <div className='ProjectDetail-header-name'><h1>{project.name}</h1></div>
                <div className='ProjectDetail-header-actions w-100 d-flex justify-content-between align-items-center'>
                    <ul>
                        { project.links?.website && <li><a href={project.links.website} target='_blank' rel='noreferrer' className='link-third'><i class="fa-solid fa-globe"></i></a></li>}
                        { project.links?.google_drive && <li><a href={project.links.google_drive} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-google-drive"></i></a></li>}
                        { project.links?.facebook && <li><a href={project.links.facebook} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-facebook"></i></a></li>}
                        { project.links?.instagram && <li><a href={project.links.instagram} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-instagram"></i></a></li>}
                        { project.links?.twitter && <li><a href={project.links.twitter} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-twitter"></i></a></li>}
                        { project.links?.other_link && <li><a href={project.links.other_link} target='_blank' rel='noreferrer' className='link-third'><i class="fa-solid fa-link"></i></a></li>}
                    </ul>
                    <p className='text-warning text-uppercase small letter-spacing-2 fw-bold'>{project.archived ? 'Archived' : ''}</p>
                </div>
            </div>
            <hr/>
            <p className='text-muted'>{project.desc}</p>
            <div className='ProjectDetail-forms d-flex flex-column'>
                <div className='ProjectDetail-forms-header d-flex justify-content-between'>
                    <h4>Project Forms</h4>
                    <button className='btn btn-outline-fourth projectBtn' onClick={() => setAddFormModal(true)}><i class="fa-solid fa-square-plus"></i> Add Form</button>
                </div>
                <div className='ProjectDetail-forms-list'>
                    <ul className='mt-2'>
                        {forms.length === 0 && <li>No forms found</li>}
                        {forms.map(form => 
                            <li key={form.id}>
                                <div className='d-flex justify-content-between align-items-center my-2'>
                                    <div className='d-flex align-items-center'>
                                        <a href={form.shortUrl} className='formTitle link-secondary fw-bold link-underline link-underline-opacity-0'>{form.name}</a>
                                        <div className='text-muted small ms-2'>({form.uuid})</div>
                                    </div>
                                    <div>
                                        <button className='btn copyBtn' onClick={() => handleCopyUrlClick(form.shortUrl)}><i class="fa-solid fa-link"></i> Copy URL</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='ProjectDetail-controls'>
                <div>
                    <button className='btn btn-outline-info projectBtn'><i class="fa-solid fa-square-plus"></i> Edit</button>
                    <button className='btn btn-outline-fourth projectBtn ms-2'><i class="fa-solid fa-copy"></i> Clone</button>
                </div>
                <div>
                    {project.archived ? (
                    <button onClick={() => setUnarchiveProjectModal(true)} className='btn btn-outline-warning projectBtn'>
                        <i class="fa-solid fa-box-archive"></i> Restore
                    </button>
                    ) : (
                    <button onClick={() => setArchiveProjectModal(true)} className='btn btn-outline-warning projectBtn'>
                        <i class="fa-solid fa-box-archive"></i> Archive
                    </button>
                    )}
                    <button onClick={() => setDeleteProjectModal(true)} className='btn btn-outline-danger projectBtn ms-2'><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </div>
            <DeleteProjectModal 
                show={showDeleteProjectModal}
                onHide={() => setDeleteProjectModal(false)}
                onSubmit={handleDeleteProject}
                project={project}
            />
            <ArchiveProjectModal
                show={showArchiveProjectModal}
                onHide={() => setArchiveProjectModal(false)}
                onSubmit={handleArchiveProject}
                project={project}
            />
            <UnarchiveProjectModal
                show={showUnarchiveProjectModal}
                onHide={() => setUnarchiveProjectModal(false)}
                onSubmit={handleUnarchiveProject}
                project={project}
            />
            <AddFormModal
                show={showAddFormModal}
                onHide={() => setAddFormModal(false)}
                onSubmit={handleAddFormToProject}
                project={project}
                templates={templates}
            />
        </div>
    )
}