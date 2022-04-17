export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const ID_FUNCIONARIO = '&id-funcionario';
export const USER_TYPE = '&user-type';
export const ID_SETOR = '&id-setor';

export const login = token => localStorage.setItem(TOKEN_KEY, token);
export const logout = () => localStorage.clear();

export const setIdUsuario = id_usuario => localStorage.setItem(ID_USUARIO, id_usuario);
export const getIdUsuario = () => localStorage.getItem(ID_USUARIO);

export const setNomeUsuario = nome => localStorage.setItem(NOME_USUARIO, nome);
export const getNomeUsuario = () => localStorage.getItem(NOME_USUARIO);

export const setIdFuncionario = id_funcionario => localStorage.setItem(ID_FUNCIONARIO, id_funcionario);
export const getIdFuncionario = () => localStorage.getItem(ID_FUNCIONARIO);

export const setTipoUsuario = tipo => localStorage.setItem(USER_TYPE, tipo);
export const getTipoUsuario = () => localStorage.getItem(USER_TYPE);

export const setIdSetor = id_setor => localStorage.setItem(ID_SETOR, id_setor);
export const getIdSetor = () => localStorage.getItem(ID_SETOR);

export const getToken = () => localStorage.getItem(TOKEN_KEY);