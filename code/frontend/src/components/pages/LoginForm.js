import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
            user: {}
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
        event.preventDefault()
        let email = this.state.email;
        let password = this.state.password;
        let that = this;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            let user = firebase.auth().currentUser;
            if (user) {
                localStorage.setItem('login', 'on');
                that.setState({redirect: true});
            }

        }).catch(function (error) {
            console.log(error);

        });

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={'/home'}/>;
        }

        return (
            <div class="container">
                <ul>
                    <li><Link to='/signup'>SignUp</Link></li>
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
                    <button class="btn">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;