import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ScheduleData {

  constructor(public http: HttpClient) {
    console.log('Hello RedditData Provider');

  }


  getRemoteData(){

    var remoteData;
    this.http.get('/api')
      .subscribe(data => {
      console.log(data);
      remoteData = data;
    });

    return remoteData;
  }

  getRemoteHash(){

    this.http.get('')
      .subscribe(data => {
        console.log(data);
      });

    return 'dasdas';
  }

  getLocalSchedule(){

    console.log('Loading local Schedule');
    return JSON.parse(localStorage.getItem('Array'));

    return schedule;
  }

  getUser(){
    console.log('Loading User');
    return JSON.parse(localStorage.getItem('User'));
  }
}
