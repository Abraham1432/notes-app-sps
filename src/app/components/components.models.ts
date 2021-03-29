import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotesComponent } from './notes/notes.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateNoteComponent } from "./create-note/create-note.component";
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NotesComponent,
    UsersComponent,
    NavbarComponent,
    CreateNoteComponent
  ],
  exports:[
    NotesComponent,
    UsersComponent,
    NavbarComponent,
    CreateNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComponentModule { }
