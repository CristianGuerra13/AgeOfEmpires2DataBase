
// Funcion para el buscador de unidades
let searchUnitsInput = document.getElementById('aoedb-search-units-input');
document.getElementById('aoedb-search-units-form').onsubmit = () => {
    let units = searchUnitsInput.value;
    window.location.replace(`unitsSearch.html?search=${encodeURIComponent(units.trim())}`);
    return false;
}


//Funcion para llamar al api con las tecnologias
const getUnit = async () => {
    let searchUrl = window.location.href;
    let searchedUnit = searchUrl.substring(searchUrl.lastIndexOf('=') + 1);
    const resp = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/unit/${searchedUnit}`);
    const unit = await resp.json();
    if (!unit) {
        throw new error('No se ha podido establecer conexion');
    }
    else {
        return unit;
    }
}

//Funcion para llamar created in
const getCreatedIn = async (getCreatedInUrl) => {
    if (getCreatedInUrl) {
        const resp = await fetch(getCreatedInUrl);
        const createdIn = await resp.json();
        return createdIn;
    }
    else {
        return "Not Found";
    }
}


const printUnit = async () => {
    //Llama al api con la funcion getUnit
    let aoeUnit = await getUnit();
    //guarda en una variable el cuerpo de la lista de informacion de la civilizacion
    let aoedbUnitBody = document.getElementsByClassName('aoedb-search-box-body')[0];
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;
    //guarda en una variable el campo del header
    let aoedbUnitHeader = document.getElementsByClassName('aoedb-search-box-header')[0];
    console.log(aoeUnit);

    if (aoeUnit.message) {
        aoedbUnitHeader.innerHTML = `<h2>${aoeUnit.message}</h2>`;
    }
    else {

        //Se declara variable que contiene created in
        let created_inName = "";
        //Condicional que revisa si created in contiene un url de api
        if (aoeUnit.created_in.includes("https")) {
            //Llama a la funcion para traer created in
            let created_in = await getCreatedIn(aoeUnit.created_in);

            if (created_in[0] === undefined) {
                created_inName = created_in.name;
            } else {
                created_inName = created_in[0].name;
            }
        } else {
            created_inName = aoeUnit.created_in;
        }

        //Agrega al header el nombre de la civilizacion
        aoedbUnitHeader.innerHTML = `<h2>${aoeUnit.name}</h2>`;
        //Se le añaden los tags e informacion
        aoedbUnitBody.innerHTML = `
        <div>
        <p><span>Expansion: </span>${aoeUnit.expansion}</p>
        <p><span>Description: </span>${aoeUnit.description}</p>
        <p><span>Age: </span>${aoeUnit.age}</p>
        <p><span>Build Time: </span>${aoeUnit.build_time}</p>
        <p><span>Unit Cost:</span></p>
        <ul class="aoedb-box-cost"></ul>
        <p><span>Created In: </span> ${created_inName}</p>
        </div>
        <div>
        <p><span>Armor: </span>${aoeUnit.armor}</p>
        <p><span>Line Of Sight: </span>${aoeUnit.line_of_sight}</p>
        <p><span>Movement Rate: </span>${aoeUnit.movement_rate}</p>
        <p><span>Range: </span>${aoeUnit.range}</p>
        <p><span>Reload Time: </span>${aoeUnit.reload_time}</p>
        </div>
        <div>
        <p><span>Attack: </span>${aoeUnit.attack}</p>
        <p><span>Attack Delay: </span>${aoeUnit.attack_delay}</p>
        <p><span>Attack Bonus: </span>${aoeUnit.attack_bonus}</p>
        <p><span>Hit Points: </span>${aoeUnit.hit_points}</p>
        <p><span>Accuracity: </span>${aoeUnit.accuracy}</p>
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
    let unitCost = Object.entries(aoeUnit.cost);

    //Ciclo for of que añade la lista de costo de la estructura
    for (let cost of unitCost) {
        let costList = document.createElement('li');
        let costListText = document.createTextNode(`${cost[0]}: ${cost[1]}`);
        costList.appendChild(costListText);
        aoedbCost.appendChild(costList);
    }

}

printUnit().then();


