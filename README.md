# Projeto Angular - Guia de Desenvolvimento

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16+ (ou a sua versão atual).

## 🚀 Como começar

### 1. Instalação
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. No terminal, instale as dependências do projeto:
```bash
npm install
2. Servidor de Desenvolvimento
Para rodar o projeto localmente:

Bash
ng serve
Navegue para http://localhost:4200/. O aplicativo será recarregado automaticamente se você alterar qualquer arquivo de origem.

🛠️ Comandos de Geração
Para criar novos componentes, serviços ou módulos, use o Angular CLI:

Componente: ng generate component nome-do-componente

Serviço: ng generate service nome-do-servico

📦 Build (Produção)
Para gerar os arquivos finais de produção, utilize o comando:

Bash
ng build
Ou, para garantir que está usando as configurações de produção:

Bash
ng build --configuration production
O que acontece na Build?
Minificação: O código é compactado para carregar mais rápido.

AOT (Ahead-of-Time): O Angular compila o HTML e CSS antes do navegador, melhorando a performance.

Pasta dist/: Os arquivos prontos para o servidor serão gerados na pasta /dist/nome-do-projeto.

📤 Como enviar para o GitHub (Dica)
Se você corrigiu o erro de permissão que teve antes, o fluxo padrão é:

git add .

git commit -m "Minha alteração"

git push origin main


### Dica para o erro de permissão:
Como você recebeu um erro de `Permission denied (publickey)`, certifique-se de que está usando a URL **HTTPS** e não SSH. 
Para conferir, use: `git remote -v`. 
Se aparecer algo como `git@github.com...`, mude para HTTPS com:
`git remote set-url origin https://github.com/ddahnn/angular.git`
