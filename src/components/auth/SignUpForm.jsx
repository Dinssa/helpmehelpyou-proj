import { Component } from 'react';
import { signUp } from '../../utilities/users-service.js';


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
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit} className='d-flex flex-column'>
                <label>First Name</label>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
                <label>Last Name</label>
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <label for="role">Role:</label>
                <select id="role" name="role" value={this.state.roles} onChange={this.handleChange} multiple>
                  <option value="Client">Client</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Admin">Admin</option>
                </select>
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
    }    
  }