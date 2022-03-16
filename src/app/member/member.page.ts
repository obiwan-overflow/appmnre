import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  token:any;
  dataLists:any = [];
  check:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public api:RestApiService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    await this.storage.get('userData').then((data)=>{
      this.token = data.token;
    });
    const form = new FormData();
    form.append('token',this.token);
    await this.api.postdata('app/getTicketByID',form).subscribe((res)=>{
      this.dataLists = res.desc;
      this.check = res.desc.length;
      loading.dismiss();
    },(err)=>{
      console.log(err);
      loading.dismiss();
    })
  }
}
