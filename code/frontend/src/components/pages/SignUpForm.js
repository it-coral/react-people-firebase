import React, { Component } from 'react';
class SignUpForm extends Component {constructor(props) {
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
        console.log(this.state);
    }

    submitHandler(event) {
        event.preventDefault()
        // do some sort of verification here if you need to
        //this.props.push(`${this.state.where}/${this.state.what}`)
        console.log(this.state);
        var email = this.state.email;
        var password = this.state.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            let user = firebase.auth().currentUser;
            if( user ){
                that.setState({ redirect: true })
            }
            console.log(firebase.auth().currentUser);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

        });

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>;
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

export default SignUpForm;