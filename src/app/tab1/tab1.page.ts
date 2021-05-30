import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../model/Team';
import { SlideService } from '../services/slide.service';
import { TeamfService } from '../services/teamf.service';
import { UtilitiesService } from '../services/utilities.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public listado: Array<Team>;
  con: number
  firstTime: boolean;

  constructor(private teamf: TeamfService,
    private ui: UtilitiesService,
    private router: Router,
    private sliders: SlideService) { }
  ngOnInit(): void {
    this.firstTime = this.sliders.firstTime;  

    //if first time update first time 
    if(this.firstTime){
      this.sliders.saveFirstTimeLoad();
    }
    console.log(this.firstTime)
  }

  //______________________________________________________________________FUNCION PARA CARGAR EQUIPOS

  public async loadTeams() {
    await this.ui.showLoading();
    try {
      this.listado = await this.teamf.getTeamclasification();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  async ionViewDidEnter() {
    await this.loadTeams();
    /*if(this.con==null){
      this.navigate()
      await this.loadTeams();
    
  }else{
    await this.loadTeams();
    }*/
  }


}
