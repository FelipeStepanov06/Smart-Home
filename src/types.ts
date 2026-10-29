// =============================================
// Tipos de domínio do Smart-Home
// =============================================

/** Representa um cômodo criado pelo usuário */
export interface Comodo {
  id: number;
  nome: string;
  classeIcone: string;
  temperatura: number;
  brilho: number;
  associarDispositivos: boolean;
}

/** Representa o perfil do usuário */
export interface Perfil {
  nome: string;
  bio: string;
  email: string;
  telefone: string;
  experiencia: string;
  habilidades: string;
}

/** Configurações gerais da Smart Home */
export interface Configuracao {
  nomeCasa: string;
  notificacoes: boolean;
  idioma: string;
}

/** Ícone disponível para seleção ao criar um cômodo */
export interface Icone {
  id: string;
  classeIcone: string;
}
