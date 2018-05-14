import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            fetchedResults: [],
            readyToCreate: false,
        }
        this.compareCredentials = this.compareCredentials.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.passwordConfirm = this.passwordConfirm.bind(this)
        this.searchTakenCredentials = this.searchTakenCredentials.bind(this)
        this.checkPasswordLength = this.checkPasswordLength.bind(this)
        this.checkUsernameLength = this.checkUsernameLength.bind(this)
    }

    searchTakenCredentials(e) {
        e.preventDefault()
        fetch('/api/auth/taken', {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            this.setState({
                fetchedResults: res.data.usernames
            })
            this.compareCredentials(e)
        })
    }

    compareCredentials(e) {
        for (let i = 0; i < this.state.fetchedResults.length; i++) {
            console.log(this.state.fetchedResults[i])
            if (this.state.fetchedResults[i].username === this.state.username) {
                console.log('username taken')
                return (<p>There is already an account with this username.</p>)
            } else if (this.state.fetchedResults[i].email === this.state.email) {
                console.log('email taken')
                return (<p>There is already an account associated with this email.</p>)
            } else if (i === this.state.fetchedResults.length - 1) {
                console.log('changing create state')
                this.setState({
                    readyToCreate: true,
                })
            }
        }
        if (this.state.readyToCreate === true) {
            console.log('creating account')
            this.props.handleRegisterSubmit(e, this.state)
        }
    }
    

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    checkUsernameLength() {
        if (this.state.username.length > 0 && this.state.username.length < 3) {
            return (
                <div>
                    <p>Usernames must have at least 3 characters.</p>
                </div>
            )
        } else if (this.state.username.length > 25) {
            return (
                <div>
                    <p>Usernames cannot have more than 25 characters.</p>
                </div>
            )
        }
    }

    checkPasswordLength() {
        if (this.state.password.length > 0 && this.state.password.length < 5) {
            return (
                <div>
                    <p>Passwords must have at least 5 characters.</p>
                </div>
            )
        }
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
                <form onSubmit={(e) => this.searchTakenCredentials(e)}>
                    <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                    <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.handleInputChange} />                    
                    <input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                    <input type="submit" value="Create Account" />
                </form> 
                {this.checkUsernameLength()}
                {this.checkPasswordLength()}
                {this.passwordConfirm()}
                {this.compareCredentials()}               
            </div>
        )
    }
}

export default Register;
