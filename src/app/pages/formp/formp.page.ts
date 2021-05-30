import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Player } from 'src/app/model/Player';
import { PlayerfService } from 'src/app/services/playerf.service';
import { TeamfService } from 'src/app/services/teamf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-formp',
  templateUrl: './formp.page.html',
  styleUrls: ['./formp.page.scss'],
})
export class FormpPage implements OnInit {

  @Input("player") player: Player;

  public mode: string;
  private form: FormGroup;
  team1:any

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private modalController: ModalController,
    private playerf:PlayerfService,
    private teamf:TeamfService,
    private ui:UtilitiesService
  ) {
  
    
  }
  ngOnInit(): void {
    console.log(this.player)
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]

    })
    this.form.patchValue({
      name: this.player.name, 
      email:this.player.email
    });
  }

  
 async submitForm() {
   this.ui.showLoading()
    if (this.player.team) {
      this.team1 = await this.teamf.getTeam(this.player.team.id);
      this.team1 = {
        id: this.team1.id,
        name: this.team1.name,
        image: this.team1.image,
        games: this.team1.games,
        matcheswon: this.team1.matcheswon,
        lostmatches: this.team1.lostmatches,
        tiedmatches: this.team1.tiedmatches,
        goals: this.team1.goals,
        goalsc: this.team1.goalsc,
        createdate: this.team1.createdate,
        points: this.team1.points,
        matches: this.team1.matches
      }
      this.player = {
        id: this.player.id,
        name: this.form.get('name').value,
        image: this.player.image,
        email: this.form.get('email').value,
        password: this.player.password,
        assists: this.player.assists,
        games: this.player.games,
        admin: this.player.admin,
        goals: this.player.goals,
        mvp: this.player.mvp,
        redcards: this.player.redcards,
        yellowcards: this.player.yellowcards,
        team: this.team1
      }
    } else{
      this.player = {
        id: this.player.id,
        name: this.form.get('name').value,
        image: this.player.image,
        email: this.form.get('email').value,
        password: this.player.password,
        assists: this.player.assists,
        games: this.player.games,
        admin: this.player.admin,
        goals: this.player.goals,
        mvp: this.player.mvp,
        redcards: this.player.redcards,
        yellowcards: this.player.yellowcards,



      }
    }



    console.log(this.player)
    this.playerf.updatePlayer(this.player).then((respuesta) => {
      console.log("imagen actualizada")
      this.ui.showToast("Jugador actualizado con éxito", "success");
      this.ui.hideLoading()
      this.exit()
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading()
    });
  }
  
  public exit() {
    this.modalController.dismiss();
  }
}
