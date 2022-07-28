import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamRoutingModule } from './add-team-routing.module';
import { AddTeamComponent } from './add-team.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddTeamComponent
  ],
  imports: [
    CommonModule,
    AddTeamRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ]
})
export class AddTeamModule { }
