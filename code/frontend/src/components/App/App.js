import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false

        };
    }

    componentDidMount = () => {
        let login = localStorage.getItem('login');
        let that = this;
        if (login == 'on') {
            that.setState({redirect: true});
        }
    }

    render() {
        const { redirect } = this.state.redirect;

        if (this.state.redirect) {
            return <Redirect to={'/home'}/>;
        }
        return (
            <div>
                <div class="container">
                    <ul>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>SignUp</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
