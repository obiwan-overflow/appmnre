import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';  

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {
  topic:any = [];
  constructor(public api:RestApiService,public router:Router) {
   
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.api.getdata('app/getTopicSub').subscribe((res)=>{
      this.topic = res.desc.topic;
    },(err)=>{
      console.log(err);
    });
  }
  async btnTopic(topicId,id){
    this.router.navigateByUrl('form/'+topicId+'/'+id);
  }
}
