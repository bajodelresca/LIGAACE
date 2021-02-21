import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Player } from 'src/app/model/Player';

@Component({
  selector: 'app-formp',
  templateUrl: './formp.page.html',
  styleUrls: ['./formp.page.scss'],
})
export class FormpPage {

  private player: Player;

  public mode: string;
  private form: FormGroup;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private modalController:ModalController
  ) {


    this.player = navParams.get('Player');
    if (this.player && this.player.id) {
      this.mode = 'Editing';
    } else {
      this.mode = 'Creating';
      this.player = {
        id: -1, // for autoincrement
        email:"",
        password:"",
        assists: -1,
        games: -1,
        goals: -1,
        image: '',
        mvp: -1,
        name: '',
        redcards: -1,
        yellowcards: -1,
        
      };
    }

    this.form = this.formBuilder.group({
      id: new FormControl(this.player.id),
      name: new FormControl(
        this.player.name,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
      email: new FormControl(
        this.player.email,
        Validators.compose([Validators.maxLength(256)])
      )
      
    });
  }

  get errorControl() {
    return this.form.controls;
  }
  get errorControlTitle() {
    if (this.errorControl.title.status === 'INVALID') {
      if (this.errorControl.title.errors.required) {
        return 'Campo title requerido';
      }
      if (this.errorControl.title.errors.maxlength) {
        return 'La longitud máxima de title es de 128 carácteres';
      }
    }
  }
  get errorControlDescription() {
    if (this.errorControl.description.status === 'INVALID') {
      if (this.errorControl.description.errors.maxlength) {
        return 'La longitud máxima de title es de 256 carácteres';
      }
    }
  }
  submitForm() {
    this.dismiss(this.form.value);
  }
  public dismiss(player: Player) {
    this.modal.dismiss(player);
  }
  public exit() {
    this.modalController.dismiss();
  }
}
