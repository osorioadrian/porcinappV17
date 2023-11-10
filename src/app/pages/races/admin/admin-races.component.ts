import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RacesService } from '../service/races.service';
import { SpeciesService } from 'app/pages/species/services/species.service';
import { Race } from '../interface/race';
import { MyErrorStateMatcher } from 'app/common/helpers/errorStateMatcher';
import { Specie } from 'app/pages/species/interface/specie';

@Component({
  selector: 'app-admin-races',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [RacesService, SpeciesService],
  templateUrl: './admin-races.component.html',
  styles: ``
})
export class AdminRacesComponent {
  form!: UntypedFormGroup;
  matcher = new MyErrorStateMatcher();
  raceId: string;
  race: Race = {
    name: ''
  };
  species: Specie[] = [];
  title: string;
  titleButton: string;

  private raceService = inject(RacesService);
  private specieService = inject(SpeciesService);
  private formBuilder = inject(UntypedFormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.raceId = data;

    if (this.raceId) {
      this.title = 'Actualizar Raza';
      this.titleButton = 'Actualizar';
      this.getRaceId(this.raceId);
    } else {
      this.title = 'Crear Raza';
      this.titleButton = 'Guardar';
    }

    this.specieService.getSpecies().subscribe((resp: any) => {
      this.species = resp.filter((resp: any) => resp.isActive === true);
    });
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
      specie: new FormControl('', Validators.required)
    });
  }

  getRaceId(raceId: string): void {
    this.raceService.getRaceById(raceId).subscribe((result: any) => {
      if (result._id) {
        this.race = result;
        this.form.patchValue(this.race);
      }
    });
  }

  save(): void {
    const dataForm = JSON.parse(JSON.stringify(this.form.value));

    if (this.raceId) {
      this.update(dataForm, this.raceId);
    } else {
      this.add(dataForm);
    }
  }

  update(data: Race, id: string): void {
    this.raceService.updateRace(data, id).subscribe();
  }

  add(data: Race): void {
    this.raceService.createRace(data).subscribe();
  }
}
