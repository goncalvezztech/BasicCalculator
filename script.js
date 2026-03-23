// Guardo o que está no visor aqui
let expressao = '';
let resultado_mostrado = false;

// Pego o elemento do visor
const visor = document.getElementById('visor');

// Função que insere números e operadores
function inserir(valor) {
  const operadores = ['+', '-', '*', '/', '%'];

// Se acabou de mostrar um resultado e o usuário digita número, começa de novo
  if (resultado_mostrado && !operadores.includes(valor)) {
    expressao = '';
    resultado_mostrado = false;
  }

  // Se acabou de mostrar um resultado e digita operador, continua com o resultado
  if (resultado_mostrado && operadores.includes(valor)) {
    resultado_mostrado = false;
  }

// Não deixa colocar dois operadores seguidos
  const ultimo_char = expressao.slice(-1);
  if (operadores.includes(ultimo_char) && operadores.includes(valor)) {
    expressao = expressao.slice(0, -1);
  }

// Não deixa colocar dois pontos no mesmo número
  if (valor === '.') {
    const partes = expressao.split(/[\+\-\*\/\%]/);
    const parte_atual = partes[partes.length - 1];
    if (parte_atual.includes('.')) return;
  }

// Não deixa a expressão ficar muito longa
  if (expressao.length >= 20) return;
  expressao += valor;
  atualizar_visor(expressao);
}

// Limpa tudo
function limpar() {
  expressao = '';
  resultado_mostrado = false;
  visor.textContent = '0';
}

// Apaga o último caractere
function apagar() {
  if (resultado_mostrado) {
    limpar();
    return;
  }
  expressao = expressao.slice(0, -1);
  visor.textContent = expressao === '' ? '0' : expressao.replace(/\*/g, '×').replace(/\//g, '÷');
}

// Atualiza o que aparece no visor (troca * e / pelos símbolos bonitos)
function atualizar_visor(texto) {
  visor.textContent = texto.replace(/\*/g, '×').replace(/\//g, '÷');
}

// Calcula o resultado
function calcular() {
  if (expressao === '') return;

  try {
    let resultado = eval(expressao);

    // Arredonda pra não mostrar números estranhos tipo 0.1 + 0.2 = 0.30000000001
    resultado = parseFloat(resultado.toFixed(10));

    visor.textContent = resultado;
    expressao = String(resultado);
    resultado_mostrado = true;

    } catch (erro) {
    visor.textContent = 'Erro!';
    expressao = '';
    resultado_mostrado = false;
  }
}

document.addEventListener('keydown', function(evento) {
  const tecla = evento.key;

  if (tecla >= '0' && tecla <= '9') inserir(tecla);
  else if (tecla === '+') inserir('+');
  else if (tecla === '-') inserir('-');
  else if (tecla === '*') inserir('*');
  else if (tecla === '/') { evento.preventDefault(); inserir('/'); }
  else if (tecla === '%') inserir('%');
  else if (tecla === '.') inserir('.');
  else if (tecla === 'Enter' || tecla === '=') calcular();
  else if (tecla === 'Backspace') apagar();
  else if (tecla === 'Escape') limpar();
});