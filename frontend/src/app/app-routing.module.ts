import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HomeComponent } from './home/home.component';
import { PatientReportComponent } from './patient-report/patient-report.component';
import { AdminGuard } from './guards/admin.guard';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

const routes: Routes = [
  { path: 'edit-patient/:id', component: EditPatientComponent },
  { path: 'patient-report', component: PatientReportComponent,canActivate: [AdminGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'add-patient', component: PatientFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
