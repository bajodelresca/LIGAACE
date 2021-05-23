import { Injectable } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  private isLoading: any;
  options: LoadingOptions = {
    message: '<div class="box"><div class="shadow"></div><div class="gravity"><div class="ball"></div></div></div>',
    cssClass: 'loader',
    translucent: true,
    showBackdrop: true,
    spinner: null,
    mode: 'md',
    keyboardClose: true
  };


  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private toast: ToastController
  ) { }



  //______________________________________________________________________FUNCION PARA CREAR MODAL

  public async showModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props  //{item:{}}
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  //______________________________________________________________________FUNCION PARA CREAR LOADING

  public async showLoading() {
    if (this.isLoading) {
      this.loading.dismiss();
    }
    this.isLoading = await this.loading.create(this.options);
    await this.isLoading.present();
  }
  //______________________________________________________________________FUNCION PARA CERRAR LOADING

  public async hideLoading() {
    await this.loading.dismiss();
    this.isLoading = null;
  }

  //______________________________________________________________________FUNCION PARA CREAR TOAST

  public async showToast(msg: string, color: string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: color

    });
    await _toast.present();
  }
}
