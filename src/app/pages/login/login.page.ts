import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/model/Player';
import { PlayerfService } from 'src/app/services/playerf.service';
import jsSHA from 'jssha';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public existplayer: FormGroup;
  public data: Player;



  constructor(private formBuilder: FormBuilder,
    private playerf: PlayerfService,
    private ui:UtilitiesService,
    private auth:AuthService,
    private router: Router,
    private menu:MenuController
    ) {
    this.existplayer = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]     

    })
  }
  ngOnInit() {
    
  }
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
  
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }
 
  
  public async sendForm(){
    await this.ui.showLoading();
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.existplayer.get('password').value);
    let hash = shaObj.getHash("HEX");
    let email=this.existplayer.get('email').value;
    this.playerf.searchByCount(email,hash).then((respuesta)=>{
      this.auth.login(respuesta).then(result=>{
        if(result.id != null){
          this.ui.hideLoading();
          this.router.navigate(['']);
        }else{
          this.ui.hideLoading();
          this.ui.showToast("Los datos introducidos son incorrectos","danger");
        };
      });
      this.existplayer.setValue({
        email:'',
        password:''
      })
    }).catch((err)=>{
      console.log(err);

    });
  }

}
