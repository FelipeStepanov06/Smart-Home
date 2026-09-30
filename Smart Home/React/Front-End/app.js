// Captura o elemento do botão "CRIAR CÔMODO" no HTML através do seu ID
const botao = document.getElementById('botao_criar')
// Captura a Div vazia onde os novos modais/cards serão inseridos
const criacaoCard = document.getElementById('area_criacao')

// Array de objetos contendo os dados dos ícones. 
// Isso facilita a manutenção: para adicionar um novo ícone, basta colocar nesta lista.
const icones = [
  { id: 'sofa', classeIcone: 'fa-solid fa-couch' },
  { id: 'cama', classeIcone: 'fa-solid fa-bed' },
  { id: 'banheira', classeIcone: 'fa-solid fa-bath' },
  { id: 'escritorio', classeIcone: 'fa-solid fa-house-laptop' }
];


function atualizarValor(inputElement){
  const spanValor = inputElement.nextElementSibling;
  if(spanValor){
    spanValor.textContent = inputElement.value
  }
}


// Certifique-se de que os elementos 'botao' e 'criacaoCard' já foram mapeados acima no seu código, ex:
// const botao = document.getElementById('seu-id-do-botao');
// const criacaoCard = document.getElementById('seu-id-do-container');

// Adiciona um ouvinte de evento. Toda vez que houver um 'click' no botão, a função anônima será executada.
botao.addEventListener('click', function(){

    // Cria um novo elemento HTML do tipo <div> na memória
    const novoCard = document.createElement('div');
    // Adiciona a classe CSS que define a aparência e dimensões do card principal
    novoCard.classList.add('painel_criacao_card');

    // 1. Criamos o bloco de HTML das checkboxes dinamicamente antes de montar o card.
    // O método .map() percorre o array 'icones' e transforma cada objeto em um pedaço de HTML (Template Literal).
    const htmlCheckboxes = icones.map(item => `
        <label class="checkbox_icone">
            <!-- O 'value' do input puxa o 'id' e a tag <i> puxa a classe do FontAwesome definidas no array -->
            <input type="checkbox" name="checkbox_icones[]" value="${item.id}">
            <div class="conteudo_icone">
              <i class="${item.classeIcone}"></i>
            </div>
        </label>
    `).join(''); // O .join('') une todos os blocos de HTML gerados em uma única String contínua de texto

    // 2. Montamos o HTML do seu painel injetando a variável com todas as checkboxes separadas
    // Usamos 'innerHTML' para injetar toda a estrutura HTML do formulário de uma vez só dentro da <div> que criamos.
    novoCard.innerHTML = `
        <span class="letra_h2_negrito">CRIAR NOVO CÔMODO</span>

        <div class="tipo_comodo">
            <span class="letra_h3">NOME DO CÔMODO</span>
            <!-- Input para capturar o nome do ambiente -->
            <input type="text" id="texto_comodo" class="letra_h3" placeholder="Digite o comodo">

            <span class="letra_h3">SELECIONE O ICONE</span>
            
            <div class="container_icones_selecao">
                <!-- Aqui a variável dinâmica injeta as 4 labels de ícones geradas pelo map() ali em cima -->
                ${htmlCheckboxes} 
            </div>

            <span class="letra_h3">ASSOCIAR DISPOSITIVOS (OPCIONAL)</span>
            <input type="checkbox" id="checkbox_dispositivos">

            <div class="pre_definicao">
                <span class="letra_h3">PRÉ DEFINIÇÕES DE INÍCIO (OPCIONAL)</span>

                <div class='container_input_range'>
                  <!-- Sliders de configurações. O 'oninput' chama uma função (que precisará ser criada) para atualizar os valores em tempo real -->

                  <div class='bloco_range'>
                    <span class ='letra_h3'>Temperatura</span>


                    <input type="range" class="linha_definicao" min="0" max="30" value="20" oninput="atualizarValor(this)">

                    <span class ='valor_atual'>20</span>
                  </div>

                  <div class='bloco_range'> 
                    <span class ='letra_h3'>Brilho da Luz</span>

                    <input type="range" class="linha_definicao" min="0" max="100" value="50" oninput="atualizarValor(this)">

                    <span class ='valor_atual'>50</span>
                  </div>

                  
                </div>
                <div class='bloco_saida'>
                    <button id="botao_cancelar" class="botao_criar_comodo">CANCELAR</button>

                    <button id="botao_criar_comodo" class="botao_criar_comodo">CRIAR CÔMODO</button>

                </div>
            </div>
        </div>
    `;

    // Por fim, pega a Div recém-configurada (novoCard) e a joga (anexa) dentro da Div principal que está na tela (criacaoCard)
    criacaoCard.appendChild(novoCard);
});


document.addEventListener('click', function(event){
  if (event.target && event.target.id ==='botao_criar_comodo'){


    const nomeComodo = document.getElementById('texto_comodo').value
    if(!nomeComodo.trim()){
      alert('Por favor, digite o nome do comodo!')

      return;
    }


    const checkboxMarcada = document.querySelector('input[name = "checkbox_icones[]"]:checked');
    let classeIconeEscolhido = 'fa-solid fa-house'

    if (checkboxMarcada){
      const iconeObjeto = icones.find(i => i.id === checkboxMarcada.value);
      if (iconeObjeto) classeIconeEscolhido = iconeObjeto.classeIcone;
    }

    const range = document.querySelectorAll('.linha_definicao');
    const valorDefinicao1 = range[0]? range[0].value: 0 ;
    const valorDefinicao2 = range[1]? range[1].value: 0 ;


    const cardDefinido = document.createElement('div');

    cardDefinido.classList.add('cards_comodos');

    cardDefinido.innerHTML  =`
    <div class="card_header">
      <span class ='letra_h2_negrito'>${nomeComodo.toUpperCase()}</span>
    </div>
    <div class="card_icone">
      <i class="${classeIconeEscolhido}"></i>
    </div>
    <div class="card_detalhes">
      <div class = 'linha_controle'>
        <span class = 'letra_h3'>LUZ:<label class = 'switch'>
          <input type='checkbox'>
          <span class='slider'></span>
        </label></span>
      </div>

      <span class = 'letra_h3'> AC: <span class='caixa_ac'>${valorDefinicao1}°C</span></span>
      <div class='ajustes'>

        <button id="setinha" class="setinha"><i class="fa-solid fa-angle-up setinha_icon"></i></button>

        <button id="engrenagem" class="engrenagem"><i class="fa-solid fa-gear ajuste"></i></button>


      </div>
    </div>
    `;


    const listaComodos = document.getElementById('area_criacao')
    listaComodos.appendChild(cardDefinido);

    document.querySelector('.painel_criacao_card').remove();


  }
})

document.addEventListener('click',function(cancelar){
  if(cancelar.target && cancelar.target.id ==='botao_cancelar'){
    document.querySelector('.painel_criacao_card').remove();
  }

})

document.addEventListener('click', function (event) {
  
  // --- 1. ABRIR PAINEL DE AJUSTES FINOS ---
  // Verifica se o clique foi na setinha ou na engrenagem
  const botaoAjuste = event.target.closest('.setinha') || event.target.closest('.engrenagem');
  
  if (botaoAjuste) {
    // Encontra o card de cômodo correspondente ao botão clicado
    const cardPaiOriginal = botaoAjuste.closest('.cards_comodos');

    if (cardPaiOriginal) {
      // Evita abrir mais de um painel se o usuário clicar várias vezes
      if (cardPaiOriginal.querySelector('.card-sobreposto')) return;

      // Cria a nova div que vai sobrepor o card original
      const painelSobreposto = document.createElement('div');
      painelSobreposto.classList.add('card-sobreposto');

      // HTML estruturado com crases para permitir quebra de linhas de forma segura
      painelSobreposto.innerHTML = `
        <div class="ajustes-header">
          <h3>Ajustes</h3>
          <button class="btn-fechar"><i class="fa-solid fa-angle-down seta_baixo"></i></button>
        </div>
        <div class="ajustes-body">
          <label>Intensidade da Luz</label>
          <input type="range" min="0" max="100" value="50">
          
          <label>Ar Condicionado (°C)</label>
          <input type="number" min="16" max="30" value="22">
        </div>
      `;

      // Insere o painel dentro do card clicado (o CSS com position absolute fará o resto)
      cardPaiOriginal.appendChild(painelSobreposto);
    }
  }

  // --- 2. FECHAR PAINEL DE AJUSTES FINOS ---
  // Verifica se o clique foi no botão de fechar (X)
  const botaoFechar = event.target.closest('.btn-fechar');
  
  if (botaoFechar) {
    const painelParaRemover = botaoFechar.closest('.card-sobreposto');
    if (painelParaRemover) {
      painelParaRemover.remove();
    }
  }
});


