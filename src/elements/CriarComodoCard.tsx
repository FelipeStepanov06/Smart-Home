import { useState } from "react";
import type { Comodo, Icone } from "../types.ts";

// Sem classes de cor — aplicadas apenas na renderização para não poluir o estado
const ICONES: Icone[] = [
  { id: "sofa", classeIcone: "fa-solid fa-couch" },
  { id: "cama", classeIcone: "fa-solid fa-bed" },
  { id: "banheira", classeIcone: "fa-solid fa-bath" },
  { id: "escritorio", classeIcone: "fa-solid fa-house-laptop" },
];

interface CriarComodoCardProps {
  onCriarComodo: (comodo: Comodo) => void;
  onCancelar: () => void;
}

function CriarComodoCard({ onCriarComodo, onCancelar }: CriarComodoCardProps): JSX.Element {
  const [nomeComodo, setNomeComodo] = useState<string>("");
  const [iconeSelecionado, setIconeSelecionado] = useState<string>("");
  const [associarDispositivos, setAssociarDispositivos] = useState<boolean>(false);
  const [temperatura, setTemperatura] = useState<number>(20);
  const [brilho, setBrilho] = useState<number>(50);

  const handleCriar = (): void => {
    if (!nomeComodo.trim()) {
      alert("Por favor, digite o nome do comodo!");
      return;
    }

    // Fallback para ícone padrão se nenhum for selecionado
    let classeIcone = "fa-solid fa-house";
    if (iconeSelecionado) {
      const objetoIcone = ICONES.find((item) => item.id === iconeSelecionado);
      if (objetoIcone) classeIcone = objetoIcone.classeIcone;
    }

    alert("comodo criado");

    onCriarComodo({
      id: Date.now(),
      nome: nomeComodo.trim(),
      classeIcone: classeIcone,
      temperatura: temperatura,
      brilho: brilho,
      associarDispositivos: associarDispositivos,
    });
  };

  return (
    <div className="painel_criacao_card text-body">
      <span className="letra_h2_negrito">CRIAR NOVO CÔMODO</span>

      <div className="tipo_comodo ">
        <span className="letra_h3">NOME DO CÔMODO</span>
        <input
          type="text"
          id="texto_comodo"
          className="letra_h3 bg-transparent text-body border"
          placeholder="Digite o comodo"
          value={nomeComodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNomeComodo(e.target.value)}
        />

        <span className="letra_h3 mt-3">SELECIONE O ICONE</span>
        <div className="container_icones_selecao">
          {/* Checkboxes estilizados como botões de ícone — só um pode estar ativo por vez */}
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
                  setIconeSelecionado(
                    iconeSelecionado === item.id ? "" : item.id,
                  )
                }
              />
              <div className="conteudo_icone">
                <i className={`${item.classeIcone} text-body`}></i>
              </div>
            </label>
          ))}
        </div>

        <span className="letra_h3 mt-3">ASSOCIAR DISPOSITIVOS (OPCIONAL)</span>
        <input
          type="checkbox"
          id="checkbox_dispositivos"
          checked={associarDispositivos}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssociarDispositivos(e.target.checked)}
        />

        <div className="pre_definicao mt-3">
          <span className="letra_h3">PRÉ DEFINIÇÕES DE INÍCIO (OPCIONAL)</span>

          <div className="container_input_range mt-2">
            <div className="bloco_range">
              <span className="letra_h3">Temperatura</span>
              <input
                type="range"
                className="linha_definicao"
                min="0"
                max="30"
                value={temperatura}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperatura(Number(e.target.value))}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrilho(Number(e.target.value))}
              />
              <span className="valor_atual">{brilho}</span>
            </div>
          </div>

          <div className="bloco_saida">
            <button
              id="botao_cancelar"
              className="botao_criar_comodo"
              onClick={onCancelar}
            >
              CANCELAR
            </button>
            <button
              id="botao_criar_comodo"
              className="botao_criar_comodo"
              onClick={handleCriar}
            >
              CRIAR CÔMODO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarComodoCard;
