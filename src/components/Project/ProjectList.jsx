import './ProjectList.css'

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'

export default function ProjectList({projects, handleProjectSelect}){
    
    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    if (!projects) return null;

    return (
        <div className={`ProjectList ${isMd ? '' : 'mobile'}`}>
            <ul>
                {projects.length === 0 && <li>No results found</li>}
                {projects.map(project =>
                        <li key={project.id}>
                            <Button variant="link" block="true" className='ProjectList-project' onClick={() => handleProjectSelect(project)}>
                                <div className='ProjectList-project-name'>{project.name}</div>
                                <div className='ProjectList-project-description'>{project.desc}</div>
                            </Button>
                        </li>
                )}
            </ul>        
        </div>)
}