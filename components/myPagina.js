export default {
    
    URL2: "https://rickandmortyapi.com/api/character/?name=",
    human:"human",
    alien:"alien",
    male:"male",
    female:"female",
    unknown:"unknown",
    page: 1,

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
            this.functionBuscardor();
            this.mostrarBotones();
        })

    },
    
    // Aca se esta ejecuentando el URL 2 
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

            } else if(specie.value == "human"){

                let specieHuman = `https://rickandmortyapi.com/api/character/?species=${this.human}`;
                this.funcionFragment(specieHuman);

            } else if(specie.value == "alien"){

                let specieAlien = `https://rickandmortyapi.com/api/character/?species=${this.alien}`;
                this.funcionFragment(specieAlien);

            }
        })
    },

    funcionFiltrarGender(){
        let gender = document.querySelector("#gender");

        gender.addEventListener("change", (e) => {
            if(gender.value == "nothing"){

                location.reload();

            } else if(gender.value == "male"){

                let genderMale = `https://rickandmortyapi.com/api/character/?gender=${this.male}`;
                this.funcionFragment(genderMale);

            } else if(gender.value == "female"){

                let genderFemale = `https://rickandmortyapi.com/api/character/?gender=${this.female}`;
                this.funcionFragment(genderFemale);

            } else if(gender.value == "unknown"){

                let genderUnknown = `https://rickandmortyapi.com/api/character/?gender=${this.unknown}`;
                this.funcionFragment(genderUnknown);

            }
        })
    }
    
}