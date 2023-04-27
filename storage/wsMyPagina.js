import api from "../components/api.js";
export let wsMyApi = {

    async funcionMostrar(URL) {
        // Espera a que la api haga la consulta y ejecuta la plantilla 
        let datos = await api.getApi(URL);
            let plantilla = `${datos.map((val, id) => `
                                                        <div class="card-character">
                                                            <img src="${val.image}" alt="">
                                                            <div class="description-card">
                                                                <h2>${val.name}</h2>
                                                                <h3>Specie: ${val.species}</h3>
                                                                <p>Gender: ${val.gender}</p>
                                                            </div>
                                                        </div>
                                                      `).join("")}
                            `
               return plantilla;
    },

    // Le paso un condicional para que cada vez que cambie de pagina, se actualice y se muestre en el navegador
    botones(page) {
        let plantilla =`
                        <button id="previous" disabled>Previous</button>
                            <h2>Page ${page}</h2>
                        <button id="next">Next</button>
                       `
            return plantilla
    },

}

self.addEventListener("message", async(e) =>{
    const mensaje = await wsMyApi[`${e.data.module}`](e.data.data)
    postMessage(mensaje)
})