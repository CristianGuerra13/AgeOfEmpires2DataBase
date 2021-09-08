// Funcion para el buscador de civilizaciones
let searchCivilizationInput = document.getElementById('aoedb-search-civilization-input');
document.getElementById('aoedb-search-civilization-form').onsubmit = () => {
    let civilization = searchCivilizationInput.value;
    window.location.replace(`civilizationSearch.html?search=${encodeURIComponent(civilization.trim())}`);
    return false;
}

//Funcion para llamar al api con las civilizaciones
const getCivilization = async () => {
    let  searchUrl= window.location.href;
    let searchedCivilization = searchUrl.substring(searchUrl.lastIndexOf('=')+1);
    const resp = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${searchedCivilization}`);
    const civilization = await resp.json();
    if (!civilization) {
        throw new error('No se ha podido establecer conexion');
    }
    else {
        return civilization;
    }
}

//Funcion para llamar a la unidad unica
const getUniqueUnit = async (uniqueUnitUrl) => {
    if (uniqueUnitUrl) {
        const resp = await fetch(uniqueUnitUrl);
        const uniqueUnit = await resp.json();
        return uniqueUnit;
    }
    else {
        return "Unit not Found";
    }
}

const getUniqueTech = async (uniqueTechUrl) => {
    if (uniqueTechUrl) {
        const resp = await fetch(uniqueTechUrl);
        const uniqueTech = await resp.json();
        return uniqueTech;
    }
    else {
        return "Tech not Found";
    }
}

const printCivilization = async () => {
    //Llama al api con la funcion getCivilizations
    let aoeCivilization = await getCivilization();
    //guarda en una variable el cuerpo de la lista de informacion de la civilizacion
    let aoedbCivilizationBody = document.getElementsByClassName('aoedb-search-box-body')[0];
    //Variable que incrementara para agregar campos
    let aoedbNumber = 0;
    //guarda en una variable el campo del header
    let aoedbCivilizationHeader = document.getElementsByClassName('aoedb-search-box-header')[0];

   
    if (aoeCivilization.message) {
        aoedbCivilizationHeader.innerHTML = `<h2>${aoeCivilization.message}</h2>`;
    }
    else {

        //Agrega al header el nombre de la civilizacion
        aoedbCivilizationHeader.innerHTML = `<h2>${aoeCivilization.name}</h2>`;
        //Llama a la funcion que regresa la unidad unica
        let uniqueUnitUrl = aoeCivilization.unique_unit[0];
        let uniqueUnit = await getUniqueUnit(uniqueUnitUrl);
        //Llama a la funcion que regresa la tecnologia unica
        let uniqueTechUrl = aoeCivilization.unique_tech[0];
        let uniqueTech = await getUniqueTech(uniqueTechUrl);
        //Se le añaden los tags e informacion
        aoedbCivilizationBody.innerHTML = `
        <div>
        <h3>Civilization Info</h3>
        <p><span>Expansion: </span>${aoeCivilization.expansion}</p>
        <p><span>Army Type: </span>${aoeCivilization.army_type}</p>
        <p><span>Team Bonus: </span>${aoeCivilization.team_bonus}</p>
        <p><span>Civilization Bonus:</span></p>
        <ul class="aoedb-box-bonus"></ul>
        </div>
        <div>
        <h3>Unique Unit Info</h3>
        <p><span>Name: </span>${uniqueUnit.name}</p>
        <p><span>Expansion: </span>${uniqueUnit.expansion}</p>
        <p><span>Description: </span>${uniqueUnit.description}</p>
        <p><span>Age: </span>${uniqueUnit.age}</p>
        <p><span>Attack: </span>${uniqueUnit.attack}</p>
        </div>
        <div>
        <h3>Unique Tech Info</h3>
        <p><span>Name: </span>${uniqueTech.name}</p> 
        <p><span>Expansion: </span>${uniqueTech.expansion}</p>
        <p><span>Description: </span>${uniqueTech.description}</p> 
        <p><span>Age: </span>${uniqueTech.age}</p>
        </div>
        `;
    }

     //Se crea una variable con el campo para Bonus actual
     let aoedbBonus = document.getElementsByClassName('aoedb-box-bonus')[aoedbNumber];
     //Se aumenta en 1 la variable
     aoedbNumber++;
     //Se crea variable con civilization_bonus para el ciclo for of
     let civilizationBonus = aoeCivilization.civilization_bonus;
     //Ciclo for of que añade la lista de bonus de la civilizacion
     for (let bonus of civilizationBonus) {
         let bonusList = document.createElement('li');
         let bonusListText = document.createTextNode(`${bonus}`);
         bonusList.appendChild(bonusListText);
         aoedbBonus.appendChild(bonusList);
     }
}

printCivilization().then();


