//---VARIABLES---
let numeroCuponDisp = document.getElementById("num-cupon-display");
let numeroReservaDisp = document.getElementById("num-reserva-display");

const urlParams = new URLSearchParams(window.location.search);
const urlToValidate = "file:///C:/Users/ljacome/OneDrive%20-%20Corporate%20Travel%20Services%20Wolrdwide%20SAPI%20de%20CV/Escritorio/PantallasQR/index.html";
const numCupon = urlParams.get('numerocupon');
const numReserva = urlParams.get('numeroreserva');

//---FUNCTIONS---
const redirectToValidation = () => {
    let params = {
        numerocupon: numCupon,
        numeroreserva: numReserva
    };
    let queryString = new URLSearchParams(params); 

    window.location.href = urlToValidate + "?" +queryString.toString();
};

//---FUNCIONALIDAD---
numeroCuponDisp.innerHTML = numCupon;
numeroReservaDisp.innerHTML = numReserva;