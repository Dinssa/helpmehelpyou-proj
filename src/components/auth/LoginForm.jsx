import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Form, Button } from 'react-bootstrap';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="LoginForm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" value={credentials.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          LOG IN
        </Button>
      </Form>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}