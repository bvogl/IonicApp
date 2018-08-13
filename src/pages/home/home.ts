import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpClient} from '@angular/common/http';
import {ScheduleData} from "../../providers/schedule-data";
import {AlertController} from "ionic-angular";
import {Md5} from 'ts-md5/dist/md5';
import {EventParser} from "../../providers/EventParser";
import {ModalController} from "ionic-angular";

import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _schedule;

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay

  };

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public dataService: ScheduleData,
              private alertCtrl: AlertController,
              public eventService: EventParser) {

  }

  ionViewDidEnter() {

    var user = this.dataService.getUser();

    if (user == null) {
      this.presentUserAlert();
    }
    else {
      var schedule = this.dataService.getLocalSchedule();

      if (schedule == null)
        this.presentScheduleAlert();
      else {

        this._schedule = schedule;
        // Stundenplan anzeigen

        if (this.checkForUpdates() == true)
        {
          this.presentUpdateAlert();
        }

        this.showSchedule();
      }
    }
  }


  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('HH:mm');
    let end = moment(event.endTime).format('HH:mm');

    let alert = this.alertCtrl.create({
      title: event.title,
      message:
        "Zeit: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + start + ' - ' + end + "<br>" +
        "Raum: &nbsp;&nbsp;" + event.room + "<br>" +
        "Dozent: " + event.sinstructor,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

loadEvents(){

  this.eventSource = [];

  var events = this.eventService.parseEvents(this._schedule);

  setTimeout(() => {
    this.eventSource = events;
  });
}

  clearStorage() {

    window.localStorage.clear()
  }

  onNewUser() {

    this.navCtrl.push(LoginPage);
  }

  checkForUpdates(){
   var needsUpdate = false;

    if (this._schedule == null)
      this._schedule = this.dataService.getLocalSchedule();

    var localHash = Md5.hashStr(JSON.stringify(this._schedule));
    var remoteHash = this.dataService.getRemoteHash();

    if (localHash != remoteHash){
      needsUpdate = true;
    }

    return needsUpdate;
  }

  showSchedule() {
    console.log('Showing schedule');
  }

  saveSchedule(schedule) {
    console.log('Stroring login Schedule locally');

    if (schedule != null) {
      window.localStorage.setItem('Array', JSON.stringify(schedule));
      this.ionViewDidEnter();
    } else
      this.presentRemoteAlert();
  }

  presentRemoteAlert() {

    let alert = this.alertCtrl.create({
      title: 'Laden fehlgeschlagen',
      message: 'Es konnte kein Remote-Stundenplan geladen werden. ' +
        'Bitte überprüfen Sie Ihre Internetverbindung und die hinterlegten Nutzerdaten.',
      buttons: ['Ok']
    });
    alert.present();
  }

  presentScheduleAlert() {

    let alert = this.alertCtrl.create({
      title: 'Kein lokaler Stundenplan gefunden',
      message: 'Es konnte kein lokal gespeicherter Stundenplan gefunden werden.' +
        'Möchten Sie den Stundenplan erneut Laden und speichern?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bestätigen',
          handler: () => {
            console.log('Load clicked');
            var schedule = this.dataService.getRemoteData();
            this.saveSchedule(schedule);
          }
        }
      ]
    });
    alert.present();
  }

  presentUserAlert() {

    let alert = this.alertCtrl.create({
      title: 'Kein User gespeichert',
      message: 'Es konnten keine gespeicherten Nutzerdaten gefunden werden. ' +
        'Bitte erstellen Sie einen neuen Nutzer',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  presentUpdateAlert() {

    let alert = this.alertCtrl.create({
      title: 'Ihr Stundenplan wurde aktualisiert',
      message: 'Es wurde eine Änderung an ihrem Stundenplan festgestellt. ' +
        'Möchten Sie die Änderungen laden?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Laden',
          handler: () => {
            console.log('Load clicked');
            var schedule = this.dataService.getRemoteData();
            this.saveSchedule(schedule);
          }
        }
      ]
    });
    alert.present();
  }
}
