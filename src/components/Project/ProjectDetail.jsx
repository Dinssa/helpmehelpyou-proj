import './ProjectDetail.css'

// API
import { getForm } from '../../utilities/forms-service';

export default function ProjectDetail({project}){

    if (!project) return (
        <div className='NullProjectDetail'>
            <p>Select a project to view details</p>
        </div>
    )

    console.log(project.forms)

    const forms = project.forms.map(form => {
        return getForm(form)
    }) 
    
    console.log(forms)

    return (
        <div className='ProjectDetail'>
            <div className='ProjectDetail-header'>
                <div className='ProjectDetail-header-name'><h1>{project.name}</h1></div>
                <div className='ProjectDetail-header-actions'>
                    <ul>
                        { project.links.website && <li><a href={project.links.website} target='_blank' rel='noreferrer' className='link-third'><i class="fa-solid fa-globe"></i></a></li>}
                        { project.links.google_drive && <li><a href={project.links.google_drive} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-google-drive"></i></a></li>}
                        { project.links.facebook && <li><a href={project.links.facebook} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-facebook"></i></a></li>}
                        { project.links.instagram && <li><a href={project.links.instagram} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-instagram"></i></a></li>}
                        { project.links.twitter && <li><a href={project.links.twitter} target='_blank' rel='noreferrer' className='link-third'><i class="fa-brands fa-twitter"></i></a></li>}
                        { project.links.other_link && <li><a href={project.links.other_link} target='_blank' rel='noreferrer' className='link-third'><i class="fa-solid fa-link"></i></a></li>}
                    </ul>
                </div>
            </div>
            <hr/>
            <p className='text-muted'>{project.desc}</p>
            <div className='ProjectDetail-forms d-flex flex-column'>
                <div className='ProjectDetail-forms-header d-flex justify-content-between'>
                    <h4>Project Forms</h4>
                    <button className='btn btn-outline-fourth'><i class="fa-solid fa-square-plus"></i> Add Form</button>
                </div>
                <div className='ProjectDetail-forms-form'>
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    )
}