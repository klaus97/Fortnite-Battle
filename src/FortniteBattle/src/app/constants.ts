export const URL_BASE = 'http://192.168.1.79:8080/FortniteBatlle-Server/api';

export const URL = {
    LOGIN: URL_BASE + '/users/login',
    SIGNUP: URL_BASE + '/users/create',
    NOTIZIE: URL_BASE + '/notizie',
    UPDATE_PROFILO: URL_BASE + '/users/update',
    TORNEO: URL_BASE + '/tornei',
    CLASSIFICA: URL_BASE + '/tornei' + '/classifica',
    STATISTICHE: URL_BASE + '/statistiche',
    ARMI: URL_BASE + '/armi'
};

export const LINGUA = 'lingua';

export const X_AUTH = 'Authorization' ;

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';
