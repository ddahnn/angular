import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  traduzirRegiao(pais: any): string {
    if (pais.region === 'Oceania') return 'Oceânia';
    const dicionario: Record<string, string> = {
      'Africa': 'África',
      'Americas': 'Américas',
      'Asia': 'Ásia',
      'Europe': 'Europa',
      'South America': 'América do Sul',
      'North America': 'América do Norte',
      'Central America': 'América Central',
      'Western Europe': 'Europa',
      'Northern Europe': 'Europa',
      'Southern Europe': 'Europa',
      'Eastern Europe': 'Europa',
      'South-Eastern Europe': 'Europa'
    };
    return dicionario[pais.subregion] || dicionario[pais.region] || pais.region;
  }

  traduzirCapital(cap: string): string {
    if (!cap) return 'N/A';
    const capitais: Record<string, string> = {
      'Brussels': 'Bruxelas', 'London': 'Londres', 'Paris': 'Paris',
      'Rome': 'Roma', 'Berlin': 'Berlim', 'Madrid': 'Madri',
      'Lisbon': 'Lisboa', 'Athens': 'Atenas', 'Warsaw': 'Varsóvia',
      'Vienna': 'Viena', 'Copenhagen': 'Copenhague', 'Moscow': 'Moscou',
      'Beijing': 'Pequim', 'Tokyo': 'Tóquio', 'Washington, D.C.': 'Washington, D.C.',
      'New Delhi': 'Nova Deli', 'Cairo': 'Cairo'
    };
    return capitais[cap] || cap;
  }

  extrairMoedas(cur: any): string {
    if (!cur) return 'N/A';
    return Object.values(cur).map((c: any) => {
      let nome = c.name;
      let simbolo = c.symbol;
      if (nome === 'Brazilian real') nome = 'Real'; simbolo = 'R$';
      if (nome === 'Euro') nome = 'Euro'; simbolo = '€';
      if (nome === 'United States dollar') {
        nome = 'Dólar';
        simbolo = 'US$';
      }
      return `${nome} (${simbolo})`;
    }).join(', ');
  }

  extrairIdiomas(langs: any): string {
    if (!langs) return 'N/A';
    const mapaIdiomas: Record<string, string> = {
      'Portuguese': 'Português', 'English': 'Inglês', 'Spanish': 'Espanhol',
      'French': 'Francês', 'German': 'Alemão', 'Italian': 'Italiano',
      'Chinese': 'Chinês', 'Japanese': 'Japonês', 'Russian': 'Russo',
      'Dutch': 'Holandês'
    };
    return Object.values(langs).map((l: any) => mapaIdiomas[l] || l).join(', ');
  }
}