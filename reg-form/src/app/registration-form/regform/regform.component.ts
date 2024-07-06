// src/app/registration-form/regform/regform.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-regform',
  standalone: true,
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.css'],
  imports: [SharedModule]
})
export class RegformComponent implements OnInit {
  registrationForm: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  districts: any[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.dataService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const countryName = selectElement.value;
    console.log('Country selected:', countryName);

    const selectedCountry = this.countries.find(country => country.name === countryName);
    this.dataService.getStates(selectedCountry.id).subscribe((data) => {
      this.states = data;
      this.districts = []; 
      this.registrationForm.controls['state'].setValue('');
      this.registrationForm.controls['district'].setValue('');
    });
  }

  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const stateName = selectElement.value;
    console.log('State selected:', stateName);

    const selectedState = this.states.find(state => state.name === stateName);
    this.dataService.getDistricts(selectedState.id).subscribe((data) => {
      this.districts = data;
      this.registrationForm.controls['district'].setValue('');
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.dataService.registerUser(this.registrationForm.value).subscribe(response => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., display a message, reset the form, etc.)
      }, error => {
        console.error('Registration failed', error);
        // Handle registration error (e.g., display an error message)
      });
    }
  }
}
