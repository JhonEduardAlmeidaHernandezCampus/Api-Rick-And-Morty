export default {
    
    URL1: "https://rickandmortyapi.com/api/character",
    URL2: "https://rickandmortyapi.com/api/character/?name=",

    funcionFragment(){
    
        const ws = new Worker("storage/wsMyPagina.js", {type: "module"});

        ws.postMessage({module: "funcionMostrar", data: this.URL1})

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html")

            document.querySelector("#containerCards").append(...doc.body.children)

            ws.terminate();
        })

    },
    
    functionBuscardor(){
        let Buscador = document.querySelector("#Buscador");
        
        Buscador.addEventListener('input', async (e) => {
            let valorBuscar = e.target.value;
            
            const ws = new Worker("storage/wsMyPagina.js", {type: "module"})

            ws.postMessage({module: "buscar", data: {name: valorBuscar, api: this.URL2}})

            ws.addEventListener("message", (e) => {
                let doc = new DOMParser().parseFromString(e.data, "text/html");

                let containerCards =  document.querySelector("#containerCards")
                containerCards.innerHTML = null;

                containerCards.append(...doc.body.children)

                ws.terminate();
            })
        })
    }
    
}