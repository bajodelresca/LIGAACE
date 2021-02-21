import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { PlayerfService } from 'src/app/services/playerf.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  teamname:any
  player: Player= {
    id: -1,
    name: '',
    image: '',
    email: '',
    password: '',
    assists: 0,
    games: 0,
    goals: 0,
    mvp: 0,
    redcards: 0,
    yellowcards: 0,
    
  }

  constructor(private auth: AuthService,
    private router: Router,
    private imaS: ImagesService,
    private playerf:PlayerfService) {
      
  }

  ngAfterViewInit() {
   // this.loadPlayer()
 }
 

loadPlayer(){
  this.player = {
    id: this.auth.getUser().id,
    name: this.auth.getUser().name,
    image: this.auth.getUser().image,
    email: this.auth.getUser().email,
    password: this.auth.getUser().password,
    assists: this.auth.getUser().assists,
    games: this.auth.getUser().games,
    goals: this.auth.getUser().goals,
    mvp: this.auth.getUser().mvp,
    redcards: this.auth.getUser().redcards,
    yellowcards: this.auth.getUser().yellowcards,
    
  }
  
  console.log(this.player)
}
  public async logout() {
    await this.auth.logout();
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login'])
    }
  }

  public setAvatar() {
    this.imaS.getImage().then((respuesta) => {
      if (this.imaS.myphoto == undefined) {
        this.loadPlayer();
      } else {
        this.player = {
          id: this.auth.getUser().id,
          name: this.auth.getUser().name,
          image: this.imaS.myphoto,
          email: this.auth.getUser().email,
          password: this.auth.getUser().password,
          assists: this.auth.getUser().assists,
          games: this.auth.getUser().games,
          goals: this.auth.getUser().goals,
          mvp: this.auth.getUser().mvp,
          redcards: this.auth.getUser().redcards,
          yellowcards: this.auth.getUser().yellowcards,
          

          
       }
        
        console.log(this.player)
        this.playerf.updatePlayer(this.player).then((respuesta) => {
        }).catch((err) => {
          console.log(err);
        });
        this.auth.setUser(this.player)
        this.auth.init();        
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  public teamName(){
    if(this.player.team==undefined){
      this.teamname="Agente libre"

    }else{
      this.teamname=this.player.team.name
    }

  }

}

