import { Modal, Button, Form, Collapse } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// API
import { userIndex } from '../../../utilities/templates-service';
import { set } from 'mongoose';

export default function AddFormModal(props){

    const [templates, setTemplates] = useState([])
    const [formName, setFormName] = useState('')
    const [templateId, setTemplateId] = useState('')

    useEffect(() => {
        async function fetchTemplates() {
            const fetchedTemplates = await userIndex();
            setTemplates(fetchedTemplates);
        }
        fetchTemplates();
    }, [])

    useEffect(() => {
        if (templates.length > 0) {
          setTemplateId(templates[0].id);
        }
        setFormName('')
    }, [templates]);

    // useEffect(() => {
    //     console.log(formName);
    // }, [formName]);

    const handleNameChange = (e) => {
        setFormName(e.target.value)
    }

    const handleTemplateChange = (e) => {
        setTemplateId(e.target.value)
        console.log(templateId)
    }

    const handleSubmit = (e) => {
        props.onSubmit(templateId, formName)
        props.onHide()
    }

    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header className='bg-primary'>
                <Modal.Title className='text-white'>Add Form to  <span className='fst-italic'> {props.project.name}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3 text-center'>
                        <Form.Label>Choose a Template</Form.Label>
                        <Form.Select
                            value={templateId}
                            onChange={handleTemplateChange}>
                            {templates.map((template) => {
                                return (
                                    <option key={template.id} value={template.id}>{template.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3 text-center'>
                        <Form.Label className='ms-1'>Name <span className='small text-third'>(optional)</span></Form.Label>
                        <Form.Control
                            type='text'
                            value={formName}
                            onChange={handleNameChange}  
                            placeholder={`Leave blank for default`} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center align-content-center'>
                <Button onClick={handleSubmit} variant='success text-white px-3'>Add</Button>
                <Button variant='danger' className='ms-2' onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}