import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.page.html',
  styleUrls: ['./status-detail.page.scss'],
})
export class StatusDetailPage implements OnInit {
  data:any = [];
  ticket:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.ticket  = await this.route.snapshot.paramMap.get('ticket');

    const form = new FormData();
    form.append('case_code',this.ticket);
    this.api.postdata('app/findTicket',form).subscribe((res)=>{
      console.log(res);
      this.data = res.desc.ticket;
    },(err)=>{
      console.log(err);
    });
  }
}
