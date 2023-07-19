import { Component } from 'react';
import { signUp } from '../../utilities/users-service.js';
import { Form, Button } from 'react-bootstrap';


export default class SignUpForm extends Component {
       
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roles: ['Client'],
        confirm: '',
        error: ''
    };

    handleChange = (e) => {
      if (e.target.name === 'role') {
        this.setState({ roles: [...e.target.selectedOptions].map(option => option.value) });
      } else {
        this.setState({ [e.target.name]: e.target.value, error: '' });
      }

    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { ...this.state };

            delete formData.confirm;
            delete formData.error;

            const user = await signUp(formData);

            this.props.setUser(user);
            
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div className="SignUpForm">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicRoles">
                  <Form.Label>Role:</Form.Label>
                  <Form.Control as="select" name="role" value={this.state.roles} onChange={this.handleChange} multiple>
                    <option value="Client">Client</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-3' disabled={disable}>
                  SIGN UP
                </Button>
              </Form>
              <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }    
  }