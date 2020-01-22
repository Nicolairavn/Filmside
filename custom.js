var wsurl;

function validateForm() {
	var user = document.getElementById("username"),
		pass = document.getElementById("password"),
		site = document.getElementById("site"),
		login = document.getElementById("login")
		error = document.getElementById("error");
		if(user.value === "User" && pass.value === "User"){
			site.style.display="inline-flex";
			login.style.display="none";
		}else if(user.value === "User"){
			user.style.border="2px solid #007F0E";
			pass.style.border="2px solid #7F0000";
			error.style.display="block";
		}else if(pass.value === "User"){
			user.style.border="2px solid #7F0000";
			pass.style.border="2px solid #007F0E";
			error.style.display="block";
		}else{
			error.style.display="block";
			user.style.border="2px solid #7F0000";
			pass.style.border="2px solid #7F0000";
		}
}

function showMenu() {
	var navigation = document.getElementById("navigation");
	if (navigation.style.display === "none"){
		navigation.style.display = "";	
	} else {
		navigation.style.display = "none";
	}
}

function showHome() {
	var Home = document.getElementById("Home");
	if (Home.style.display === "none"){
		Home.style.display = "block";
		Contact.style.display = "none";
		Movies.style.display = "none";
	} else {
		Home.style.display = "none";
	}
}

function showMovies() {
	var Movies = document.getElementById("Movies");
	if (Movies.style.display === "none"){
		Movies.style.display = "block";
		Contact.style.display = "none";
		Home.style.display = "none";
	} else {
		Movies.style.display = "none";
	}
}

function showContact() {
	var Contact = document.getElementById("Contact");
	if (Contact.style.display === "none"){
		Contact.style.display = "block";
		Movies.style.display = "none";
		Home.style.display = "none";
	} else {
		Contact.style.display = "none";
	}
}


Window.onload = function(){
    wsurl = "https://api.dfi.dk/v1/film?SortBy=title&Title=";
    document.getElementById("inpSearch").addEventListener("keyup", function(){
        var Searchword = document.getElementById("inpSearch").value;
        wsurl = "https://api.dfi.dk/v1/film?SortBy=title&Title=" + Searchword;
        CallWebAPI();
    });
};

function CallWebAPI(){
    fetch(wsurl, {
        method: 'get',
        headers: new Headers({
            Authorization: "Basic " + btoa('F005936:JRbTlfWVMH0bm3n')
        })
    }).then(function(response){
        return response.json();

    }).then(function(jsonsvar){
        console.log(jsonsvar);
        OutputData(jsonsvar);
        
    }).catch(function(error){
        console.log("An error occured");
        alert("ERROR!");
    })
};

function OutputData(jsondata){
    var Searchresult = "";
    for (var x in jsondata.FilmList){
        Searchresult += "<div>" + jsondata.FilmList[x].Title + " (" + jsondata.FilmList[x].ReleaseYear + ")" + "</div>";
    }

    document.getElementById("resultat").innerHTML = Searchresult;
};

