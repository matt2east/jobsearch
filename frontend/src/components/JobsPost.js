import React from 'react';
import SelectUSState from 'react-select-us-states';

class JobsPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        job_title: '',
        city: '',
        state: '',
        job_summary: '',
        responsibilities: '',
        qualifications: '',
        benefits: '',
        type: '',
        annual_salary: '',
        hourly_salary: '',
        employer_id: '',
        employer_name:''
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    componentDidMount(){
      var data = this.state;
      console.log(data);
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    setNewUSState = (newUSState) => {
      this.setState({state: newUSState});
    }

    handleSubmit = event => {
      event.preventDefault();
  
      const newJob = {
        job_title: this.state.job_title,
        city: this.state.city,
        state: this.state.state,
        job_summary: this.state.job_summary,
        responsibilities: this.state.responsibilities,
        qualifictions: this.state.qualifications,
        benefits: this.state.benefits,
        type: this.state.type,
        annual_salary: this.state.annual_salary,
        hourly_salary: this.state.hourly_salary,
        employer_id: this.state.employer_id,
        employer_name: this.state.employer_name
      };
      console.log(newJob);
  
      fetch('http://localhost:3005/jobs', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res;
      }).catch (err => err);
      this.setState({
          job_title: '',
          city: '',
          state: '',
          job_summary: '',
          responsibilities: '',
          qualifications: '',
          benefits: '',
          type: '',
          annual_salary: '',
          hourly_salary: '',
          employer_id: '',
          company_name:''
    });
    };

  
    render() {
      return (
        <div>
          <header>
            <div className="container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <span className="navbar-item"><h1>Add a job to the database</h1></span><br/>
                </div>
              </nav>
            </div>
          </header>
          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Job Title</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="job_title" 
                             placeholder="Job Title"
                             value={this.state.job_title} 
                             onChange={this.handleChange} />
                             </div>
                             </div>


                     <div className="field">
                    <label className="label">Company Name</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="company_name" 
                          placeholder="Company Name"
                          value={this.state.company_name} 
                          onChange={this.handleChange} />
                    </div>
                  </div>
                  
                  <div className="field">
                    <label className="label">City</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="city" 
                             placeholder="City"
                             value={this.state.city} 
                             onChange={this.handleChange} />
                             </div>
                             </div>
                
                <div >
                  <label className="label">Select a state:</label>
                  <SelectUSState  onChange={this.setNewUSState}/>
                </div>
                  
                             <div className="field">
                    <label className="label">Job Summary</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="job_summary" 
                          placeholder="Job Summary"
                          value={this.state.job_summary} 
                          onChange={this.handleChange} />
                    </div>
                  </div>
  
                  <div className="field">
                    <label className="label">Responsibilities</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          placeholder="Responsibilities"
                          name="responsibilities" 
                          value={this.state.responsibilities} 
                          onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Qualifications</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="qualifications"
                          placeholder="Qualifications" 
                          value={this.state.qualifications} 
                          onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Benefits</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="benefits" 
                          placeholder="Benefits"
                          value={this.state.benefits} 
                          onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                      <input 
                          className="input" 
                          placeholder="Type"
                          type="text" 
                          name="type" 
                          value={this.state.type} 
                          onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Annual Salary</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          placeholder="Annual Salary"
                          name="annual_salary" 
                          value={this.state.annual_salary} 
                          onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Hourly Salary</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="hourly_salary"
                          placeholder="Hourly Salary" 
                          value={this.state.hourly_salary} 
                          onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Employer ID (temporary field)</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          placeholder="Employer ID"
                          name="employer_id" 
                          value={this.state.employer_id} 
                          onChange={this.handleChange} />
                    </div>
                  </div>


                   <div className="field">
                    <div className="control">
                      <input type="submit"
                             value="Submit"
                             className="button is-primary" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default JobsPost;