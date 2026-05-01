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

// Chamada inicial para testar a exibição
exibirBiblioteca();