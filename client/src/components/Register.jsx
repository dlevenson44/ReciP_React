import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.passwordConfirm = this.passwordConfirm.bind(this)
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    passwordConfirm() {
        if (this.state.password !== this.state.confirmPassword) {
            return (
                <div>
                    <p>Passwords do not match.</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                    <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                    <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.handleInputChange} />
                    {this.passwordConfirm()}
                    <input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                    <input type="submit" value="Create Account" />
                </form>
            </div>
        )
    }
}

export default Register;
