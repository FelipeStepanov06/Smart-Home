import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ParteSuperior from "./elements/ParteSuperior.jsx";
import PainelCriacao from "./elements/PainelCriacao.jsx";
import CriarComodoCard from "./elements/CriarComodoCard.jsx";
import CardComodo from "./elements/CardComodo.jsx";
import "./App.css";

function TopBar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const mudarTema = () => {
    const novoModoEscuro = !isDarkMode;
    setIsDarkMode(novoModoEscuro);
    document.documentElement.setAttribute(
      "data-bs-theme",
      novoModoEscuro ? "dark" : "light",
    );
  };

  return (
    <div className="d-flex justify-content-end align-items-center p-3 border-bottom mb-4">
      <button
        className="btn btn-outline-secondary me-3 text-body"
        onClick={mudarTema}
      >
        <i className="fa-solid fa-circle-half-stroke"></i>
        {isDarkMode ? "Tema Claro" : "Tema Escuro"}
      </button>
      <Link to="/profile" className="btn btn-outline-secondary text-body">
        <i className="fa-solid fa-user"></i> Perfil
      </Link>
    </div>
  );
}

function Sidebar({ hasRooms }) {
  return (
    <div
      className="d-flex flex-column align-items-center position-fixed top-0 start-0 bottom-0 border-end pt-3"
      style={{ width: "90px", zIndex: 1000 }}
    >
      <a className="text-dark text-decoration-none mb-5 mt-2 d-flex flex-column align-items-center">
        <i className="fa-solid fa-house-signal fa-2x text-body"> </i>
        <span className="textologo_sidebar text-body">SMART HOME</span>
      </a>

      <ul className="nav nav-pills flex-column mb-auto w-100 text-center">
        <li className="nav-item mb-4">
          <Link
            to="/"
            className="nav-link link-dark p-0 d-flex flex-column align-items-center"
          >
            <i className="fa-solid fa-house fs-4 mb-1 text-body"></i>
            <span className="texto_sidebar text-body">HOME</span>
          </Link>
        </li>
        {hasRooms && (
          <li className="nav-item">
            <Link
              to="/rooms"
              className="nav-link link-dark p-0 d-flex flex-column align-items-center"
            >
              <i className="fa-solid fa-cubes fs-4 mb-1 text-body"></i>
              <span className="texto_sidebar text-body">ROOMS</span>
            </Link>
          </li>
        )}
      </ul>

      <div className="mt-auto mb-4">
        <Link to="/config" className="link-dark text-decoration-none">
          <i className="fa-solid fa-gear fs-4 text-body"></i>
        </Link>
      </div>
    </div>
  );
}

function TelaHomeReal({ setHasRooms, comodos, setComodos }) {
  const [isCriando, setIsCriando] = useState(false);

  const handleAdicionarComodo = (novoComodo) => {
    const novaListaDeComodos = [...comodos, novoComodo];
    setComodos(novaListaDeComodos);
    setIsCriando(false);

    if (novaListaDeComodos.length > 0) {
      setHasRooms(true);
    }
  };

  const handleScanRede = () => alert("Iniciando escaneamento de rede...");

  return (
    <div className="tela_principal">
      <ParteSuperior />

      {/* O painel oculta-se quando o cartão de criação é aberto */}
      {!isCriando && (
        <PainelCriacao
          onAbrirCriacao={() => setIsCriando(true)}
          onScanRede={handleScanRede}
        />
      )}

      <div className="conteudo_principal" id="area_criacao">
        {isCriando && (
          <CriarComodoCard
            onCriarComodo={handleAdicionarComodo}
            onCancelar={() => setIsCriando(false)}
          />
        )}
      </div>
    </div>
  );
}

function TelaRoomsReal({ comodos }) {
  return (
    <div className="p-4 text-body">
      <h3 className="mb-4 fw-bold text-center">Meus Cómodos</h3>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {comodos.length === 0 ? (
          <p className="text-muted">Nenhum cómodo criado ainda.</p>
        ) : (
          comodos.map((comodo, index) => (
            <CardComodo key={index} comodo={comodo} />
          ))
        )}
      </div>
    </div>
  );
}

function TelaPerfil() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [perfil, setPerfil] = React.useState({
    nome: "João Vitor",
    bio: "Estudante de Análise e Desenvolvimento de Sistemas - UniFECAF",
    email: "joao.vitor@email.com",
    telefone: "(11) 98765-4321",
    experiencia: "Suporte Técnico e BPO Imobiliário",
    habilidades: "Python, FastAPI, PostgreSQL e React",
  });

  const handleMudanca = (evento) => {
    const campo = evento.target.name;
    const valor = evento.target.value;
    setPerfil({ ...perfil, [campo]: valor });
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-sm" style={{ width: "24rem" }}>
        <div className="card-body text-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
            alt="Foto de Perfil"
          />
          {isEditing ? (
            <input
              type="text"
              name="nome"
              className="form-control mb-2 text-center fw-bold"
              value={perfil.nome}
              onChange={handleMudanca}
            />
          ) : (
            <h4 className="card-title fw-bold">{perfil.nome}</h4>
          )}
          {isEditing ? (
            <input
              type="text"
              name="bio"
              className="form-control mb-4 text-center"
              value={perfil.bio}
              onChange={handleMudanca}
            />
          ) : (
            <p className="text-muted mb-4">{perfil.bio}</p>
          )}

          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item d-flex align-items-center">
              <i className="fa-solid fa-envelope text-secondary me-3"></i>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  value={perfil.email}
                  onChange={handleMudanca}
                />
              ) : (
                <span>{perfil.email}</span>
              )}
            </li>
            <li className="list-group-item d-flex align-items-center">
              <i className="fa-solid fa-phone text-secondary me-3"></i>
              {isEditing ? (
                <input
                  type="text"
                  name="telefone"
                  className="form-control form-control-sm"
                  value={perfil.telefone}
                  onChange={handleMudanca}
                />
              ) : (
                <span>{perfil.telefone}</span>
              )}
            </li>
            <li className="list-group-item d-flex align-items-center">
              <i className="fa-solid fa-briefcase text-secondary me-3"></i>
              {isEditing ? (
                <input
                  type="text"
                  name="experiencia"
                  className="form-control form-control-sm"
                  value={perfil.experiencia}
                  onChange={handleMudanca}
                />
              ) : (
                <span>{perfil.experiencia}</span>
              )}
            </li>
            <li className="list-group-item d-flex align-items-center">
              <i className="fa-solid fa-code text-secondary me-3"></i>
              {isEditing ? (
                <input
                  type="text"
                  name="habilidades"
                  className="form-control form-control-sm"
                  value={perfil.habilidades}
                  onChange={handleMudanca}
                />
              ) : (
                <span>{perfil.habilidades}</span>
              )}
            </li>
          </ul>

          <button
            className={`btn w-100 mt-4 ${isEditing ? "btn-success" : "btn-outline-primary"}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Salvar Perfil" : "Editar Perfil"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TelaConfiguracao() {
  const [config, setConfig] = React.useState({
    nomeCasa: "Minha Smart Home",
    notificacoes: true,
    idioma: "pt-BR",
  });

  const handleMudanca = (evento) => {
    const { name, value, type, checked } = evento.target;
    setConfig({ ...config, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-sm" style={{ width: "40rem" }}>
        <div className="card-header bg-transparent pb-0 border-bottom-0 mt-2">
          <h4 className="fw-bold">
            <i className="fa-solid fa-gear me-2 text-body"></i> CONFIGURAÇÕES
          </h4>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <label
              className="form-label text-muted fw-bold"
              style={{ fontSize: "14px" }}
            >
              NOME DA CASA
            </label>
            <input
              type="text"
              className="form-control"
              name="nomeCasa"
              value={config.nomeCasa}
              onChange={handleMudanca}
            />
          </div>
          <div className="mb-4">
            <label
              className="form-label text-muted fw-bold"
              style={{ fontSize: "14px" }}
            >
              IDIOMA DA INTERFACE
            </label>
            <select
              className="form-select"
              name="idioma"
              value={config.idioma}
              onChange={handleMudanca}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="pt-PT">Português (Portugal)</option>
              <option value="en-US">Inglês</option>
            </select>
          </div>
          <div className="mb-4 form-check form-switch fs-5">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              name="notificacoes"
              checked={config.notificacoes}
              onChange={handleMudanca}
              style={{ cursor: "pointer" }}
            />
            <label
              className="form-check-label ms-2"
              style={{ fontSize: "16px" }}
            >
              Ativar notificações de novos dispositivos
            </label>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={() => alert("Suas alterações foram salvas!")}
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [hasRooms, setHasRooms] = useState(false);
  const [comodos, setComodos] = useState([]);

  return (
    <BrowserRouter>
      <Sidebar hasRooms={hasRooms} />
      <div style={{ marginLeft: "90px" }}>
        <TopBar />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <TelaHomeReal
                  setHasRooms={setHasRooms}
                  comodos={comodos}
                  setComodos={setComodos}
                />
              }
            />
            <Route
              path="/rooms"
              element={<TelaRoomsReal comodos={comodos} />}
            />
            <Route path="/profile" element={<TelaPerfil />} />
            <Route path="/config" element={<TelaConfiguracao />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
