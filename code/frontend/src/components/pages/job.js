import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import {ReadMore} from 'react-read-more';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: undefined,
            redirect: false,
            job_id: this.props.match ? parseInt(this.props.match.params.id) : parseInt(this.props.id),
            job: {}
        };

    }

    componentWillMount = () => {

    }

    componentDidMount = () => {
        let login = localStorage.getItem('login');
        let that = this;
        if (login !== 'on') {
            this.setState({redirect: true});
        } else {
            axios.get('http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/' + that.state.job_id, {
                    header: {
                        "cache-control": "no-cache",
                        "postman-token": "7b36fe18-0dd3-35b7-8252-aa7b2d422de5"
                    }
                })
                .then(res => {
                    that.setState({job: res.data});
                });
        }


    }
    entreing = (data) => {
        let that = this;
        let res = '';
        if (data === null) {
            res = '';
        } else if (Array.isArray(data)) {
            res = data.map((item, index) => {
                return ( <ul key={index}> {that.entreing(item)} </ul>);
            })
        }
        else if (typeof data == 'object') {
            console.log(data);
            res = Object.keys(data).map(key => {
                return ( <li key={key}> {key} : {data[key].toString()}</li> );
            })
        }
        else {
            res = data.toString();

        }
        return res;
    }

    render() {
        const { redirect } = this.state;
        const that = this;
        const petList = Object.entries(that.state.job).map(([key,value])=> {
            return (
                <li key={key}>{key} : {that.entreing(value)}</li>
            );
        })
        if (redirect) {
            return <Redirect to={'/login'}/>;
        }
        return (
            <ul><ReadMore lines={3} onShowMore={this.props.onChange} class="read_more_btn" text="more">
                {petList}
            </ReadMore>

            </ul>
        )
    }
}

export default Job;