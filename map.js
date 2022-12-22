const city = {
    name: localStorage.getItem("cityn")
};
const character = {
    name: localStorage.getItem("charan"),
    gender: localStorage.getItem("charag"),
    location: localStorage.getItem("location")
};

if(localStorage.getItem("lg") == null){
    localStorage.setItem("lg", "en");
}

greyNavbar();

console.log(localStorage.getItem("mapInit"));
if(localStorage.getItem("mapInit") == null || localStorage.getItem("mapInit") == "null"){
    initialiseMap();
}

function initialiseMap(){
    localStorage.setItem("atk", 1);
    localStorage.setItem("def", 0);
    localStorage.setItem("hp", 10);
    localStorage.setItem("abilityPoints", 0);
    localStorage.setItem("xpNeeded", 20);
    localStorage.setItem("hpMax", 10);
    localStorage.setItem("xp", 0);
    localStorage.setItem("gold", 0)
    localStorage.setItem("mapInit", true);
    localStorage.setItem("bossRooms", "");
}

function greyNavbar(){
    let j = document.getElementsByClassName("sidebarElement");

    if(localStorage.getItem("intro") === "true"){
        for(i=1;i<j.length;i++){
            console.log("reset "+j[i]);
            j[i].style.opacity="100%";
            j[i].style.cursor="point";
        }
    }else if(localStorage.getItem("init") === "true"){
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
}

function basePos(){
    if(localStorage.getItem("init") === "true"){
        localStorage.setItem("location", "base");
    }
}

function vilPos(){
    if(localStorage.getItem("intro") === "true"){
        localStorage.setItem("location", "village");
    }
}

switchLg();

function switchLg(){
    if(localStorage.getItem("lg") == "en"){
        document.documentElement.setAttribute('lang','en');

        document.getElementById("alertFullScreen").innerHTML = "Enter Fullscreen";
        
        document.getElementById("forest_path").title = "Path into the woods";
        document.getElementById("mine_path").title = "The road uphill";
        document.getElementById("mountain_path").title = "The small wilderness path";
        document.getElementById("mushrooms").title = "The mushrooms";
        document.getElementById("village").title = "The village";
        document.getElementById("swamp_path").title = "The small passage to the swamp";
        document.getElementById("swamp").title = "The moor";
        document.getElementById("forest").title = "The forest";
        document.getElementById("small_isle").title = "The small isles";
        document.getElementById("mountain").title = "The mountains";
        document.getElementById("mine").title = "The old mine";
        document.getElementById("bridge").title = "The long bridge";
        document.getElementById("forest_clearing").title = "A forest clearing";
        document.getElementById("flowers").title = "The big flower fields";

    } else if(localStorage.getItem("lg") == "de"){
        document.documentElement.setAttribute('lang','de');

        document.getElementById("alertFullScreen").innerHTML = "Gehe in den Vollbildschirm";
        
        document.getElementById("forest_path").title = "Der Weg in die Waelder";
        document.getElementById("mine_path").title = "Die Bergstrasse";
        document.getElementById("mountain_path").title = "Ein kleiner Wildnispfad";
        document.getElementById("mushrooms").title = "Die Pilze";
        document.getElementById("village").title = "Das Dorf";
        document.getElementById("swamp_path").title = "Trampelpfad zum Sumpf";
        document.getElementById("swamp").title = "Das Morast";
        document.getElementById("forest").title = "Der Wald";
        document.getElementById("small_isle").title = "Die kleinen Inseln";
        document.getElementById("mountain").title = "Die Berglandschaft";
        document.getElementById("mine").title = "Die alte Mine";
        document.getElementById("bridge").title = "Die lange Bruecke";
        document.getElementById("forest_clearing").title = "Eine Lichtung";
        document.getElementById("flowers").title = "Das grosse Blumenfeld";
    }
}

function changeLg(){
    if(localStorage.getItem("lg") == "en"){
        localStorage.setItem("lg", "de");
    } else if(localStorage.getItem("lg") == "de"){
        localStorage.setItem("lg", "en");
    }

    switchLg()
}

checkFullScreen();

function checkFullScreen(){
    if(localStorage.getItem("fullscreen") == "null" || localStorage.getItem("fullscreen") == null) {
        localStorage.setItem("fullscreen", false);
    }
    if(localStorage.getItem("fullscreen") == "true") {
        document.getElementById("alertFullScreen").style.visibility = "hidden";
        document.getElementById("background-div").style.visibility = "hidden";
    }else{
        document.getElementById("alertFullScreen").style.visibility = "visible";
        document.getElementById("background-div").style.visibility = "visible";
    }
}

function openFullScreen(){
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        localStorage.setItem("fullscreen", true);
        checkFullScreen();
    }
}

setCharacterImage();

function setCharacterImage(){
    if(character.gender == "F"){
        document.getElementById("characterPreviewMap").src="charaF.PNG";
    }else if(character.gender == "M"){
        document.getElementById("characterPreviewMap").src="charaM.PNG";
    }else{
        document.getElementById("characterPreviewMap").src="charaN.PNG"
    }
}

setCharacterName();

function setCharacterName(){
    document.getElementById("characternamePreview").innerHTML = localStorage.getItem("charan");
}

setCharacterXp();

function setCharacterXp(){
    if(parseInt(localStorage.getItem("xp")) < 0){
        localStorage.setItem("xp", 0);
    }

    document.getElementById("xpDisplayMap").innerHTML="Level: "+parseInt(localStorage.getItem("xp"))+"/"+parseInt(localStorage.getItem("xpNeeded")) + " xp";
}

setCharacterHp();

function setCharacterHp(){
    if(parseInt(localStorage.getItem("hp")) < 0){
        localStorage.setItem("hp", 0);
    }

    document.getElementById("hpDisplayMap").innerHTML="Hitpoints: "+parseInt(localStorage.getItem("hp"))+"/"+parseInt(localStorage.getItem("hpMax")) + " hp";
}

setCharacterGp();

function setCharacterGp(){
    if(parseInt(localStorage.getItem("gold")) < 0){
        localStorage.setItem("gold", 0);
    }

    document.getElementById("gpDisplayMap").innerHTML="Purse: "+parseInt(localStorage.getItem("gold"))+" gp";
}

getPosition(localStorage.getItem("location"));

function getPosition(currentPosition){
    character.location = currentPosition;
    if(character.location == null || character.location == "null"){
        character.location = "base";
    }else if(character.location == "base"){
        //document.getElementById("positionMarkerPC").style.margin = "24% 0% 0% -43%";
    }

    localStorage.setItem("location", currentPosition);
    setMarker();
}

function setMarker(){
    let marker = document.getElementById("posMarker");

    const positions=[
        {name: "base",
            coords: 1},
        {name: "forest_path",
            coords: 1},
        {name: "mine_path",
            coords: 1},
        {name: "mountain_path",
            coords: 1},
        {name: "mushrooms",
            coords: 1},
        {name: "village",
            coords: 1},
        {name: "swamp_path",
            coords: 1},
        {name: "swamp",
            coords: i},
        {name: "forest",
            coords: i},
        {name: "forest_clearing",
            coords: i},
        {name: "small_isle",
            coords: i},
        {name: "mountain",    
            coords: i},
        {name: "mine",
            coords: i},
        {name: "bridge",
            coords: i},
        {name: "flowers",
        coords: i}
    ];

    for(i=0;i<positions.length;i++){
        if(character.location == positions[i].name){
            positions[i].coords = document.getElementById(positions[i].name).getAttribute("coords");
            l = positions[i].coords.split(",")[0] + "px";
            t = positions[i].coords.split(",")[1] + "px";
            marker.style.top=t;
            marker.style.left=l;
        }
    }
}

function changeLocation(destination){
    if(localStorage.getItem("init") === "true"){

    }else{
        destination="base";
    }

    localStorage.setItem("village-clear", true);
    localStorage.setItem("base-clear", true);
    
    const moveto={
        //base:false,
        //forest_path:false,
        //mine_path:false,
        //mountain_path:false,
        //mushrooms:false,
        //village:false,
        //swamp_path:false,
        //swamp:false,
        //forest:false,
        //small_isle:false,
        //mountain:false,
        //mine:false,
        //bridge:false,
        //forest_clearing:false,
        //flowers:false,
    };


    let lastLocation = localStorage.getItem("location");
    let oldLocation = localStorage.getItem("lastLocation");

    if(lastLocation == "base"){
        moveto.swamp_path = true;
        moveto.forest_path = true;
        moveto.mine_path = true;
        moveto.base = true;

    }else if(lastLocation == "forest_path"){
        moveto.mountain_path = true;
        moveto.forest = true;
        moveto.base = true;
    }else if(lastLocation == "mountain_path"){
        moveto.mine_path = true;
        moveto.forest_path = true;
        moveto.mountain = true;
    }else if(lastLocation == "mine_path"){
        moveto.mountain_path = true;
        moveto.mine = true;
        moveto.flowers = true;
        moveto.base = true;
    }else if(lastLocation == "swamp_path"){
        moveto.swamp = true;
        moveto.base = true;
        moveto.village = true;
    }
    
    
    else if(lastLocation == "flowers"){
        moveto.mine_path = true;
        moveto.bridge = true;
        moveto.flowers = true;
    }else if(lastLocation == "forest"){
        moveto.forest_path = true;
        moveto.forest_clearing = true;
        moveto.forest = true;
    }else if(lastLocation == "bridge"){
        moveto.flowers = true;
        moveto.mushrooms = true;
        moveto.bridge = true;
    }else if(lastLocation == "mushrooms"){
        moveto.small_isle = true;
        moveto.bridge = true;
        moveto.mushrooms = true;
    }else if(lastLocation == "forest_clearing"){
        moveto.forest = true;
        moveto.mountain_path = true;
        moveto.forest_clearing = true;
    }
    
    else if(lastLocation == "mountain"){
        moveto.mountain_path = true;
        moveto.mountain = true;
    }else if(lastLocation == "mine"){
        moveto.mine_path = true;
        moveto.mine = true;
    }else if(lastLocation == "swamp"){
        moveto.swamp_path = true;
        moveto.swamp = true;
    }else if(lastLocation == "village"){
        moveto.swamp_path = true;
        moveto.village = true;
    }else if(lastLocation == "small_isle"){
        moveto.base = true;
        moveto.small_isle = true;
    }

    possibleDestinations = Object.keys(moveto);

    if(localStorage.getItem(localStorage.getItem("location")+"-clear")){

        console.log(localStorage.getItem("location")+"hello");
        
        for(i=0;i<possibleDestinations.length;i++){
            if(destination === possibleDestinations[i]){
                getPosition(destination);
                if(destination != lastLocation){
                    document.getElementById("mapOfDoom").src="imagemap-trans-"+lastLocation+"-to-"+destination+".png";   
                    localStorage.setItem("lastLocation", lastLocation);
                }else{
                    document.getElementById(destination).href=destination+".html";
                }
            }else if(destination == lastLocation){
                document.getElementById(destination).href="path.html";
            }else{
                document.getElementById(possibleDestinations[i]).style.visibility="hidden";
            }
        }
    }else{
        console.log(localStorage.getItem("location")+"hi");

        for(i=0;i<possibleDestinations.length;i++){
            if(destination === possibleDestinations[i]){
                getPosition(destination);
                if(oldLocation != lastLocation){
                    document.getElementById("mapOfDoom").src="imagemap-trans-"+oldLocation+"-to-"+lastLocation+".png";
                    localStorage.setItem("lastLocation", lastLocation);
                }else{
                    document.getElementById(destination).href=location+".html";
                }
            }else{
                document.getElementById(destination).href="path.html";
            }
        }
    }


    console.log("destination: "+destination)
    console.log("lastLocation: "+lastLocation);
    console.log("oldLocation: "+oldLocation);
    console.log(moveto);
    setMarker();
}

console.log(city);
console.log(character);

localStorage.setItem("location", character.location);

document.getElementById("base").setAttribute("title", city.name);