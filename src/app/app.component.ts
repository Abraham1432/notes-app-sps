import { Component,OnDestroy } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy  {

  constructor(private _api:ApiService){}


  ngOnDestroy(){

    //usSuscribe
    this._api.$notes.unsubscribe();
    this._api.$users.unsubscribe();

  }
  

}
