import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from 'app/common/helpers/errorStateMatcher';
import { Metric } from '../interface/metric';
import { MetricsService } from '../service/metrics.service';

@Component({
  selector: 'app-admin-metric',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './admin-metric.component.html',
  styles: ``
})
export class AdminMetricComponent {
  form!: UntypedFormGroup;
  matcher = new MyErrorStateMatcher();
  metricId: string;
  metric: Metric = {
    _id: '',
    name: '',
    symbol: '',
    isActive: true
  };
  title: string;
  titleButton: string;

  private metricService = inject(MetricsService);
  private formBuilder = inject(UntypedFormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.metricId = data;

    if (this.metricId) {
      this.title = 'Actualizar ';
      this.titleButton = 'Actualizar';
      this.getMetricId(this.metricId);
    } else {
      this.title = 'Crear ';
      this.titleButton = 'Guardar';
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.nonNullable.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]),
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5)
      ])
    });
  }

  getMetricId(metricId: string): void {
    this.metricService.getMetricById(metricId).subscribe(result => {
      if (result._id) {
        this.metric = result;
        this.form.patchValue(this.metric);
      }
    });
  }

  save(): void {
    const dataForm = JSON.parse(JSON.stringify(this.form.value));

    if (this.metricId) {
      console.log('metricId', this.metricId);
      this.update(dataForm, this.metricId);
    } else {
      this.add(dataForm);
    }
  }

  update(data: Metric, id: string): void {
    this.metricService.updateMetric(data, id).subscribe();
  }

  add(data: Metric): void {
    this.metricService.createMetric(data).subscribe();
  }
}
