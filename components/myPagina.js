export default {
    
    URL2: "https://rickandmortyapi.com/api/character/?name=",
    // Species --------------
    human:"human",
    humanoide:"humanoid",
    animal:"animal",
    robot:"robot",
    alien:"alien",
    cronenberg:"cronenberg",
    disease:"disease",
    poopybutthole:"poopybutthole",
    mythological:"mythological",
    unknown:"unknown",
    // ----------------------
    // Genders --------------
    male:"male",
    female:"female",
    genderless:"genderless",
    unknown:"unknown",
    // -----------------------
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
            switch (specie.value) {
                case 'nothing':
                    location.reload();
                    break;
                case 'human':
                    let specieHuman = `https://rickandmortyapi.com/api/character/?species=${this.human}`;
                    this.funcionFragment(specieHuman);
                    break;
                case 'humanoide':
                    let specieHumanoide = `https://rickandmortyapi.com/api/character/?species=${this.humanoide}`;
                    this.funcionFragment(specieHumanoide);
                    break;
                case 'animal':
                    let specieAnimal = `https://rickandmortyapi.com/api/character/?species=${this.animal}`;
                    this.funcionFragment(specieAnimal);
                    break;
                case 'robot':
                    let specieRobot = `https://rickandmortyapi.com/api/character/?species=${this.robot}`;
                    this.funcionFragment(specieRobot);
                    break;
                case 'alien':
                    let specieAlien = `https://rickandmortyapi.com/api/character/?species=${this.alien}`;
                    this.funcionFragment(specieAlien);
                    break;
                case 'cronenberg':
                    let specieCronenberg = `https://rickandmortyapi.com/api/character/?species=${this.cronenberg}`;
                    this.funcionFragment(specieCronenberg);
                    break;
                case 'disease':
                    let specieDisease = `https://rickandmortyapi.com/api/character/?species=${this.disease}`;
                    this.funcionFragment(specieDisease);
                    break;
                case 'poopybutthole':
                    let speciePoopybutthole = `https://rickandmortyapi.com/api/character/?species=${this.poopybutthole}`;
                    this.funcionFragment(speciePoopybutthole);
                    break;
                case 'mythological':
                    let specieMythological = `https://rickandmortyapi.com/api/character/?species=${this.mythological}`;
                    this.funcionFragment(specieMythological);
                    break;
                case 'unknown':
                    let specieUnknown = `https://rickandmortyapi.com/api/character/?species=${this.unknown}`;
                    this.funcionFragment(specieUnknown);
                    break;
                
                default:
                    console.log("Error");
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

            } else if(gender.value == "genderless"){

                let genderGenderless = `https://rickandmortyapi.com/api/character/?gender=${this.genderless}`;
                this.funcionFragment(genderGenderless);

            } else{

                let genderUnknown = `https://rickandmortyapi.com/api/character/?gender=${this.unknown}`;
                this.funcionFragment(genderUnknown);
            }
        })
    }
    
}