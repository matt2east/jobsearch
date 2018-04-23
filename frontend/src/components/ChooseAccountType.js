import React, { Component } from 'react';

export default class ChooseAccountType extends Component {
    render(){
        return (
            <div>
                <div>
                Which type of account do you want?<br/>
                <a href="/student/post">Student sign up</a><br/>
                <a href="/recruiter/post">Recruiter sign up</a><br/>
                <a href="/employer/post">Employer sign up</a>
                </div>
        </div>
        )
    }
}