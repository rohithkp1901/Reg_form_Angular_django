// src/app/app.component.ts
import { Component } from '@angular/core';
import { RegformComponent } from './registration-form/regform/regform.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RegformComponent]
})
export class AppComponent {
  title = 'reg-form';
}
