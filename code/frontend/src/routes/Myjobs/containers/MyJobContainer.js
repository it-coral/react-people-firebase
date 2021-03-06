import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import sha256 from 'js-sha256'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { JOB_PATH, ID_JOB_PATH , MY_JOB_PATH, SHA256_KEY } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import OneJobComponent from '../components/OneJobComponent'
import OneProfileComponent from '../components/OneProfileComponent'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './MyJobContainer.scss'
import Api from '../apis'
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


@UserIsAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),    
    account: pathToJS(firebase, 'profile')    
  })
)
export default class MyJobContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  
  static propTypes = {
    firebase: PropTypes.object,
    auth: PropTypes.object,
  }

  state = {
    snackCanOpen: false,
    profiles: [],
    jobs:[],
    loading: true,
    open: false,
    langlevel: 1,
    value: 'a',
  }

   /*
  * component apis
  */
  componentDidMount(){
    setTimeout(()=> {
      var { auth, account } = this.props
      if(auth != undefined){
        let hash = sha256.hmac(SHA256_KEY, auth.email);
        window.dataLayerCall(auth.email, account.name + ' ' + account.surname, hash);
      }      
    }, 1000);

    Api.apiGetJobList()
    .then(res => {
      this.setState({jobs:res.data.results });
      this.setState({loading: false});
    })

    this.setState({profiles:[{
      image_url:'',
      given_name:'Gerd',
      family_name:"Meyer-Anaya",
      company:'ABC',
      hire_date:'2017-02-20',
      industry:'DDS',
      location:"Germany",
      profile_url:"http://www.linkedin.com/in/gerd-meyer-anaya-84844556",
      title:"--",
      language:"en",
      score:'',
    }]})
  }

  handleLangLevelChange = (event, index, value) => this.setState({langlevel:value});

  handleToggle = () => this.setState({open: !this.state.open});

  handleNavigate(id){
    console.log(id)
    this.context.router.push(`${JOB_PATH}/${id}`);
  }

  getDate() {
    return (new Date().toISOString().slice(0,10).replace(/-/g,""))
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render () {
    console.log(this.state.jobs)
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="My Jobs" value="a">
          <div className={classes.container}>        
            {
              this.state.loading &&
                <LoadingSpinner />
            }

            {          
              map(this.state.jobs, (job, key) => (
                <OneJobComponent
                  key={key}
                  id={key}
                  title={job.occupation}
                  location={job.location_list}
                  date={this.getDate()}
                  handleNavigate={this.handleNavigate.bind(this, job.id)}
                />   
              ))
            }
          </div>
        </Tab>
        <Tab label="My Candidates" value="b">
          <div className={classes.container}>        
            {
              this.state.loading &&
                <LoadingSpinner />
            }

            {          
              map(this.state.profiles, (profile, key) => (
                <OneProfileComponent
                  key={key}
                  id={key}
                  picture={profile.image_url}
                  name={profile.given_name}
                  surname={profile.family_name}
                  company={profile.company}
                  hiredate={profile.hire_date}
                  industry={profile.industry}
                  location={profile.location}
                  url={profile.profile_url}
                  title={profile.jobtitle}
                  language={profile.language}
                  score={profile.score}
                />   
              ))
            }
          </div>
        </Tab>
      </Tabs>
      
    )
  }
}
