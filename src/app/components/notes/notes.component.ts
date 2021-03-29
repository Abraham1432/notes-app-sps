import { Component, OnInit } from '@angular/core';
import { note } from 'src/app/interfaces/notes-app';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  edit:boolean = false;

  note:note = {};

  notes:note[] = [];

  constructor(private _api:ApiService) { }

  ngOnInit(){
    
    this.initSuscribes();
  }

  
  initSuscribes(){

    this._api.$notes.subscribe(notes =>{

      this.notes = notes;

    })

  }

  noteEvent(value:any) {

   this.edit = value;

  }


  editNote(note:note){

    this.note = note
    this.edit = true;

  }

  async deleteNote(note:note){

    const removeNote = await this._api.deletNote(note._id)

    if(removeNote != 0){
      //show alter user;
     
      let filterNotes = this.notes.filter(u => u._id !== note._id);

      this._api.setLocalData('notes',filterNotes)
      this._api.$notes.next(filterNotes);


    }else{
      //somtings wrog 
    }

  }

}
