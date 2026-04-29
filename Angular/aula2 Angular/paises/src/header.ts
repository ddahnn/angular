import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <h1>Lista de Países</h1>
      <div class="filter-container">
        <input type="text" placeholder="Pesquisar país..." (input)="onBusca($event)">
        <select (change)="onRegiao($event)">
          <option value="">Todos os Continentes</option>
          <option value="Africa">África</option>
          <option value="North America">América do Norte</option>
          <option value="Central America">América Central</option>
          <option value="South America">América do Sul</option>
          <option value="Asia">Ásia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </header>
  `
})
export class HeaderComponent {
  filtroBusca = output<string>();
  filtroRegiao = output<string>();

  onBusca(event: Event) {
    const elemento = event.target as HTMLInputElement;
    this.filtroBusca.emit(elemento.value);
  }

  onRegiao(event: Event) {
    const elemento = event.target as HTMLSelectElement;
    this.filtroRegiao.emit(elemento.value);
  }
}