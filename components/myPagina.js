export default {
        
    // Paginations -----------
    page: 1,
    // -----------------------

    funcionFragment(URL){
    
        const ws = new Worker("storage/wsMyPagina.js", {type: "module"});

        ws.postMessage({module: "funcionMostrar", data: URL})

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html")

            let containerCards = document.querySelector("#containerCards")
            containerCards.innerHTML = null;
            containerCards.append(...doc.body.children)

            ws.terminate();

            this.funcionFiltrarSpecies();
            this.funcionFiltrarGender();
            this.mostrarBotones();
        })

    },
    
    // Aca se esta ejecuentando el URL 2 
    funcionBuscardor(){
        let Buscador = document.querySelector("#Buscador");
        
        Buscador.addEventListener('input', (e) => {
            let valorBuscar = e.target.value;

            let URL2 = `https://rickandmortyapi.com/api/character/?name=${valorBuscar}`
            
            this.funcionFragment(URL2)
            
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

    // Aca se esta ejecuentando el URL 3
    funcionamientoBotones(){

        document.querySelector("#next").addEventListener("click", (e) =>{
            this.page += 1;

            let URL3 = `https://rickandmortyapi.com/api/character/?page=${this.page}`;
            window.scrollTo(0, 0)
            this.funcionFragment(URL3);
        })

        if(this.page > 1){
            document.querySelector("#previous").removeAttribute("disabled")
        }

        document.querySelector("#previous").addEventListener("click", (e) =>{
            this.page -= 1;

            let URL3 = `https://rickandmortyapi.com/api/character/?page=${this.page}`;
            window.scrollTo(0, 0)
            this.funcionFragment(URL3);
        })

    },

    funcionFiltrarSpecies(){
        let specie = document.querySelector("#specie");


        specie.addEventListener("change", (e) => {

            if(specie.value == "nothing"){

                location.reload();

            } else{
                let species = `https://rickandmortyapi.com/api/character/?species=${specie.value}`;
                this.funcionFragment(species);
            }
        })
    },

    funcionFiltrarGender(){
        let gender = document.querySelector("#gender");

        gender.addEventListener("change", (e) => {
            if(gender.value == "nothing"){

                location.reload();

            } else{
                let genderUnknown = `https://rickandmortyapi.com/api/character/?gender=${gender.value}`;
                this.funcionFragment(genderUnknown);
            }
        })
    }
    
}