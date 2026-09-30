function PainelCriacao({ onAbrirCriacao, onScanRede }) {
  return (
    <div className="painel_criacao">
      {/* Ícone de Mais (Add) Oficial do Font Awesome */}
      <div className="mais-grande-fino"></div>

      <div className="barra_vertical"></div>

      {/* Painel onde está a parte de criação e scan da rede */}
      <div className="painel_adicao">
        {/* Título da seção de configuração */}
        <span className="letra_h1_negrito">Configuração e Adição</span>

        {/* Grid que organiza os dois botões de ação (Criar Cômodo e Scan) lado a lado */}
        <div className="opcoes_painel">
          {/* Container e Botão para acionar a criação de um novo cômodo */}
          <div className="botao_painel">
            <button id="botao_criar" className="letra_h3" onClick={onAbrirCriacao}>
              CRIAR CÔMODO
            </button>
          </div>

          {/* Container e Botão para iniciar o escaneamento na rede */}
          <div className="botao_painel">
            <button id="botao_scan" className="letra_h3" onClick={onScanRede}>
              INICIAR SCAN DE REDE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelCriacao;
