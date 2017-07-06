import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import Job  from './job';
import { Link } from 'react-router-dom';


class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: undefined,
            redirect: false,
            jobs: [],
            currentPage: 1,
            todosPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount = () => {

    }

    componentDidMount = () => {
        let login = localStorage.getItem('login');
        let that = this;
        if (login !== 'on') {
            this.setState({redirect: true});
        } else {
            axios.get('http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/', {
                    header: {
                        "cache-control": "no-cache",
                        "postman-token": "7b36fe18-0dd3-35b7-8252-aa7b2d422de5"
                    }
                })
                .then(res => {
                    const ids = res.data.map(obj => obj.id);
                    that.setState({jobs: ids});
                });


        }


    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { redirect, currentPage, todosPerPage, jobs } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = jobs.slice(indexOfFirstTodo, indexOfLastTodo);
        const j = currentTodos.map((item) => {
            return <li key={item} class="txt">
                <Link to={`/job/${item}`}>
                    <Job id={item}/>
                </Link>
            </li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(jobs.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });
        if (redirect) {
            return <Redirect to={'/login'}/>;
        }
        return (
            <div>
                <div class="container">
                    <ul>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/logout'>logout</Link></li>
                    </ul>
                </div>
                <ul>
                    {j}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>

        )
    }
}

export default Jobs;