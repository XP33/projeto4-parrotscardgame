let DishType =  null;
let DishValue = null;
let DrinkType = null;
let DrinkValue = null;
let DessertType = null;
let DessertValue = null;
let Total = null;

function selectDish(DishX, DishTypeX,  DishValueX){

    const selecionado= document.querySelector(".dishes .selecionado");
    
    if(selecionado != null) {
        selecionado.classList.remove("selecionado");
    }
    const adiciona = document.querySelector("."+DishX);
    adiciona.classList.add("selecionado");
 
    DishType = DishTypeX;
    DishValue = DishValueX;

    VerifyButton();
}
function selectDrink(DrinkX, DrinkTypex, DrinkValueX){

    const selecionado = document.querySelector(".drinks .selecionado");
    if(selecionado != null){
        selecionado.classList.remove("selecionado");
    }

    const adiciona = document.querySelector("."+DrinkX);
    adiciona.classList.add("selecionado");

    DrinkType = DrinkTypex;
    DrinkValue = DrinkValueX;

    VerifyButton();
}
function selectDessert(DessertX, DessertTypeX, DessertValueX ){

    const selecionado = document.querySelector(".desserts .selecionado");
    if(selecionado != null){
        selecionado.classList.remove("selecionado");
    }


    const adiciona = document.querySelector("."+DessertX);
    adiciona.classList.add("selecionado");

    DessertType = DessertTypeX;
    DessertValue = DessertValueX;

    VerifyButton();
}
function VerifyButton(){

    if((DishType != null) && (DrinkType != null) && (DessertType != null)){
        
        const grey = document.querySelector(".grey");
        grey.classList.add("escondido");

        const green = document.querySelector(".green");
        green.classList.remove("escondido");
    }
}
function soma(a,b,c ){
    let Dish = parseFloat(a);
    let Drink = parseFloat(b);
    let comida = parseFloat(c);
    let Total = (Dish+Drink+comida);

    return Total.toFixed(2);
}
 
function enviaOrdem(){
    let nome = prompt("Qual o seu nome?");
    let endereco  = prompt(nome + ", Qual é seu endereço? ");

    const mensagem = "Olá, gostaria de fazer um pedido:\n" 
    +"- Prato: " + DishType 
    + "\n- Bebida: " + DrinkType 
    + "\n- Sobremesa: "+ DessertType 
    + "\nTotal:  R$ " + soma(DishValue, DrinkValue, DessertValue).toString().replace('.',',')
    + "\n\n Nome: " + nome 
    + " \n Endereço: " + endereco;

    let url = 'https://wa.me/5534999091797?text='+encodeURIComponent(mensagem);

    window.open(url);
}