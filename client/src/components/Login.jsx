import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <div className="auth-container">
                <form className="auth-form" onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
                    <input className="auth-input" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                    <input className="auth-input" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                    <input className="auth-input" type="submit" value="Login" id="registersubmit" />
                </form>
            </div>
        )
    }
}

export default Login;
