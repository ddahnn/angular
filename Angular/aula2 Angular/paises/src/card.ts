import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card-pais" (click)="clicado.emit(pais())" style="cursor: pointer;">
      <img [src]="pais().flags.png" [alt]="pais().name.common">
      <div class="card-info">
        <h3 style="font-size: 1rem; margin-top: 10px; color: #333; margin-bottom: 10px;">
          {{ pais().translations['por'].common }}
        </h3>
      </div>
    </div>
  `
})
export class CardComponent {
  pais = input.required<any>();
  clicado = output<any>();
}