// Arrays paralelos para armazenar os dados da biblioteca
const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = []; // 0 se pendente, 1-5 se lido

// Populando com os dados iniciais sugeridos
titulos.push('O Hobbit', 'Clean Code', '1984', 'Dom Casmurro', 'O Nome do Vento');
autores.push('J.R.R. Tolkien', 'Robert C. Martin', 'George Orwell', 'Machado de Assis', 'Patrick Rothfuss');
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);


function exibirBiblioteca(): void {
    console.log("\n=== MINHA BIBLIOTECA ===");
    
    titulos.forEach((titulo, index) => {
        // Verifica se está lido para formatar a saída
        const status = lido[index] ? `LIDO (${avaliacoes[index]}/5)` : 'PENDENTE';
        
        console.log(`${index + 1}. "${titulo}" (${anos[index]}) - ${autores[index]} - ${paginas[index]} pag - ${status}`);
    });
}

// Adiciona um novo livro garantindo que os dados sejam válidos
function adicionarLivro(tituloNovo: string, autorNovo: string, anoNovo: number, paginasNovas: number): void {
    if (anoNovo > 0 && paginasNovas > 0) {
        titulos.push(tituloNovo);
        autores.push(autorNovo);
        anos.push(anoNovo);
        paginas.push(paginasNovas); // Agora estamos empurrando o valor do parâmetro
        lido.push(false);
        avaliacoes.push(0);
        console.log(`\n "${tituloNovo}" adicionado com sucesso.`);
    } else {
        console.log(`\n Erro ao adicionar "${tituloNovo}": Dados inválidos.`);
    }
}

// Remove o livro de todos os arrays usando o índice fornecido
function removerLivro(indice: number): void {
    // Verifica se o índice é válido antes de tentar remover
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
        console.log("\n Erro: Índice inexistente.");
    }
}

function buscarPorTitulo(termo: string): number[] {
    const termoMinusc = termo.toLowerCase();
    const indices: number[] = [];

    titulos.forEach((titulo, index) => {
        // Verifica se o título contém o que foi digitado
        if (titulo.toLowerCase().includes(termoMinusc)) {
            indices.push(index);
        }
    });

    return indices;
}

// Retorna apenas os nomes dos livros de um autor específico
function listarPorAutor(autorDesejado: string): string[] {
    // Filtramos os títulos onde o autor na mesma posição bate com a busca
    return titulos.filter((_, index) => autores[index] === autorDesejado);
}


console.log("\n--- TESTES DE BUSCA ---");

const indicesHobbit = buscarPorTitulo("Hobbit");
console.log(`Indices encontrados para 'Hobbit': ${indicesHobbit}`);

const livrosTolkien = listarPorAutor("J.R.R. Tolkien");
console.log(`Livros do Tolkien: ${livrosTolkien.join(", ")}`);

// Atualiza o status do livro e registra uma nota de 1 a 5
function marcarComoLido(indice: number, avaliacao: number): void {
    // Verifica se o livro existe no array
    if (indice < 0 || indice >= titulos.length) {
        console.log("\n❌ Erro: Índice inválido.");
        return;
    }

    // Valida se a nota está entre 1 e 5
    if (avaliacao < 1 || avaliacao > 5) {
        console.log(`\n❌ Erro: A nota para "${titulos[indice]}" deve ser entre 1 e 5.`);
        return;
    }

    lido[indice] = true;
    avaliacoes[indice] = avaliacao;
    console.log(`\n📖 Livro "${titulos[indice]}" marcado como lido! Nota: ${avaliacao}/5`);
}

// Retorna apenas os títulos dos livros que você já terminou
function listarLidos(): string[] {
    return titulos.filter((_, index) => lido[index] === true);
}

// Retorna apenas os títulos dos livros que você ainda não leu
function listarPendentes(): string[] {
    return titulos.filter((_, index) => lido[index] === false);
}

// --- Testes da Etapa 5 ---
console.log("\n--- TESTES DE LEITURA ---");

// Marcar "1984" como lido (se você não o removeu na Etapa 3) ou outro pendente
// Vamos usar o índice 3 ("Dom Casmurro" no original ou ajuste conforme sua lista)
marcarComoLido(2, 5); 

console.log(`\nLivros Lidos: ${listarLidos().join(", ")}`);
console.log(`Livros Pendentes: ${listarPendentes().join(", ")}`);

// Retorna a quantidade total de livros na coleção
const totalLivros = (): number => titulos.length;

// Retorna quantos livros já foram marcados como lidos
const totalLidos = (): number => lido.filter(status => status === true).length;

// Calcula a porcentagem de leitura da biblioteca
function percentualLidos(): number {
    if (totalLivros() === 0) return 0;
    return (totalLidos() / totalLivros()) * 100;
}

// Calcula a média das notas dadas apenas aos livros lidos
function mediaAvaliacoes(): number {
    const notasLidos = avaliacoes.filter((_, index) => lido[index]);
    if (notasLidos.length === 0) return 0;
    
    const soma = notasLidos.reduce((acc, nota) => acc + nota, 0);
    return soma / notasLidos.length;
}

// Encontra o título do livro que recebeu a maior nota
function livroMaiorAvaliacao(): string {
    if (totalLidos() === 0) return "Nenhum livro lido";
    
    // Usamos o reduce para comparar as notas e retornar o índice da maior
    const indiceMaior = avaliacoes.reduce((melhor, atual, index) => 
        atual > avaliacoes[melhor] ? index : melhor, 0);
    
    return titulos[indiceMaior];
}

// Soma o total de páginas apenas dos livros que você já leu
function totalPaginasLidas(): number {
    return paginas
        .filter((_, index) => lido[index])
        .reduce((acc, pag) => acc + pag, 0);
}


console.log("\n=== ESTATISTICAS ===");
console.log(`Total de livros: ${totalLivros()}`);
console.log(`Livros lidos: ${totalLidos()} (${percentualLidos().toFixed(2)}%)`);
console.log(`Media das avaliacoes: ${mediaAvaliacoes().toFixed(2)}`);
console.log(`Livro melhor avaliado: ${livroMaiorAvaliacao()}`);
console.log(`Total de paginas lidas: ${totalPaginasLidas()}`);

// Agrupa e exibe os livros organizados por suas respectivas décadas
function exibirPorDecada(): void {
    console.log("\n=== POR DECADA ===");

    // Criamos um array apenas com as décadas únicas presentes na biblioteca
    // O cálculo Math.floor(ano / 10) * 10 transforma 1937 em 1930
    const decadasExistentes = anos
        .map(ano => Math.floor(ano / 10) * 10)
        .filter((decada, index, self) => self.indexOf(decada) === index) // Remove duplicatas
        .sort((a, b) => a - b); // Organiza da mais antiga para a mais nova

    // Para cada década encontrada, filtramos e mostramos os livros correspondentes
    decadasExistentes.forEach(decada => {
        const livrosDaDecada = titulos.filter((_, index) => {
            const decadaDoLivro = Math.floor(anos[index] / 10) * 10;
            return decadaDoLivro === decada;
        });

        console.log(`${decada}s: ${livrosDaDecada.join(", ")}`);
    });
}

exibirPorDecada();

adicionarLivro("O Silmarillion", "J.R.R. Tolkien", 1977, 428); // Adiciona um válido
adicionarLivro("Livro Inválido", "Desconhecido", -5, 0); // Testa a validação do if
removerLivro(2); // Remove o livro "1984" que estava no índice 2

// Chamada inicial para testar a exibição
exibirBiblioteca();