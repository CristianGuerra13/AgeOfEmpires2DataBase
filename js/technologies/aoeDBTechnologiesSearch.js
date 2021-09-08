
// Funcion para el buscador de tecnologia
let searchTechnologyInput = document.getElementById('aoedb-search-technologies-input');
document.getElementById('aoedb-search-technologies-form').onsubmit = () => {
    let technology = searchTechnologyInput.value;
    window.location.replace(`technologiesSearch.html?search=${encodeURIComponent(technology.trim())}`);
    return false;
}


//Funcion para llamar al api con las tecnologias
const getTechnology = async () => {
    let  searchUrl= window.location.href;
    let searchedTechnology = searchUrl.substring(searchUrl.lastIndexOf('=')+1);
    const resp = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/technology/${searchedTechnology}`);
    const technology = await resp.json();
    if (!technology) {
        throw new error('No se ha podido establecer conexion');
    }
    else {
        return technology;
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


const printTechnology = async () => {
    //Llama al api con la funcion getTechnology
    let aoeTechnology = await getTechnology();
    //guarda en una variable el cuerpo de la lista de informacion de la civilizacion
    let aoedbTechnologyBody = document.getElementsByClassName('aoedb-search-box-body')[0];
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;
    //guarda en una variable el campo del header
    let aoedbTechnologyHeader = document.getElementsByClassName('aoedb-search-box-header')[0];
     //Llama a la funcion para traer develops in

     let develops_inName = "";
     let develops_in = await getDevelopsIn(aoeTechnology.develops_in);

     if (develops_in[0] === undefined) {
         develops_inName = develops_in.name;
     } else {
         develops_inName = develops_in[0].name;
     }
   
    if (aoeTechnology.message) {
        aoedbTechnologyHeader.innerHTML = `<h2>${aoeTechnology.message}</h2>`;
    }
    else {

        //Agrega al header el nombre de la civilizacion
        aoedbTechnologyHeader.innerHTML = `<h2>${aoeTechnology.name}</h2>`;
        //Se le añaden los tags e informacion
        aoedbTechnologyBody.innerHTML = `
        <div>
        <p><span>Expansion: </span>${aoeTechnology.expansion}</p>
        <p><span>Description: </span>${aoeTechnology.description}</p>
        <p><span>Age: </span>${aoeTechnology.age}</p>
        <p><span>Build Time: </span>${aoeTechnology.build_time}</p>
        </div>
        <div>
        <p><span>Technology Cost:</span></p>
        <ul class="aoedb-box-cost"></ul>
        <p><span>Aplies To:</span></p>
        <ul class="aoedb-box-apliesto"></ul>
        <p class="aoedb-box-tech"><span>Develops In: </span> ${develops_inName}</p>
        </div>
        `;
    }
        //Se crea una variable con el campo para costo
        let aoedbCost = document.getElementsByClassName('aoedb-box-cost')[aoedbNumber];
        //Se crea una variable con el campo para aplica a actual
        let aoedbApliesTo = document.getElementsByClassName('aoedb-box-apliesto')[aoedbNumber];
        //Se aumenta en 1 la variable
        aoedbNumber++;

        //Se crea variable con cost el cual se transforma a un array para el ciclo for of 
        let technologyCost = Object.entries(aoeTechnology.cost);

        //Ciclo for of que añade la lista de costo de la estructura
        for (let cost of technologyCost) {
            let costList = document.createElement('li');
            let costListText = document.createTextNode(`${cost[0]}: ${cost[1]}`);
            costList.appendChild(costListText);
            aoedbCost.appendChild(costList);
        }

        //Condicionales para añadir applies to
        if (!aoeTechnology.applies_to) {
            //Añade a la lista de aplies to
            let apliesToList = document.createElement('li');
            let apliesToListText = document.createTextNode(`Player's Civilization`);
            apliesToList.appendChild(apliesToListText);
            aoedbApliesTo.appendChild(apliesToList);
        } else {
            for (apliesTo of aoeTechnology.applies_to) {

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

printTechnology().then();


