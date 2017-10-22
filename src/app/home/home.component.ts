import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:Http) { }
  profiles=[];
  ngOnInit() {
  	let creds: string  = "userId=vishal";
    let headers:Headers  = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  	this.http.post('http://localhost:8080/NinetySixK/getUserProfiles.html', creds, {
  	  withCredentials: true,			
      headers: headers
      }).toPromise().then(
        data => this.handleSuccess(data),
        err => this.handleFailure(err));
  }
  handleSuccess=function(res:Response){
  	let data = res.json();
  	this.profiles=data.userProfiles;
  }
  handleFailure(err){

  }
}


