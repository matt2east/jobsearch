/* eslint no-restricted-globals: 0 */

import auth0 from 'auth0-js';
import jwDtecode from 'jwt-decode';

const LOGIN_SUCCESS_PAGE = "/signup";
const LOGIN_FAILURE_PAGE = "/";
// const LOGOUT_PAGE = "/";

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: "matt2east.auth0.com",
        clientID: "jeO13in54GdI2lF92XiyERpCJA7vf2yi",
        redirectUri: "http://localhost:3000/callback",
        audience: 'https://matt2east.auth0.com/userinfo',
        responseType: "token id_token",
        scope: "openid"
    })

    constructor (){
        this.login = this.login.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthntication(){
        this.auth0.parseHash((err, authResults)=>{
            if (authResults && authResults.accessToken && authResults.idToken){
                let expiresAt = JSON.stringify(
                    (authResults.expiresIn)* 1000 + new Date().getTime()
                );
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;
            }
            else if (err){
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        })
    }

    logout(){
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        location.pathname = LOGIN_FAILURE_PAGE;
    }

    isAuthenticated(){
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return expiresAt && new Date().getTime() < expiresAt;
    }

    getProfile(){
        // Returns the Auth0 profile.
        let idtoken = localStorage.getItem("id_token");
        if (idtoken) {
            return jwDtecode(idtoken);
        } else {
            return {};
        }
    }
}