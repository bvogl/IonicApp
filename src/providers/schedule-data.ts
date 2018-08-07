import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {NewPage} from "../pages/new/new";

@Injectable()
export class ScheduleData {

  constructor(public http: HttpClient) {
    console.log('Hello RedditData Provider');

  }


  getRemoteData(){
    this.http.get('https://api.github.com/users/seeschweiler')
      .subscribe(data => {
      console.log(data);

      return true;
    });
  }

  getRemoteHash(){

    return 'dasdas';
  }

  getLocalSchedule(){
    console.log('Loading local Schedule');
    return JSON.parse(localStorage.getItem('Array'));
  }

  getUser(){
    console.log('Loading User');
    return JSON.parse(localStorage.getItem('User'));
  }
}


//https://selfservice.campus-dual.de/room/json?userid=5000763&b7fcf9ab2b77b32462ff9cbebfcf352f
