<?php 
header('Content-Type: application/json');


function SortByPopulation($object1, $object2){ //function that sorts array by population size
return $object1["population"] < $object2["population"];
}


$namePart = isset($_POST['pname'])?$_POST['pname'] : null; //gets value from ajax call
if($namePart != null){


//define the urls to check
$namePart_url = "https://" .
			"restcountries.eu/" .
			"rest/v2/name/" . rawurlencode($namePart) .
			"?fields=name;alpha2Code;alpha3Code;region;subregion;flag;population;languages";

$nameFull_url = "https://" .
				"restcountries.eu/" .
				"rest/v2/name/" . 
				rawurlencode($namePart) . 
				"?fullText=true&fields=name;alpha2Code;alpha3Code;region;subregion;flag;population;languages";
				
$code_url = "https://" .
			"restcountries.eu/" .
			"rest/v2/alpha/" . rawurlencode($namePart) .
			"?fields=name;alpha2Code;alpha3Code;region;subregion;flag;languages;population";
	
//define the headers to check before requesting data
$part_file_header=@get_headers($namePart_url);
$full_file_header=@get_headers($nameFull_url);
$code_file_header=@get_headers($code_url);

//if the header has an error of some kind, then check a different url. If none of them work, the input from the user is invalid
if($full_file_header && $full_file_header[0] != 'HTTP/1.1 404 '){
	$info_json = file_get_contents($nameFull_url);
}
else if($code_file_header && $code_file_header[0] != 'HTTP/1.1 400 ' && $code_file_header[0] != 'HTTP/1.1 404 '){
	$info_json = file_get_contents($code_url);
}
else if($part_file_header && $part_file_header[0] != 'HTTP/1.1 404 '){
	$info_json = file_get_contents($namePart_url);
}
else{
	//error! user input is invalid
}
	
if(isset($info_json)){
	$info_array = json_decode($info_json, true);//turns json into array to sort
		
	//for some reason the data when searching by code instead of name is formatted differently
	//in the REST API. This fixes that issue.
	if(!isset($info_array[0]["population"])){
		$fixed_array = [];
		array_push($fixed_array, $info_array);
		$info_array = $fixed_array;
	}
	
	//sort array by function defined above
	usort($info_array, 'SortByPopulation');

	//send sorted information back to js file
	echo json_encode($info_array);
}
else{
	echo "Error. Please enter a valid Country Name, Full Name, or Code.";
}
}

?>