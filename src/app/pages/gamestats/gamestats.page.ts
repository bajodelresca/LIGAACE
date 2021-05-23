import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { id } from '@swimlane/ngx-datatable';
import { Game } from 'src/app/model/Game';
import { Player } from 'src/app/model/Player';
import { Team } from 'src/app/model/Team';
import { GamefService } from 'src/app/services/gamef.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { TeamfService } from 'src/app/services/teamf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-gamestats',
  templateUrl: './gamestats.page.html',
  styleUrls: ['./gamestats.page.scss'],
})
export class GamestatsPage implements OnInit {
  playertoupdate: any;
  public slide1: Boolean = false;
  listado1: Player[];
  team1; team2: any;
  finalresult: FormGroup;
  playerform: FormGroup;
  @Input("nota") game: Game;
  Estados: string[] = [
    'Goles',
    'Asistencias',
    'MVP',
    'T.Amarillas',
    'T.Rojas'
  ]
  constructor(private playerf: PlayerfService,
    private ui: UtilitiesService,
    private teamf: TeamfService,
    private formBuilder: FormBuilder,
    private gamef: GamefService) { }

  ngOnInit() {    
    this.loading()
    this.finalresult = this.formBuilder.group({
      equipo1: ['', Validators.required],
      equipo2: ['', Validators.required]

    });
    this.playerform = this.formBuilder.group({
      jugador: ['', Validators.required],
      accion: ['', Validators.required],
      cantidad: ['', Validators.required]

    })




  }
  async loading() {
    await this.ui.showLoading()
    setTimeout(() => {
      this.slide1 = true
    }, 300);

    console.log(this.slide1)
    this.ui.hideLoading()

  }
  //______________________________________________________________________FUNCION QUE SUMA PARTIDO JUGADO A JUGADORES
  public async setStats() {
    this.team1 = await this.teamf.getTeam(this.game.t[0].id);
    console.log(this.team1)
   await this.ui.showLoading()
    this.team1.repertorio.forEach(player => {
      console.log(player)
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
      player = {
        id: player.id,
        name: player.name,
        image: player.image,
        email: player.email,
        password: player.password,
        assists: player.assists,
        admin: player.admin,
        games: player.games + 1,
        goals: player.goals,
        mvp: player.mvp,
        redcards: player.redcards,
        yellowcards: player.yellowcards,
        team: this.team1



      }
      console.log(player)
      this.playerf.updatePlayer(player).then((respuesta) => {
        console.log("actualizados con exito")
        this.slide1 = true;
        this.ui.hideLoading()
      }).catch((err) => {
        console.log(err);
        this.ui.hideLoading()
      });
    });
  }

  public async setStats2() {
    this.team1 = await this.teamf.getTeam(this.game.t[1].id);
    console.log(this.team1)
   await this.ui.showLoading()
    this.team1.repertorio.forEach(player => {
      console.log(player)
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
      player = {
        id: player.id,
        name: player.name,
        image: player.image,
        email: player.email,
        password: player.password,
        assists: player.assists,
        admin: player.admin,
        games: player.games + 1,
        goals: player.goals,
        mvp: player.mvp,
        redcards: player.redcards,
        yellowcards: player.yellowcards,
        team: this.team1



      }
      console.log(player)
      this.playerf.updatePlayer(player).then((respuesta) => {
        console.log("actualizados con exito")
        this.slide1 = true;
        this.ui.hideLoading()
      }).catch((err) => {
        console.log(err);
        this.ui.hideLoading()
      });
    });
  }


  //______________________________________________________________________FUNCION QUE SUMA ESTADÍSTICAS A EQUIPOS

  async setgamestats() {
    await this.ui.showLoading()
    let game2 = {
      id: this.game.id,
      jornada: this.game.jornada,
      resultado: this.finalresult.get("equipo1").value + "-" + this.finalresult.get("equipo2").value,

    }
    await this.gamef.updateGame(game2).then((respuesta) => {
      console.log("Partido actualizado")
      console.log(this.game)
      this.ui.hideLoading();
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading();
      this.slide1 == true
    });
    var home = parseInt(this.finalresult.get("equipo1").value)
    var away = parseInt(this.finalresult.get("equipo2").value)
    this.team1 = await this.teamf.getTeam(this.game.t[0].id);
    this.team2 = await this.teamf.getTeam(this.game.t[1].id);
    if (home > away) {
      console.log("estoy en el 1")
      this.team1 = {
        id: this.team1.id,
        name: this.team1.name,
        image: this.team1.image,
        games: this.team1.games + 1,
        matcheswon: this.team1.matcheswon + 1,
        lostmatches: this.team1.lostmatches,
        tiedmatches: this.team1.tiedmatches,
        goals: this.team1.goals + parseInt(this.finalresult.get("equipo1").value),
        goalsc: this.team1.goalsc + parseInt(this.finalresult.get("equipo2").value),
        createdate: this.team1.createdate,
        points: this.team1.points + 3,
        repertorio: this.team1.repertorio,
        matches: this.team1.matches
      }
      this.team2 = {
        id: this.team2.id,
        name: this.team2.name,
        image: this.team2.image,
        games: this.team2.games + 1,
        matcheswon: this.team2.matcheswon,
        lostmatches: this.team2.lostmatches + 1,
        tiedmatches: this.team2.tiedmatches,
        goals: this.team2.goals + parseInt(this.finalresult.get("equipo2").value),
        goalsc: this.team2.goalsc + parseInt(this.finalresult.get("equipo1").value),
        createdate: this.team2.createdate,
        points: this.team2.points,
        repertorio: this.team2.repertorio,
        matches: this.team2.matches
      }
    } else if (home < away) {
      console.log("estoy en el 2")
      this.team1 = {
        id: this.team1.id,
        name: this.team1.name,
        image: this.team1.image,
        games: this.team1.games + 1,
        matcheswon: this.team1.matcheswon,
        lostmatches: this.team1.lostmatches + 1,
        tiedmatches: this.team1.tiedmatches,
        goals: this.team1.goals + parseInt(this.finalresult.get("equipo1").value),
        goalsc: this.team1.goalsc + parseInt(this.finalresult.get("equipo2").value),
        createdate: this.team1.createdate,
        points: this.team1.points + 3,
        repertorio: this.team1.repertorio,
        matches: this.team1.matches
      }
      this.team2 = {

        id: this.team2.id,
        name: this.team2.name,
        image: this.team2.image,
        games: this.team2.games + 1,
        matcheswon: this.team2.matcheswon + 1,
        lostmatches: this.team2.lostmatches,
        tiedmatches: this.team2.tiedmatches,
        goals: this.team2.goals + parseInt(this.finalresult.get("equipo2").value),
        goalsc: this.team2.goalsc + parseInt(this.finalresult.get("equipo1").value),
        createdate: this.team2.createdate,
        points: this.team2.points + 1,
        repertorio: this.team2.repertorio,
        matches: this.team2.matches
      }
    } else if (home = away) {
      console.log("estoy en el 3")
      this.team1 = {
        id: this.team1.id,
        name: this.team1.name,
        image: this.team1.image,
        games: this.team1.games + 1,
        matcheswon: this.team1.matcheswon,
        lostmatches: this.team1.lostmatches,
        tiedmatches: this.team1.tiedmatches + 1,
        goals: this.team1.goals + parseInt(this.finalresult.get("equipo1").value),
        goalsc: this.team1.goalsc + parseInt(this.finalresult.get("equipo2").value),
        createdate: this.team1.createdate,
        points: this.team1.points + 1,
        repertorio: this.team1.repertorio,
        matches: this.team1.matches
      }
      this.team2 = {
        id: this.team2.id,
        name: this.team2.name,
        image: this.team2.image,
        games: this.team2.games + 1,
        matcheswon: this.team2.matcheswon,
        lostmatches: this.team2.lostmatches,
        tiedmatches: this.team2.tiedmatches + 1,
        goals: this.team2.goals + parseInt(this.finalresult.get("equipo2").value),
        goalsc: this.team2.goalsc + parseInt(this.finalresult.get("equipo1").value),
        createdate: this.team2.createdate,
        points: this.team2.points + 1,
        repertorio: this.team2.repertorio,
        matches: this.team2.matches
      }
    }

    await this.teamf.updateTeam(this.team1).then((respuesta) => {
      this.setStats()
      this.ui.hideLoading();
      
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading();
      this.slide1 == true
    });
    await this.teamf.updateTeam(this.team2).then((respuesta) => {
      this.setStats2()
      this.ui.hideLoading();
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading();
    });
    


  }


  //______________________________________________________________________FUNCION QUE SUMA ESTADÍSTICAS A JUGADORES
  async setPlayerstats(team: string) {

    await this.ui.showLoading();
    if (team == "1") {
      this.team1 = await this.teamf.getTeam(this.game.t[0].id);
    } else if (team == "2") {
      this.team1 = await this.teamf.getTeam(this.game.t[1].id);
    }

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
    this.playertoupdate = await this.playerf.getPlayer(this.playerform.get("jugador").value);
    if (this.playerform.get("accion").value == "Goles") {
      this.playertoupdate = {
        id: this.playertoupdate.id,
        name: this.playertoupdate.name,
        image: this.playertoupdate.image,
        email: this.playertoupdate.email,
        password: this.playertoupdate.password,
        assists: this.playertoupdate.assists,
        admin: this.playertoupdate.admin,
        games: this.playertoupdate.games,
        goals: this.playertoupdate.goals + parseInt(this.playerform.get("cantidad").value),
        mvp: this.playertoupdate.mvp,
        redcards: this.playertoupdate.redcards,
        yellowcards: this.playertoupdate.yellowcards,
        team: this.team1
      }
    } else if (this.playerform.get("accion").value == "Asistencias") {
      this.playertoupdate = {
        id: this.playertoupdate.id,
        name: this.playertoupdate.name,
        image: this.playertoupdate.image,
        email: this.playertoupdate.email,
        password: this.playertoupdate.password,
        assists: this.playertoupdate.assists + parseInt(this.playerform.get("cantidad").value),
        admin: this.playertoupdate.admin,
        games: this.playertoupdate.games,
        goals: this.playertoupdate.goals,
        mvp: this.playertoupdate.mvp,
        redcards: this.playertoupdate.redcards,
        yellowcards: this.playertoupdate.yellowcards,
        team: this.team1
      }

    } else if (this.playerform.get("accion").value == "MVP") {
      this.playertoupdate = {
        id: this.playertoupdate.id,
        name: this.playertoupdate.name,
        image: this.playertoupdate.image,
        email: this.playertoupdate.email,
        password: this.playertoupdate.password,
        assists: this.playertoupdate.assists,
        admin: this.playertoupdate.admin,
        games: this.playertoupdate.games,
        goals: this.playertoupdate.goals,
        mvp: this.playertoupdate.mvp + parseInt(this.playerform.get("cantidad").value),
        redcards: this.playertoupdate.redcards,
        yellowcards: this.playertoupdate.yellowcards,
        team: this.team1
      }
    } else if (this.playerform.get("accion").value == "T.Amarillas") {
      this.playertoupdate = {
        id: this.playertoupdate.id,
        name: this.playertoupdate.name,
        image: this.playertoupdate.image,
        email: this.playertoupdate.email,
        password: this.playertoupdate.password,
        assists: this.playertoupdate.assists,
        admin: this.playertoupdate.admin,
        games: this.playertoupdate.games,
        goals: this.playertoupdate.goals,
        mvp: this.playertoupdate.mvp,
        redcards: this.playertoupdate.redcards,
        yellowcards: this.playertoupdate.yellowcards + parseInt(this.playerform.get("cantidad").value),
        team: this.team1
      }
    }
    else if (this.playerform.get("accion").value == "T.Rojas") {
      this.playertoupdate = {
        id: this.playertoupdate.id,
        name: this.playertoupdate.name,
        image: this.playertoupdate.image,
        email: this.playertoupdate.email,
        password: this.playertoupdate.password,
        assists: this.playertoupdate.assists,
        admin: this.playertoupdate.admin,
        games: this.playertoupdate.games,
        goals: this.playertoupdate.goals,
        mvp: this.playertoupdate.mvp,
        redcards: this.playertoupdate.redcards + parseInt(this.playerform.get("cantidad").value),
        yellowcards: this.playertoupdate.yellowcards,
        team: this.team1
      }
    }
    console.log(this.playertoupdate)
    await this.playerf.updatePlayer(this.playertoupdate).then((respuesta) => {
      console.log("Actualizando sus datos de jugador")
      this.playerform.reset();
      this.ui.hideLoading();
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading();
    });

  }



}
