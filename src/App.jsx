import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ---------------------------------------------------------
// 1. O SEU COMPONENTE: BARRA SUPERIOR (Top Bar)
// ---------------------------------------------------------
function TopBar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const mudarTema = () => {
    const novoModoEscuro = !isDarkMode;
    setIsDarkMode(novoModoEscuro);

    if (novoModoEscuro) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-center p-3 border-bottom mb-4">
      <button className="btn btn-outline-secondary me-3" onClick={mudarTema}>
        <i className="fa-solid fa-circle-half-stroke"></i>{" "}
        {isDarkMode ? "Tema Claro" : "Tema Escuro"}
      </button>

      <Link to="/profile" className="btn btn-dark">
        <i className="fa-solid fa-user"></i> Profile
      </Link>
    </div>
  );
}

// ---------------------------------------------------------
// 2. O SEU COMPONENTE: BARRA LATERAL FIXA (Sidebar)
// ---------------------------------------------------------
function Sidebar({ hasRooms }) {
  return (
    <div
      className="d-flex flex-column align-items-center bg-light position-fixed top-0 start-0 bottom-0 border-end pt-3"
      style={{ width: "90px", zIndex: 1000 }}
    >
      {/* Logotipo topo */}
      <a className="text-dark text-decoration-none mb-5 mt-2">
        <i class="fa-solid fa-house-signal fa-2x"> </i>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          {" "}
          SMART HOME
        </span>
      </a>

      {/* Navegação */}
      <ul className="nav nav-pills flex-column mb-auto w-100 text-center">
        <li className="nav-item mb-4">
          <Link
            to="/"
            className="nav-link link-dark p-0 d-flex flex-column align-items-center"
          >
            <i className="fa-solid fa-house fs-4 mb-1"></i>
            <span style={{ fontSize: "10px", fontWeight: "bold" }}>HOME</span>
          </Link>
        </li>

        {hasRooms && (
          <li className="nav-item">
            <Link
              to="/rooms"
              className="nav-link link-dark p-0 d-flex flex-column align-items-center"
            >
              <i className="fa-solid fa-cubes fs-4 mb-1"></i>
              <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                ROOMS
              </span>
            </Link>
          </li>
        )}
      </ul>

      {/* Configurações rodapé */}
      <div className="mt-auto mb-4">
        <Link to="/config" className="link-dark text-decoration-none">
          <i className="fa-solid fa-gear fs-4"></i>
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3. COMPONENTES DO SEU COLEGA (Simulações provisórias)
// ---------------------------------------------------------
function TelaHomeColega({ setHasRooms }) {
  return (
    <div className="p-4 border border-dashed rounded bg-light">
      <h2>Área do seu colega (Home)</h2>
      <p>
        Quando ele clicar no botão de criar cómodo, ele vai chamar a função que
        ativa o botão na sua Navbar.
      </p>
      <button className="btn btn-primary" onClick={() => setHasRooms(true)}>
        + CRIAR CÓMODO (Simulação)
      </button>
    </div>
  );
}

function TelaRoomsColega() {
  return (
    <div className="p-4 border border-dashed rounded bg-light">
      <h2>Área do seu colega (Rooms)</h2>
      <p>Aqui ele vai listar os detalhes do "Living Room", etc.</p>
    </div>
  );
}

// ---------------------------------------------------------
// 4. COMPONENTE DE PERFIL
// ---------------------------------------------------------
function TelaPerfil() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [perfil, setPerfil] = React.useState({
    nome: "João Vitor",
    bio: "Estudante de Análise e Desenvolvimento de Sistemas - UniFECAF",
    email: "joao.vitor@email.com",
    telefone: "(11) 98765-4321",
    experiencia: "Suporte Técnico (Surf Telecom) e BPO Imobiliário (Interfile)",
    habilidades: "Python, FastAPI, PostgreSQL e React",
  });

  const handleMudanca = (evento) => {
    const campo = evento.target.name;
    const valor = evento.target.value;
    setPerfil({ ...perfil, [campo]: valor });
  };

  const alternarEdicao = () => {
    setIsEditing(!isEditing);
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
            onClick={alternarEdicao}
          >
            {isEditing ? "Salvar Perfil" : "Editar Perfil"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Configuração

// Adicione esta função junto das outras telas (como a TelaPerfil)
function TelaConfiguracao() {
  // Estado para guardar as opções do sistema
  const [config, setConfig] = React.useState({
    nomeCasa: "Minha Smart Home",
    notificacoes: true,
    idioma: "pt-BR",
  });

  // Função para lidar com as mudanças nos campos de texto, select e checkbox
  const handleMudanca = (evento) => {
    const { name, value, type, checked } = evento.target;
    setConfig({
      ...config,
      // Se for uma checkbox (interruptor), usa o 'checked', senão usa o texto normal
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const guardarConfiguracoes = () => {
    alert("Definições guardadas com sucesso!");
    // Futuramente, o seu colega de backend pode receber estes dados aqui
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-sm" style={{ width: "40rem" }}>
        <div className="card-header bg-white pb-0 border-bottom-0 mt-2">
          <h4 className="fw-bold">
            <i className="fa-solid fa-gear me-2"></i> CONFIGURAÇÕES{" "}
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
            <button className="btn btn-primary" onClick={guardarConfiguracoes}>
              Guardar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 5. COMPONENTE PRINCIPAL (App)
// ---------------------------------------------------------
export default function App() {
  const [hasRooms, setHasRooms] = useState(false);

  return (
    <BrowserRouter>
      {/* Sidebar na esquerda */}
      <Sidebar hasRooms={hasRooms} />

      {/* Margem esquerda de 90px para o palco não ficar atrás da Sidebar */}
      <div style={{ marginLeft: "90px" }}>
        <TopBar />

        <div className="container mt-4">
          {/* Apenas um bloco de rotas sem duplicações */}
          <Routes>
            <Route
              path="/"
              element={<TelaHomeColega setHasRooms={setHasRooms} />}
            />
            <Route path="/rooms" element={<TelaRoomsColega />} />
            <Route path="/profile" element={<TelaPerfil />} />
          </Routes>
        </div>
      </div>

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={<TelaHomeColega setHasRooms={setHasRooms} />}
          />
          <Route path="/rooms" element={<TelaRoomsColega />} />
          <Route path="/profile" element={<TelaPerfil />} />

          {/* Adicione esta linha para o React saber o que mostrar quando clicar na engrenagem */}
          <Route path="/config" element={<TelaConfiguracao />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
