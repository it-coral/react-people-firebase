import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
class Logout extends Component {
    componentDidMount() {
        firebase.auth().signOut();
        localStorage.setItem('login', 'off');

    }

    render() {
        return <Redirect to={'/'}/>;
    }
}


export default Logout;