import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  todo:FormGroup;
  constructor(public route:Router,private formBuilder: FormBuilder,public api:RestApiService) {
    this.todo = this.formBuilder.group({
      ticket: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async form(){
    let ticket = this.todo.value.ticket;

    // const form = new FormData();
    // form.append('case_code ',ticket);

    // this.api.postdata('app/findTicket',form).subscribe((res)=>{
    //   console.log(res);
    // },(err)=>{
    //   console.log(err);
    // });
   
    this.route.navigateByUrl('ticket/status-detail/'+ticket);
  }

}
