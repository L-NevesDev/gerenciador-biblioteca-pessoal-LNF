# Gerenciador de Biblioteca Pessoal

Um sistema interativo de linha de comando feito em TypeScript para gerenciar sua coleção de livros — cadastrar, acompanhar leituras, dar notas e visualizar estatísticas da sua biblioteca.

## Sobre o Projeto
Esse projeto nasceu como um exercício prático para aplicar conceitos de Lógica de Programação e TypeScript aprendidos no curso de Análise e Desenvolvimento de Sistemas (FATEC). A ideia foi simples: criar algo útil para o dia a dia, consolidando os fundamentos da linguagem.

O sistema roda direto no terminal e permite organizar a coleção de livros de um jeito bem prático — utilizando lógica de arrays paralelos, sem banco de dados ou frameworks complexos.

## Funcionalidades
* Listar livros — exibe todos os livros com título, autor, ano, páginas e status de leitura.
* Adicionar livro — cadastra um novo livro com validação de duplicidade de título e checagem de dados numéricos.
* Marcar como lido — atualiza o status de leitura e permite atribuir uma nota de 1 a 5.
* Remover livro — exclui um livro da coleção com base no seu índice.
* Estatísticas — calcula e exibe o total de livros, percentual lido, média geral das avaliações, livro mais bem avaliado e total de páginas lidas.
* Classificar por década — agrupa automaticamente os livros de acordo com a década de publicação.

## Tecnologias Utilizadas
* Node.js
* TypeScript
* ts-node (para execução direta do TypeScript em ambiente de desenvolvimento)
* Módulo nativo readline (para a interface interativa no terminal)

## Como Rodar o Projeto

### Pré-requisitos
Antes de começar, você precisa ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

### Passo a passo
1. Clone o repositório:

git clone [https://github.com/L-NevesDev/gerenciador-biblioteca-pessoal.git](https://github.com/L-NevesDev/gerenciador-biblioteca-pessoal.git)
cd gerenciador-biblioteca-pessoal

2. Instale as dependências do projeto (TypeScript, tipagens do Node e ts-node):
npm install


3. Execute o programa em modo de desenvolvimento:
npm run dev
O menu interativo será iniciado no seu terminal.

## Como Usar
Ao iniciar, o sistema exibirá o seguinte menu interativo:


   GERENCIADOR DE BIBLIOTECA PESSOAL

1. Exibir todos os livros
2. Adicionar um novo livro
3. Marcar um livro como lido
4. Remover um livro
5. Exibir estatísticas da coleção
6. Exibir classificação por década
0. Sair


Digite o número da opção desejada e pressione Enter. O sistema guiará você com perguntas passo a passo em cada ação.

## Estrutura do Projeto

gerenciador-biblioteca-pessoal/
├── src/
│   └── index.ts          # Código-fonte principal com a lógica e menu
├── package.json          # Gerenciador de dependências e scripts
├── tsconfig.json         # Configurações rigorosas do compilador TypeScript
└── README.md             # Documentação do projeto


## O que aprendi com esse projeto
* Trabalhar com arrays paralelos para simular uma estrutura de dados relacional.
* Utilizar High-Order Functions de arrays (filter, reduce, map, some e forEach) para extrair estatísticas e manipular dados.
* Criar interfaces interativas no console com o módulo readline do Node.js, gerenciando fluxos assíncronos de perguntas e respostas.
* Aplicar tipagem estática do TypeScript para evitar erros em tempo de execução e garantir a integridade dos parâmetros.
* Implementar validações lógicas (evitar títulos duplicados, rejeitar anos ou páginas negativas).

## Melhorias Futuras
O código base já possui funções de busca e filtro construídas, mas pretendo adicionar as seguintes melhorias na interface no futuro:
*  Adicionar opções no menu para buscar livros específicos por título ou listar obras de um único autor.
*  Adicionar opção no menu para filtrar apenas livros lidos ou apenas pendentes.
*  Salvar os dados em um arquivo .json (usando o módulo fs do Node) para persistência entre as sessões.

## Autor
Desenvolvido por Lucas Neves. 

## Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar!
