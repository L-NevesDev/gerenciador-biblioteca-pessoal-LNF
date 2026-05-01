import * as readline from 'readline';


const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = []; 

// Dados iniciais sugeridos
titulos.push('O Hobbit', 'Clean Code', '1984', 'Dom Casmurro', 'O Nome do Vento');
autores.push('J.R.R. Tolkien', 'Robert C. Martin', 'George Orwell', 'Machado de Assis', 'Patrick Rothfuss');
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);


function adicionarLivro(titulo: string, autor: string, ano: number, numPaginas: number): void {
    // Validação de duplicidade (ignorando case)
    const tituloJaExiste = titulos.some(t => t.toLowerCase() === titulo.toLowerCase());
    
    if (tituloJaExiste) {
        console.log(`\n Erro: O livro "${titulo}" já está cadastrado na biblioteca!`);
        return; // Interrompe a função se o livro já existir
    }

    // Validação de dados numéricos
    if (ano > 0 && numPaginas > 0) {
        titulos.push(titulo);
        autores.push(autor);
        anos.push(ano);
        paginas.push(numPaginas);
        lido.push(false);
        avaliacoes.push(0);
        console.log(`\n "${titulo}" adicionado com sucesso.`);
    } else {
        console.log(`\n Erro ao adicionar "${titulo}": Ano e número de páginas devem ser maiores que zero.`);
    }
}

function removerLivro(indice: number): void {
    if (indice >= 0 && indice < titulos.length) {
        const removido = titulos[indice];
        titulos.splice(indice, 1);
        autores.splice(indice, 1);
        anos.splice(indice, 1);
        paginas.splice(indice, 1);
        lido.splice(indice, 1);
        avaliacoes.splice(indice, 1);
        console.log(`\n Livro "${removido}" removido.`);
    } else {
        console.log("\n Índice inválido.");
    }
}


function exibirBiblioteca(): void {
    console.log("\n=== MINHA BIBLIOTECA ===");
    if (titulos.length === 0) {
        console.log("A biblioteca está vazia.");
        return;
    }
    titulos.forEach((titulo, index) => {
        const status = lido[index] ? `LIDO (${avaliacoes[index]}/5)` : 'PENDENTE';
        console.log(`[${index}] "${titulo}" (${anos[index]}) - ${autores[index]} - ${paginas[index]} pag - ${status}`);
    });
}


function marcarComoLido(indice: number, avaliacao: number): void {
    if (indice >= 0 && indice < titulos.length) {
        if (avaliacao >= 1 && avaliacao <= 5) {
            lido[indice] = true;
            avaliacoes[indice] = avaliacao;
            console.log(`\n Livro "${titulos[indice]}" marcado como lido com nota ${avaliacao}.`);
        } else {
            console.log("\n Erro: A nota deve ser um número entre 1 e 5.");
        }
    } else {
        console.log("\n Erro: Índice do livro inválido.");
    }
}


const totalLivros = (): number => titulos.length;
const totalLidos = (): number => lido.filter(status => status).length;
const percentualLidos = (): number => totalLivros() === 0 ? 0 : (totalLidos() / totalLivros()) * 100;

function mediaAvaliacoes(): number {
    const notasLidos = avaliacoes.filter((_, index) => lido[index]);
    if (notasLidos.length === 0) return 0;
    return notasLidos.reduce((acc, nota) => acc + nota, 0) / notasLidos.length;
}

function livroMaiorAvaliacao(): string {
    if (totalLidos() === 0) return "Nenhum livro lido";
    const indiceMaior = avaliacoes.reduce((melhor, atual, index) => 
        atual > avaliacoes[melhor] ? index : melhor, 0);
    return titulos[indiceMaior];
}

function totalPaginasLidas(): number {
    return paginas.filter((_, index) => lido[index]).reduce((acc, p) => acc + p, 0);
}


function exibirPorDecada(): void {
    console.log("\n=== POR DECADA ===");
    if (titulos.length === 0) {
        console.log("A biblioteca está vazia.");
        return;
    }

    const decadas = anos
        .map(ano => Math.floor(ano / 10) * 10)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a - b);

    decadas.forEach(decada => {
        const livros = titulos.filter((_, i) => Math.floor(anos[i] / 10) * 10 === decada);
        console.log(`${decada}s: ${livros.join(", ")}`);
    });
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função utilitária para pausar a tela antes de voltar ao menu
function voltarAoMenu(): void {
    rl.question('\nTecle ENTER para voltar ao menu...', () => {
        exibirMenu();
    });
}

function exibirMenu(): void {
    console.log("\n" + "=".repeat(45));
    console.log("   GERENCIADOR DE BIBLIOTECA PESSOAL");
    console.log("=".repeat(45));
    console.log("1. Exibir todos os livros");
    console.log("2. Adicionar um novo livro");
    console.log("3. Marcar um livro como lido");
    console.log("4. Remover um livro");
    console.log("5. Exibir estatísticas da coleção");
    console.log("6. Exibir classificação por década");
    console.log("0. Sair");
    console.log("=".repeat(45));
    
    rl.question("\nEscolha uma opção: ", (opcao: string) => {
        switch (opcao) {
            case '1':
                exibirBiblioteca();
                voltarAoMenu();
                break;
            case '2':
                // Coleta de dados passo a passo para o novo livro
                rl.question("\nDigite o TÍTULO do livro: ", (titulo: string) => {
                    rl.question("Digite o nome do AUTOR: ", (autor: string) => {
                        rl.question("Digite o ANO de publicação: ", (anoStr: string) => {
                            rl.question("Digite o número de PÁGINAS: ", (paginasStr: string) => {
                                const ano = parseInt(anoStr, 10);
                                const numPaginas = parseInt(paginasStr, 10);
                                
                                if (isNaN(ano) || isNaN(numPaginas)) {
                                     console.log("\n Erro: O ano e o número de páginas devem ser números válidos.");
                                } else {
                                     adicionarLivro(titulo, autor, ano, numPaginas);
                                }
                                voltarAoMenu();
                            });
                        });
                    });
                });
                break;
            case '3':
                exibirBiblioteca(); // Mostra a lista para o usuário saber qual índice escolher
                rl.question("\nDigite o ÍNDICE do livro que deseja marcar como lido (ex: 0, 1): ", (idxStr: string) => {
                    rl.question("Qual nota você dá para este livro? (De 1 a 5): ", (notaStr: string) => {
                        const idx = parseInt(idxStr, 10);
                        const nota = parseInt(notaStr, 10);
                        
                        if (isNaN(idx) || isNaN(nota)) {
                            console.log("\n Erro: Por favor, digite números válidos.");
                        } else {
                            marcarComoLido(idx, nota);
                        }
                        voltarAoMenu();
                    });
                });
                break;
            case '4':
                exibirBiblioteca(); // Mostra a lista para o usuário saber qual índice remover
                rl.question("\nDigite o ÍNDICE do livro que deseja remover: ", (idxStr: string) => {
                    const idx = parseInt(idxStr, 10);
                    if (isNaN(idx)) {
                         console.log("\n Erro: Por favor, digite um número válido.");
                    } else {
                         removerLivro(idx);
                    }
                    voltarAoMenu();
                });
                break;
            case '5':
                console.log("\n=== ESTATISTICAS ===");
                console.log(`Total de livros: ${totalLivros()}`);
                console.log(`Livros lidos: ${totalLidos()} (${percentualLidos().toFixed(2)}%)`);
                console.log(`Média das avaliações: ${mediaAvaliacoes().toFixed(2)}`);
                console.log(`Livro melhor avaliado: ${livroMaiorAvaliacao()}`);
                console.log(`Total de páginas lidas: ${totalPaginasLidas()}`);
                voltarAoMenu();
                break;
            case '6':
                exibirPorDecada();
                voltarAoMenu();
                break;
            case '0':
                console.log("\nEncerrando o sistema. Até mais! ");
                rl.close();
                break;
            default:
                console.log("\n Opção inválida. Escolha um número de 0 a 6.");
                voltarAoMenu();
                break;
        }
    });
}

// Inicia o programa exibindo o menu interativo
exibirMenu();