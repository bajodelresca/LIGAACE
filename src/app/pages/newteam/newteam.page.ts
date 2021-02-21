import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Team } from 'src/app/model/Team';
import { ImagesService } from 'src/app/services/images.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { TeamfService } from 'src/app/services/teamf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-newteam',
  templateUrl: './newteam.page.html',
  styleUrls: ['./newteam.page.scss'],
})
export class NewteamPage {
  photo:any
  public newteam: FormGroup;
  public data: Team;



  constructor(private formBuilder: FormBuilder,
    private teamf: TeamfService,
    private ui: UtilitiesService,
    private router: Router,
    private menu: MenuController,
    private imaS: ImagesService,
    private modalController:ModalController) {
    this.newteam = this.formBuilder.group({
      name: ['', Validators.required],
      createdate: ['', Validators.required]

    })
  }

 

  public async sendForm() {
    await this.ui.showLoading();    
        this.data = {
          id: -1,
          name: this.newteam.get('name').value,
          image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcADIALgAyACAAVAByAGEAbgBzAGYAZQByACAAdwBpAHQAaAAgAHMAUgBHAEIAIABHAGEAbQB1AHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACMzMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMACgcHCAcGCggICAsKCgsOGBAODQ0OHRUWERgjHyUkIh8iISYrNy8mKTQpISIwQTE0OTs+Pj4lLkRJQzxINz0+O//bAEMBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAMgAmwMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z",
          games: 0,
          points:0,
          matcheswon: 0,
          lostmatches: 0,
          tiedmatches: 0,
          goals: 0,
          goalsc: 0,
          createdate: this.newteam.get('createdate').value
        }
        this.teamf.createTeam(this.data).then((respuesta) => {
          this.newteam.setValue({
            name: '',            
            createdate: ''
          })
          this.ui.hideLoading();
          this.ui.showToast("Equipo creado con éxito", "success")          
          this.router.navigate(['tab3'])
        }).catch((err) => {
        });
      }
      
      

        
      



      public exit() {
        this.modalController.dismiss();
      }

}
