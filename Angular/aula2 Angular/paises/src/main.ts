import { Component, inject, signal, computed } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { appConfig } from './app.config';
import { HeaderComponent } from './header';
import { CardComponent } from './card';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent],
  providers: [AppService],
  template: `
    <app-header 
      (filtroBusca)="busca.set($event)" 
      (filtroRegiao)="continente.set($event)">
    </app-header>

    <main class="grid-paises">
      @for (p of listaFiltrada(); track p.cca3) {
        <app-card [pais]="p" (clicado)="selecionado.set($event)"></app-card>
      }
    </main>

    @if (selecionado(); as pais) {
      <div class="modal-overlay" (click)="selecionado.set(null)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-button" (click)="selecionado.set(null)">&times;</button>
          
          <div class="modal-img-container">
            <img [src]="pais.flags.png" [alt]="pais.translations['por'].common">
          </div>

          <h2 style="text-align: center;">{{ pais.translations['por'].common }}</h2>
          
          <div style="text-align: left; margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px; line-height: 1.6;">
             <p><strong>Capital:</strong> {{ svc.traduzirCapital(pais.capital?.[0]) }}</p>
             <p><strong>Continente:</strong> {{ svc.traduzirRegiao(pais) }}</p>
             <p><strong>População:</strong> {{ pais.population.toLocaleString('pt-BR') }} habitantes</p>
             <p><strong>Moeda:</strong> {{ svc.extrairMoedas(pais.currencies) }}</p>
             <p><strong>Idiomas:</strong> {{ svc.extrairIdiomas(pais.languages) }}</p>
          </div>
        </div>
      </div>
    }
  `
})
export class App {
  private http = inject(HttpClient);
  public svc = inject(AppService);

  busca = signal('');
  continente = signal('');
  selecionado = signal<any>(null);

  paises = toSignal(this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,subregion,population,capital,translations,currencies,languages'));

  listaFiltrada = computed(() => {
    const todos = this.paises() || [];
    const termo = this.busca().toLowerCase();
    const filtro = this.continente();

    return todos.filter(p => {
      const nomePt = p.translations['por'].common.toLowerCase();
      return nomePt.includes(termo) && 
             (filtro === '' || p.region === filtro || p.subregion === filtro);
    });
  });
}

bootstrapApplication(App, appConfig).catch(err => console.error(err));