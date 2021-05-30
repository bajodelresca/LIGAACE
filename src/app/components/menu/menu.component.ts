import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { TeamfService } from 'src/app/services/teamf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  team1: any
  teamname: any
  player: Player = {
    id: -1,
    name: '',
    image: '',
    email: '',
    password: '',
    assists: 0,
    admin: '',
    games: 0,
    goals: 0,
    mvp: 0,
    redcards: 0,
    yellowcards: 0,

  }

  constructor(private auth: AuthService,
    private router: Router,
    private imaS: ImagesService,
    private playerf: PlayerfService,
    private teamf: TeamfService,
    private ui: UtilitiesService) {

  }

  ngAfterViewInit() {
    // this.loadPlayer()
  }

  //______________________________________________________________________FUNCION QUE CARGA EL USUARIO LOGEADO

  loadPlayer() {
    this.player = {
      id: this.auth.getUser().id,
      name: this.auth.getUser().name,
      image: this.auth.getUser().image,
      email: this.auth.getUser().email,
      password: this.auth.getUser().password,
      assists: this.auth.getUser().assists,
      games: this.auth.getUser().games,
      admin: this.auth.getUser().admin,
      goals: this.auth.getUser().goals,
      mvp: this.auth.getUser().mvp,
      redcards: this.auth.getUser().redcards,
      yellowcards: this.auth.getUser().yellowcards,

    }

    console.log(this.player)
  }

  //______________________________________________________________________FUNCION PARA CAMBIAR IMAGEN

  public async setAvatar() {
    await this.ui.showLoading()    
    this.imaS.getImage().then(async(respuesta) => {
      if (this.imaS.myphoto == undefined) {
        this.loadPlayer();
      } else {
        if (this.auth.getUser().team) {
          this.team1 = await this.teamf.getTeam(this.auth.getUser().team.id);
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
            id: this.auth.getUser().id,
            name: this.auth.getUser().name,
            image: this.imaS.myphoto,
            email: this.auth.getUser().email,
            password: this.auth.getUser().password,
            assists: this.auth.getUser().assists,
            games: this.auth.getUser().games,
            admin: this.auth.getUser().admin,
            goals: this.auth.getUser().goals,
            mvp: this.auth.getUser().mvp,
            redcards: this.auth.getUser().redcards,
            yellowcards: this.auth.getUser().yellowcards,
            team: this.team1
          }
        } else{
          this.player = {
            id: this.auth.getUser().id,
            name: this.auth.getUser().name,
            image: this.imaS.myphoto,
            email: this.auth.getUser().email,
            password: this.auth.getUser().password,
            assists: this.auth.getUser().assists,
            games: this.auth.getUser().games,
            admin: this.auth.getUser().admin,
            goals: this.auth.getUser().goals,
            mvp: this.auth.getUser().mvp,
            redcards: this.auth.getUser().redcards,
            yellowcards: this.auth.getUser().yellowcards,



          }
        }



        console.log(this.player)
        this.playerf.updatePlayer(this.player).then((respuesta) => {
          console.log("imagen actualizada")
          this.ui.showToast("Imagen actualizada con éxito", "success");
          this.auth.setUser(this.player)
          this.auth.init();
          this.ui.hideLoading()
        }).catch((err) => {
          console.log(err);
          this.ui.hideLoading()
        });

      }
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading()
    });
  }
  //______________________________________________________________________FUNCION PARA NOMBRE DE EQUIPO

  public teamName() {
    if (this.player.team == undefined) {
      this.teamname = "Agente libre"

    } else {
      this.teamname = this.player.team.name
    }

  }

}