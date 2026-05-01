const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = []; // 0 se não lido, 1 a 5 se lido

// Dados iniciais para popular o sistema
titulos.push('O Hobbit', 'Clean Code', '1984', 'Dom Casmurro', 'O Nome do Vento');
autores.push('J.R.R. Tolkien', 'Robert C. Martin', 'George Orwell', 'Machado de Assis', 'Patrick Rothfuss');
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);



// Adiciona um novo livro com validação simples
function adicionarLivro(titulo: string, autor: string, ano: number, numPaginas: number): void {
    if (ano > 0 && numPaginas > 0) {
        titulos.push(titulo);
        autores.push(autor);
        anos.push(ano);
        paginas.push(numPaginas);
        lido.push(false);
        avaliacoes.push(0);
        console.log(`\ "${titulo}" adicionado com sucesso.`);
    } else {
        console.log(`\ Erro ao adicionar "${titulo}": Dados inválidos.`);
    }
}

// Remove o livro e sincroniza todos os arrays
function removerLivro(indice: number): void {
    if (indice >= 0 && indice < titulos.length) {
        const removido = titulos[indice];
        titulos.splice(indice, 1);
        autores.splice(indice, 1);
        anos.splice(indice, 1);
        paginas.splice(indice, 1);
        lido.splice(indice, 1);
        avaliacoes.splice(indice, 1);
        console.log(`\ Livro "${removido}" removido.`);
    }
}


// Lista todos os livros formatados
function exibirBiblioteca(): void {
    console.log("\n=== MINHA BIBLIOTECA ===");
    titulos.forEach((titulo, index) => {
        const status = lido[index] ? `LIDO (${avaliacoes[index]}/5)` : 'PENDENTE';
        console.log(`${index + 1}. "${titulo}" (${anos[index]}) - ${autores[index]} - ${paginas[index]} pag - ${status}`);
    });
}

// Busca índices por trecho do título
function buscarPorTitulo(termo: string): number[] {
    const indices: number[] = [];
    titulos.forEach((titulo, index) => {
        if (titulo.toLowerCase().includes(termo.toLowerCase())) {
            indices.push(index);
        }
    });
    return indices;
}

// Retorna títulos filtrados por autor
function listarPorAutor(autorBusca: string): string[] {
    return titulos.filter((_, index) => autores[index] === autorBusca);
}


function marcarComoLido(indice: number, avaliacao: number): void {
    if (indice >= 0 && indice < titulos.length && avaliacao >= 1 && avaliacao <= 5) {
        lido[indice] = true;
        avaliacoes[indice] = avaliacao;
        console.log(`\ Livro "${titulos[indice]}" lido com nota ${avaliacao}.`);
    } else {
        console.log("\ Erro: Índice ou nota (1-5) inválidos.");
    }
}

function listarLidos(): string[] {
    return titulos.filter((_, index) => lido[index]);
}

function listarPendentes(): string[] {
    return titulos.filter((_, index) => !lido[index]);
}

// ==========================================
// ESTATÍSTICAS (MÉTODOS DE ARRAY)
// ==========================================

const totalLivros = (): number => titulos.length;
const totalLidos = (): number => lido.filter(status => status).length;
const percentualLidos = (): number => (totalLidos() / totalLivros()) * 100;

function mediaAvaliacoes(): number {
    const notasLidos = avaliacoes.filter((_, index) => lido[index]);
    if (notasLidos.length === 0) return 0;
    return notasLidos.reduce((acc, nota) => acc + nota, 0) / notasLidos.length;
}

function livroMaiorAvaliacao(): string {
    const indiceMaior = avaliacoes.reduce((melhor, atual, index) => 
        atual > avaliacoes[melhor] ? index : melhor, 0);
    return titulos[indiceMaior];
}

function totalPaginasLidas(): number {
    return paginas.filter((_, index) => lido[index]).reduce((acc, p) => acc + p, 0);
}

// ==========================================
// CLASSIFICAÇÃO POR DÉCADA
// ==========================================

function exibirPorDecada(): void {
    console.log("\n=== POR DECADA ===");
    const decadas = anos
        .map(ano => Math.floor(ano / 10) * 10)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a - b);

    decadas.forEach(decada => {
        const livros = titulos.filter((_, i) => Math.floor(anos[i] / 10) * 10 === decada);
        console.log(`${decada}s: ${livros.join(", ")}`);
    });
}


function demonstracaoFinal(): void {
    exibirBiblioteca();
    
    adicionarLivro("O Silmarillion", "J.R.R. Tolkien", 1977, 428);
    removerLivro(2); // Remove "1984"
    
    marcarComoLido(4, 5); // Atualiza "O Nome do Vento"
    
    console.log("\n=== ESTATISTICAS ===");
    console.log(`Total de livros: ${totalLivros()}`);
    console.log(`Livros lidos: ${totalLidos()} (${percentualLidos().toFixed(2)}%)`);
    console.log(`Media das avaliacoes: ${mediaAvaliacoes().toFixed(2)}`);
    console.log(`Livro melhor avaliado: ${livroMaiorAvaliacao()}`);
    console.log(`Total de paginas lidas: ${totalPaginasLidas()}`);
    
    exibirPorDecada();
}

demonstracaoFinal();