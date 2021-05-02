import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public newmatch:FormGroup
  public listado:Array<Team>;
  public listado2:Array<Game>;
  public data:Game;
  public data2:Team[];
  jornadas: string[] = [
    'jornada 1',
    'jornada 2',
    'jornada 3',

  ]


  constructor(private teamf:TeamfService,
    private ui:UtilitiesService,
    private gamef:GamefService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newmatch = this.formBuilder.group({
      equipo1: ['', Validators.required],
      equipo12: ['', Validators.required]

    })
  }
  async ionViewDidEnter(){
    await this.loadTeams();
    await this.loadGames();
    console.log(this.listado2)
  }
  public async loadTeams() {
    await this.ui.showLoading();
    try {
      this.listado = await this.teamf.getTeam();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error,"danger");
    }
  }

  public async loadGames() {
    await this.ui.showLoading();
    try {
      this.listado2 = await this.gamef.getGame();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado2 = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error,"danger");
    }
  }
  

  public async sendForm() {
    await this.ui.showLoading();    
        this.data = {
          id: -1,
          jornada:1,
          resultado: "2-2",
          
        }
        this.gamef.createGame(this.data).then(async(respuesta) => {
         
          this.ui.hideLoading();
          this.ui.showToast("jornada creado con éxito", "success")          
          console.log(this.data)
          this.data2 = await this.teamf.getTeam(this.newmatch.get('equipo1').value);
            
          
          
        }).catch((err) => {
        });
      } 
   

}
