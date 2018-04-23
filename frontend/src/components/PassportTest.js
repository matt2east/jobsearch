
import React from 'react';

class PassportTest extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        lastname: ''
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
      console.log(this.state)
    };
    render() {
      return (
        <div>
          <header>
            <div className="container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <span className="navbar-item"><h1>Login with Passport</h1></span>
                </div>
              </nav>
            </div>
          </header>
          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="field">

                    <label className="label">Username</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="username" 
                             value={this.state.username} 
                             onChange={this.handleChange} />
                    </div>
                  </div>

                     <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input className="input" 
                             type="text" 
                             name="password" 
                             value={this.state.password} 
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
  
  export default PassportTest;