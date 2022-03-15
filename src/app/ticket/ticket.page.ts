import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from '../rest-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  todo:FormGroup;
  constructor(public route:Router,private formBuilder: FormBuilder,public api:RestApiService,public toastController: ToastController) {
    this.todo = this.formBuilder.group({
      ticket: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async form(){
    let ticket = this.todo.value.ticket;

    const form = new FormData();
    form.append('case_code',ticket);

    this.api.postdata('app/findTicket',form).subscribe((res)=>{
      // console.log(res);
      this.route.navigateByUrl('ticket/status-detail/'+ticket);
    },(err)=>{
      // console.log(err);
      this.presentToast();
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'ไม่พบข้อมูล.',
      duration: 2000,
      position: "top",
    });
    toast.present();
  }
}
