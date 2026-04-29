import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  produtosGeral: any[] = [];
  produtosExibidos: any[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = 'todos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://dummyjson.com/products?limit=100').subscribe({
      next: (res: any) => {
        if (res && res.products) {
          this.produtosGeral = res.products;
          this.produtosExibidos = res.products;
          this.categorias = [...new Set(this.produtosGeral.map((p: any) => p.category))].slice(0, 8);
        }
      },
      error: (err) => console.error(err)
    });
  }

  filtrar(categoria: string): void {
    this.categoriaSelecionada = categoria;
    if (categoria === 'todos') {
      this.produtosExibidos = this.produtosGeral;
    } else {
      this.produtosExibidos = this.produtosGeral.filter(p => p.category === categoria);
    }
  }
}