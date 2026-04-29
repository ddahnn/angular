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
  termoBusca: string = '';
  produtoSelecionado: any = null;
  carrinho: any[] = [];
  carrinhoAberto: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://dummyjson.com/products?limit=100').subscribe({
      next: (res: any) => {
        if (res && res.products) {
          this.produtosGeral = res.products;
          this.produtosExibidos = res.products;
          this.categorias = [...new Set(this.produtosGeral.map((p: any) => p.category))].slice(0, 8);
        }
      }
    });
  }

  filtrar(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.executarBusca();
  }

  onSearch(event: any): void {
    this.termoBusca = event.target.value.toLowerCase();
    this.executarBusca();
  }

  executarBusca(): void {
    let baseProdutos = this.produtosGeral;
    if (this.categoriaSelecionada !== 'todos') {
      baseProdutos = this.produtosGeral.filter(p => p.category === this.categoriaSelecionada);
    }
    this.produtosExibidos = baseProdutos.filter(p => 
      p.title.toLowerCase().includes(this.termoBusca) || 
      p.description.toLowerCase().includes(this.termoBusca)
    );
  }

  abrirDetalhes(prod: any): void {
    this.produtoSelecionado = prod;
  }

  fecharDetalhes(): void {
    this.produtoSelecionado = null;
  }

  adicionarAoCarrinho(prod: any): void {
    this.carrinho.push(prod);
    this.fecharDetalhes();
  }

  removerDoCarrinho(index: number): void {
    this.carrinho.splice(index, 1);
  }

  limparCarrinho(): void {
    this.carrinho = [];
  }

  get totalCarrinho(): number {
    return this.carrinho.reduce((sum, item) => sum + item.price, 0);
  }

  toggleCarrinho(): void {
    this.carrinhoAberto = !this.carrinhoAberto;
  }
}