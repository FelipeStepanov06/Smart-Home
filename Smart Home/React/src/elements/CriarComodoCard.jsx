import { useState } from "react";

const ICONES = [
  { id: "sofa", classeIcone: "fa-solid fa-couch" },
  { id: "cama", classeIcone: "fa-solid fa-bed" },
  { id: "banheira", classeIcone: "fa-solid fa-bath" },
  { id: "escritorio", classeIcone: "fa-solid fa-house-laptop" }
];

function CriarComodoCard({ onCriarComodo, onCancelar }) {
  const [nomeComodo, setNomeComodo] = useState("");
  const [iconeSelecionado, setIconeSelecionado] = useState("");
  const [associarDispositivos, setAssociarDispositivos] = useState(false);
  const [temperatura, setTemperatura] = useState(20);
  const [brilho, setBrilho] = useState(50);

  const handleCriar = () => {
    if (!nomeComodo.trim()) {
      alert("Por favor, digite o nome do comodo!");
      return;
    }

    let classeIcone = "fa-solid fa-house";
    if (iconeSelecionado) {
      const objetoIcone = ICONES.find((item) => item.id === iconeSelecionado);
      if (objetoIcone) classeIcone = objetoIcone.classeIcone;
    }

    onCriarComodo({
      id: Date.now(),
      nome: nomeComodo.trim(),
      classeIcone: classeIcone,
      temperatura: temperatura,
      brilho: brilho,
      associarDispositivos: associarDispositivos
    });
  };

  return (
    <div className="painel_criacao_card">
      <span className="letra_h2_negrito">CRIAR NOVO CÔMODO</span>

      <div className="tipo_comodo">
        <span className="letra_h3">NOME DO CÔMODO</span>
        <input
          type="text"
          id="texto_comodo"
          className="letra_h3"
          placeholder="Digite o comodo"
          value={nomeComodo}
          onChange={(e) => setNomeComodo(e.target.value)}
        />

        <span className="letra_h3">SELECIONE O ICONE</span>

        <div className="container_icones_selecao">
          {ICONES.map((item) => (
            <label
              key={item.id}
              className={`checkbox_icone ${iconeSelecionado === item.id ? "ativo" : ""}`}
            >
              <input
                type="checkbox"
                name="checkbox_icones[]"
                value={item.id}
                checked={iconeSelecionado === item.id}
                onChange={() =>
                  setIconeSelecionado(iconeSelecionado === item.id ? "" : item.id)
                }
              />
              <div className="conteudo_icone">
                <i className={item.classeIcone}></i>
              </div>
            </label>
          ))}
        </div>

        <span className="letra_h3">ASSOCIAR DISPOSITIVOS (OPCIONAL)</span>
        <input
          type="checkbox"
          id="checkbox_dispositivos"
          checked={associarDispositivos}
          onChange={(e) => setAssociarDispositivos(e.target.checked)}
        />

        <div className="pre_definicao">
          <span className="letra_h3">PRÉ DEFINIÇÕES DE INÍCIO (OPCIONAL)</span>

          <div className="container_input_range">
            <div className="bloco_range">
              <span className="letra_h3">Temperatura</span>
              <input
                type="range"
                className="linha_definicao"
                min="0"
                max="30"
                value={temperatura}
                onChange={(e) => setTemperatura(Number(e.target.value))}
              />
              <span className="valor_atual">{temperatura}</span>
            </div>

            <div className="bloco_range">
              <span className="letra_h3">Brilho da Luz</span>
              <input
                type="range"
                className="linha_definicao"
                min="0"
                max="100"
                value={brilho}
                onChange={(e) => setBrilho(Number(e.target.value))}
              />
              <span className="valor_atual">{brilho}</span>
            </div>
          </div>

          <div className="bloco_saida">
            <button id="botao_cancelar" className="botao_criar_comodo" onClick={onCancelar}>
              CANCELAR
            </button>

            <button id="botao_criar_comodo" className="botao_criar_comodo" onClick={handleCriar}>
              CRIAR CÔMODO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarComodoCard;
