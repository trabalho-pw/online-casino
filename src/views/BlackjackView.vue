<template>
    <div id="app">
      <div class="jogo-container">
        <div id="intro">
          <h2 v-if="!jogoIniciado">Vamos jogar um jogo de Blackjack!</h2>
          <h2 v-if="jogoFinalizado && jogadorVenceu">VOCÊ VENCEU! <i class="fas fa-laugh-beam"></i></h2>
          <h2 v-if="jogoFinalizado && !jogadorVenceu">O DEALER VENCEU <i class="fas fa-sad-tear"></i></h2>
          <h2 v-if="jogoIniciado">Jogue!</h2>
        </div>
  
        <!-- Placar de dinheiro -->
        <div class="placar-dinheiro">
          <p>Dinheiro: R$ {{ dinheiro }}</p>
        </div>
  
        <!-- Cartas -->
        <ListaDeCartas :cartas="cartasDealer" titulo="Cartas do Dealer" />
        <ListaDeCartas :cartas="cartasJogador" titulo="Suas Cartas" />
  
        <!-- Placar de pontuação -->
        <Placar :dealerPontuacao="pontuacaoDealer" :jogadorPontuacao="pontuacaoJogador" />
  
        <!-- Controles de Jogo -->
        <ControlesDeJogo
          :jogoIniciado="jogoIniciado"
          :jogoFinalizado="jogoFinalizado"
          @iniciar-jogo="iniciarJogo"
          @comprar-carta="comprarCarta"
          @parar="parar"
        />
  
        <!-- Botão para reiniciar o jogo -->
        <button v-if="jogoFinalizado" @click="reiniciarJogo">Reiniciar Jogo</button>
      </div>
  
    </div>
    <footer>
      <!--Rodapé-->
      <approdape />
    </footer>
  </template>
  
  <script>
  import ListaDeCartas from '../components/ListaDeCartas.vue';
  import Placar from '../components/Placar.vue';
  import ControlesDeJogo from '../components/ControlesDeJogo.vue';
  import approdape from '../components/rodape.vue'; // Importa o Footer
  
  export default {
    components: {
      ListaDeCartas,
      Placar,
      ControlesDeJogo,
      approdape, // Registra o Footer como componente
    },
    data() {
      return {
        naipes: ['Corações', 'Paus', 'Diamantes', 'Espadas'],
        valores: ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
        baralho: [],
        cartasDealer: [],
        cartasJogador: [],
        pontuacaoDealer: 0,
        pontuacaoJogador: 0,
        dinheiro: 1500, // Dinheiro inicial
        dinheiroFinal: 1500, // Armazena o valor final do dinheiro após o término do jogo
        jogoIniciado: false,
        jogoFinalizado: false,
        jogadorVenceu: false,
      };
    },
    methods: {
      criarBaralho() {
        let baralho = [];
        for (let naipe of this.naipes) {
          for (let valor of this.valores) {
            baralho.push({ naipe, valor });
          }
        }
        return baralho;
      },
      embaralharBaralho(baralho) {
        for (let i = 0; i < baralho.length; i++) {
          let indiceAleatorio = Math.floor(Math.random() * baralho.length);
          [baralho[i], baralho[indiceAleatorio]] = [baralho[indiceAleatorio], baralho[i]];
        }
      },
      pegarProximaCarta() {
        return this.baralho.shift();
      },
      obterValorNumericoDaCarta(carta) {
        switch (carta.valor) {
          case 'A':
            return 1;
          case '2':
            return 2;
          case '3':
            return 3;
          case '4':
            return 4;
          case '5':
            return 5;
          case '6':
            return 6;
          case '7':
            return 7;
          case '8':
            return 8;
          case '9':
            return 9;
          default:
            return 10;
        }
      },
      calcularPontuacao(cartas) {
        let pontuacao = 0;
        let temAs = false;
        for (let carta of cartas) {
          pontuacao += this.obterValorNumericoDaCarta(carta);
          if (carta.valor === 'A') temAs = true;
        }
        if (temAs && pontuacao + 10 <= 21) {
          pontuacao += 10;
        }
        return pontuacao;
      },
      atualizarPontuacoes() {
        this.pontuacaoDealer = this.calcularPontuacao(this.cartasDealer);
        this.pontuacaoJogador = this.calcularPontuacao(this.cartasJogador);
      },
      verificarFimDeJogo() {
        this.atualizarPontuacoes();
        if (this.pontuacaoJogador > 21) {
          this.jogadorVenceu = false;
          this.jogoFinalizado = true;
          this.dinheiro -= 100; // Perde dinheiro
        } else if (this.pontuacaoDealer > 21) {
          this.jogadorVenceu = true;
          this.jogoFinalizado = true;
          this.dinheiro += 100; // Ganha dinheiro
        } else if (this.pontuacaoJogador === 21) {
          this.jogadorVenceu = true;
          this.jogoFinalizado = true;
          this.dinheiro += 200; // Ganha dinheiro
        } else if (this.jogoFinalizado) {
          if (this.pontuacaoJogador > this.pontuacaoDealer) {
            this.jogadorVenceu = true;
            this.dinheiro += 100; // Ganha dinheiro
          } else {
            this.jogadorVenceu = false;
            this.dinheiro -= 100; // Perde dinheiro
          }
        }
  
        // Atualizar o valor final do dinheiro
        this.dinheiroFinal = this.dinheiro;
      },
      iniciarJogo() {
        this.jogoIniciado = true;
        this.jogoFinalizado = false;
        this.jogadorVenceu = false;
        this.baralho = this.criarBaralho();
        this.embaralharBaralho(this.baralho);
        this.cartasDealer = [this.pegarProximaCarta(), this.pegarProximaCarta()];
        this.cartasJogador = [this.pegarProximaCarta(), this.pegarProximaCarta()];
        this.verificarFimDeJogo();
      },
      comprarCarta() {
        this.cartasJogador.push(this.pegarProximaCarta());
        this.verificarFimDeJogo();
      },
      jogarDealer() {
        while (this.pontuacaoDealer < 17) {
          this.cartasDealer.push(this.pegarProximaCarta());
          this.atualizarPontuacoes();
        }
        this.verificarFimDeJogo();
      },
      parar() {
        this.jogoFinalizado = true;
        this.jogarDealer();
        this.verificarFimDeJogo();
      },
      reiniciarJogo() {
        this.dinheiro = this.dinheiroFinal;
        this.iniciarJogo();
      },
    },
  };
  </script>
  
  <style scoped>
  #app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Fundo escuro */
  font-family: 'Arial', sans-serif;
}

.jogo-container {
  background-color: rgba(0, 0, 0, 0.7); /* Fundo escuro do jogo */
  padding: 30px;
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  background: url('../assets/background-layered-peaks.svg');
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  width: 80vw; /* Largura do contêiner ajustada */
  max-width: 800px; /* Limita a largura máxima */
  min-width: 400px; /* Garante uma largura mínima para telas pequenas */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  flex-grow: 1;
}

h2 {
  margin: 20px 0;
  font-size: 28px;
}

.fas {
  margin-left: 10px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e64a19;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.placar-dinheiro {
  font-size: 20px;
  margin: 10px 0;
  font-weight: bold;
}


  </style>
  