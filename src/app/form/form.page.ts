import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  constructor(public route:Router) { }

  ngOnInit() {
  }

  async form(){
    this.route.navigateByUrl('form-success');
  }
}
