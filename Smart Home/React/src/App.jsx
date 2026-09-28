import { useState } from "react";
import ParteSuperior from "./elements/ParteSuperior.jsx";
import PainelCriacao from "./elements/PainelCriacao.jsx";
import CriarComodoCard from "./elements/CriarComodoCard.jsx";
import CardComodo from "./elements/CardComodo.jsx";
import "./App.css";

function App() {
  const [comodos, setComodos] = useState([]);
  const [isCriando, setIsCriando] = useState(false);

  const handleAdicionarComodo = (novoComodo) => {
    setComodos((prev) => [...prev, novoComodo]);
    setIsCriando(false);
  };

  const handleScanRede = () => {
    alert("Iniciando escaneamento de rede...");
  };

  return (
    <div className="tela_principal">
      <ParteSuperior />

      <PainelCriacao
        onAbrirCriacao={() => setIsCriando(true)}
        onScanRede={handleScanRede}
      />

      <div className="conteudo_principal" id="area_criacao">
        {isCriando && (
          <CriarComodoCard
            onCriarComodo={handleAdicionarComodo}
            onCancelar={() => setIsCriando(false)}
          />
        )}

        {comodos.map((comodo) => (
          <CardComodo key={comodo.id} comodo={comodo} />
        ))}
      </div>
    </div>
  );
}

export default App;
