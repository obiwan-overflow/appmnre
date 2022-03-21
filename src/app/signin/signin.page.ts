import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  todo:FormGroup;
  alert:any;
  constructor(
    public router: Router,
    public storage:Storage,
    private formBuilder: FormBuilder,
    public api:RestApiService,
    public loadingController: LoadingController
  ) {
    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  async login(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();

    let username = await this.todo.value.username;
    let password = await this.todo.value.password;
    const form = new FormData();
    form.append('user',username);
    form.append('pass',password);
    await this.api.postdata('app/login',form).subscribe((res)=>{
      if(res.status == 'success'){
        loading.dismiss();
        // console.log(res);
        this.storage.set('userData',res.desc);
        location.assign('member#'+res.desc.token);
      }else if(res.status == 'failed'){
        loading.dismiss();
        this.alert = 'failed';
      }
    },(err)=>{
      console.log(err);
      loading.dismiss();
      this.alert = 'failed';
    })
  }
}
