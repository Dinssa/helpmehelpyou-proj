import './ProjectsPage.css'

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Form, Container, Row, Col } from 'react-bootstrap'

// API
import { searchProjects, createProject } from '../../utilities/projects-service';

// Components
import ProjectList from '../../components/Project/ProjectList';
import SearchBar from '../../components/global/SearchBar/SearchBar';
import ProjectDetail from '../../components/Project/ProjectDetail';
import NewProjectModal from '../../components/Project/Modals/NewProjectModal';

export default function ProjectsPage(){

    const [searchQuery, setSearchQuery] = useState('')
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);

    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    useEffect(() => {
        async function fetchProjects() {
            const fetchedProjects = await searchProjects(searchQuery);
            setProjects(fetchedProjects);
        }
        fetchProjects();
    }, [searchQuery, showNewProjectModal])

    const handleProjectSelect = (project) => {
        setSelectedProject(project)
    }

    const handleProjectCreate = (project) => {
        console.log(project)
        createProject(project)
        setShowNewProjectModal(false)
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
                                <button className='btn btn-outline-fourth projectBtn' onClick={() => setShowNewProjectModal(true)}><i class="fa-solid fa-square-plus"></i> New Project</button>
                            </div>
                            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder='Search your projects'/>
                            <ProjectList projects={projects} handleProjectSelect={handleProjectSelect}/>
                        </Col>
                        <Col xs={12} md={7} className='d-flex justify-content-center'>
                            <ProjectDetail project={selectedProject}/>
                        </Col>
                        </>
                    ) : (
                        <Col xs={12} className='d-flex justify-content-center flex-column'>
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder='Search your projects'/>
                        <ProjectList projects={projects} handleProjectSelect={handleProjectSelect} />
                        <ProjectDetail project={selectedProject}/>
                        </Col>
                    )}
                    </Row>
                </Container>
            </div>
            <NewProjectModal show={showNewProjectModal} onHide={()=>setShowNewProjectModal(false)} onSubmit={handleProjectCreate}/>
        </main>
    )
}