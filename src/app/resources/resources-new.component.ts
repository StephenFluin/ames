import { Component, Pipe, PipeTransform } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';

@Component({
  moduleId: module.id,
  selector: 'resources-new',
  templateUrl: 'resources-new.component.html',
  directives: [ ...MD_BUTTON_DIRECTIVES, ...MD_TOOLBAR_DIRECTIVES, ...MD_INPUT_DIRECTIVES ],
  pipes: [ RefirebasePipe ]
})
export class ResourcesNewComponent {
  data : Observable<any[]>;
  categories: Observable<any[]>;
  subCategories: Observable<any[]>;
  
  submission : Submission;
  
  constructor(private af: AngularFire) {
    this.data = af.database.list('/resources/').share();
    this.categories = this.data.map((items) =>
    {
      return items.map( (item ) => {
        return item.$key;
      })
    });
   
   

    this.submission = new Submission();
    this.selectCategory(this.submission.selectedCategory);
  }
  
  ngOnInit() {
    
  }
  
  selectCategory(param) {
    console.log("Selecting " , param);
    this.submission.selectedCategory = param;
    this.subCategories = this.af.database.list('/resources/' + param)
    .map(items =>
      items.map( sub => {
        if(!this.submission.selectedSubcategory) {
          this.submission.selectedSubcategory = sub.$key;
        }
        return sub.$key})
    );
    
  }
  
  submit() {
    if(!this.submission.validate() || !this.submission.selectedCategory || !this.submission.selectedSubcategory) {
      alert("Please complete the form before submitting.");
      console.log(this.submission.title,this.submission.url,this.submission.selectedCategory,this.submission.selectedSubcategory);
    } else {
      this.af.database.list('/resource-queue/')
        .push(this.submission);
      this.submission = new Submission();
      this.selectCategory('Education');
    }
      
  }
  
}


class Submission {
  /*name : string;*/
  selectedCategory : string;
  selectedSubcategory: string;
  /*email : string;
  companyName : string;*/
  title : string;
  url : string;
  desc : string;
  /*notes : string;*/
  rev: boolean = true;
  
  constructor() {
    /*
    this.name = "Stephen Fluin";
    this.selectedCategory = "Community";
    this.selectedSubcategory = "Groups";
    this.email = "stephenfluin@google.com";
    this.companyName = "Google";
    this.title = "Angularistas";
    this.url = "https://angular.io";
    this.notes = "These are notes";
    this.rev = false;*/
  }
  
  validate() : boolean {
    return !(
      !this.selectedCategory ||
      !this.selectedSubcategory ||
      !this.title ||
      !this.url);
  }
}

