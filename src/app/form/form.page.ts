import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  todo:FormGroup;
  topicId:any;
  constructor(public router:Router,public api:RestApiService,private formBuilder: FormBuilder,public route:ActivatedRoute) {
    this.todo = this.formBuilder.group({
      id_card: ['', Validators.required],
      name_title: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      tel: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address_no: ['', Validators.required],
      moo: ['', Validators.required],
      housename: ['', Validators.required],
      soi: ['', Validators.required],
      road: ['', Validators.required],
      provinces: ['', Validators.required],
      amphures: ['', Validators.required],
      districts: ['', Validators.required],
      zipcode: ['', Validators.required],
      name_topic: ['', Validators.required],
      note_topic: ['', Validators.required],
      number_topic: ['', Validators.required],
      complain_name: ['', Validators.required],
      t_address_no: ['', Validators.required],
      t_moo: ['', Validators.required],
      t_housename: ['', Validators.required],
      t_soi: ['', Validators.required],
      t_road: ['', Validators.required],
      t_provinces: ['', Validators.required],
      t_amphures: ['', Validators.required],
      t_districts: ['', Validators.required],
      t_zipcode: ['', Validators.required],
      place_landmarks: ['', Validators.required],
      response_person: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.topicId = await this.route.snapshot.paramMap.get('topicId');
  }
  async form(){
    // this.route.navigateByUrl('form-success');
    const form = new FormData();
    form.append('topic_id',this.topicId);
    form.append('id_card',this.todo.value.id_card);
    form.append('name_title',this.todo.value.name_title);
    form.append('name',this.todo.value.name);
    form.append('lastname',this.todo.value.lastname);
    form.append('age',this.todo.value.age);
    form.append('tel',this.todo.value.tel);
    form.append('phone',this.todo.value.phone);
    form.append('email',this.todo.value.email);
    form.append('address_no',this.todo.value.address_no);
    form.append('moo',this.todo.value.moo);
    form.append('housename',this.todo.value.housename);
    form.append('soi',this.todo.value.soi);
    form.append('road',this.todo.value.road);
    form.append('provinces',this.todo.value.provinces);
    form.append('amphures',this.todo.value.amphures);
    form.append('districts',this.todo.value.districts);
    form.append('zipcode',this.todo.value.zipcode);
    form.append('name_topic',this.todo.value.name_topic);
    form.append('note_topic',this.todo.value.note_topic);
    form.append('number_topic',this.todo.value.number_topic);
    form.append('complain_name',this.todo.value.complain_name);
    form.append('t_address_no',this.todo.value.t_address_no);
    form.append('t_moo',this.todo.value.t_moo);
    form.append('t_housename',this.todo.value.t_housename);
    form.append('t_soi',this.todo.value.t_soi);
    form.append('t_road',this.todo.value.t_road);
    form.append('t_provinces',this.todo.value.t_provinces);
    form.append('t_amphures',this.todo.value.t_amphures);
    form.append('t_districts',this.todo.value.t_districts);
    form.append('t_zipcode',this.todo.value.t_zipcode);
    form.append('place_landmarks',this.todo.value.place_landmarks);
    form.append('response_person',this.todo.value.response_person);
    this.api.postdata('app/addResponse',form).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
  }
}
