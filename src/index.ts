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


adicionarLivro("O Silmarillion", "J.R.R. Tolkien", 1977, 428); // Adiciona um válido[cite: 2]
adicionarLivro("Livro Inválido", "Desconhecido", -5, 0); // Testa a validação do if[cite: 2]
removerLivro(2); // Remove o livro "1984" que estava no índice 2[cite: 2]

// Chamada inicial para testar a exibição
exibirBiblioteca();