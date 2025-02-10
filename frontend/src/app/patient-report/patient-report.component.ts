import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css']
})
export class PatientReportComponent implements OnInit {
  patients: any[] = [];
  searchPatientNo: string = '';
  role: string | null = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    if (this.role !== 'Admin') {
      alert("Access Denied! Only Admins can view this page.");
      this.router.navigate(['/login']);
    } else {
      this.getPatients();
    }
  }

  getPatients() {
    const token = localStorage.getItem('token');
    this.http.get('http://localhost:5242/api/patient/list', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      (response: any) => this.patients = response,
      () => alert('Error fetching patients')
    );
  }

  searchPatient() {
    if (!this.searchPatientNo) {
      this.getPatients(); // Show all patients if search box is empty
      return;
    }

    const token = localStorage.getItem('token');
    this.http.get(`http://localhost:5242/api/patient/search/${this.searchPatientNo}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      (response: any) => this.patients = [response], // Show only searched patient
      () => alert('Patient not found')
    );
  }

  editPatient(patient: any) {
    this.router.navigate([`/edit-patient/${patient.id}`]);
  }

  deletePatient(id: number) {
    if (confirm("Are you sure you want to delete this patient?")) {
      const token = localStorage.getItem('token');
      this.http.delete(`http://localhost:5242/api/patient/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(
        () => {
          alert("Patient deleted successfully.");
           // Refresh the list after deletion
        },
        () => {alert("Patient deleted successfully.")
        this.getPatients();}
      );
    }
  }
}
