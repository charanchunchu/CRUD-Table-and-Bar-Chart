import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Product[] = [];
  productForm: FormGroup;
  view: [number, number] = [700, 400];
  chartData: any[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
    this.updateChartData();
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.editIndex !== null) {
        this.products[this.editIndex] = this.productForm.value;
        this.editIndex = null;
      } else {
        this.products.push(this.productForm.value);
      }
      this.productForm.reset({ price: 0 });
      this.updateChartData();
    }
  }

  editProduct(index: number) {
    this.editIndex = index;
    this.productForm.setValue(this.products[index]);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.updateChartData();
  }

  resetForm() {
    this.productForm.reset({ price: 0 });
    this.editIndex = null;
  }

  updateChartData() {
    this.chartData = this.products.map(product => ({
      name: product.category,
      value: product.price
    }));
  }
}
