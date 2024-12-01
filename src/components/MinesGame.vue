<template>
    <div id="app" class="container">
        <h1>Jogo Mines</h1>
        <div class="game-board">
            <div 
                v-for="(square, index) in board" 
                :key="index" 
                class="square" 
                :class="{ clicked: square.clicked, mine: isGameOver && square.mine }"
                @click="handleClick(index)"
            >
            
                <i v-if="square.clicked" :class="square.icon"></i>
            </div>

        </div>
        <div id="status">
            <p>{{ message }}</p>
            <p>Prêmio: {{ prize }}</p>
            <button @click="startGame">Começar Novo Jogo</button>
        </div>
    </div>
</template>

<script>
export default{
        name: "MinesGame",
        data() {
        return {
            board: [],         // Tabuleiro com os quadrados
            mines: [],         // Índices das minas
            isGameOver: false, // Estado do jogo
            prize: 0,          // Prêmio acumulado
            totalSquares: 25,  // Total de quadrados no tabuleiro
            message: "Clique em um quadrado para começar!"
        };
    },
    methods: {
        startGame() {
            this.isGameOver = false;
            this.board = [];
            this.mines = [];
            this.prize = 0;
            this.message = "Clique em um quadrado para começar!";

            // Cria o tabuleiro
            for (let i = 0; i < this.totalSquares; i++) {
                this.board.push({ clicked: false, mine: false, icon: "" });
            }

            // Coloca minas aleatoriamente
            this.placeMines();
        },
        placeMines() {
            let mineCount = 5; // Número de minas no jogo
            while (this.mines.length < mineCount) {
                const randomIndex = Math.floor(Math.random() * this.totalSquares);
                if (!this.mines.includes(randomIndex)) {
                    this.mines.push(randomIndex);
                }
            }

            // Marca as minas no tabuleiro (somente internamente, sem exibir)
                this.mines.forEach(index => {
                this.board[index].mine = true;
                });
        },
        handleClick(index) {
            if (this.isGameOver || this.board[index].clicked) return;

            const square = this.board[index];
            square.clicked = true;

            if (square.mine) {
                this.gameOver();
            } else {
                this.prize += 10;
                square.icon = "fa fa-face-smile"; // Ícone de diamante
                if (this.prize >= 50) {
                    this.message = "Você venceu!";
                    this.isGameOver = true;
                }
            }
        },
        gameOver() {
            this.message = "Game Over! Você clicou em uma mina!";
            this.isGameOver = true;

            // Revela todas as minas
            this.mines.forEach(index => {
                const mineSquare = this.board[index];
                mineSquare.icon = "fa fa-face-frown"; // Ícone de bomba
                mineSquare.clicked = true;
            });
        }
    },
    mounted() {
        // Inicia o jogo ao carregar a página
        this.startGame();
    }
};

</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    text-align: center;
    width: 80%;
    max-width: 600px;
}

.game-board {
    display: grid;
    grid-template-columns: repeat(5, 50px);
    grid-template-rows: repeat(5, 50px);
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.square {
    width: 50px;
    height: 50px;
    background-color: #e0e0e0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.6s ease, background-color 0.3s ease;
    transform: rotateY(0);
    
}
.square:hover {
    background-color: #ccc;
}

.square.clicked {
    background-color: #a5d6a7;
    transform: rotateY(180deg);
}

.square.mine {
    background-color: #ec4c4c;
}

#status {
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #1976D2;
}

</style>