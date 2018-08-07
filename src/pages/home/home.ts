import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NewPage} from "../new/new";
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
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
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public dataService: ScheduleData,
              private alertCtrl: AlertController,
              public eventService: EventParser,
              private modalCtrl: ModalController) {

  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

addEvent(){

//  let eventData =  this.eventService.parseEvents(this._schedule);

//  eventData.startTime = new Date(eventData.startTime);
//  eventData.endTime = new Date(eventData.endTime);

  //let events = this.eventSource;
  //events.push( eventData);
  this.eventSource = [];
  setTimeout(() => {
    this.eventSource = this.eventService.parseEvents(this._schedule);
  });
}



  clearStorage() {


    var localHash = Md5.hashStr("Test");
    //window.localStorage.clear()
  }

  onNewUser() {

    this.navCtrl.push(NewPage);
  }

  checkForUpdates(){
    if (this._schedule == null)
      this._schedule = this.dataService.getLocalSchedule();

    var localHash = Md5.hashStr(JSON.stringify(this._schedule));
    var remoteHash = this.dataService.getRemoteHash();

    if (localHash != remoteHash){
      this.presentUpdateAlert();
    }
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

        // Stundenplan anzeigen

        this.checkForUpdates();

        this.showSchedule(schedule);
      }
    }
  }

  showSchedule(schedule) {
    console.log('Showing schedule');
  }

  saveSchedule(schedule) {
    console.log('Stroring new Schedule locally');

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
            this.navCtrl.push(NewPage);
          }
        }
      ]
    });
    alert.present();
  }

  presentUpdateAlert() {

    let alert = this.alertCtrl.create({
      title: 'Ihr Stundenplan wurde geändert',
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
