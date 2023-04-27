import myPagina from "./components/myPagina.js";

// URL que carga cada una de las cartas 
let URL1 = "https://rickandmortyapi.com/api/character"

//Ejecución de las cartas cuando carga la página 
myPagina.funcionFragment(URL1);

// Se ejecuta la funcion de buscar en el main para que el navegador no se cuelgue
myPagina.funcionBuscardor();