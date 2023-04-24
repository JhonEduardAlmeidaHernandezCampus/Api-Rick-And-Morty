import api from "../components/api.js";
export let wsMyApi = {

    async funcionMostrar(urlApi) {
        let datos = await api.getApi(urlApi);
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

    async buscar(informacion) {
    
        let datos = await api.getApi(informacion.api + informacion.name);
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
                return plantilla
    }
    
}

self.addEventListener("message", async(e) =>{
    const mensaje = await wsMyApi[`${e.data.module}`](e.data.data)
    postMessage(mensaje)
})