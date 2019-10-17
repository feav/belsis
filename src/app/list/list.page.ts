import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private tables : Array<{
          label:String,
          value:Number,
          logo:String,
          color:String
        }> = [];  
  constructor(){
    for (let i = 1; i < 11; i++) {
      this.tables.push({
        label: 'Item ' + i,
        value: 'This is item #' + i,
        logo: "/assets/logo-stock.svg",
        color:"red"
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
