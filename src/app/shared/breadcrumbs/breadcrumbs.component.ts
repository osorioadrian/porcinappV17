import { Component, inject } from '@angular/core';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styles: `
    a {
      text-decoration: none;
    }

    .breadcrumb {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin-bottom: 1rem;
        list-style: none;
        border-radius: .25rem;
        font-size: .875rem;
    }

    .breadcrumb-item {
        line-height: 18px;
        text-transform: capitalize;
        >a {
            cursor: pointer;
            color: currentColor;
            &:hover {
                text-decoration: underline;
            }
        }
        >.chevron {
            height: 18px;
            width: 18px;
            font-size: 18px;
            vertical-align: middle;
            user-select: none;
        }
    }
  `
})
export class BreadcrumbsComponent {
  titulo!: string;

  router = inject(Router);

  constructor() {
    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
    });
  }

  getDataRoute(): Observable<any> {
    return this.router.events.pipe(
      filter((evento: any) => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
