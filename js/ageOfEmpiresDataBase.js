/*********************************Codigo general***************************************/
//Funcion para aplicar la animacion del boton de hamburguesa

const hamButton = document.getElementById('aoedb-hamButton');
const listHam = document.getElementById('aoedb-hamButton-list-container');

let hamIsActive = false;
document.getElementById('aoedb-hamButton').onclick = () => {
  if (hamIsActive) {
    hamButton.classList.remove('is-active');
    hamIsActive = false;
    listHam.style.visibility = 'hidden';
    //hint.style.opacity = '0';
    listHam.style.height = '0';
    listHam.style.width = '0';
    listHam.style.padding = '0';
    listHam.style.borderWidth = '0';
  }
  else {
    hamButton.classList.add('is-active');
    hamIsActive = true;
    listHam.style.visibility = 'visible';
    //hint.style.opacity = '1';
    listHam.style.height = '250px';
    listHam.style.width = '200px';
    listHam.style.padding = '0px';
    listHam.style.borderWidth = '2px'; 

  }

  if(listHam.style.visibility == 'hidden'){

  }
  else{

  }

}


let scrolTop = () => {
  window.scrollTo(0, 0);
}