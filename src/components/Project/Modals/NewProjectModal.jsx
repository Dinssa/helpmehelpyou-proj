import { Modal, Button, Form, Collapse } from 'react-bootstrap';
import { useState } from 'react';

export default function NewProjectModal(props){

    const [showLinks, setShowLinks] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectLinks, setProjectLinks] = useState({})

    const handleShowLinks = () => setShowLinks(!showLinks);
    const handleProjectNameChange = (e) => setProjectName(e.target.value);
    const handleProjectDescriptionChange = (e) => setProjectDescription(e.target.value);

    const handleProjectLinksChange = (e) => {
        setProjectLinks({
            ...projectLinks,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log('submitted')
        let data = {};
        data.name = projectName;
        data.desc = projectDescription;
        data.links = projectLinks;
        console.log(data)
        props.onSubmit(data)
    }

    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header className='bg-primary'>
                <Modal.Title className='text-white'>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type='text' placeholder='Project Name' value={projectName} onChange={handleProjectNameChange} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control as='textarea' placeholder='Project Description' value={projectDescription} onChange={handleProjectDescriptionChange}/>
                    </Form.Group>
                    <Button variant="fourth" className='mb-3 text-white' onClick={handleShowLinks}>
                    {showLinks ? 'Show Less' : 'Show More'}
                    </Button>
                    <Collapse in={showLinks}>
                        <div>
                        <Form.Group className='mb-3'>
                            <Form.Label>Website</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="website" value={projectLinks.website} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="email" value={projectLinks.email} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Google Drive</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="google_drive" value={projectLinks.google_drive} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="facebook" value={projectLinks.facebook} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="instagram" value={projectLinks.instagram} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Twitter</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="twitter" value={projectLinks.twitter} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Other Link</Form.Label>
                            <Form.Control type='text' placeholder='Must include "https://"' name="other_link" value={projectLinks.other_link} onChange={handleProjectLinksChange} />
                        </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Cancel</Button>
                <Button onClick={handleSubmit} variant='success text-white'>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}