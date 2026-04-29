import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 style="text-align: center; font-family: sans-serif;">Paises</h1>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px; padding: 20px;">
      @for (p of lista(); track p.name) {
        <div style="border: 1px solid #ccc; padding: 10px; text-align: center; font-family: sans-serif; border-radius: 8px;">
          <img [src]="p.flag" style="width: 100%; height: 100px; object-fit: cover;">
          <h3 style="font-size: 1rem;">{{ p.name }}</h3>
        </div>
      } @empty {
        <p style="text-align: center; grid-column: 1/-1;">Carregando dados...</p>
      }
    </div>
  `
})
export class App {
  lista = toSignal(inject(HttpClient).get<any[]>('https://raw.githubusercontent.com/stefanocontardi/restcountries/master/data.json'));
}