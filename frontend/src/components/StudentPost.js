import React from 'react';
import { Button } from 'react-bootstrap';
import UploadResume from './UploadResume';

class StudentPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        lastname: '',
        emailaddress: '',
        phonenumber: ''
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

    handleSubmit = event => {
      event.preventDefault();
  
      // const newStudent = {
      //   firstname: this.state.firstname,
      //   lastname: this.state.lastname,
      //   emailaddress: this.state.emailaddress,
      //   phonenumber: this.state.phonenumber
      // };
  
      fetch('http://localhost:3005/students', {
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
        firstname: '',
        lastname: '',
        emailaddress: '',
        phonenumber: ''
  });
    };
    
    
    
  
    render() {
      return (
        <div>
          <header>
            <div className="container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <span className="navbar-item"><h1>Student Sign-up Form</h1></span><br/>
                </div>
              </nav>
            </div>
          </header>
          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="field">

                    <label className="label">First Name</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="firstname" 
                             placeholder="First Name"
                             value={this.state.firstname} 
                             onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="lastname" 
                             placeholder="Last Name"
                             value={this.state.lastname} 
                             onChange={this.handleChange} />
                    </div>
                  </div>
  
                  <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                      <input className="input" 
                             type="email" 
                             name="emailaddress" 
                             placeholder="Email Address"
                             value={this.state.emailaddress} 
                             onChange={this.handleChange} />
                    </div>
                  </div>
  
                  <div className="field">
                    <label className="label">Phone Number</label>
                    
                    <div className="control">
                      <input 
                          className="input" 
                          type="text"
                          placeholder="Phone Number"
                          name="phonenumber" 
                          value={this.state.phonenumber} 
                          onChange={this.handleChange} />
                    </div>
                  </div>
                   <div className="field">
                    <div className="control">
                      <Button type="submit" 
                             value="Submit" 
                             className="button is-primary">Submit</Button>

                    </div>
                  </div>
                </form>
                
                <UploadResume />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default StudentPost;
  