import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false
        }

        this.submitHandler = this.submitHandler.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event) {
        const target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    submitHandler(event) {
        event.preventDefault();
        var email = this.state.email;
        var password = this.state.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            let user = firebase.auth().currentUser;
            if (user) {
                localStorage.setItem('login', 'on');
                that.setState({redirect: true});
            }

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>;
        }
        return (
            <div class="container">
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
                <form onSubmit={this.submitHandler}>
                    <label for="email">
                        <input
                            type='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleInput}/>
                    </label>
                    <label for="password">
                        <input
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleInput}/>
                    </label>
                    <button class="btn">SignUp</button>
                </form>
            </div>

        )
    }
}

export default SignUpForm;