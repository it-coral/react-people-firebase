import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div>Current user: { this.props.email }</div>
        )
    }
}

export default Dashboard;