// Funcion para el buscador de estructuras
let searchStructureInput = document.getElementById('aoedb-search-structures-input');
document.getElementById('aoedb-search-structures-form').onsubmit = () => {;
    let structure = searchStructureInput.value;
    window.location.replace(`structuresSearch.html?search=${encodeURIComponent(structure.trim())}`);
    return false;
}

//Funcion para llamar al api con las estructuras
const getStructure = async () => {
    let  searchUrl= window.location.href;
    let searchedCivilization = searchUrl.substring(searchUrl.lastIndexOf('=')+1);
    const resp = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/structure/${searchedCivilization}`);
    const structure = await resp.json();
    if (!structure) {
        throw new error('No se ha podido establecer conexion');
    }
    else {
        return structure;
    }
}

const printStructure = async () => {
    //Llama al api con la funcion getStructure
    let aoeStructure = await getStructure();
    //guarda en una variable el cuerpo de la lista de informacion de la civilizacion
    let aoedbStructureBody = document.getElementsByClassName('aoedb-search-box-body')[0];
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;
    //guarda en una variable el campo del header
    let aoedbStructureHeader = document.getElementsByClassName('aoedb-search-box-header')[0];

   
    if (aoeStructure.message) {
        aoedbStructureHeader.innerHTML = `<h2>${aoeStructure.message}</h2>`;
    }
    else {
        //Agrega al header el nombre de la estructura
        aoedbStructureHeader.innerHTML = `<h2>${aoeStructure.name}</h2>`;
        //Se le añaden los tags e informacion
        aoedbStructureBody.innerHTML = `
        <div>
        <p><span>Expansion: </span>${aoeStructure.expansion}</p>
        <p><span>Age: </span>${aoeStructure.age}</p>
        <p><span>Build Time: </span>${aoeStructure.build_time}</p>
        <p><span>Structure Cost:</span></p>
        <ul class="aoedb-box-cost"></ul>
        </div>
        <div>
        <p><span>Armor: </span>${aoeStructure.armor}</p>
        <p><span>Hit Points: </span>${aoeStructure.hit_points}</p>
        <p><span>Line Of Sight: </span>${aoeStructure.line_of_sight}</p>
        <p><span>Structure Special:</span></p>
        <ul class="aoedb-box-special"></ul>
        </div>
        `;
    }

 
        //Se crea una variable con el campo para costo y especial actual
        let aoedbCost = document.getElementsByClassName('aoedb-box-cost')[aoedbNumber];
        let aoedbBonus = document.getElementsByClassName('aoedb-box-special')[aoedbNumber];
        //Se aumenta en 1 la variable
        aoedbNumber++;
        //Se crea variable con cost el cual se transforma a un array para el ciclo for of 
        let structureCost = Object.entries(aoeStructure.cost);
        
        //Ciclo for of que añade la lista de costo de la estructura
        for (let cost of structureCost) {
            let costList = document.createElement('li');
            let costListText = document.createTextNode(`${cost[0]}: ${cost[1]}`);
            costList.appendChild(costListText);
            aoedbCost.appendChild(costList);
        }

        //Se crea variable con civilization_bonus para el ciclo for of
        let structureSpecial = aoeStructure.special;
        //condicional que detecta si la estructura tiene especial y luego ejecuta un Ciclo for of que añade la lista de especial de la estructura
        if (structureSpecial) {
            for (let bonus of structureSpecial) {
                let bonusList = document.createElement('li');
                let bonusListText = document.createTextNode(`${bonus}`);
                bonusList.appendChild(bonusListText);
                aoedbBonus.appendChild(bonusList);
            }
        }
}

printStructure().then();


