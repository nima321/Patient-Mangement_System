import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {
  patientForm: FormGroup;
  message: string = '';
  latestPatientId: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    // Initialize the form with validation
    this.patientForm = new FormGroup({
      patientNo: new FormControl({ value: '', disabled: true }), // Read-only
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('Male'),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') // Ensureimg 10-digit number
      ]),
      address: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // Fetch the latest patient ID when the component is initialized
    this.getLatestPatientId();
  }

  getLatestPatientId() {
    this.http.get<{ latestPatientId: number }>('http://localhost:5242/api/patient/latest-patient-id')
      .subscribe(
        (response) => {
          this.latestPatientId = response.latestPatientId;
          // Set the patientNo to latestPatientId + 1
          this.patientForm.patchValue({
            patientNo: this.latestPatientId + 1
          });
        },
        (error) => {
          console.error("Error fetching the latest patient ID", error);
          this.message = 'Error fetching patient ID.';
        }
      );
  }
  
  addPatient() {

    if (this.patientForm.invalid) {
      this.message = 'Please fill in all required fields correctly.';
      return;
    }
    const token = localStorage.getItem('token');

    console.log("token:::", token)

    this.http.post('http://localhost:5242/api/patient/add', this.patientForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      () => {
        this.message = 'Patient added successfully!';
         // ✅ Reset the form fields
         this.patientForm.reset({
          name: '',
          dateOfBirth: '',
          gender: 'Male',
          contactNumber: '',
          address: ''
        });
        
      },
      (error) => {
        this.message = error?.error?.message || 'Error adding patient.';
        console.error(' Error:', error);
      }
    );
  }
}
