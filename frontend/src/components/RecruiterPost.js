import React from 'react';
import { Button } from 'react-bootstrap';

class RecruiterPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        title: '',
        recruiter_company_name: ''
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
  
      const newRecruiter = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone,
        title: this.state.title,
        recruiter_company_name: this.state.recruiter_company_name
      };
      console.log("newRecruiter is" + newRecruiter);
  
      fetch('http://localhost:3005/recruiters', {
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
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        title: '',
        recruiter_company_name: ''
  });
    };
    
    
    
  
    render() {
      return (
        <div>
          <header>
            <div className="container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <span className="navbar-item"><h1>Recruiter Sign-up Form</h1></span><br/>
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
                             placeholder="First Name"
                             name="first_name" 
                             value={this.state.first_name} 
                             onChange={this.handleChange} />
                             </div>
                             </div>

                    <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             placeholder="Last Name"
                             name="last_name" 
                             value={this.state.last_name} 
                             onChange={this.handleChange} />
                             </div>
                             </div>
                  
                  <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                      <input className="input" 
                             type="email" 
                             placeholder="Email Address"
                             name="email" 
                             value={this.state.email} 
                             onChange={this.handleChange} />
                             </div>
                             </div>

                <div className="field">
                    <label className="label">Phone</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="phone" 
                             placeholder="Phone Number"
                             value={this.state.phone} 
                             onChange={this.handleChange} />
                             </div>
                             </div>
                  
                             <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="title"
                          placeholder="Title"
                          value={this.state.title} 
                          onChange={this.handleChange} />
                    </div>
                  </div>
  
                  <div className="field">
                    <label className="label">Recruiter Name</label>
                    <div className="control">
                      <input 
                          className="input" 
                          type="text" 
                          name="recruiter_company_name" 
                          placeholder="Recruiter Name"
                          value={this.state.recruiter_company_name} 
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
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default RecruiterPost;
  