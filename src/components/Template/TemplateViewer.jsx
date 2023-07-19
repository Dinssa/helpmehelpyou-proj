import './TemplateViewer.css'

import { Form, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react';

export default function TemplateViewer({fields, disable=true, onSubmit}){

    const inputTypes = ['text', 'number', 'date', 'time', 'email', 'tel', 'url', 'password', 'color', 'range', 'file', 'checkbox', 'radio', 'hidden']
    const otherInputTypes = ['textarea', 'select', 'plaintext', 'heading', 'subheading', 'paragraph', 'divider']

    const [disabled, setDisabled] = useState(disable)
    const [formData, setFormData] = useState(null)

    if (!fields) {
        return null;
    }

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className='TemplateViewer'>
            <Form onSubmit={handleSubmit}>
                {fields.map(field => {
                    if (inputTypes.includes(field.type)){
                        return (
                            <Form.Group controlId={field.label} className='inputType fieldGroup m-3'>
                                <Container>
                                    <Row>
                                        {field.label && <Form.Label column sm={2}>{field.label}</Form.Label>}
                                        <Col>
                                            <Form.Control 
                                                name={field.label}
                                                value={formData?.[field.label]}
                                                onChange={handleChange}
                                                type={field.type} 
                                                {...(field.options.placeholder ? { placeholder: field.options.placeholder } : {})} 
                                                disabled={disabled}/>
                                            {field.text && (
                                                <Form.Text className="text-muted">
                                                {field.text}
                                                </Form.Text>
                                            )}
                                        </Col>
                                    </Row>
                                </Container>
                            </Form.Group>
                        )
                    } else if (otherInputTypes.includes(field.type)){
                        if (field.type === 'textarea'){
                            return (
                                <Form.Group controlId={field.label} className='textarea fieldGroup'>
                                    <Container>
                                        <Row>
                                            {field.label && <Form.Label column sm={2}>{field.label}</Form.Label>}
                                            <Col>
                                            <Form.Control
                                                as="textarea"
                                                {...(field.options.rows ? { rows: field.options.rows } : {})}
                                                {...(field.options.placeholder ? { placeholder: field.options.placeholder } : {})}
                                                disabled={disabled}
                                                name={field.label}
                                                value={formData?.[field.label]}
                                                onChange={handleChange}
                                            />
                                            {field.text && (
                                                <Form.Text className="text-muted">
                                                {field.text}
                                                </Form.Text>
                                            )}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        } else if (field.type === 'select'){
                            return (
                                <Form.Group controlId={field.label} className='select fieldGroup'>
                                    <Container>
                                        <Row>
                                            {field.label && <Form.Label column sm={2}>{field.label}</Form.Label>}
                                            <Col>
                                            <Form.Select 
                                                multiple={field.options?.multiple} 
                                                disabled={disabled} 
                                                name={field.label}
                                                value={formData?.[field.label]}
                                                onChange={handleChange}
                                            >
                                                {field.options?.options && field.options.options.map(option => (
                                                <option key={option}>{option}</option>
                                                ))}
                                            </Form.Select>
                                            {field.text && (
                                                <Form.Text className="text-muted">
                                                {field.text}
                                                </Form.Text>
                                            )}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        } else if (field.type === 'plaintext'){
                            return (
                                <Form.Group controlId={field.name} className='plaintext fieldGroup'>
                                    <Container>
                                        <Row>
                                            <Form.Label as="h6">{field.options?.value}</Form.Label>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        } else if (field.type === 'heading'){
                            return (
                                <Form.Group controlId={field.name} className='heading fieldGroup'>
                                    <Container>
                                        <Row>
                                            <Form.Label as="h3">{field.options?.value}</Form.Label>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        } else if (field.type === 'subheading'){
                            return (
                                <Form.Group controlId={field.name} className='subheading fieldGroup'>
                                    <Container>
                                        <Row>
                                            <Form.Label as="h5">{field.options?.value}</Form.Label>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        } else if (field.type === 'paragraph'){
                            return (
                                <Form.Group controlId={field.name} className='paragraph fieldGroup'>
                                    <Container>
                                        <Row>
                                            <Form.Label as="p">{field.options?.value}</Form.Label>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        } else if (field.type === 'divider'){
                            return (
                                <Form.Group controlId={field.name} className='paragraph fieldGroup my-5'>
                                    <Container>
                                        <Row>
                                            <hr />
                                        </Row>
                                    </Container>
                                </Form.Group>
                            )
                        }
                    }
                })}
                <Form.Group controlId='submit' className='submit fieldGroup pt-3 pb-5'>
                    <Container>
                        <Row>
                            <Col>
                                <button type='submit' className='btn btn-primary' disabled={disabled}>Submit</button>
                                <button type='reset' className='btn btn-primary ms-3' disabled={disabled}>Reset</button>
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>
            </Form>
        </div>
    )
}