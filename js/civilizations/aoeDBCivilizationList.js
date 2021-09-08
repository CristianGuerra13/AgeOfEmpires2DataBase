/*********************************Codigo para la seccion de civilizacion***************************************/
// Funcion para el buscador de civilizaciones
let searchCivilizationInput = document.getElementById('aoedb-search-civilization-input');
document.getElementById('aoedb-search-civilization-form').onsubmit = () => {;
    let civilization = searchCivilizationInput.value;
    window.location.replace(`civilizationSearch.html?search=${encodeURIComponent(civilization.trim())}`);
    return false;
}

//Funcion para llamar al api con las civilizaciones
const getCivilizations = async() => {
    const resp = await fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations');
    const civilizations = await resp.json();
    if (!civilizations){
        throw new error ('No se ha podido establecer conexion');
    }
    else {
        return civilizations.civilizations;
    }
}

//Funcion para llamar a la unidad unica
const getUniqueUnit = async(uniqueUnitUrl) => {
    if (uniqueUnitUrl) {
        const resp = await fetch(uniqueUnitUrl);
        const uniqueUnit = await resp.json();
        return uniqueUnit.name;
    }
    else {
        return "Unit not Found";
    }
}

const getUniqueTech = async(uniqueTechUrl) => {
    if (uniqueTechUrl) {
        const resp = await fetch(uniqueTechUrl);
        const uniqueUnit = await resp.json();
        return uniqueUnit.name;
    }
    else {
        return "Tech not Found";
    }
}

const printCivilizations = async () => {
    //Llama al api con la funcion getCivilizations
    let aoeCivilizations = await getCivilizations();

    //guarda en una variable el cuerpo de las listas
    let aoedbBody = document.getElementById('aoedb-body');
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;

    //ciclo for of donde se van añadiendo los tags de informacion
    for (let civilizations of aoeCivilizations) {
        //Llama a la funcion que regresa la unidad unica
        let uniqueUnitUrl = civilizations.unique_unit[0];
        let uniqueUnit = await getUniqueUnit(uniqueUnitUrl);
        //Llama a la funcion que regresa la tecnologia unica
        let uniqueTechUrl = civilizations.unique_tech[0];
        let uniqueTech = await getUniqueTech(uniqueTechUrl);
        //Se crea el div contenedor y se le añaden los tags e informacion
        let civilizationBox = document.createElement('div');
        civilizationBox.className = 'aoedb-box';
        aoedbBody.appendChild(civilizationBox);
        civilizationBox.innerHTML = `
        <div class="aoedb-box-header">
        <h2>${civilizations.name}</h2>
        </div><div class="aoedb-box-body">
        <p><span>Expansion: </span>${civilizations.expansion}</p>
        <p><span>Army Type: </span>${civilizations.army_type}</p>
        <p><span>Team Bonus: </span>${civilizations.team_bonus}</p>
        <p><span>Civilization Bonus:</span></p>
        <ul class="aoedb-box-bonus"></ul>
        <p class="aoedb-box-unit"><span>Unique Unit: </span> ${uniqueUnit}</p>
        <p class="aoedb-box-tech"><span>Unique Tech: </span> ${uniqueTech}</p></div>`;
        

        //Se añade funcion para ir a la pagina seleccionada 
        civilizationBox.onclick = () => {
            window.location.replace(`civilizationSearch.html?search=${encodeURIComponent(civilizations.id)}`);
        };

        //Se crea una variable con el campo para Bonus actual
        let aoedbBonus = document.getElementsByClassName('aoedb-box-bonus')[aoedbNumber];
        //Se aumenta en 1 la variable
        aoedbNumber++;
        //Se crea variable con civilization_bonus para el ciclo for of
        let civilizationBonus = civilizations.civilization_bonus;
        //Ciclo for of que añade la lista de bonus de la civilizacion
        for (let bonus of civilizationBonus) {
            let bonusList = document.createElement('li');
            let bonusListText = document.createTextNode(`${bonus}`);
            bonusList.appendChild(bonusListText);
            aoedbBonus.appendChild(bonusList);
        }
    }

}


printCivilizations().then();