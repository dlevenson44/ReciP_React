import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            // fetchedResults: []
        }
        this.compareCredentials = this.compareCredentials.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.passwordConfirm = this.passwordConfirm.bind(this)
        this.searchTakenCredentials = this.searchTakenCredentials.bind(this)
    }

    searchTakenCredentials(e) {
        e.preventDefault()
        fetch('/api/auth/taken', {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            // this.setState({
            //     fetchedResults: res.data.usernames
            // })
            this.compareCredentials(e)
        })
    }

    compareCredentials(e) {
        // for (let i = 0; i < this.state.fetchedResults.length; i++) {
            // console.log(this.state.fetchedResults[i])
            // if (this.state.fetchedResults[i].username === this.state.username) {
            //     console.log('username taken')
            //     return <p>Username taken</p>
            // } else if (this.state.fetchedResults[i].email === this.state.email) {
            //     console.log('email taken')
            //     return <p>There is already an account associated with this email</p>
            // } else {
                console.log('creating account')
                this.props.handleRegisterSubmit(e, this.state)
            // }
        // }
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

    
    // <form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.searchTakenCredentials(e)}>
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
