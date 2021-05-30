import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/model/Game';
import { Team } from 'src/app/model/Team';
import { GamefService } from 'src/app/services/gamef.service';
import { TeamfService } from 'src/app/services/teamf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-newmatch',
  templateUrl: './newmatch.page.html',
  styleUrls: ['./newmatch.page.scss'],
})
export class NewmatchPage implements OnInit {
  public newmatch: FormGroup
  public listado: Array<Team>;
  public listado2: Array<Game>;
  public data: Game;
  public data2; data3: any;
  public data4; data5: Team;

  jornadas: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',


  ]


  constructor(private teamf: TeamfService,
    private ui: UtilitiesService,
    private gamef: GamefService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.newmatch = this.formBuilder.group({
      jornadan: ['', Validators.required],
      equipo1: ['', Validators.required],
      equipo2: ['', Validators.required]

    })
  }
  async ionViewDidEnter() {
    await this.loadTeams();
  }
  //______________________________________________________________________FUNCION PARA CARGAR EQUIPOS
  public async loadTeams() {
    await this.ui.showLoading();
    try {
      this.listado = await this.teamf.getTeam();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }
  //______________________________________________________________________FUNCION PARA CARGAR PARTIDOS
  public async loadGames() {
    await this.ui.showLoading();
    try {
      this.listado2 = await this.gamef.getGameid();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado2 = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }


  //______________________________________________________________________FUNCION ENVIAR FORMULARIO
  public async sendForm() {
    if (this.newmatch.get("equipo1").value == this.newmatch.get("equipo2").value) {
      this.ui.hideLoading();
      this.ui.showToast("No puedes crear un partido con el mismo equipo", "danger");
    } else {
      await this.loadGames();
      console.log(this.listado2)
      await this.setgame1();
      await this.setgame2();
      this.router.navigate([''])

    }

  }
  //______________________________________________________________________FUNCION CREAR PARTIDO
  public async createGame($event) {
    console.log(this.newmatch.get("jornadan").value)
    console.log(this.newmatch.get("equipo1").value)
    console.log(this.newmatch.get("equipo2").value)
    await this.ui.showLoading();
    this.data = {
      id: -1,
      jornada: $event.target.value,
      resultado: "",
      t: []
    }
    this.gamef.createGame(this.data).then(/* async */(respuesta) => {

      console.log(respuesta)
      console.log(this.data);





      this.ui.hideLoading();/*
         this.ui.showToast("jornada creado con éxito", "success")          
          console.log(this.data)
          this.data2 = await this.teamf.getTeam(this.newmatch.get('equipo1').value);
          this.data4=this.data2[0];
          this.data4={
            id: this.data4.id,
          name: this.data4.name,
          image: this.data4.myphoto,
          games: this.data4.games,
          points: this.data4.points,
          matcheswon: this.data4.matcheswon,
          lostmatches: this.data4.lostmatches,
          tiedmatches: this.data4.tiedmatches,
          goals: this.data4.goals,
          goalsc: this.data4.goalsc,
          createdate: this.data4.createdate,
          matches:this.data

          }  */



    }).catch((err) => {
    });
  }
  //______________________________________________________________________FUNCION PARA ACTUALIZAR EQUIPO LOCAL
  public async setgame1() {
    await this.ui.showLoading();

    this.data2 = await this.teamf.getTeam(this.newmatch.get('equipo1').value);
    this.data2.matches.push(this.listado2[0])
    console.log(this.data2)
    this.data2 = {
      id: this.data2.id,
      name: this.data2.name,
      image: this.data2.image,
      games: this.data2.games,
      points: this.data2.points,
      matcheswon: this.data2.matcheswon,
      lostmatches: this.data2.lostmatches,
      tiedmatches: this.data2.tiedmatches,
      goals: this.data2.goals,
      goalsc: this.data2.goalsc,
      createdate: this.data2.createdate,
      matches: this.data2.matches,




    }

    console.log(this.data2)
    await this.teamf.updateTeam(this.data2).then((respuesta) => {
      this.ui.hideLoading();
      console.log(this.data2)
    }).catch((err) => {
      console.log(err);
      this.ui.hideLoading();
    });

  }
  //______________________________________________________________________FUNCION PARA ACTUALIZAR EQUIPO VISITANTE
  public async setgame2() {
    await this.ui.showLoading();
    this.data3 = await this.teamf.getTeam(this.newmatch.get('equipo2').value);
    this.data3.matches.push(this.listado2[0])
    console.log(this.data3)
    this.data3 = {
      id: this.data3.id,
      name: this.data3.name,
      image: this.data3.image,
      games: this.data3.games,
      points: this.data3.points,
      matcheswon: this.data3.matcheswon,
      lostmatches: this.data3.lostmatches,
      tiedmatches: this.data3.tiedmatches,
      goals: this.data3.goals,
      goalsc: this.data3.goalsc,
      createdate: this.data3.createdate,
      matches: this.data3.matches,




    }

    console.log(this.data3)
    await this.teamf.updateTeam(this.data3).then((respuesta) => {
      console.log(this.data3)
      this.ui.hideLoading();
      this.ui.showToast("Partido creado correctamente", "success");
    }).catch((err) => {
      
      console.log(err);
      this.ui.hideLoading();
    });

  }

}



