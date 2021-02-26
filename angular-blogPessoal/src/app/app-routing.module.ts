import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'inicio', component: InicioComponent},
  {path: 'theme', component: ThemeComponent},

  {path: 'theme-edit/:id', component: ThemeEditComponent},
  {path: 'theme-delete/:id', component: ThemeDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
