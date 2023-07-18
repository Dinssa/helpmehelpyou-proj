import './ProjectsPage.css'

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Form, Container, Row, Col } from 'react-bootstrap'

// API
import {    searchProjects, 
            createProject, 
            deleteProject, 
            archiveProject, 
            unarchiveProject 
    } from '../../utilities/projects-service';

// Components
import ProjectList from '../../components/Project/ProjectList';
import SearchBar from '../../components/global/SearchBar/SearchBar';
import ProjectDetail from '../../components/Project/ProjectDetail';
import NewProjectModal from '../../components/Project/Modals/NewProjectModal';

export default function ProjectsPage(){

    const [searchQuery, setSearchQuery] = useState('')
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [showNewProjectModal, setNewProjectModal] = useState(false);

    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    useEffect(() => {
        async function fetchProjects() {
            const fetchedProjects = await searchProjects(searchQuery);
            setProjects(fetchedProjects);
        }
        fetchProjects();
    }, [searchQuery, showNewProjectModal, selectedProject])

    const handleProjectSelect = (project) => {
        setSelectedProject(project)
    }

    const handleProjectCreate = (project) => {
        createProject(project)
        setNewProjectModal(false)
    }

    const handleDeleteProject = (id) => {
        deleteProject(id)
        setSelectedProject(null)
    }

    const handleArchiveProject = (id) => {
        archiveProject(id)
        setSelectedProject(null)
    }

    const handleUnarchiveProject = (id) => {
        unarchiveProject(id)
        setSelectedProject(null)
    }

    return (
        <main className="ProjectsPage">
            <div className={`${isMd ? 'medium-screen' : 'small-screen'}`}>
                <Container fluid>
                    <Row>
                    {isMd ? (
                        <>
                        <Col xs={12} md={5} className='d-flex align-content-center flex-column'>
                            <div className='d-flex justify-content-end me-2 mb-2'>
                                <button className='btn btn-outline-fourth projectBtn' onClick={() => setNewProjectModal(true)}><i class="fa-solid fa-square-plus"></i> New Project</button>
                            </div>
                            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder='Search your projects'/>
                            <ProjectList projects={projects} handleProjectSelect={handleProjectSelect}/>
                        </Col>
                        <Col xs={12} md={7} className={`d-flex justify-content-center ${selectedProject === null ? '' : ''}`}>
                            <ProjectDetail project={selectedProject} onDelete={handleDeleteProject} onArchive={handleArchiveProject} onUnarchive={handleUnarchiveProject}/>
                        </Col>
                        </>
                    ) : (
                        <Col xs={12} className='d-flex justify-content-center flex-column pb-3'>
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder='Search your projects'/>
                        <ProjectList projects={projects} handleProjectSelect={handleProjectSelect} />
                        <div className='d-flex justify-content-end me-2 mb-3'>
                            <button className='btn btn-outline-fourth projectBtn' onClick={() => setNewProjectModal(true)}><i class="fa-solid fa-square-plus"></i> New Project</button>
                        </div>
                        <ProjectDetail project={selectedProject} onDelete={handleDeleteProject} onArchive={handleArchiveProject} onUnarchive={handleUnarchiveProject}/>
                        </Col>
                    )}
                    </Row>
                </Container>
            </div>
            <NewProjectModal show={showNewProjectModal} onHide={()=>setNewProjectModal(false)} onSubmit={handleProjectCreate}/>
        </main>
    )
}