const cuponDataURL = "http://localhost:58202/api/CuponData/PostDePrueba";

let mensajeIcono = document.getElementById("main-photo").getElementsByTagName("i")[0];
let mensajeCupon = document.getElementById("main-message");
let textoPasajero = document.getElementById("texto-pasajero");
let textoPropiedad = document.getElementById("texto-propiedad");
let textoFecha = document.getElementById("texto-fecha");
let textoClave = document.getElementById("texto-clave");
let mainPhoto = document.getElementById("main-photo");

let detailsBody = document.getElementById("details");

//TODO: Funcion que maneja cuando se recibe un cupon valido:
const validCupon = (cuponData, numCupon) => {
    detailsBody.style.visibility = 'visible';

    mainPhoto.innerHTML = '<i class="fa-solid fa-circle-check valid-icon"></i>';

    //mensajeIcono.className = "fa-solid fa-circle-check valid-icon";
    mensajeCupon.innerHTML = "El cupón <strong>" + numCupon + "</strong> es valido";

    textoPasajero.innerHTML = cuponData.Name + " " + cuponData.LastName;
    textoPropiedad.innerHTML = cuponData.VendorSiteCode;
    textoFecha.innerHTML = cuponData.StartDate.slice(0,10) + " al " + cuponData.EndDate.slice(0,10);
    textoClave.innerHTML = cuponData.ConfirmationKey;

    
};
//TODO: Funcion que maneja cuando se recibe un cupon fuera de fechas:
const invalidCupon = () => {
    mainPhoto.innerHTML = '<i class="fa-solid fa-circle-xmark invalid-icon"></i>';
    //mensajeIcono.className = "fa-solid fa-circle-xmark invalid-icon";
    mensajeCupon.innerHTML = "Cupón <strong>no valido</strong>";

    detailsBody.style.visibility = "hidden";
};
//TODO: Funcion que maneja cuando se recibe un cupon no valido:
const warningCupon = (cuponData) => {
    detailsBody.style.visibility = 'visible';

    mainPhoto.innerHTML = '<i class="fa-solid fa-triangle-exclamation warning-icon"></i>';
    //mensajeIcono.className = "fa-solid fa-triangle-exclamation warning-icon";
    mensajeCupon.innerHTML = "Cupón <strong>fuera de vigencia</strong>";

    textoPasajero.innerHTML = cuponData.Name + " " + cuponData.LastName;
    textoPropiedad.innerHTML = cuponData.VendorSiteCode;
    textoFecha.innerHTML = cuponData.StartDate.slice(0,10) + " al " + cuponData.EndDate.slice(0,10);
    textoClave.innerHTML = cuponData.ConfirmationKey;
};

const fetchCuponData = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const numCupon = urlParams.get('numerocupon');
    const numReserva = urlParams.get('numeroreserva');

    const requestParams = {
        NumeroCupon: numCupon,
        NumeroReserva: numReserva
    }

    axios.post(cuponDataURL, JSON.stringify(requestParams), { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
    .then(response => {
        const cuponData = response.data.CuponData;
        const responseStatus = response.data.responseStatus;

        if(responseStatus == 0){
            validCupon(cuponData, numCupon);
        }else if(responseStatus == 1){
            invalidCupon();
        }else{
            warningCupon(cuponData);
        }

        console.log(cuponData);
        console.log(responseStatus);
    });
};

detailsBody.style.visibility = 'hidden';

//window.onload(() => fetchCuponData());
//fetchCuponData();