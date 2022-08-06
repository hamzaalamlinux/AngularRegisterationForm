import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterationComponent } from './user/registeration/registeration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path : '' , redirectTo: '/user/registeration' , pathMatch:'full'},
  {
    path: 'user' , component: UserComponent,
    children: [
      {path : 'registeration' , component: RegisterationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
