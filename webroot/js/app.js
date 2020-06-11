//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here

var regions = {};
var subregions = {};

Object.size = function(obj) { //code used to determine size of object. I don't claim to own this code, this specific function was found on stack exchange.
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//formats the data for the page, fills in the html table with REST data
function PrintResults(item, index){
	var languages;
	for(var i = 0; i < item.languages.length; i++){
		if(i==0){
			languages = item.languages[i].name;
		}
		else{
			languages += ", ";
			languages += item.languages[i].name;
		}
	}
	
	document.getElementById("information").innerHTML += "<tr><th><img src=" + item.flag + " width=500 height= 300> </img></th><th>" + "Name: " + item.name + "<br>Alpha Code 2: " + item.alpha2Code + "<br>Alpha Code 3: " + item.alpha3Code + "<br>Region: " + item.region + "<br>Subregion: " + item.subregion + "<br>Population: " + item.population + "<br>Language(s): " + languages;

	//add to object key value pairs tracking regions/subregions
	if(item.region in regions){
			regions[item.region] ++;
		}
	else{
			regions[item.region] = 1;
		}
		
	if(item.subregion in subregions){
		subregions[item.subregion] ++;
	}
	else{
		subregions[item.subregion] = 1;
	}
		document.getElementById("information").innerHTML += " </th></tr>";
}

//prints information about # countries, regions, and subregions at bottom of page
function PrintRegionResults(){
	var regionCount = "";
	var subregionCount = "";
	for(let[key, value] of Object.entries(regions)){
		regionCount += key + ": " + value + " <br>";
	}
	for(let[key, value] of Object.entries(subregions)){
		subregionCount += key + ": " + value + " <br>";
	}
	document.getElementById("data").innerHTML += "<tr><th>Countries In Region " + "<br>" + regionCount + "</th><th>Countries In Subregion<br>" + subregionCount + "</th></tr>";

	regions = {};
	subregions = {};
}

//Call from html to php (and back) starts here!
$(document).ready(function(){
	var request;

	$('#countrySearch').submit(function(e){//calls when submit button is pressed
		e.preventDefault(); 					//prevents default form submit.
		var $form = $(this); 					//entered form data
		var $input = $form.find("input, select, button, textarea");
		var serializedData = $form.serialize();
		$input.prop("disabled", true); 				//disable input while request is happening
   
		request = $.ajax({    //fetches data from index.php
			url:'http://localhost:8765/api/index.php',
			type: "post",
			data:serializedData,
			dataType: 'json',
		});
   
		request.done(function(response, textStatus, jqXHR){ //successful request
			document.getElementById("data").innerHTML = "";        //clear old data on html file
			document.getElementById("information").innerHTML = ""; //clear old data on html file
			response.forEach(PrintResults);
			document.getElementById("data").innerHTML = "<tr><th colspan=2>Total Countries: " + Object.size(response) + "</th></tr>";
			PrintRegionResults();
	   
		});
   
		request.fail(function(response, textStatus, errorThrown){//errored request
			document.getElementById("information").innerHTML = "";
			document.getElementById("data").innerHTML = "No results. Please enter a country partial or full name, or an alpha code.";
			console.error("Error: " + textStatus, errorThrown + " Data: " + response);
		});

		request.always(function(){
			$input.prop("disabled", false);
		});
	});
});