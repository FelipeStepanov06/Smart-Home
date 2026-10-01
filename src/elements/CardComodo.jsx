import { useState } from "react";

function CardComodo({ comodo }) {
  const [luzLigada, setLuzLigada] = useState(false);
  const [temperatura, setTemperatura] = useState(comodo.temperatura ?? 20);
  const [brilhoLuz, setBrilhoLuz] = useState(comodo.brilho ?? 50);
  const [painelAberto, setPainelAberto] = useState(false);

  return (
    <div className="cards_comodos ">
      <div className="card_header ">
        <span className="letra_h2_negrito">{comodo.nome.toUpperCase()}</span>
      </div>
      <div className="card_icone text-dark">
        <i className= {comodo.classeIcone} ></i>
      </div>

      <div className="card_detalhes link-dark">
        <div className="linha_controle">
          <span className="letra_h3">
            LUZ:
            <label className="switch">
              <input
                type="checkbox"
                checked={luzLigada}
                onChange={(e) => setLuzLigada(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </span>
        </div>

        {/* Botões ajustados perfeitamente abaixo do AC */}
        <div className="d-flex flex-column mt-3">
          <span className="letra_h3">
            AC: <span className="caixa_ac">{temperatura}°C</span>
          </span>
          <div className="d-flex gap-2 mt-3" style={{ marginLeft: "45px" }}>
            <button className="setinha" onClick={() => setPainelAberto(true)}>
              <i className="fa-solid fa-angle-up setinha_icon link-dark"></i>
            </button>
            <button
              className="engrenagem link-dark"
              onClick={() => setPainelAberto(true)}
            >
              <i className="fa-solid fa-gear ajuste"></i>
            </button>
          </div>
        </div>
      </div>

      {painelAberto && (
        <div className="card-sobreposto">
          <div className="ajustes-header">
            <h3>Ajustes</h3>
            <button
              className="btn-fechar"
              onClick={() => setPainelAberto(false)}
            >
              <i className="fa-solid fa-angle-down seta_baixo link-dark"></i>
            </button>
          </div>
          <div className="ajustes-body">
            <label>Intensidade da Luz</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brilhoLuz}
              onChange={(e) => setBrilhoLuz(Number(e.target.value))}
            />
            <label>Ar Condicionado (°C)</label>
            <input
              type="number"
              min="16"
              max="30"
              value={temperatura}
              onChange={(e) => setTemperatura(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardComodo;
