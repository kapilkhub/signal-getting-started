import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <select
        [ngModel]="quantity()"
        (change)="onQuantitySelected($any($event.target).value)">
        <option disabled value="">--Select a quantity--</option>
        <option *ngFor="let q of qtyAvailable()">{{ q }}</option>
      </select>
     <p>Vehicle Name and Price {{selectedVehicle().name}} and {{selectedVehicle().price}}</p>
     <p style="font-weight:bold"  [style.color]="color()"> Total: {{exPrice()}} </p>
  `,
})
export class App {
  name = 'Angular';
  quantity = signal(1);
  qtyAvailable = signal<Number[]>([1, 2, 3, 4, 5, 6]);
  selectedVehicle = signal<Vehicle>({ id: 1, name: 'kapil', price: 100 });
  exPrice = computed(() => this.selectedVehicle().price * this.quantity());
  color = computed(() => (this.exPrice() > 300 ? 'green' : 'blue'));
  constructor() {
    this.selectedVehicle.update(
      (v) => (v = { ...v, price: v.price + v.price * 0.2 })
    );
  }

  qtyEff = effect(() => console.log('Latest quantity:', this.quantity()));

  onQuantitySelected(quantity: number) {
    this.quantity.set(quantity);
  }
}

export interface Vehicle {
  id: number;
  name: string;
  price: number;
}

bootstrapApplication(App);
