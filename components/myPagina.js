export default {
    
    
    URL2: "https://rickandmortyapi.com/api/character/?name=",
    page: 1,


    funcionFragment(URL){
    
        console.log(URL)
        const ws = new Worker("storage/wsMyPagina.js", {type: "module"});

        ws.postMessage({module: "funcionMostrar", data: URL})

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html")
            console.log(doc)
            let containerCards = document.querySelector("#containerCards")
            containerCards.innerHTML = null;
            containerCards.append(...doc.body.children)

            ws.terminate();

            this.mostrarBotones()
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
    },

    mostrarBotones(){
    
        const ws = new Worker("storage/wsMyPagina.js", {type: "module"});

        ws.postMessage({module:"botones", data: this.page})

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html")

            let botones = document.querySelector(".botones")
            botones.innerHTML = null;
            botones.append(...doc.body.children)

            ws.terminate();

            this.funcionamientoBotones()
            
        })

    },

    funcionamientoBotones(){

        document.querySelector("#next").addEventListener("click", (e) =>{
            this.page += 1;

            let URL3 = `https://rickandmortyapi.com/api/character/?page=${this.page}`;
            window.scrollTo(0, 0)
            console.log(URL3)
            this.funcionFragment(URL3);
        })



    }
    
}