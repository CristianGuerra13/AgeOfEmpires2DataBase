// Funcion para el buscador de unidades
let searchUnitsInput = document.getElementById('aoedb-search-units-input');
document.getElementById('aoedb-search-units-form').onsubmit = () => {
    let units = searchUnitsInput.value;
    window.location.replace(`unitsSearch.html?search=${encodeURIComponent(units.trim())}`);
    return false;
}

//Funcion para llamar al api con las unidades
const getUnits = async () => {
    const resp = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/units');
    const units = await resp.json();
    if (!units) {
        throw new error('No se ha podido establecer conexion');
    }
    else {
        return units.units;
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


const printUnits = async () => {
    //Llama al api con la funcion getUnits
    let aoeUnits = await getUnits();
    //guarda en una variable el cuerpo de las listas
    let aoedbBody = document.getElementById('aoedb-body');
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;

    //ciclo for of donde se van añadiendo los tags de informacion
    for (let units of aoeUnits) {
        //Se declara variable que contiene created in
        let created_inName = "";
        //Condicional que revisa si created in contiene un url de api
        if (units.created_in.includes("https")) {
            //Llama a la funcion para traer created in
            let created_in = await getCreatedIn(units.created_in);

            if (created_in[0] === undefined) {
                created_inName = created_in.name;
            } else {
                created_inName = created_in[0].name;
            }
        } else {
            created_inName = units.created_in;
        }


        //Se crea el div contenedor y se le añaden los tags e informacion
        let unitsBox = document.createElement('div');
        unitsBox.className = 'aoedb-box';
        aoedbBody.appendChild(unitsBox);
        unitsBox.innerHTML = `
        <div class="aoedb-box-header">
        <h2>${units.name}</h2>
        </div><div class="aoedb-box-body">
        <p><span>Expansion: </span>${units.expansion}</p>
        <p><span>Age: </span>${units.age}</p>
        <p><span>Description: </span>${units.description}</p>
        <p><span>Description: </span>${units.description}</p>
        <p><span>Created In: </span>${created_inName}</p>
        <p><span>Unit Cost:</span></p>
        <ul class="aoedb-box-cost"></ul>
        </div>`;

        //Se crea una variable con el campo para costo
        let aoedbCost = document.getElementsByClassName('aoedb-box-cost')[aoedbNumber];

        //Se aumenta en 1 la variable
        aoedbNumber++;

        //Se crea variable con cost el cual se transforma a un array para el ciclo for of 
        let unitCost = Object.entries(units.cost);

        //Ciclo for of que añade la lista de costo de la estructura
        for (let cost of unitCost) {
            let costList = document.createElement('li');
            let costListText = document.createTextNode(`${cost[0]}: ${cost[1]}`);
            costList.appendChild(costListText);
            aoedbCost.appendChild(costList);
        }
       //Se añade funcion para ir a la pagina seleccionada 
       unitsBox.onclick = () => {
        window.location.replace(`unitsSearch.html?search=${encodeURIComponent(units.id)}`);
        };
    }
}


printUnits().then();