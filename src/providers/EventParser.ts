import { Injectable } from '@angular/core';

@Injectable()
export class EventParser {

  constructor () {

  }

  parseEvents(schedule){
    let events = [];

    for (let i = 0; i < schedule.length; i++) {

      var test = schedule[i];

      let event = {
        allDay: test["allDay"],
        color: test["color"],
        title: test["description"],
        startTime: new Date(<number>test["start"] * 1000),
        endTime: new Date((<number>test["end"] * 1000)),
        room: test["room"],
        sroom: test["sroom"],
        description: test["title"],
        sinstructor: test["sinstructor"]
      };


      events.push( event);
    }

    return events;
  }
}
