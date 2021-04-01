import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  MatExpansionModule
];

@NgModule({
  imports: [RouterModule.forRoot([]), MaterialComponents],
  exports: [RouterModule, MaterialComponents]
})
export class MaterialModule { }
