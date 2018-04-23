import React from 'react';
import { Button } from 'react-bootstrap';
import SelectUSState from 'react-select-us-states';

class EmployerPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        employername: '',
        emailaddress: '',
        city: '',
        usstate: '',
        industry: '',
        description: ''
      }
    }
    
    setNewUSState = (newUSState) => {
      this.setState({usstate: newUSState});
    }

    componentDidMount = (newValue) => {
      var data = this.state;
      console.log('Data in state is ', data);
    }
  
    handleChange = (event, newValue) =>{  
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      console.log('state in handleSubmit is ', this.state);  
      fetch('http://localhost:3005/employers', {
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
        employername: '',
        emailaddress: '',
        city: '',
        usstate: '',
        industry: '',
        description: ''
      });
    };
  
    render() {
      return (
        <div>
          <header>
            <div className="container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <span className="navbar-item"><h1>Employer Sign-up Form</h1></span><br/>
                </div>
              </nav>
            </div>
          </header>
          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="field">

                    <label className="label">Employer Name</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             placeholder="Employer Name"
                             name="employername" 
                             value={this.state.employername} 
                             onChange={this.handleChange} />
                             </div>
                             </div>
                  
                  <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                      <input className="input" 
                             type="email" 
                             placeholder="Email Address"
                             name="emailaddress" 
                             value={this.state.emailaddress} 
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
                  <div className="control">
                    <SelectUSState className="input" onChange={this.setNewUSState}/>
                  </div>
                </div>
  
                <div className="field">
                  <label className="label">Industry SIC Code</label>
                  <div className="control">
                    <input 
                        className="input" 
                        type="text" 
                        name="industry" 
                        placeholder="Industry SIC Code"
                        value={this.state.industry} 
                        onChange={this.handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Business Description</label>
                  <div className="control">
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Business Description"
                        name="description" 
                        value={this.state.description} 
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
  
  export default EmployerPost;
  