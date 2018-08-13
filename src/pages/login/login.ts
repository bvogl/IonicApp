import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";

import {AlertController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'login.html',
})
export class LoginPage {

  public userNameInput;
  public passwordInput;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage
  , private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onNewAccountAdded(){

    var userDate = {name: this.userNameInput,
    passwordHash: this.passwordInput};

    window.localStorage.setItem('User', JSON.stringify(userDate));
    console.log('New Userdata saved.')

    // this.storage.set('userName', this.userNameInput);
    // this.storage.set('password', this.passwordInput);

    this.navCtrl.push(HomePage);
  }

/*
  onAuthentication(){

    console.log("Authenticating");

    // Anmeldedaten an den Server schicken und prüfen

   /!*
   var userName = this.storage.get('userName').then((data) => {
      console.log('name: ', data);
    });

    var passwordHash = this.storage.get('password').then((data) => {
      console.log('password: ', data);
    });
*!/

    var retrievedObj1 = JSON.parse(localStorage.getItem('User'));

    console.log(retrievedObj1);

    // REST-Api-Abfrage: gibt es den Nutzer und das Passwort

    var apiReturn = false;

    if (apiReturn == false)
      this.presentAlert()
    else
      this.navCtrl.push(HomePage);

  }*/

  /*
  Test Funktion ob Laden korrekt funktioniert
   */
  onLoad(){
/*

    var employees= [
      {
        "id": "1",
        "firstName": "Tom",
        "lastName": "Cruise"
      },
      {
        "id": "2",
        "firstName": "Maria",
        "lastName": "Sharapova"
      },
      {
        "id": "3",
        "firstName": "James",
        "lastName": "Bond"
      }
    ]

    window.localStorage.setItem('Array', JSON.stringify(employees));
*/

/*


    this.storage.get('userName').then((data) => {
      console.log('name: ', data);
    });

    this.storage.get('password').then((data) => {
      console.log('password: ', data);
    });
*/
/*


    var retrievedObj1 = JSON.parse(localStorage.getItem('User'));

    console.log(retrievedObj1);

    var retrievedObj2 = JSON.parse(localStorage.getItem('Array'));

    console.log(retrievedObj2);

*/

  }

  presentAlert(){

    let alert = this.alertCtrl.create({
      title: 'Fehler bei der Anmeldung',
      message: 'Nutzername oder Passwort scheinen nicht korrekt zu sein. ' +
        'Versuchen Sie es erneut oder legen Sie einen neuen Account an.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
