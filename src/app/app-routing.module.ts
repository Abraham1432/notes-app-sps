import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from "./components/notes/notes.component";
import { UsersComponent } from "./components/users/users.component";
import { CreateNoteComponent } from "./components/create-note/create-note.component";

const routes: Routes = [
  {path:'notes',component:NotesComponent},
  {path:'users',component:UsersComponent},
  {path:'create-note',component:CreateNoteComponent},
  { path: '**',   redirectTo: '/notes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
