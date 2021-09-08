// Funcion para el buscador de estructuras
let searchStructureInput = document.getElementById('aoedb-search-structures-input');
document.getElementById('aoedb-search-structures-form').onsubmit = () => {;
    let structure = searchStructureInput.value;
    window.location.replace(`structuresSearch.html?search=${encodeURIComponent(structure.trim())}`);
    return false;
}

//Funcion para llamar al api con las estructuras
const getStructures = async() => {
    const resp = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/structures');
    const structures = await resp.json();
    if (!structures){
        throw new error ('No se ha podido establecer conexion');
    }
    else {
        return structures.structures;
    }
}


const printStructures = async () => {
    //Llama al api con la funcion getCivilizations
    let aoeStructures = await getStructures();
    //guarda en una variable el cuerpo de las listas
    let aoedbBody = document.getElementById('aoedb-body');
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;

    //ciclo for of donde se van añadiendo los tags de informacion
    for (let structures of aoeStructures) {

        //Se crea el div contenedor y se le añaden los tags e informacion
        let structuresBox = document.createElement('div');
        structuresBox.className = 'aoedb-box';
        aoedbBody.appendChild(structuresBox);
        structuresBox.innerHTML = `
        <div class="aoedb-box-header">
        <h2>${structures.name}</h2>
        </div><div class="aoedb-box-body">
        <p><span>Expansion: </span>${structures.expansion}</p>
        <p><span>Age: </span>${structures.age}</p>
        <p><span>Structure Cost:</span></p>
        <ul class="aoedb-box-cost"></ul>
        <p><span>Build Time: </span>${structures.build_time}</p>
        <p><span>Armor: </span>${structures.armor}</p>
        <p><span>Hit Points: </span>${structures.hit_points}</p>
        <p><span>Line of Sight: </span>${structures.line_of_sight}</p>
        <p><span>Structure Special:</span></p>
        <ul class="aoedb-box-special"></ul></div>`;
        

        //Se añade funcion para ir a la pagina seleccionada 
        structuresBox.onclick = () => {
            window.location.replace(`structuresSearch.html?search=${encodeURIComponent(structures.id)}`);
        };

        //Se crea una variable con el campo para costo y especial actual
        let aoedbCost = document.getElementsByClassName('aoedb-box-cost')[aoedbNumber];
        let aoedbBonus = document.getElementsByClassName('aoedb-box-special')[aoedbNumber];
        //Se aumenta en 1 la variable
        aoedbNumber++;
        //Se crea variable con cost el cual se transforma a un array para el ciclo for of 
        let structureCost = Object.entries(structures.cost);
        
        //Ciclo for of que añade la lista de costo de la estructura
        for (let cost of structureCost) {
            let costList = document.createElement('li');
            let costListText = document.createTextNode(`${cost[0]}: ${cost[1]}`);
            costList.appendChild(costListText);
            aoedbCost.appendChild(costList);
        }

        //Se crea variable con civilization_bonus para el ciclo for of
        let structureSpecial = structures.special;
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

}


printStructures().then();