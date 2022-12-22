const character = {
    name: localStorage.getItem("charan"),
    gender: localStorage.getItem("charag"),
    atk: localStorage.getItem("atk"),
    def :localStorage.getItem("def"),
    hp: localStorage.getItem("hp"),
    xp: localStorage.getItem("xp"),
    gold: localStorage.getItem("gold")
};
const enemy = {};

if(parseInt(localStorage.getItem("hp_enim")) > 0){
    enemy.name= localStorage.getItem("name_enim");
    enemy.hp= localStorage.getItem("hp_enim");
    enemy.atk= localStorage.getItem("atk_enim");
    enemy.def= localStorage.getItem("def_enim");
    enemy.marginTop= localStorage.getItem("marginTop_enim");
}else{
    spawnEnemy();
}

hideLoot();
document.getElementById("lootChest").style.opacity="0%";

// greyNavbar();

// function greyNavbar(){
//     let j = document.getElementsByClassName("sidebarElement");

//     if(localStorage.getItem("init") === "true"){
//         for(i=1;i<j.length;i++){
//             j[i].style.opacity="100%";
//             j[i].style.cursor="point";
//         }

//         for(i=4;i<j.length;i++){
//             j[i].style.opacity="50%";
//             j[i].href="";
//             j[i].style.cursor="no-drop";
//         }
//     }else{
//         for(i=2;i<j.length;i++){
//             j[i].style.opacity="50%";
//             j[i].href="";
//             j[i].style.cursor="no-drop";
//         }
//     }
// }

function spawnEnemy(){
    bossPos =[
        {name: "swamp",
            },
        {name: "forest",
            },
        {name: "small_isle",
            },
        {name: "mountain",    
            },
        {name: "mine",
            },
        {name: "bridge",
            },
        {name: "flowers",
        }
    ]

    if(localStorage.getItem("bossRooms") == null || localStorage.getItem("bossRooms") == "null"){
        localStorage.setItem("bossRooms","")
    }

    for(i=0;i<localStorage.getItem("bossRooms").split(",").length;i++){
        if(localStorage.getItem("location") === localStorage.getItem("bossRooms").split(",")[i]){
            location.replace(localStorage.getItem("bossRooms").split(",")[i]+".html");
        }
    }

    for (i=0;i<bossPos.length;i++){
        localStorage.setItem("bossRooms", localStorage.getItem("bossRooms") + "," + bossPos[i].name);
        if(localStorage.getItem("location") == bossPos[i].name && localStorage.getItem(bossPos[i].name+"-clear") != "true"){
            spawnBoss();
        }
    }


    if(enemy.name == null || enemy.name == "null"){
        if(Math.floor(Math.random() * 2) == 0){
            enemy.name = "giant_rat";
            enemy.hp = "5";
            enemy.atk = "3";
            enemy.def = "0";
            enemy.marginTop = 30;
        }else{
            enemy.name = "slime";
            enemy.hp = "5";
            enemy.atk = (parseInt(character.def)+1);
            enemy.def = (parseInt(character.atk)-1);
            enemy.marginTop = "20";
        }
    }

    localStorage.setItem("enimMaxHp", enemy.hp);
    document.getElementById("monster").src=enemy.name+".PNG";
    document.getElementById("monster").style.marginTop = enemy.marginTop+"%";
    document.getElementById("enemyHealthDisplay").style.marginTop=-(enemy.marginTop-10)+"%";
    if(enemy.name=="giant_rat"){
        document.getElementById("enemyHealthDisplay").style.marginTop="-15%";
    }

    localStorage.setItem("tempAtk", 0);

    if(localStorage.getItem("enimBoss")){
        document.getElementById("monster").style.marginLeft="-35%";
        document.getElementById("enemyHealthDisplay").style.marginTop="-35%";
    }
}

function spawnBoss(){
    lastLocation = localStorage.getItem("location");
    if(lastLocation == "flowers"){
        enemy.name = "unicorn";
        enemy.hp = "25";
        enemy.atk = "7";
        enemy.def = "3";
        enemy.marginTop = "20";
    }else if(lastLocation == "bridge"){
        enemy.name = "troll";
        enemy.hp = "55";
        enemy.atk = "10";
        enemy.def = "1";
        enemy.marginTop = "20";
    }
    
    else if(lastLocation == "mountain"){
        enemy.name = "griffin";
        enemy.hp = "35";
        enemy.atk = "7";
        enemy.def = "4";
        enemy.marginTop = "10";
    }else if(lastLocation == "forest"){
        enemy.name = "ent";
        enemy.hp = "15";
        enemy.atk = "4";
        enemy.def = "2";
        enemy.marginTop = "20";
    }else if(lastLocation == "mine"){
        enemy.name = "miner";
        enemy.hp = "55";
        enemy.atk = "8";
        enemy.def = "7";
        enemy.marginTop = "20";
    }else if(lastLocation == "swamp"){
        enemy.name = "swamp_hag";
        enemy.hp = "40";
        enemy.atk = "17";
        enemy.def = "1";
        enemy.marginTop = "20";
    }else if(lastLocation == "small_isle"){
        enemy.name = "fairy_dragon_boss";
        enemy.hp = "100";
        enemy.atk = "15";
        enemy.def = "5";
        enemy.marginTop = "20";
    }

    document.getElementById("monster").style.width="15%";

    localStorage.setItem("enimBoss", true);

    document.getElementById("monster").src=enemy.name+".PNG";
    document.getElementById("monster").style.marginTop = enemy.marginTop;
}


let move;
let turn;
let newXp;
let newGold;

let invOpen = false;
let combatOver = false;
hideInv();
loggin();

function loggin(){
    console.log(character);
    console.log(enemy);
}

settingTurns();

function settingTurns(){
    if(localStorage.getItem("turn") === null){
        turn = 0;
    }else{
        turn = localStorage.getItem("turn");
    }
    if(turn/2 != Math.floor(turn/2)){

        j = document.getElementsByClassName("combatButtons");
        for (i=0;i<j.length;i++){
            j[i].style.opacity="0%";
            j[i].style.visibility="hidden";
        }
        if(enemy.name != "fairy_dragon_boss"){
            enemyAttack();
        }else{
            randomNumber = Math.floor(Math.random()*100)
            if(randomNumber>=90){
                console.log("regen");
                enemyRegen();
            }else if(randomNumber >= 60 && randomNumber < 90){
                console.log("block");
                enemyBlock();
            }else{
                console.log("attack");
                enemyAttack();
            }
        }
    }else{
        if(!combatOver){
            j = document.getElementsByClassName("combatButtons");
            for (i=0;i<j.length;i++){
                j[i].style.opacity="100%";
                j[i].style.visibility="visible";
            }
        }
    }
    if(parseInt(localStorage.getItem("hpMax")) > 0 && parseInt(localStorage.getItem("enimMaxHp")) > 0){
        document.getElementById("hpDisplay").innerHTML="Hp: "+character.hp+"/"+parseInt(localStorage.getItem("hpMax"));
        document.getElementById("hpDisplayEnim").innerHTML="Hp: "+enemy.hp+"/"+parseInt(localStorage.getItem("enimMaxHp"));
    }else{
        document.getElementById("hpDisplay").innerHTML="Hp: 0/"+parseInt(localStorage.getItem("hpMax"));
    document.getElementById("hpDisplayEnim").innerHTML="Hp: 0/"+parseInt(localStorage.getItem("enimMaxHp"));
    }
}

setCharacterImage();

function setCharacterImage(){
    if(character.gender == "F"){
        document.getElementById("character_combat").src="charaFc.PNG";
    }else if(character.gender == "M"){
        document.getElementById("character_combat").src="charaMc.PNG";
    }else{
        document.getElementById("character_combat").src="charaNc.PNG"
    }
}

function attack(){
    move = "attack";
    if(localStorage.getItem("lastBossMove") != "block"){
        if(localStorage.getItem("lastmove") == "block"){
            let unblockedDamage = ((parseInt(character.atk) + parseInt(localStorage.getItem("tempAtk"))) * 1.5) - enemy.def;
            if(unblockedDamage > 0){
                enemy.hp = enemy.hp - Math.round(unblockedDamage);
            }
            console.log(unblockedDamage);
        }else{
            let unblockedDamage = (parseInt(character.atk) + parseInt(localStorage.getItem("tempAtk"))) - enemy.def;
            if(unblockedDamage > 0){
                enemy.hp = enemy.hp - Math.round(unblockedDamage);
            }
            console.log((parseInt(character.atk) + parseInt(localStorage.getItem("tempAtk"))));
        }
        console.log(enemy);
    }
    turn++;
    endRound();
}

function useItem(){
    toggleItems();
}

function toggleItems(){
    if(invOpen == true)
    {
        hideInv();
        invOpen = false;
    }else{
        openInv();
        invOpen = true;
    }
}

function hideInv(){
    document.getElementById("background-div").style.visibility="hidden";
    document.getElementById("itemListDiv").style.visibility="hidden";
}

function openInv(){
    document.getElementById("background-div").style.visibility="visible";
    document.getElementById("itemListDiv").style.visibility="visible";

    j = document.getElementsByClassName("combatItems");
    for(i=0;i<j.length;i++){
        if(localStorage.getItem(j[i].id) === null || localStorage.getItem(j[i].id) === "null" ){
            document.getElementById("quant"+j[i].id).innerHTML = 0; 
        }else{
            document.getElementById("quant"+j[i].id).innerHTML = localStorage.getItem(j[i].id); 
        }
    }
}

function use(item){
    if (parseInt(localStorage.getItem(item)) > 0){
        localStorage.setItem(item, (localStorage.getItem(item) - 1));
        document.getElementById("quant"+item).innerHTML = parseInt(localStorage.getItem(item)); 
        if(item == "healPot"){
            character.hp = Math.round(parseInt(character.hp) + (parseInt(character.atk) + parseInt(localStorage.getItem("tempAtk")) + parseInt(localStorage.getItem("hpMax"))/2 ));
            if(parseInt(character.hp) > parseInt(localStorage.getItem("hpMax"))){
                character.hp = parseInt(localStorage.getItem("hpMax"));
            }
        }else if(item == "sharpOil"){
            localStorage.setItem("tempAtk", parseInt(character.atk)/2);
        }
        move = "useItem";
        turn++;
        endRound();
    }
}

function block(){
    turn++;
    console.log("blocked");
    move = "block";
    endRound();
}

function target(){
    // if(move == "attack"){
    //     let unblockedDamage = (character.atk + parseInt("tempAtk")) - enemy.def;
    //     if(unblockedDamage > 0){
    //         enemy.hp = enemy.hp - unblockedDamage;
    //     }
    //     console.log(enemy);
    // }
    // turn++;
    // endRound();
}
function enemyAttack(){
    // if(localStorage.getItem("lastmove") == "block"){
    //     let unblockedDamage = enemy.atk - (character.def * 3);
    //     if(unblockedDamage > 0){
    //         character.hp = character.hp - Math.floor(unblockedDamage);
    //     }
    // }else{
    //     character.hp = character.hp - Math.floor((enemy.atk - character.def));
    // }
    // turn++;
    // console.log(character);
    // endRound();

    if(localStorage.getItem("lastmove") != "block" && localStorage.getItem("lastBossMove") == "block"){
        let unblockedDamage = ((parseInt(enemy.atk)) * 1.5) - character.def;
        if(unblockedDamage > 0){
            character.hp = character.hp - Math.round(unblockedDamage);
        }
    }else if(localStorage.getItem("lastmove") != "block" && localStorage.getItem("lastBossMove") != "block"){
        let unblockedDamage = parseInt(enemy.atk) - character.def;
        if(unblockedDamage > 0){
            character.hp = character.hp - Math.round(unblockedDamage);
        }
    }else if(localStorage.getItem("lastmove") == "block" && localStorage.getItem("lastBossMove") == "block"){
        let unblockedDamage = ((parseInt(enemy.atk)) * 1.5) - character.def;
        if(unblockedDamage > 0){
            let unblockedDamageE = unblockedDamage - (character.def * 3);
            if(unblockedDamageE > 0){
                character.hp = character.hp - Math.round(unblockedDamageE);
            }
        }
    }else if(localStorage.getItem("lastmove") == "block" && localStorage.getItem("lastBossMove") != "block"){
        let unblockedDamage = parseInt(enemy.atk) - character.def;
        if(unblockedDamage > 0){
            let unblockedDamageE = unblockedDamage - (character.def * 3);
            if(unblockedDamageE > 0){
                character.hp = character.hp - Math.round(unblockedDamageE);
            }
        }
    }

    if(enemy.name == "fairy_dragon_boss"){
        localStorage.setItem("lastBossMove", "attack");
    }

    console.log(character);
    turn++;
    endRound();
}

function enemyBlock(){
    turn++;
    console.log("blocked");
    localStorage.setItem("lastBossMove", "block");
    endRound();
}

function enemyRegen(){
    enemy.hp = Math.round(parseInt(enemy.hp) + (parseInt(enemy.atk)/3));
    turn++;
    console.log("healed");
    localStorage.setItem("lastBossMove", "regen");
    endRound();
}

function endRound(){
    localStorage.setItem("turn", turn);
    localStorage.setItem("atk", character.atk);
    localStorage.setItem("def", character.def);
    localStorage.setItem("hp", character.hp);

    localStorage.setItem("atk_enim", enemy.atk);
    localStorage.setItem("def_enim", enemy.def);
    localStorage.setItem("hp_enim", enemy.hp);
    localStorage.setItem("name_enim", enemy.name);
    localStorage.setItem("marginTop_enim", enemy.marginTop);

    if(move != "null" || move != null){
        localStorage.setItem("lastmove", move);
    }
    checkCombatEnd();
    console.log("turn: "+turn)
    settingTurns();
}

function spawnLoot(){
    document.getElementById("lootChest").style.opacity="100%";
    document.getElementById("lootChest").style.marginTop=enemy.marginTop+"%";
    localStorage.setItem("lootChecked", false);
}

function checkCombatEnd(){
    if(combatOver == false){
        if(enemy.hp <= 0){
            enemyDeath();
            combatOver = true;
    
        }else if(character.hp <= 0){
            characterDeath();
            combatOver = true;
        }
    }
    
    if(combatOver){
        j = document.getElementsByClassName("combatButtons");
        for (i=0;i<j.length;i++){
            j[i].style.opacity="0%";
        }
    }
}

function enemyDeath(){
    document.getElementById("monster").style.visibility = "hidden";
    localStorage.removeItem("turn");

    if(character.xp == null || character.xp == "null"){
        character.xp = "0";
    }

    let randomExtra= Math.floor(Math.random()*5);

    newXp = (parseInt(localStorage.getItem("enimMaxHp")) * 0.2) + parseInt(enemy.atk) * 0.1 + parseInt(enemy.def) * 0.1  + randomExtra;
    localStorage.setItem("xp", parseInt(localStorage.getItem("xp")) + newXp);

    newGold = parseInt(localStorage.getItem("enimMaxHp")) * 0.3  + parseInt(enemy.atk) * 0.2 + parseInt(enemy.def) * 0.1  + randomExtra;
    localStorage.setItem("gold", parseInt(localStorage.getItem("gold")) + newGold);

    localStorage.setItem(localStorage.getItem("location")+"-clear", true);

    localStorage.setItem("tempAtk", 0);
    spawnLoot();

    if(localStorage.getItem("enimBoss")){
        newXp = newXp * 5;
        newGold = newGold * 3;

        console.log("You killed a boss!")
        localStorage.setItem("xp", parseInt(localStorage.getItem("xp")) + newXp);
        localStorage.setItem("gold", parseInt(localStorage.getItem("gold")) + newGold);
        localStorage.setItem("enimBoss", false);
        if(enemy.name == "fairy_dragon_boss"){
            location.replace("end.html")
        }
    }
}

let lootOpen=false;

function toggleLoot(){
    if(lootOpen == true)
    {
        hideLoot();
        lootOpen = false;
        location.replace("map.html")
        localStorage.removeItem("enimMaxHp");
    }else if(localStorage.getItem("lootChecked") != "true"){
        openLoot();
        lootOpen = true;
    }
}

function hideLoot(){
    document.getElementById("background-div").style.visibility="hidden";
    j = document.getElementsByClassName("lootList");
    for(i=0;i<j.length;j++){
        j[i].style.visibility="hidden";
    }
}

function openLoot(){
    console.log(localStorage.getItem("xp"));

    document.getElementById("background-div").style.visibility="visible";
    j = document.getElementsByClassName("lootList");
    for(i=0;i<j.length;j++){
        j[i].style.visibility="visible";
    }
    lootXp = document.getElementById("xpLoot");
    lootGold = document.getElementById("goldLoot");
    lootItem = document.getElementById("itemLoot");
    lootXp.innerHTML=parseInt(newXp)+"xp";
    lootGold.innerHTML=parseInt(newGold)+"gp";
    console.log(parseInt(newXp));
    console.log(parseInt(newGold));
    lootItem.style.visibility="hidden";
    localStorage.setItem("lootChecked", true);
}

function characterDeath(){
    document.getElementById("character_combat").style.visibility = "hidden";
    localStorage.removeItem("turn");
    localStorage.setItem("tempAtk", 0);
    location.replace("index.html");
    localStorage.removeItem("enimMaxHp");
    localStorage.setItem("gameOver", true);
}
