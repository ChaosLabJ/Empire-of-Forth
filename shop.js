

if(localStorage.getItem("intro") === false || localStorage.getItem("intro") === null){
    introduce();
}

let shopOpen = false;
hideShop();

function introduce(){
    localStorage.setItem("intro", true);
}

function toggleShop(){
    if(shopOpen == true)
    {
        hideShop();
        shopOpen = false;
    }else{
        openShop();
        shopOpen = true;
    }
}

function openShop(){
    document.getElementById("background-div").style.visibility="visible";
    document.getElementById("shop-menu").style.visibility="visible";
    getStock();
}

function getStock(){
    document.getElementById("gpDisplay").innerHTML = parseInt(localStorage.getItem("gold"));
}

function buy(item){
    stock = [
        {
            name: "healPot",
            cost: 10
        },
        {
            name: "sharpOil",
            cost: 50
        },
        {
            name: "xpPot",
            cost: 30
        }
    ]

    for(i=0;i<stock.length;i++){
        if(item == stock[i].name){
            oldGold = parseInt(localStorage.getItem("gold"));
            if(oldGold >= stock[i].cost){
                oldInv = localStorage.getItem(stock[i].name);
                if(oldInv == null || oldInv == "null"){
                    oldInv = 0;
                }
                localStorage.setItem(stock[i].name, parseInt(oldInv)+1);
                localStorage.setItem("gold", oldGold-stock[i].cost);
                if(stock[i].name == "xpPot"){
                    localStorage.setItem("xp", parseInt(localStorage.getItem("xp")) + (parseInt(localStorage.getItem("xpNeeded"))/5) + 1);
                }
            }
        }
    }
    getStock();
}

function hideShop(){

    document.getElementById("background-div").style.visibility="hidden";
    document.getElementById("shop-menu").style.visibility="hidden";
}
