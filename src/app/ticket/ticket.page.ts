import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  data = {}
  constructor(public route:Router) { }

  ngOnInit() {
  }

  async form(){
    console.log(this.data);
    this.route.navigateByUrl('ticket/status-detail');
  }

}
