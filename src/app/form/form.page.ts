import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActionSheetController,LoadingController,ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  todo:FormGroup;
  topicId:any;
  subTopic:any;
  // loadding
  loadingImg:any;

  // images
  userImg: any = '';
  base64Img = '';
  imagesarray: any = [];
  constructor(
    public router:Router,
    public api:RestApiService,
    private formBuilder: FormBuilder,
    public route:ActivatedRoute,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public loadingController:LoadingController,
  ) {
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
    this.topicId  = await this.route.snapshot.paramMap.get('topicId');
    this.subTopic = await this.route.snapshot.paramMap.get('id');
  }
  async form(){
    // this.route.navigateByUrl('form-success');
    const form = new FormData();
    form.append('topic_id',this.topicId);
    // form.append('sub_topic_id',this.topicId);
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
    form.append('file',this.imagesarray);
    this.api.postdata('app/addResponse',form).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'อัพโหลดรูปภาพ',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'เปิดกล้อง',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'เปิดอัลบั้มรูป',
        icon: 'image',
        handler: () => {
          this.openGallery();
        }
      }, {
        text: 'ยกเลิก',
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  // images
  cameraOptions: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false
  }
  gelleryOptions: CameraOptions = {
    quality: 30,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false
  }
  async openCamera(){
    this.loadingImage();
    this.camera.getPicture(this.cameraOptions).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.userImg = this.base64Img;
      this.updateImages(this.userImg);
    }, (err) => {
      console.log(err);
    })
  }
  async openGallery() {
    this.loadingImage();
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     this.updateImages(this.userImg);
    }, (err) => {
     console.log(err);
    })
  }
  async updateImages(images){
    await this.imagesarray.push(images);
    await this.loadingImg.dismiss();
  }
  async loadingImage() {
    this.loadingImg = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loadingImg.present();
  }
}