import { Injectable } from '@angular/core';

@Injectable()
export class EventParser {

  constructor () {

  }

  parseEvents(schedule){

    let events = [];

    for (let i = 0; i < 3; i++) {

      let event = {
        startTime: new Date()
        , endTime: new Date()
        , allDay: false
        , title: ''
      };

      event.startTime = new Date("August 6, 2018 1" + i +":00:00");
      event.endTime = new Date("August 6, 2018 1" + i + ":00:00");
      event.title = 'Test' + i;

      events.push( event);
    }

    return events;
  }
}
