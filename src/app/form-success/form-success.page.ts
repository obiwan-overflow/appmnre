import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-success',
  templateUrl: './form-success.page.html',
  styleUrls: ['./form-success.page.scss'],
})
export class FormSuccessPage implements OnInit {
  ticket:any;
  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.ticket  = await this.route.snapshot.paramMap.get('ticket');
  }
}
