import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Player } from 'src/app/model/Player';
import { Team } from 'src/app/model/Team';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { TeamfService } from 'src/app/services/teamf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  @Input("nota") team: Team;
  public listado: Array<Player>;
  player: Player
  pdfObject: any
  constructor(private playerf: PlayerfService,
    private ui: UtilitiesService,
    private auth: AuthService,
    private alertcontroller: AlertController,
    private modalController: ModalController,
    private imaS: ImagesService,
    private teamf: TeamfService,
    private file: File,
    private fileOpener: FileOpener,
    private platform: Platform) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.loadPlayers(this.team.id);
    console.log(this.team)
  }
  public async loadPlayers(id: number) {
    await this.ui.showLoading();
    try {
      this.listado = await this.playerf.getPlayerTeam(id);
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  public async setTeam() {
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
      team: this.team



    }
    this.generatePDF();
    console.log(this.player)
    this.playerf.updatePlayer(this.player).then((respuesta) => {
    }).catch((err) => {
      console.log(err);
    });
    this.auth.setUser(this.player)


  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: '¿Estás seguro de fichar por ' + this.team.name + '?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.setTeam();

        }
      }]
    });

    await alert.present();
  }

  public cargaDatos($event = null) {

    try {
      this.loadPlayers(this.team.id)
      if ($event) {
        $event.target.complete();
      }
    } catch (err) {
      //Error
    }
  }




  public exit() {
    this.modalController.dismiss();
  }

  public openPlayer(player: Player) {
    this.playerf.openPlayer(player);
    console.log(player)
  }

  public setAvatar() {
    this.imaS.getImage().then((respuesta) => {
      if (this.imaS.myphoto == undefined) {

      } else {
        this.team = {
          id: this.team.id,
          name: this.team.name,
          image: this.imaS.myphoto,
          games: this.team.games,
          points: this.team.points,
          matcheswon: this.team.matcheswon,
          lostmatches: this.team.lostmatches,
          tiedmatches: this.team.tiedmatches,
          goals: this.team.goals,
          goalsc: this.team.goalsc,
          createdate: this.team.createdate,



        }

        console.log(this.team)
        this.teamf.updateTeam(this.team).then((respuesta) => {
        }).catch((err) => {
          console.log(err);
        });

      }
    }).catch((err) => {
      console.log(err);
    });
  }
  generatePDF() {
    let docDefinition = {
      content: [
        'De una parte, '+this.team.name+' Y De otra parte, '+this.player.name+' ESTIPULAN Que   '+this.player.name+'   expresa   su   voluntad   de   participar   con   '+this.team.name+'   en   el   torneo______________  de  _____ de  ACE  y,  desde  la  firma  del  presente documento, se obliga a jugar y competir con '+this.team.name+' con su mejor capacidad y habilidad posible. Que  '+this.player.name+'  se  compromete  a  acatar  las  normas  internas  del  equipo,  y  a  respetar  y cumplir la normativa, reglamentación, bases de la competición y estatutos por los que se rige la Liga ACE. '+this.player.name+' no   podrá,   durante   la   duración   del   presente   acuerdo,   comprometerse deportivamente con otro club, así como entrenar o participar en encuentros bajo la disciplina decualquier otro club, sin el consentimiento expreso de '+this.team.name+'. '+this.player.name+ 'podrá participar como jugador en todas las competiciones oficiales y amistosas,nacionales e internacionales, en las que participe el primer equipo de '+this.team.name+' o hayan sido organizadas  por  éste  o  por  otra  entidad  en  su  representación,  así  como  en  aquellos  eventos oficiales o partidos de exhibición para los que sea seleccionado por la Selección Española Virtual. La  participación  de '+this.player.name+'es  libre  y  voluntaria  y  se  desarrolla  sin  ningún  ánimo  delucro, constituyendo exclusivamente una opción de entretenimiento u ocio',
      ]
    };
    this.pdfObject = pdfMake.createPdf(docDefinition);
    console.log("PDF generado")
    this.openFile()

  }

  openFile() {
    if (this.platform.is('cordova')) {
      this.pdfObject.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory,'contrato.pdf',blob,{replace:true}).then(fileEntry=>{
          this.fileOpener.open(this.file.dataDirectory+'contrato.pdf','application/pdf')
        })
      })
      return true;
    }
  }
}



