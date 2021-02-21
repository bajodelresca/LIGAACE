import { Injectable } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private isLoading: any;

  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private toast: ToastController
  ) {}

  public async showModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props  //{item:{}}
    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  public async showLoading() {
    if (this.isLoading) {
      this.loading.dismiss();
    }
    this.isLoading = await this.loading.create({
    });
    await this.isLoading.present();
  }

  public async hideLoading() {
    await this.loading.dismiss();
    this.isLoading = null;
  }
  public async showToast(msg: string, color:string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color:color
      
    });
    await _toast.present();
  }
}
