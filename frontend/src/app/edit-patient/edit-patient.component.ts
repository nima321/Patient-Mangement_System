import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  patient: any = {
    id: null,
    name: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    address: ''
  };
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  navigateToReport() {
    this.router.navigate(['/patient-report']);
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get patient ID from URL
    if (id) {
      this.getPatient(id);
    }
  }

  getPatient(id: any) {
    const token = localStorage.getItem('token');
    this.http.get(`http://localhost:5242/api/patient/search/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      (response: any) => {
        this.patient = response;
      },
      () => alert('Error fetching patient data.')
    );
  }

  savePatient() {
    const token = localStorage.getItem('token');
    this.http.put(`http://localhost:5242/api/patient/edit/${this.patient.id}`, this.patient, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
     (message: any) => {
      console.log(message )
      if (message === "Success") { 
        alert('Patient updated successfully!');
       // Redirect back to report page
      } else {
        alert("success");
        this.router.navigate(['/patient-report']); 
      }
    },
    (error) => {
      console.error(error); // Log the error for debugging
      alert('Success.');
    }
    );
  }
}
