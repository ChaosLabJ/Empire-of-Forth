const character = {
    name: localStorage.getItem("charan"),
    gender: localStorage.getItem("charag")
};
const city = {
    name: localStorage.getItem("cityn")
};

let statsOpen = false;


greyNavbar();

function greyNavbar(){
    let j = document.getElementsByClassName("sidebarElement");

    if(localStorage.getItem("init") === "true"){
        for(i=1;i<j.length;i++){
            console.log("reset "+j[i]);
            j[i].style.opacity="100%";
            j[i].style.cursor="point";
        }

        for(i=4;i<j.length;i++){
            console.log("initTrue "+j[i]);
            j[i].style.opacity="50%";
            j[i].href="";
            j[i].style.cursor="no-drop";
        }
    }else{
        for(i=2;i<j.length;i++){
            console.log("initFalse "+j[i]);
            j[i].style.opacity="50%";
            j[i].href="";
            j[i].style.cursor="no-drop";
        }
    }
    console.log(localStorage.getItem("init"));
}

hideStats();

function hideStats(){

    document.getElementById("background-div").style.visibility="hidden";
    document.getElementById("stats").style.visibility="hidden";
    for(i=0;i<document.getElementsByClassName("statIncreaseButton").length;i++){
        document.getElementsByClassName("statIncreaseButton")[i].style.visibility="hidden";
    }
}

if(localStorage.getItem("init") === false || localStorage.getItem("init") === null){
    initialise();
}

function initialise(){
    localStorage.setItem("atk", 3);
    localStorage.setItem("def", 0);
    localStorage.setItem("hp", 10);
    localStorage.setItem("abilityPoints", 1);
    localStorage.setItem("xpNeeded", 20);
    localStorage.setItem("init", true);
    localStorage.setItem("hpMax", localStorage.getItem("hp"));
}

setCharacterImage();

function setCharacterImage(){
    if(character.gender == "F"){
        document.getElementById("characterPreviewBase").src="charaF.PNG";
    }else if(character.gender == "M"){
        document.getElementById("characterPreviewBase").src="charaM.PNG";
    }else{
        document.getElementById("characterPreviewBase").src="charaN.PNG"
    }
}

function toggleStats(){
    if(statsOpen == true)
    {
        hideStats();
        statsOpen = false;
    }else{
        openStats();
        statsOpen = true;
    }
}

function openStats(){
    document.getElementById("background-div").style.visibility="visible";
    document.getElementById("stats").style.visibility="visible";
    for(i=0;i<document.getElementsByClassName("statIncreaseButton").length;i++){
        document.getElementsByClassName("statIncreaseButton")[i].style.visibility="visible";
    }
    getStats();
}

function checkForLevelUp(){
    console.log(localStorage.getItem("abilityPoints"));

    xpForLevelUp = localStorage.getItem("xpNeeded");
    if(parseInt(localStorage.getItem("xp")) >= parseInt(xpForLevelUp)){
        oldAbilitypoints = localStorage.getItem("abilityPoints");
        console.log(oldAbilitypoints);
        localStorage.setItem("abilityPoints", parseInt(oldAbilitypoints) + 1);
        xpForLevelUp = (xpForLevelUp * 1.5);
        localStorage.setItem("xpNeeded", parseInt(xpForLevelUp));
        localStorage.setItem("xp", 0);
        localStorage.setItem("hp", parseInt(localStorage.getItem("hpMax")));
    }

    if(localStorage.getItem("abilityPoints") > 0){
        let j = document.getElementsByClassName("statIncreaseButton")
        for(i=0;i<j.length;i++){
            j[i].style.visibility="visible";
        }
    }else{
        let j = document.getElementsByClassName("statIncreaseButton")
        for(i=0;i<j.length;i++){
            j[i].style.visibility="hidden";
        }
    }
}

function increaseDef(){
    if(localStorage.getItem("def") < 69){
        let newDef = parseInt(localStorage.getItem("def")) + 1;
        localStorage.setItem("def", newDef);
        if(localStorage.getItem("def") == 69){
            document.getElementById("defIncrease").style.visibility = "hidden";
        }
    }
    let newAbilityPoints = parseInt(localStorage.getItem("abilityPoints")) - 1;
    localStorage.setItem("abilityPoints", newAbilityPoints);
    getStats();
}

function increaseAtk(){
    if(localStorage.getItem("atk") < 69){
        let newAtk = parseInt(localStorage.getItem("atk")) + 1;
        localStorage.setItem("atk", newAtk);
        if(localStorage.getItem("atk") == 69){
            document.getElementById("atkIncrease").style.visibility = "hidden";
        }
    }
    let newAbilityPoints = parseInt(localStorage.getItem("abilityPoints")) - 1;
    localStorage.setItem("abilityPoints", newAbilityPoints);
    getStats();
}

function increaseHp(){
    if(localStorage.getItem("hpMax") < 69){
        let newHp = parseInt(localStorage.getItem("hpMax")) + 1;
        localStorage.setItem("hpMax", newHp);
        if(localStorage.getItem("hpMax") == 69){
            document.getElementById("hpIncrease").style.visibility = "hidden";
        }
    }
    let newAbilityPoints = parseInt(localStorage.getItem("abilityPoints")) - 1;
    localStorage.setItem("hp", localStorage.getItem("hpMax"));
    localStorage.setItem("abilityPoints", newAbilityPoints);
    getStats();
}

function getStats(){
    checkForLevelUp();
    document.getElementById("defDisplay").innerHTML = localStorage.getItem("def");
    document.getElementById("atkDisplay").innerHTML = localStorage.getItem("atk");
    document.getElementById("hpDisplay").innerHTML = localStorage.getItem("hpMax");
    document.getElementById("apDisplay").innerHTML = localStorage.getItem("abilityPoints");
}
