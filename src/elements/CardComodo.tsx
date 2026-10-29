import { useState } from "react";
import type { Comodo } from "../types.ts";

interface CardComodoProps {
  comodo: Comodo;
}

function CardComodo({ comodo }: CardComodoProps): JSX.Element {
  const [luzLigada, setLuzLigada] = useState<boolean>(false);
  const [temperatura, setTemperatura] = useState<number>(comodo?.temperatura ?? 20);
  const [brilhoLuz, setBrilhoLuz] = useState<number>(comodo?.brilho ?? 50);
  const [painelAberto, setPainelAberto] = useState<boolean>(false);

  // Remove classes de cor do ícone salvas no estado para evitar conflito com o tema
  const iconePuro: string = comodo?.classeIcone
    ? comodo.classeIcone
        .replace("text-dark", "")
        .replace("text-body", "")
        .trim()
    : "fa-solid fa-house";

  return (
    <div className="cards_comodos ">
      <div
        className="card_header"
        style={{ width: "100%", display: "block", minHeight: "30px" }}
      >
        <span className="letra_h2_negrito text-body">
          {comodo?.nome ? comodo.nome.toUpperCase() : "SEM NOME NO OBJETO"}
        </span>
      </div>

      <div className="card_icone text-body">
        <i className={iconePuro}></i>
      </div>

      <div className="card_detalhes text-body">
        {/* Toggle de luz */}
        <div className="linha_controle">
          <span className="letra_h3">
            LUZ:
            <label className="switch">
              <input
                type="checkbox"
                checked={luzLigada}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLuzLigada(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </span>
        </div>

        <div className="d-flex flex-column mt-3">
          <span className="letra_h3">
            AC:
            {/* Fundo fixo (#e9ecef) garante legibilidade independente do tema */}
            <span
              className="caixa_ac text-dark"
              style={{
                backgroundColor: "#e9ecef",
                padding: "2px 8px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            >
              {temperatura}°C
            </span>
          </span>

          {/* Botões que abrem o painel de ajustes */}
          <div className="d-flex gap-2 mt-3" style={{ marginLeft: "140px" }}>
            <button
              className="setinha bg-transparent border-0 text-body"
              onClick={() => setPainelAberto(true)}
            >
              <i className="fa-solid fa-angle-up setinha_icon"></i>
            </button>
            <button
              className="engrenagem bg-transparent border-0 text-body"
              onClick={() => setPainelAberto(true)}
            >
              <i className="fa-solid fa-gear ajuste"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Painel sobreposto de ajustes finos (brilho e temperatura) */}
      {painelAberto && (
        <div
          className="card-sobreposto text-body"
          style={{ backgroundColor: "var(--bs-body-bg)" }}
        >
          <div className="ajustes-header">
            <h3>Ajustes</h3>
            <button
              className="btn-fechar bg-transparent border-0 text-body"
              onClick={() => setPainelAberto(false)}
            >
              <i className="fa-solid fa-angle-down seta_baixo"></i>
            </button>
          </div>
          <div className="ajustes-body">
            <label>Intensidade da Luz</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brilhoLuz}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrilhoLuz(Number(e.target.value))}
            />
            <label>Ar Condicionado (°C)</label>
            <input
              type="number"
              className="text-body bg-transparent border rounded"
              min="16"
              max="30"
              value={temperatura}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperatura(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardComodo;
