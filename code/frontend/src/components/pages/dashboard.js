import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Form from 'react-form-controlled';
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: undefined,
            redirect: false,
            occupation_list: [],
            occupation_value: null,
            specialization_list: [],
            specialization_value: '',
            function_list: [],
            function_value: '',
            skill_list: [],
            skill_value1: '',
            skill_value2: '',
            softskill_list: [],
            softskill_value: '',
            contract_type_list: [],
            contract_type_value: '',
            language_list: [],
            language_value1: '',
            language_value2: '',
            industry_list: [],
            industry_value: '',
            education_list: [],
            education_value: '',
            job_id: null
        };

        this.formData = {
            "internal_id": null,
            "description": null,
            "janzz_type": null,
            "title": null,
            "language_captured": null,
            "match_factor": null,
            "occupation": null,
            "occupation_list": [],
            "specialization_list": [],
            "function_list": [],
            "skill_list": [
                {
                    "skill": null,
                    "level": null
                },
                {
                    "skill": null,
                    "level": null
                }
            ],
            "softskill_list": [
                {
                    "skill": null,
                    "level": null
                }
            ],
            "contract_type_list": [],
            "language_list": [
                {
                    "proficiency": null,
                    "name": null,
                    "proficiency2": null
                },
                {
                    "proficiency": null,
                    "name": null,
                    "proficiency2": null
                }
            ],
            "industry_list": [],
            "location_list": [
                {
                    "lat": null,
                    "r": null,
                    "name": null,
                    "cc": null,
                    "type": null,
                    "lon": null
                },
                {
                    "lat": null,
                    "r": null,
                    "name": null,
                    "cc": null,
                    "type": null,
                    "lon": null
                }
            ],
            "education_list": [],
            "experience_list": [],
            "keyword_list": []
        };
        this.occupationValueChange = this.occupationValueChange.bind(this);
    }

    componentWillMount = () => {

    }

    componentDidMount = () => {
        let login = localStorage.getItem('login');
        let that = this;
        console.log(login);
        if (login !== 'on') {
            this.setState({redirect: true});
        } else {
            axios.get('https://www.janzz.jobs/japi/labels/?lang=en&branch=occupation&q=test&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let occupation_list = this.createLabelsOptions(res.data);
                    that.setState({occupation_list: occupation_list});
                });
            axios.get('https://www.janzz.jobs/japi/labels/?limit=30&lang=en&branch=specialization&q=test&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let specialization_list = this.createLabelsOptions(res.data);
                    that.setState({specialization_list: specialization_list});
                });
            axios.get('https://www.janzz.jobs/japi/labels/?limit=30&lang=en&branch=function&q=test&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let function_list = this.createLabelsOptions(res.data);
                    that.setState({function_list: function_list});
                });
            axios.get('https://www.janzz.jobs/japi/labels/?limit=30&lang=en&branch=skill&q=test&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let skill_list = this.createLabelsOptions(res.data);
                    that.setState({skill_list: skill_list});
                });
            axios.get('https://www.janzz.jobs/japi/labels/?limit=30&lang=en&branch=softskill&q=test&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let softskill_list = this.createLabelsOptions(res.data);
                    that.setState({softskill_list: softskill_list});
                });
            axios.get('https://www.janzz.jobs/japi/concepts?search_lang=all&output_lang=en&branch=contract_type&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let contract_type_list = this.createConceptsOptions(res.data);
                    that.setState({contract_type_list: contract_type_list});
                });
            axios.get('https://www.janzz.jobs/japi/concepts?search_lang=all&output_lang=en&branch=language&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let language_list = this.createConceptsOptions(res.data);
                    that.setState({language_list: language_list});
                });
            axios.get('https://www.janzz.jobs/japi/concepts?search_lang=all&output_lang=en&branch=industry&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let industry_list = this.createConceptsOptions(res.data);
                    that.setState({industry_list: industry_list});
                });
            axios.get('https://www.janzz.jobs/japi/concepts?search_lang=all&output_lang=en&branch=education&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
                .then(res => {
                    let education_list = this.createConceptsOptions(res.data);
                    that.setState({education_list: education_list});
                });
        }


    }

    createLabelsOptions = (data) => {
        let resData = data.map((item) => {
            return {
                value: item.concept_id,
                label: item.label
            }
        });
        return resData;
    }

    createConceptsOptions = (data) => {
        let resData = data.map((item) => {
            return {
                value: item.id,
                label: item.preferred_label
            }
        });
        return resData;
    }

    createValues = (data) => {
        let resData = data.map((item) => {
            return item.label
        });
        return resData;
    }

    onSubmit = (data) => {
        let that = this;
        axios.post('http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/', {
                header: {
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "postman-token": "7b36fe18-0dd3-35b7-8252-aa7b2d422de5"
                }
            }, data)
            .then(res => {
                that.setState({job_id: res.data.id});
                console.log(res.data.id);

            });
    }

    updateFormData = (data) => this.formData = data

    occupationValueChange = (val) => {
        console.log(val);
        this.setState({occupation_value: val});
        this.formData.occupation_list = this.createValues(val);
    }
    occupationChangeData = (val) => {
        let that = this;

        axios.get('https://www.janzz.jobs/japi/labels/?lang=en&branch=occupation&q='+val+'&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
            .then(res => {
                let occupation_list = that.createLabelsOptions(res.data);
                that.setState({occupation_list: occupation_list});
            });
    }

    specializationValueChange = (val) => {
        this.setState({specialization_value: val});
        this.formData.specialization_list = this.createValues(val);
    }

    functionValueChange = (val) => {
        this.setState({function_value: val});
        this.formData.function_list = this.createValues(val);
    }
    skillValue1Change = (val) => {
        this.setState({skill_value1: val});
        this.formData.skill_list[0].skill = val.label;
    }

    skillValue2Change = (val) => {
        this.setState({skill_value2: val});
        this.formData.skill_list[1].skill = val.label;
    }
    softskillValueChange = (val) => {
        this.setState({softskill_value: val});
        this.formData.softskill_list[0].skill = val.label;
    }
    contractTypeValueChange = (val) => {
        this.setState({contract_type_value: val});
        this.formData.contract_type_list = this.createValues(val);
    }
    languageValue1Change = (val) => {
        this.setState({language_value1: val});
        this.formData.language_list[0].name = val.preferred_label;
    }

    languageValue2Change = (val) => {
        this.setState({language_value2: val});
        this.formData.language_list[0].name = val.preferred_label;
    }
    industryValueChange = (val) => {
        this.setState({industry_value: val});
        this.formData.industry_list = this.createValues(val);
    }
    educationValueChange = (val) => {
        this.setState({education_value: val});
        this.formData.education_list = this.createValues(val);
    }

    render() {
        const { redirect } = this.state.redirect;

        if (this.state.redirect) {
            return <Redirect to={'/login'}/>;
        }
        if (this.state.job_id) {
            return <Redirect to={'/job/${this.state.job_id}'}/>;
        }

        return (
            <div>
                <div class="menu">
                    <ul>
                        <li><Link to='/jobs'>Jobs</Link></li>
                        <li class="logout"><Link to='/logout'>logout</Link></li>
                    </ul>
                </div>
                <Form
                    value={this.formData}
                    onChange={this.updateFormData}
                    onSubmit={this.onSubmit}
                >
                    <div>
                        <label>Description:</label>
                        <textarea name="description"></textarea>
                    </div>

                    <fieldset>
                        <legend>Janzz type:</legend>
                        <div>
                            <label>candidate profile</label>
                            <input type="radio" name="janzz_type" value="10"/>
                        </div>
                        <div>
                            <label>job offer</label>
                            <input type="radio" name="janzz_type" value="11"/>
                        </div>
                    </fieldset>

                    <div>
                        <label>Title:</label>
                        <input name="title"/>
                    </div>
                    <div>
                        <label>Anguage captured:</label>
                        <input name="anguage_captured"/>
                    </div>
                    <div>
                        <label>Match factor:</label>
                        <input name="match_factor" type="number"/>
                    </div>
                    <div>
                        <label>Occupation:</label>
                        <input name="occupation" type="text" required/>
                    </div>
                    <div>
                        <label>Occupation List:</label>
                        <Select.Creatable
                            multi={true}
                            value={this.state.occupation_value}
                            name="occupation_list"
                            options={this.state.occupation_list}
                            onChange={this.occupationValueChange}
                            onInputChange={this.occupationChangeData}

                        />
                    </div>
                    <div>
                        <label>Specialization list:</label>
                        <Select.Creatable
                            multi={true}
                            value={this.state.specialization_value}
                            name="occupation_list"
                            options={this.state.specialization_list}
                            onChange={this.occupationChangeData}
                        />
                    </div>
                    <div>
                        <label>Function list:</label>
                        <Select.Creatable
                            multi={true}
                            value={this.state.function_value}
                            name="occupation_list"
                            options={this.state.function_list}
                            onChange={this.functionValueChange}
                        />
                    </div>
                    <fieldset>
                        <legend>Skill list:</legend>
                        <div>
                            <label>skill:</label>
                            <Select.Creatable
                                value={this.state.skill_value1}
                                name="skill_list"
                                options={this.state.skill_list}
                                onChange={this.skillValue1Change}
                            />
                        </div>
                        <div>
                            <label>level:</label>
                            <input name="skill_list[0][level]" type="number" min="1" max="5"/>
                        </div>
                        <div>
                            <label>skill:</label>
                            <Select.Creatable
                                value={this.state.skill_value2}
                                name="skill_list"
                                options={this.state.skill_list}
                                onChange={this.skillValue2Change}
                            />
                        </div>
                        <div>
                            <label>level:</label>
                            <input name="skill_list[1][level]" type="number" min="1" max="5"/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Softskill list:</legend>
                        <div>
                            <label>skill:</label>
                            <Select.Creatable
                                value={this.state.softskill_value}
                                name="softskill_list"
                                options={this.state.softskill_list}
                                onChange={this.softskillValueChange}
                            />
                        </div>
                        <div>
                            <label>level:</label>
                            <input name="softskill_list[0][level]" type="number" min="1" max="5"/>
                        </div>
                    </fieldset>
                    <div>
                        <label>Contract type list:</label>
                        <Select.Creatable
                            multi={true}
                            value={this.state.contract_type_value}
                            name="contract_type_list"
                            options={this.state.contract_type_list}
                            onChange={this.contractTypeValueChange}
                        />
                    </div>
                    <fieldset>
                        <legend>Language list:</legend>
                        <div>
                            <label>proficiency:</label>
                            <input name="language_list[0][proficiency]"/>
                        </div>
                        <div>
                            <label>name:</label>
                            <Select.Creatable
                                value={this.state.language_value1}
                                name="language_list"
                                options={this.state.language_list}
                                onChange={this.languageValue1Change}
                            />
                        </div>
                        <div>
                            <label>proficiency 2:</label>
                            <input name="language_list[0][proficiency2]"/>
                        </div>
                        <div>
                            <label>proficiency:</label>
                            <input name="language_list[1][proficiency]"/>
                        </div>
                        <div>
                            <label>name:</label>
                            <Select.Creatable
                                value={this.state.language_value2}
                                name="language_list"
                                options={this.state.language_list}
                                onChange={this.languageValue2Change}
                            />
                        </div>
                        <div>
                            <label>proficiency 2:</label>
                            <input name="language_list[1][proficiency2]"/>
                        </div>

                    </fieldset>
                    <div>
                        <label>List of Industries:</label>
                        <Select.Creatable
                            multi={true}
                            value={this.state.industry_value}
                            name="industry_list"
                            options={this.state.industry_list}
                            onChange={this.industryValueChange}
                        />
                    </div>
                    <fieldset>
                        <legend>Location list:</legend>
                        <div>
                            <label>latitude:</label>
                            <input name="location_list[0][lat]"/>
                        </div>
                        <div>
                            <label>radius in km:</label>
                            <input name="location_list[0][r]"/>
                        </div>
                        <div>
                            <label>country code:</label>
                            <input name="location_list[0][cc]"/>
                        </div>
                        <div>
                            <label>one of locality, country:</label>
                            <input name="location_list[0][type]"/>
                        </div>
                        <div>
                            <label>longitude:</label>
                            <input name="location_list[0][lon]"/>
                        </div>

                    </fieldset>
                    <div>
                        <label>Education list:</label>
                        <Select.Creatable
                            multi={true}
                            value={this.state.education_value}
                            name="industry_list"
                            options={this.state.education_list}
                            onChange={this.educationValueChange}
                        />
                    </div>

                    <button class="btn" type="submit">Submit</button>
                </Form>
            </div>
        )
    }
}

export default Dashboard;