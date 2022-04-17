export const APP_DATE = '&app-date';

export const setDate = date => localStorage.setItem(APP_DATE, date);
export const getDate = () => localStorage.getItem(APP_DATE);

export const dateNow = () => {
    let date = new Date(),
        dia = date.getDate().toString().padStart(2, '0'),
        mes = (date.getMonth() + 1).toString().padStart(2, '0'),
        ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}