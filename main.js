const Buscador = document.querySelector('#Buscador');

const URL1 = "https://rickandmortyapi.com/api/character";
const URL2 = "https://rickandmortyapi.com/api/character/?name=";

const getApi = async(URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data.results; 
};

async function funcionMostrar() {
    let datos = await getApi(URL1);
        let plantilla = `${datos.map((val, id) => `
                                                    <div class="card-character">
                                                        <img src="${val.image}" alt="">
                                                        <div class="description-card">
                                                            <h2>${val.name}</h2>
                                                            <h3>Specie: ${val.species}</h3>
                                                            <p>Gender: ${val.gender}</p>
                                                        </div>
                                                    </div>
                                                  `).join("")};
                        `
            document.querySelector("#containerCards").innerHTML = plantilla;
}

async function buscar() {
    let resultados = document.querySelector("#Buscador").value;
    let datos = await getApi(URL2 + resultados);
        let plantilla = `${datos.map((val, id) => `
                                                    <div class="card-character">
                                                        <img src="${val.image}" alt="">
                                                        <div class="description-card">
                                                        <h2>${val.name}</h2>
                                                        <h3>Specie: ${val.species}</h3>
                                                        <p>Gender: ${val.gender}</p>
                                                        </div>
                                                    </div>
                                                  `).join("")}`;
            document.querySelector("#containerCards").innerHTML = plantilla;
}

funcionMostrar();
Buscador.addEventListener('keyup', async () => {
    await buscar();
});