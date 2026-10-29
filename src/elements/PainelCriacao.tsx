interface PainelCriacaoProps {
  onAbrirCriacao: () => void;
  onScanRede: () => void;
}

function PainelCriacao({ onAbrirCriacao, onScanRede }: PainelCriacaoProps): JSX.Element {
  return (
    <div className="painel_criacao">
      {/* Ícone "+" feito via CSS (::before e ::after) */}
      <div className="mais-grande-fino"></div>

      <div className="barra_vertical"></div>

      <div className="painel_adicao">
        <span className="letra_h1_negrito ">Configuração e Adição</span>

        {/* Grid de duas colunas com as ações principais */}
        <div className="opcoes_painel">
          <div className="botao_painel">
            <button id="botao_criar" className="letra_h3" onClick={onAbrirCriacao}>
              CRIAR CÔMODO
            </button>
          </div>

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
