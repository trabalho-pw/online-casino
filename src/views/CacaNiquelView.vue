<template>
  <div class="game-background">
    <div class="game-header">
      <h1 class="game-title">CAÇA-NÍQUEL</h1>
      <div class="user-info">
        <p class="balance-text">Saldo Atual: {{ balance }} Moedas</p>
        <p class="result-text" v-if="resultMessage" :class="{'win-text': isWinning, 'lose-text': !isWinning}">{{ resultMessage }}</p>
      </div>
    </div>

    <div class="game-content">
      <div class="bet-options">
        <label for="bet" class="bet-label">Escolha sua aposta:</label>
        <select id="bet" v-model="currentBet" class="bet-select">
          <option v-for="amount in bets" :key="amount" :value="amount">
            {{ amount }} Moedas
          </option>
        </select>
      </div>

      <div class="slot-machine">
        <div
          class="reel"
          v-for="(column, columnIndex) in reels"
          :key="columnIndex"
        >
          <div
            class="symbol"
            v-for="(symbol, rowIndex) in column"
            :key="rowIndex"
          >
            <img v-if="symbol === '7'" src="../assets/numero7.webp" alt="7" class="symbol-image" />
            <img v-else-if="symbol === 'C'" src="../assets/letrac.webp" alt="C" class="symbol-image" />
            <img v-else-if="symbol === 'E'" src="../assets/letrae.webp" alt="E" class="symbol-image" />
            <img v-else-if="symbol === 'U'" src="../assets/letrau.webp" alt="U" class="symbol-image" />
            <img v-else-if="symbol === 'B'" src="../assets/letrab.webp" alt="B" class="symbol-image" />
            <span v-else class="symbol-text">{{ symbol }}</span>
          </div>
        </div>
      </div>

      <button :disabled="isSpinning || currentBet > balance" @click="spinSlotMachine" class="spin-button">
        {{ isSpinning ? "Girando..." : "Girar" }}
      </button>

      <p v-if="currentBet > balance" class="error-message">
        Saldo insuficiente para apostar {{ currentBet }} moedas.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: 1000, // Saldo inicial do jogador
      resultMessage: '', // Mensagem do resultado
      reels: Array(3).fill().map(() => ['7', 'C', 'E']), // Símbolos dos rolos
      isSpinning: false, // Indica se os rolos estão girando
      bets: [25, 50, 100, 200, 500], // Opções de apostas
      currentBet: 25, // Aposta atual
      isWinning: false, // Indica se o jogador ganhou
    };
  },
  methods: {
    spinSlotMachine() {
      // Verifica se o jogador tem saldo suficiente
      if (this.currentBet > this.balance) {
        this.resultMessage = "Saldo insuficiente!";
        return;
      }

      // Deduz a aposta do saldo ao iniciar o giro
      this.balance -= this.currentBet;
      this.isSpinning = true;

      // Símbolos disponíveis para o giro
      const symbols = ['7', 'C', 'E', 'U', 'B'];
      const spinDurations = [2000, 2200, 2400]; // Durações diferentes para cada coluna
      const interval = 100; // Intervalo para atualização dos símbolos

      let columnsStopped = 0;

      // Função para gerar símbolos aleatórios para uma coluna
      const spinColumn = (columnIndex, spinDuration) => {
        let elapsedTime = 0;
        const spinInterval = setInterval(() => {
          this.reels[columnIndex] = Array(3)
            .fill(null)
            .map(() => symbols[Math.floor(Math.random() * symbols.length)]);

          elapsedTime += interval;

          // Quando o tempo total de giro for atingido, parar a animação
          if (elapsedTime >= spinDuration) {
            clearInterval(spinInterval);
            columnsStopped += 1;
            if (columnsStopped === 3) {
              this.finishSpin();
            }
          }
        }, interval);
      };

      // Iniciar o giro de cada coluna com durações diferentes
      this.reels.forEach((_, columnIndex) => {
        spinColumn(columnIndex, spinDurations[columnIndex]);
      });
    },

    finishSpin() {
      // Conta os símbolos na linha do meio dos rolos
      const middleRowSymbols = this.reels.map(column => column[1]);
      const counts = middleRowSymbols.reduce((acc, symbol) => {
        acc[symbol] = (acc[symbol] || 0) + 1;
        return acc;
      }, {});

      // Lógica para determinar o tipo de vitória
      const isJackpot = counts['7'] === 3;
      const isThreeEqual = Object.values(counts).includes(3) && !isJackpot;
      const isTwoSevens = counts['7'] === 2 && Object.values(counts).includes(1);
      const isTwoEqualOneDifferent = Object.values(counts).includes(2) && !isTwoSevens;

      let winnings = 0;

      // Avalia o tipo de combinação
      if (isJackpot) {
        winnings = this.currentBet * 6; // 6x aposta
        this.resultMessage = `Jackpot! Você ganhou ${winnings} moedas!`;
        this.isWinning = true;
      } else if (isThreeEqual) {
        winnings = this.currentBet * 4; // 4x aposta
        this.resultMessage = `Parabéns! Você ganhou ${winnings} moedas!`;
        this.isWinning = true;
      } else if (isTwoSevens) {
        winnings = this.currentBet * 2; // 2x aposta
        this.resultMessage = `Boa! Você ganhou ${winnings} moedas!`;
        this.isWinning = true;
      } else if (isTwoEqualOneDifferent) {
        winnings = 0; // Sem ganhos
        this.resultMessage = `Você perdeu ${this.currentBet} moedas.`;
        this.isWinning = false;
      } else {
        winnings = 0; // Sem ganhos
        this.resultMessage = `Ah, não! Você perdeu ${this.currentBet} moedas.`;
        this.isWinning = false;
      }

      // Atualiza o saldo com os ganhos (se houver)
      this.balance += winnings;

      // Libera o botão de girar novamente
      this.isSpinning = false;
    },
  },
};
</script>

<style scoped>
.game-background {
  background: url('../assets/background-layered-peaks.svg');
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  height: 100vh;
  color: white;
  text-align: center;
}

.game-header {
  padding: 20px;
}

.game-title {
  font-size: 48px; /* Tamanho grande para o título */
  color: orange; /* Cor laranja/vermelha */
  text-transform: uppercase; /* Caixa alta */
  margin: 10px 0;
}

.user-info {
  margin-bottom: 20px;
}

.balance-text {
  font-size: 20px; /* Aumenta o tamanho do texto */
}

.result-text {
  margin: 15px 0; /* Ajusta a margem para colocar a mensagem no meio */
  font-size: 24px; /* Aumenta o tamanho da fonte */
  font-weight: bold; /* Deixa o texto em negrito */
}

.win-text {
  color: limegreen; /* Cor verde forte para ganhos */
}

.lose-text {
  color: crimson; /* Cor vermelha forte para perdas */
}

.bet-options {
  margin: 20px 0;
}

.bet-label {
  font-size: 20px; /* Aumenta o tamanho do texto */
}

.bet-select {
  width: 200px; /* Aumenta a largura da caixa de seleção */
  height: 40px; /* Aumenta a altura da caixa de seleção */
  background-color: black; /* Define a cor de fundo preta */
  color: white; /* Define a cor do texto como branca */
  border: 2px solid gold; /* Adiciona uma borda dourada para destaque */
  border-radius: 5px; /* Adiciona bordas arredondadas */
  font-size: 16px; /* Define o tamanho da fonte */
}

.slot-machine {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  height: 150px;
  overflow: hidden;
  border: 2px solid gold;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
}

.reel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%; /* Altura para cobrir todas as fileiras */
  margin: 0 10px;
}

.symbol {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px; /* Altura de cada símbolo */
  font-size: 72px;
}

.symbol-image {
  width: 80px;
  height: 80px;
}

.symbol-text {
  font-size: 72px;
  color: #8a2be2;
}

.spin-button {
  padding: 20px 40px; /* Aumenta o tamanho do botão */
  font-size: 20px; /* Aumenta o tamanho do texto no botão */
  background-color: gold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.spin-button:hover {
  background-color: darkgoldenrod;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
