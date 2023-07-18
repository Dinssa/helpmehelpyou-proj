import { Modal, Button, Form, Collapse } from 'react-bootstrap';
import { useState } from 'react';

export default function DeleteProjectModal(props){

    const handleSubmit = (e) => {
        console.log('submitted')
        const id = props.project.id;
        props.onSubmit(id)
        props.onHide()
    }

    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header className='bg-primary'>
                <Modal.Title className='text-white'>Delete: {props.project.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <h4>Are you sure you want to delete this project?</h4>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center align-content-center'>
                <Button onClick={handleSubmit} variant='success text-white '>Yes</Button>
                <Button variant='danger' className='ms-2' onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}