const city ={
    name: ""
};

const character ={
    name: "",
    gender: ""
};

if(localStorage.getItem("lg") == null){
    localStorage.setItem("lg", "en");
}

if(localStorage.getItem("gameOver")){
    alert("GAME OVER");
    localStorage.clear();
}

greyNavbar();

function greyNavbar(){
    let j = document.getElementsByClassName("sidebarElement");
    for(i=1;i<j.length;i++){
        j[i].style.opacity="50%";
        j[i].href="";
        j[i].style.cursor="no-drop";
    }
}

checkFullScreen();

function checkFullScreen(){
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

function switchLg(){
    if(localStorage.getItem("lg") == "en"){
        document.documentElement.setAttribute('lang','en');

        document.getElementById("citynameText").innerHTML = "Give your city a name";
        document.getElementById("characternameText").innerHTML = "Give your character a name";
        document.getElementById("charactergenderText").innerHTML = "What is your characters gender?";
        document.getElementById("switchLgText").innerHTML = "Switch language";
        document.getElementById("lg").innerHTML = "DE";
        document.getElementById("startText").innerHTML = "Click to start";
        document.getElementById("genderMarkerText").innerHTML = "F M N";
    } else if(localStorage.getItem("lg") == "de"){
        document.documentElement.setAttribute('lang','de');

        document.getElementById("citynameText").innerHTML = "Gib deiner Stadt einen Namen";
        document.getElementById("characternameText").innerHTML = "Gib deinem Character einen Namen";
        document.getElementById("charactergenderText").innerHTML = "Welches Geschlecht hat dein Character?";
        document.getElementById("switchLgText").innerHTML = "Wechsle die Sprache";
        document.getElementById("lg").innerHTML = "EN";
        document.getElementById("startText").innerHTML = "Klicke um zu starten";  
        document.getElementById("genderMarkerText").innerHTML = "W M D";
    }
    skipTutorial();
}

function changeLg(){
    if(localStorage.getItem("lg") == "en"){
        localStorage.setItem("lg", "de");
    } else if(localStorage.getItem("lg") == "de"){
        localStorage.setItem("lg", "en");
    }

    switchLg()
}

function helloWorld()
{
    localStorage.clear();
    alert("hello world");
}

function setCharacterPreview(){
    let j = document.getElementsByClassName("gender");
    let checked = 0;


    for(let i = (j.length - 1); i > 0; i--){

        for(let i = 0; i < j.length; i++){
            //console.log(document.getElementById(`${document.getElementById(j[i]).getAttribute("id")}`)); <= mein versuch j[i] auszudruecken einfach zu huebsch um es zu loeschen

            if(j[i].checked == true){
                checked++;
                document.getElementById("characterPreview").style.visibility = "visible";
            }
            if(checked > 2){
                j[i].checked = false;
            }
        }

    }
    checked = 0;

    if(document.getElementById("genderF").checked){
        character.gender = "F";
        document.getElementById("characterPreview").src="charaF.png";
    }else if(document.getElementById("genderM").checked){
        character.gender = "M";
        document.getElementById("characterPreview").src="charaM.png";
    }else if(document.getElementById("genderN").checked){
        character.gender = "N";
        document.getElementById("characterPreview").src="charaN.png";
    }else{
        document.getElementById("characterPreview").style.visibility = "hidden";
    }

    localStorage.setItem("charag", character.gender);
}

function setInitials()
{
    if(localStorage.getItem("city") == null)
    {
        if((document.getElementById("cityname").value === null) || (document.getElementById("cityname").value === ""))
        {
            localStorage.setItem("cityn", "Darmstadt");
            console.log(localStorage.getItem("cityn"));
        }else{
            city.name = document.getElementById("cityname").value;
            cityname = city.name;
            localStorage.setItem("cityn", cityname);
            console.log(localStorage.getItem("cityn"));
        }

        if((document.getElementById("charactername").value === null) || (document.getElementById("charactername").value === ""))
        {
            localStorage.setItem("charan", "Björn Hamburger");
            console.log(localStorage.getItem("charan"));
        }else{
            character.name = document.getElementById("charactername").value;
            charactername = character.name;
            localStorage.setItem("charan", charactername);
            console.log(localStorage.getItem("charan"));
        }

        if(localStorage.getItem("charag") == null || localStorage.getItem("charag") == "null"){
            character.gender = "N"
            localStorage.setItem("charag", "N");
        }
    }else{
        alert("Du hast bereits eine Stadt");
    }

    localStorage.removeItem("fullscreen");
}