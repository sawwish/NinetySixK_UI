import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Routes, RouterModule ,Router} from '@angular/router';
import {UserProfile} from '../model/UserProfile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username:String;
  private password:String;
  private loginError:Boolean;
  private showLogin:Boolean;
  private genderOptions:[String];
  private userInfo:UserProfile;
  constructor(private http: Http,private routers:Router) { 
    this.username='';
    this.password='';
    this.loginError=false;
    this.showLogin=true;
    this.genderOptions=["Male","Female"];
    this.userInfo= new UserProfile();
  }
  
  ngOnInit() {
  }
  onLoginClick() {
  	console.log("Login Clicked");
  	console.log("Username"+this.username);
    var creds = "username=" + this.username + "&password=" + this.password;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:8080/NinetySixK/login.html', creds, {
      withCredentials: true,
      headers: headers
      }).toPromise().then(
        data => this.handleLoginSuccess(data),
        err => this.handleLoginFailure(err));
  }
  handleLoginSuccess(res:Response){
    let data = res.json();
    if(data.status ==="success"){
        this.loginError=false;
        this.routers.navigate(['/home']);
    }else{
        this.loginError=true;
    }
  }
  handleLoginFailure(err){

  }
  handleSignUpSuccess(res:Response){
    let data = res.json();
    if(data.status ==="success"){
        this.loginError=false;
        this.routers.navigate(['/login']);
    }else{
        this.loginError=true;
    }
  }
  handleSignUpFailure(err){

  }
  onChangeLinkClick(){
    this.showLogin=false;
  }
  onChangeMemberClick(){
    this.showLogin=true;
  }
  onChangeSingUpClick(){
    console.log("SignUp Clicked");
    debugger;
    this.userInfo.profileID=this.userInfo.usernameSignUp+'_prof';
    var creds = "userInfo=" + JSON.stringify(this.userInfo) ;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:8080/NinetySixK/signup.html', creds, {
      withCredentials: true,
      headers: headers
      }).toPromise().then(
        data => this.handleSignUpSuccess(data),
        err => this.handleSignUpFailure(err));
  }
  validateUserProfile(){
    let userProf:UserProfile=this.userInfo;
    if(userProf.passwordSignUp){

    }
    if(userProf.passwordSignUp!==userProf.passwordsignup_confirm){
      return false;
    }
    if(userProf.phoneNumber >999999999 ){
      return false;
    }
    return true;
  }
    
}
