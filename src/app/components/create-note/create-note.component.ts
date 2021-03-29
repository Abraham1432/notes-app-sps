import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { note, user } from 'src/app/interfaces/notes-app';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  @Input() status:note;
   
  @Output() noteComplate = new EventEmitter<boolean>();


  note:note = {};
  notes:note[] = [];
  users:user[] = [];

  title:string;
  showAlertTitle: boolean = false;
  showAlertContent: boolean = false;

  constructor(private _api:ApiService) { }

  ngOnInit(){

    if(this.status){

      this.note = this.status;

      this.title ='Edit note';
   
    }else{
      this.title = 'Create note';
    }
      

   this.initSuscribes();

  }


  initSuscribes(){

    this._api.$users.subscribe(users =>{

      this.users = users;

    })

    this._api.$notes.subscribe(notes =>{

      this.notes = notes;

    })

  }


  async sendNote(postNote:NgForm){

    const {title,content,user,date} = postNote.form.value;

    let validateTitle = this._api.validateInputs(title);
    let validateContent = this._api.validateText(content);
    let sendNote;

    if(validateTitle){
      //show Alert!
      this.showAlertTitle = true;
      return

    }

    if(validateContent){
      //show Alert!
      this.showAlertContent = true;
      return

    }

    const note:note = {
      content:content,
      title:title,
      date:date,
      user:user
    } 
    
    
      if(this.status){

        note._id = this.note._id;

        sendNote = await this._api.editNote(note);

        if(sendNote != 0){
  
          this.updateStatus(this.note,'update');
  
        }else{
  
        }

      }else{

        sendNote = await this._api.createNote(note);

        if(sendNote != 0){
  
          this.updateStatus(sendNote.note,'add');
  
        }else{
  
        }

      }

  }

  back(){
    this.noteComplate.emit(false);
  }

  updateStatus(note:note,key:string){

    let filtserNotes;

    switch (key) {
      case 'add':
        let array = this.notes;
        array.push(note)
        filtserNotes = array
        break;
      case 'update':
        filtserNotes = this.notes.filter(n => n._id !== note._id);
        filtserNotes.push(note)
        break;
    
    }

    this._api.setLocalData('notes',filtserNotes)
    this._api.$notes.next(filtserNotes);

    if(this.status){
      this.noteComplate.emit(false);
    }

    this.note;

  }

}
