import React, { Component } from 'react';
import { Redirect } from 'react-router';
class LoginForm extends Component {constructor(props) {
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
        console.log(this.state);
    }

    submitHandler(event) {
        event.preventDefault()
        let email = this.state.email;
        let password = this.state.password;
        let that  = this;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
            let user = firebase.auth().currentUser;
            if( user ){
                that.setState({ redirect: true })
            }
            console.log(firebase.auth().currentUser);

        }).catch(function(error) {
            console.log(error);

        });

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={'/home/'+this.state.email} />;
        }

        return (
            <form onSubmit={this.submitHandler}>
                <input
                    type='email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleInput} />
                <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleInput} />
                <button>Submit</button>
            </form>
        )
    }
}

export default LoginForm;