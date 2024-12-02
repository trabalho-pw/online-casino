<template>
  <div class="lista-de-cartas">
    <h3>{{ titulo }}</h3>
    <div class="cartas">
      <div v-for="(carta, index) in cartas" :key="index" class="carta">
        <!-- Utilizando apenas o emoji da carta sem o emoji do naipe -->
        <span class="emoji-carta" :title="`${carta.valor} de ${carta.naipe}`">
          {{ obterEmojiDaCarta(carta) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartas: Array,
    titulo: String
  },
  methods: {
    // Método para converter carta para emoji sem o emoji do naipe
    obterEmojiDaCarta(carta) {
      const emojis = {
        "A": "🂡", "2": "🂢", "3": "🂣", "4": "🂤", "5": "🂥", "6": "🂦", "7": "🂧", "8": "🂨", "9": "🂩", "10": "🂪",
        "J": "🂫", "Q": "🂭", "K": "🂮"
      };

      const valor = carta.valor;
      
      // Retorna apenas o emoji da carta sem o naipe
      return emojis[valor];
    }
  }
};
</script>

<style scoped>
.lista-de-cartas {
  margin-bottom: 20px;
}

.cartas {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap; /* Permite que as cartas se movam para uma nova linha quando o espaço acabar */
}

.carta {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 180px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  text-align: center;
  font-size: 72px; /* Aumentei o tamanho dos emojis para 72px */
  margin: 5px;
  transition: transform 0.2s;
  position: relative;
}

.carta:hover {
  transform: scale(1.1); /* Efeito de zoom ao passar o mouse */
}

.emoji-carta {
  color: black; /* Definido para que o texto da carta seja preto e visível no fundo branco */
  font-size: 80px; /* Aumentado para garantir que fique grande dentro da carta */
}

.carta::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background-color: #f7f7f7;
  border-radius: 8px;
  z-index: -1;
}

h3 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #fff;
}
</style>
