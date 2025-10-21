let listaDeNumeroSorteados = []; // deve ser um array
let NumeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); 
    campo.innerHTML = texto;

    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2}); 
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Hora do desafio');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == NumeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');    

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';  
        let mensagemTentativa = `Você descobriu o número secreto, Lucas, com ${tentativas} ${palavraTentativa}!`;
        
        exibirTextoNaTela('p', mensagemTentativa);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > NumeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else { 
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo(); 
    }
} 

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);

    // Se já sorteou todos os números, limpa a lista
    if (listaDeNumeroSorteados.length === 10) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
    chute.focus();
}

function reiniciarJogo() {
    NumeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
