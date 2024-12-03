<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Sobre Nós</h3>
          <p>
            A <strong>BetGalaxy</strong> é o seu destino número um para diversão,
            entretenimento e chances de ganhar! Jogue com responsabilidade.
          </p>
        </div>
        <div class="footer-section">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="#">Termos e Condições</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Responsabilidade no Jogo</a></li>
            <li><a href="#">FAQ e Suporte</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Nossos Jogos</h3>
          <ul>
            <li><a href="/game_selector">Página Inicial</a></li>
            <li><a href="#">Caça-níquel</a></li>
            <li><a href="/mines">Campo Minado</a></li>
            <li><a href="/blackjack">Blackjack</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contato</h3>
          <p><strong>Endereço:</strong> Rua dos Ganhos, 777, Bairro Fortuna, Cidade Sucesso</p>
          <p><strong>Telefone:</strong> +55 (11) 98765-4321</p>
          <p><strong>Email:</strong> contato@betgalaxy.com</p>
        </div>
        <div class="footer-section">
          <h3>Siga-nos</h3>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboErFZQ_oHCfhO7ISjsIPUG0JX10nYDlxIA&s" alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/600px-Instagram_logo_2022.svg.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 BetGalaxy. Todos os direitos reservados.</p>
        <p>Formas de Pagamento Aceitas: Visa | MasterCard | PayPal | Bitcoin</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Rodape",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px 10px;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
  }
  
  .footer-section {
    flex: 1;
    margin: 10px;
    min-width: 200px;
  }
  
  .footer-section h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #ff5722;
  }
  
  .footer-section p {
    font-size: 14px;
    line-height: 1.6;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 8px;
  }
  
  .footer-section ul li a {
    text-decoration: none;
    color: #fff;
    font-size: 14px;
    transition: color 0.3s;
  }
  
  .footer-section ul li a:hover {
    color: #ff5722;
  }
  
  .social-icons a {
    margin: 0 10px;
    display: inline-block;
  }
  
  .social-icons img {
    width: 32px; /* Define o tamanho das imagens */
    height: 32px;
    transition: transform 0.3s ease;
  }
  
  .social-icons img:hover {
    transform: scale(1.2); /* Efeito de zoom */
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 10px;
    width: 100%;
  }
  </style>
  