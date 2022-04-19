import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActionSheetController,LoadingController,ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  todo:FormGroup;
  topicId:any;
  subTopic:any;
  nameTitle:any;
  listsProvinces:any;
  listsAmphures:any;
  listsTombons:any;
  listsAmphuresTwo:any;
  listsTombonsTwo:any;
  token:any;
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
    public storage:Storage
  ) {
    this.todo = this.formBuilder.group({
      id_card: ['', Validators.required],
      name_title: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required,Validators.min(1),Validators.max(88)],
      tel: ['', Validators.required,Validators.maxLength(10)],
      phone: ['', Validators.required,Validators.maxLength(10)],
      email: ['', Validators.required],
      address_no: ['', Validators.required],
      moo: ['', Validators.required],
      housename: ['', Validators.required],
      soi: ['', Validators.required],
      road: ['', Validators.required],
      provinces: ['', Validators.required],
      amphures: ['', Validators.required],
      districts: ['', Validators.required],
      zipcode: ['', Validators.required,Validators.maxLength(5)],
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
      t_zipcode: ['', Validators.required,Validators.maxLength(5)],
      place_landmarks: ['', Validators.required],
      response_person: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('userData').then((data)=>{
      if(data !== null){
        this.token  = data.token;
      }
    });
    this.topicId    = await this.route.snapshot.paramMap.get('topicId');
    this.subTopic   = await this.route.snapshot.paramMap.get('id');
    await this.api.getdata('app/provinces').subscribe((res)=>{
      this.listsProvinces = res;
    });
    await this.api.getdata('app/getPrefix').subscribe((res)=>{
      this.nameTitle = res;
    });
  }
  async getAmphures(event){
    await this.api.getdata('app/amphures&idprovinces='+event.target.value).subscribe((res)=>{
      this.listsAmphures = res;
    });
  }
  async getTambons(event){
    await this.api.getdata('app/tambons&idamphures='+event.target.value).subscribe((res)=>{
      this.listsTombons = res;
    });
  }
  async getAmphuresTwo(event){
    await this.api.getdata('app/amphures&idprovinces='+event.target.value).subscribe((res)=>{
      this.listsAmphuresTwo = res;
    });
  }
  async getTambonsTwo(event){
    await this.api.getdata('app/tambons&idamphures='+event.target.value).subscribe((res)=>{
      this.listsTombonsTwo = res;
    });
  }
  async form(){
    const form = new FormData();
    form.append('AUT_USER_ID',this.token);
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
      if(res.status == "success"){
        this.router.navigateByUrl('form-success/'+res.desc);
      }
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
    // this.loadingImage();
    this.camera.getPicture(this.cameraOptions).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.userImg = this.base64Img;
      this.updateImages(this.userImg);
      this.loadingImg.dismiss();
    }, (err) => {
      console.log(err);
      this.loadingImg.dismiss();
    })
  }
  async openGallery() {
    // this.loadingImage();
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     this.updateImages(this.userImg);
     this.loadingImg.dismiss();
    }, (err) => {
     console.log(err);
     this.loadingImg.dismiss();
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
