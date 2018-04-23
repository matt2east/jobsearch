import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

var employerId = 9;
// employer token in instead of hard coding

export default class JobsGet extends Component {
  constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            showPopup: false

        };
    }
  togglePopup = () => {
        this.setState({
          jobs: this.state.jobs,  
          showPopup: !this.state.showPopup
        })
    }
    
  componentDidMount(){
        return fetch(`http://localhost:3005/jobs?employer_id=${employerId}`)
        .then((res) => res.json())
        .then((resJson) => {
            this.setState({jobs: resJson})
            // console.log(this.state.test)
            console.log(resJson)
            console.log("state is " + (this.state.jobs[1].job_title))
        });
    }

  render(){
    return (
      <div>
        <h1>View your posted jobs</h1>
        <div>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                    <th>Title</th>
                    <th>Employer</th>
                    <th>Location</th>
                    <th>Date Posted</th>
                    <th>Recruiter</th>
                    </tr>
            </thead>
            {this.state.jobs.map((job)=>{
              console.log('Job is ', job)
              return(
                <tbody>
                  <tr>
                    <td>{job.job_title}</td>
                    <td
                      onClick={this.togglePopup}>
                      {job.employer_name}
                      {this.state.showPopup ?
                        <div job={job.job_id} closepopup={this.togglepopup}>
                          <div className='popup' >
                            <div className='popup_inner'>
                              <div onClick={this.props.closepopup} >
                              {Object.keys(this.state.jobs).map(
                                key=><p
                                key={key}index={key}>{key}</p>)}
                                <p>Title: {job.job_title}</p>
                                <p>Employer: {job.company_name}</p>
                                <p>Location: {job.city}, {job.state}</p>
                                <p>Job Summary: {job.job_summary}</p>
                                <p>Responsibilities: {job.responsibilities}</p>
                                <p>Qualifications: {job.qualifications}</p>
                                <p>Benefits: {job.benefits}</p>
                                <p>Type: {job.type}</p>
                                <p>Annual Salary: ${job.annual_salary}</p>
                                <p>Hourly Salary: ${job.hourly_salary}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        : null
                      }
                    </td>
                    <td>{job.city}, {job.state}</td>
                    <td>{job.created_at.substring(0,10)}</td>
                    <td>{job.company_name}</td>
                  </tr>
                </tbody>
              )
            })
            }
          </Table>;
        </div>
      </div>
    )
    }
}
