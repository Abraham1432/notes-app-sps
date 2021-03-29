import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { httpApiEnvironments, note, user } from '../interfaces/notes-app';

import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api:httpApiEnvironments = {
    url:environment.ulr
  };

  $notes:BehaviorSubject<note[]> = new BehaviorSubject([]);
  $users:BehaviorSubject<user[]> = new BehaviorSubject([]);
  
  constructor(private http:HttpClient) {

    //initSuscribes
    this.initNotes();
    this.initUsers();
    

  }
  

   validateInputs(string){

    let patt = new RegExp(/[^a-zA-Z. /n]+/g);

    return patt.test(string);

   }

   validateText(string){

    let patt = new RegExp(/[^a-zA-Z.0-9 \r\n]+/g);

    return patt.test(string);

   }

   setLocalData(key:string,value){

      sessionStorage.setItem(key,JSON.stringify(value));

  }

   getLocalData(key:string){

    const data = sessionStorage.getItem(key);

    if(data){
    
      return JSON.parse(data)
    
    }else{

      return 0

    }

  }

  async initUsers(){

    const getuser = await this.getUsers();

    if(getuser !== 0 ){

      this.$users.next(getuser);
      
    }
    
  }

  async initNotes(){

    const getNotes = await this.getNotes();

    if(getNotes !== 0 ){

      this.$notes.next(getNotes);
      
    }
    
  }


  async getNotes(){

    const notes = await this.getLocalData('notes');

    if(notes !== 0){

      return notes

    }

    let url = `${this.api.url}notes`;

      try {
        
        const getNote:any = await this.http.get(url).toPromise();

        if(getNote){
          
          this.setLocalData("notes",getNote.notes);

          return getNote.notes;
        }

      } catch (error) {
        
        return 0

      }


    }

  async deletNote(id:string){

    let url = `${this.api.url}notes/${id}`;

      try {
        
        const detele = await this.http.delete(url).toPromise();

        if(detele){

          return detele;

        }else{
          return 0
        }

      } catch (error) {
        
        return 0

      }

    }

  async editNote(note:note){

    let url = `${this.api.url}notes/${note._id}`;

    const params = {
      title:note.title,
      content:note.content,
      user:note.user,
      date:note.date,
    }

    try {
      
      const sendNote = await this.http.put(url,params).toPromise();

      if(sendNote){
      
        return sendNote;

      }else{

        return 0
      
      }

    } catch (error) {
      
      return 0

    }

  }
  
  async deleteUser(id:string){

    let url = `${this.api.url}users/${id}`;

      try {
        
        const detele = await this.http.delete(url).toPromise();

        if(detele){

          return detele;

        }else{
          return 0
        }

      } catch (error) {
        
        return 0

      }

  }

  async getUsers(){
    
    const users = await this.getLocalData('users');

    if(users !== 0){

      return users

    }

    let url = `${this.api.url}users`;

    try {
      
      const getUsers:any = await this.http.get(url).toPromise();

      if(getUsers){

        this.setLocalData("users",getUsers.users);
        return getUsers.users;
      }

    } catch (error) {
      
      return 0

    }

  }

  async createUser(user:user){

    const url = `${this.api.url}users`;

    const params = {
      name:user.name
    }

    try {
      
      const createUser:any = await this.http.post(url,params).toPromise();

      if(createUser){

        return createUser.user;

      }else{
        return 0
      }

    } catch (error) {
      
      return 0

    }

  }

  async createNote(note:note){

    const url = `${this.api.url}notes`;

    const params = {
      title:note.title,
      content:note.content,
      user:note.user,
      date:note.date
    }

    try {
      
      const createNote = await this.http.post(url,params).toPromise();

      if(createNote){

        return createNote;

      }else{
        return 0
      }

    } catch (error) {
      
      return 0

    }

  }

  async editeNote(note:note){

    const url = `${this.api.url}notes/${note._id}`;

    const params = {
      title:note.title,
      content:note.content,
      user:note.user,
      date:note.date
    }

    try {
      
      const editNote = await this.http.put(url,params).toPromise();

      if(editNote){

        return editNote;

      }else{
        return 0
      }

    } catch (error) {
      
      return 0

    }

  }


}
