import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  token:any;
  constructor(private storage: Storage,public router:Router,public loadingController: LoadingController) {}
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    this.token = await this.storage.get('userData');

    var re = /#/gi; 
    var str = location.hash;
    var newstr = str.replace(re, ""); 
    if(newstr!=''){
      this.token = newstr;
    }
  }
  async signOut(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    await this.storage.remove('userData');
    await this.router.navigate(['home']);
    await location.reload();
    await loading.dismiss();
  }
}
