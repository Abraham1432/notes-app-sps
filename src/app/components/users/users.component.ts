import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { user } from 'src/app/interfaces/notes-app';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users:user[] = [];

  user:user = {};
  showAlert: boolean = false;

  constructor(private _api:ApiService) { }

  ngOnInit(){

    this.suscribeUsers();

  }

  async createUser(userPost:NgForm){

    const { name } = userPost.value;

    let validate = this._api.validateInputs(name);

    if(validate){
      this.showAlert = true;
      return

    }

    const user:user = {
      name:name
    } 

    const postUser = await this._api.createUser(user)

    if(postUser != 0){

      this.user = {};

      //show alter user;
      this.updateStatus(postUser,'add');

    }else{
      //someone wrog 
    }


  }

  async deleteUser(user:user){

    const deleteUser = await this._api.deleteUser(user._id)

    if(deleteUser != 0){
      //show alter user;
      this.updateStatus(user,'delete');

    }else{
      //someone wrog 
    }

  }


  async suscribeUsers(){

    const getuser = await this._api.getUsers();

    if(getuser !== 0 ){

      this._api.$users.next(getuser);
      
    }
    
    this._api.$users.subscribe(info =>{

      this.users = info;

    })


  }


  

    updateStatus(user:user,key:string){

      let filterUsers;

      switch (key) {
        case 'delete':
          filterUsers = this.users.filter(u => u._id !== user._id);
          break;
        case 'add':

          let userArray = this.users;
          userArray.push(user)

          filterUsers = userArray

          break;
      
      }

      this._api.setLocalData('users',filterUsers)
      this._api.$users.next(filterUsers);

  }


  ngOnDestroy(){


  }

}
