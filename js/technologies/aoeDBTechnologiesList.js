/*********************************Codigo para la seccion de civilizacion***************************************/
// Funcion para el buscador de tecnologia
let searchTechnologyInput = document.getElementById('aoedb-search-technologies-input');
document.getElementById('aoedb-search-technologies-form').onsubmit = () => {
    let technology = searchTechnologyInput.value;
    window.location.replace(`technologiesSearch.html?search=${encodeURIComponent(technology.trim())}`);
    return false;
}

//Funcion para llamar al api con las tecnologia
const getTechnologies = async () => {
    const resp = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/technologies');
    const technologies = await resp.json();
    if (!technologies) {
        throw new error('No se ha podido establecer conexion');
    }
    else {
        return technologies.technologies;
    }
}


//Funcion para llamar al nombre
const getName = async (getNameUrl) => {
    if (getNameUrl) {
        const resp = await fetch(getNameUrl);
        const name = await resp.json();
        return name.name;
    }
    else {
        return "Not Found";
    }
}

//Funcion para llamar develops in
const getDevelopsIn = async (getDevelopsInUrl) => {
    if (getDevelopsInUrl) {
        const resp = await fetch(getDevelopsInUrl);
        const developsIn = await resp.json();
        return developsIn;
    }
    else {
        return "Not Found";
    }
}


const printTechnologies = async () => {
    //Llama al api con la funcion getTechnologies
    let aoeTechnologies = await getTechnologies();
    //guarda en una variable el cuerpo de las listas
    let aoedbBody = document.getElementById('aoedb-body');
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;

    //ciclo for of donde se van añadiendo los tags de informacion
    for (let technologies of aoeTechnologies) {
        //Llama a la funcion para traer develops in
        let develops_inName = "";
        let develops_in = await getDevelopsIn(technologies.develops_in);

        if (develops_in[0] === undefined) {
            develops_inName = develops_in.name;
        } else {
            develops_inName = develops_in[0].name;
        }


        //Se crea el div contenedor y se le añaden los tags e informacion
        let technologyBox = document.createElement('div');
        technologyBox.className = 'aoedb-box';
        aoedbBody.appendChild(technologyBox);
        technologyBox.innerHTML = `
        <div class="aoedb-box-header">
        <h2>${technologies.name}</h2>
        </div><div class="aoedb-box-body">
        <p><span>Expansion: </span>${technologies.expansion}</p>
        <p><span>Description: </span>${technologies.description}</p>
        <p><span>Build in: </span>${technologies.build_time}</p>
        <p><span>Technology Cost:</span></p>
        <ul class="aoedb-box-cost"></ul>
        <p><span>Aplies To:</span></p>
        <ul class="aoedb-box-apliesto"></ul>
        <p class="aoedb-box-tech"><span>Develops In: </span> ${develops_inName}</p></div>`;

        //Se añade funcion para ir a la pagina seleccionada 
        technologyBox.onclick = () => {
            window.location.replace(`technologiesSearch.html?search=${encodeURIComponent(technologies.id)}`);
        };

        //Se crea una variable con el campo para costo
        let aoedbCost = document.getElementsByClassName('aoedb-box-cost')[aoedbNumber];
        //Se crea una variable con el campo para aplica a actual
        let aoedbApliesTo = document.getElementsByClassName('aoedb-box-apliesto')[aoedbNumber];
        //Se aumenta en 1 la variable
        aoedbNumber++;

        //Se crea variable con cost el cual se transforma a un array para el ciclo for of 
        let technologyCost = Object.entries(technologies.cost);

        //Ciclo for of que añade la lista de costo de la estructura
        for (let cost of technologyCost) {
            let costList = document.createElement('li');
            let costListText = document.createTextNode(`${cost[0]}: ${cost[1]}`);
            costList.appendChild(costListText);
            aoedbCost.appendChild(costList);
        }

        //Condicionales para añadir applies to
        if (!technologies.applies_to) {
            //Añade a la lista de aplies to
            let apliesToList = document.createElement('li');
            let apliesToListText = document.createTextNode(`Player's Civilization`);
            apliesToList.appendChild(apliesToListText);
            aoedbApliesTo.appendChild(apliesToList);
        } else {
            for (apliesTo of technologies.applies_to) {

                if (apliesTo.includes("https")) {
                    let apliesToUrl = apliesTo;
                    let apliesToName = await getName(apliesToUrl);
                    //Añade a la lista de aplies to
                    let apliesToList = document.createElement('li');
                    let apliesToListText = document.createTextNode(`${apliesToName}`);
                    apliesToList.appendChild(apliesToListText);
                    aoedbApliesTo.appendChild(apliesToList);

                }
                else {
                    //Añade a la lista de aplies to
                    let apliesToList = document.createElement('li');
                    let apliesToListText = document.createTextNode(`${apliesTo}`);
                    apliesToList.appendChild(apliesToListText);
                    aoedbApliesTo.appendChild(apliesToList);
                }
            }
        }

    }
}


printTechnologies().then();