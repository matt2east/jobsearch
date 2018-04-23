import React from 'react';
import { Button } from 'react-bootstrap';

class LandingPage extends React.Component {
    
  
  render() {
    const {isAuthenticated, login, logout} = this.props.auth;
   
    return(
        <div>
          <h1>Job / Internship Portal</h1>
             {/*<a href="/signup">Create an account.</a><br/>*/}
          
            {!isAuthenticated() &&
                <p>
                    Please login first.<br/>
                    <Button onClick={login} bsStyle="default">Login</Button>
                </p>
            }
           {isAuthenticated() &&
            <button onClick={logout}>Logout</button>
            }
        </div>
    )
}
  }
  
  export default LandingPage;