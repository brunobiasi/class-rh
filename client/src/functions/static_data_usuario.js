export const getTipoUsuarioColor = (value) => {
    var arr = ['primary', 'secondary'];
    return arr[value - 1];
}