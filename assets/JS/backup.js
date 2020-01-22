
var wsurl;

Window.onload = function(){
    wsurl = "https://api.dfi.dk/v1/film?SortBy=title&Title=";
    document.getElementById("inpSoeg").addEventListener("keyup", function(){
        var soegeord = document.getElementById("inpSoeg").value;
        wsurl = "https://api.dfi.dk/v1/film?SortBy=title&Title=" + soegeord;
        KaldWebservice();
    });
    //CallWebAPI();
};

function KaldWebservice(){
    fetch(wsurl, {
        method: 'get',
        headers: new Headers({
            Authorization: "Basic " + btoa('F005936:JRbTlfWVMH0bm3n')
        })
    }).then(function(response){
        return response.json();

    }).then(function(jsonsvar){
        console.log(jsonsvar);
        UdskrivData(jsonsvar);
        
    }).catch(function(error){
        console.log("An error occured");
        alert("ERROR!");
    })
};

function UdskrivData(jsondata){
    var soegeresultat = "";
    for (var x in jsondata.FilmList){
        soegeresultat += "<div>" + jsondata.FilmList[x].Title + " (" + jsondata.FilmList[x].ReleaseYear + ")" + "</div>";
    }

    document.getElementById("resultat").innerHTML = soegeresultat;
};
