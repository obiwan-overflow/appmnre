import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {
  statusBtn:any;
  constructor() {
    this.statusBtn = "hide";
  }

  ngOnInit() {
  }
  async confirm(e){
    if(e.detail.checked == true){
      this.statusBtn = "show";
    }else{
      this.statusBtn = "hide";
    }
  }
}
