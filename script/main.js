/** Global variables **/
var vocabList;
var selectedActivity = 0;
var isVocabLack = false;
var vocabNumElems;
var selectedCategory = 0;
var selectedFilter = null;

var vocabLackMsg = "At least <b>3</b> vocabulary items are needed to run de application";
var showVocabTitle = "Show Vocabulary";
var newVocabTitle = "Add New Vocabulary";
var eng2SpaTitle = "English -> Spanish";
var guessMeanTitle = "Guess The Meaning";

/** Initialize the program **/
function loadApp(){

	// Load de JSON file containing all the vocabulary learned during de course
	vocabList = data;
	vocabNumElems = vocabList.length;
	
	countVocabTypes(); // To erase
	
	var welcomeMsg = "Welcome to the FCE Training Engine. At this moment you have <b>" + vocabNumElems + "</b> words available to play with";
	var initTitle = "Start Page";
	console.log(vocabList);
	
	setElemText("titleMenu", initTitle);
	setElemText("statement", welcomeMsg, true);
	
	hideElement("dropListGroup");
	hideElement("form");
	hideElement("answerBox");
	
	if(vocabNumElems >= 3){
		console.log("OK");
	}else{
		vocabLack();
	}
	
}

/** Load 'Show Vocabulary' section **/
function showVocabulary(){

	selectedActivity = 1;
	
	shineOnLeftMenu();
	
	setElemText("titleMenu", showVocabTitle);
	unimplementedWarning();
	
	hideElement("dropListGroup");
	hideElement("form");
	hideElement("answerBox");
}

/** Load 'New Vocabulary' section **/
function newVocabulary(){

	selectedActivity = 2;
	
	shineOnLeftMenu();
	
	setElemText("titleMenu", newVocabTitle);
	unimplementedWarning();
	
	hideElement("dropListGroup");
	hideElement("form");
	hideElement("answerBox");
	
}

/** Load 'English -> Spanish' section **/
function eng2Spa(){

	selectedActivity = 3;

	shineOnLeftMenu();
	
	setElemText("titleMenu", eng2SpaTitle);
	
	enableElement("selectCat");
	enableElement("selectFilt");
	showElement("startButton");
	
	if(!isVocabLack){
		/* Vocabulary loaded correctly */
		
		loadCategories();
		
		showElement("dropListGroup");
		hideElement("dropListFilt");
		document.getElementById("dropListGroup").style.display = "flex";
	
		var statement = document.getElementById("statement");
		statement.style.color="black";
		statement.innerHTML = "Everything went as expected :)";
	
	}else{
		/* Failed to load vocabulary */
		
		hideElement("dropListGroup");
		
		// Info message in statement block
		var statement = document.getElementById("statement");
		statement.innerHTML = vocabLackMsg + ". At this moment only <b>" + vocabList.length + "</b> are available";
		statement.style.color="red";
		statement.style.textAlign = "center";
		
		hideElement("dropListGroup");
		hideElement("form");
		hideElement("answerBox");
	
	}
}

/** Load 'Guess The Meaning' section **/
function guessMean(){

	selectedActivity = 4;

	shineOnLeftMenu();
	
	setElemText("titleMenu", guessMeanTitle);
	unimplementedWarning();
	
	hideElement("dropListGroup");
	hideElement("form");
	hideElement("answerBox");
	
}

/** Notify about lack of vocabulary **/
function vocabLack(){

	isVocabLack = true;
	
	if(selectedActivity > 0){
	
		// Error message in statement block
		var statement = document.getElementById("statement");
		statement.innerHTML = vocabLackMsg;
		statement.style.color="red";
		statement.style.textAlign = "center";
		
		// Hide form
		var form = document.getElementById("form");
		form.style.display = "none";
		
		// Hide answer box
		var answer = document.getElementById("answerBox");
		answer.style.display = "none";
	
	}
}

/** Hide Element **/
function hideElement(elemId){

	var elem = document.getElementById(elemId);
	elem.style.display = "none";
	
}

/** Show Element **/
function showElement(elemId){

	var elem = document.getElementById(elemId);
	elem.style.display = "block";
	
}

/** Disable Element **/
function disableElement(elemId){

	var elem = document.getElementById(elemId);
	elem.disabled = true;
	
}

/** Enable Element **/
function enableElement(elemId){

	var elem = document.getElementById(elemId);
	elem.disabled = false;
	
}

/** Unimplemented Warning **/
function unimplementedWarning(){

	var statement = document.getElementById("statement");
	statement.innerHTML = "Unimplemented content. It might be available in the future";
	statement.style.color="blue";
	statement.style.textAlign = "center";
}

/** Set text in a element **/
function setElemText(elem, text, centered){
	
	var titleMenu = document.getElementById(elem);
	titleMenu.innerHTML = text;
	
	if(centered !== undefined && centered)
		statement.style.textAlign = "center";
	
}

/** Shine on the selected element on the left menu **/
function shineOnLeftMenu(){

	var showVocab = document.getElementById("showVocab");
	showVocab.style.backgroundColor = "#C4B9B9";
	
	var newVocab = document.getElementById("newVocab");
	newVocab.style.backgroundColor = "#C4B9B9";
	
	var eng2Spa = document.getElementById("eng2Spa");
	eng2Spa.style.backgroundColor = "#C4B9B9";
	
	var guessMean = document.getElementById("guessMean");
	guessMean.style.backgroundColor = "#C4B9B9";
	
	// Shine on choosen element if some has been selected
	
	if(selectedActivity == 1){
		showVocab.style.backgroundColor = "grey";
	}else if(selectedActivity == 2){
		newVocab.style.backgroundColor = "grey";
	}else if(selectedActivity == 3){
		eng2Spa.style.backgroundColor = "grey";
	}else if(selectedActivity == 4){
		guessMean.style.backgroundColor = "grey";
	}

}

/** Category droplist change event **/
function categoryChanged(){

	var myselect = document.getElementById("selectCat");
	selectedCategory = myselect.options[myselect.selectedIndex].value;
	
	if(selectedCategory === "0"){
		hideElement("dropListFilt");
		selectedFilter = null;
	}else{
		showElement("dropListFilt");
		
		// Depending on category load a list
		if(selectedCategory == "1"){
			loadUnits();
		}else if(selectedCategory == "2"){
			loadPhrasalVerbs();
		}
		
	}
		
}

/** Filter droplist change event **/
function filterChanged(){

	var myselect = document.getElementById("selectFilt");
	selectedFilter = myselect.options[myselect.selectedIndex].value;

}

/** Add a list of categories **/
function loadCategories(){

	var select = document.getElementById("selectCat");
	select.options.length = 0;
	
	select.options[select.options.length] = new Option('All', '0', false, false);
	select.options[select.options.length] = new Option('Unit', '1', false, false);
    select.options[select.options.length] = new Option('Phrasal Verbs', '2', false, false);
	
}

/** Add a list of units to de filter droplist**/
function loadUnits(){

	var select = document.getElementById("selectFilt");
	select.options.length = 0;
	
	select.options[select.options.length] = new Option('All', '0', false, false);
    select.options[select.options.length] = new Option('Brands and Fans', '1', false, false);
	select.options[select.options.length] = new Option('Relative Values', '2', false, false);
	select.options[select.options.length] = new Option('Things That Matter', '3', false, false);
	select.options[select.options.length] = new Option('Battling Nature', '4', false, false);
	select.options[select.options.length] = new Option('Eat Your Heart Out!', '5', false, false);
	select.options[select.options.length] = new Option('On Camera', '6', false, false);
	select.options[select.options.length] = new Option('A Home From Home', '7', false, false);
	select.options[select.options.length] = new Option('Moving on', '8', false, false);
	select.options[select.options.length] = new Option('Lucky Break?', '9', false, false);
	select.options[select.options.length] = new Option('Virtual Friends', '10', false, false);
	select.options[select.options.length] = new Option('Living On The Edge', '11', false, false);
	select.options[select.options.length] = new Option('Crime Scene', '12', false, false);
	select.options[select.options.length] = new Option('Who Are You Again?', '13', false, false);
	select.options[select.options.length] = new Option('Say What You Mean', '14', false, false);
	
}

/** Add a list of types of phrasal verbs **/
function loadPhrasalVerbs(){
	
	var select = document.getElementById("selectFilt");
	select.options.length = 0;
	
	select.options[select.options.length] = new Option('All', '0', false, false);
    select.options[select.options.length] = new Option('A', '1', false, false);
	select.options[select.options.length] = new Option('B', '2', false, false);
	select.options[select.options.length] = new Option('C', '3', false, false);
	select.options[select.options.length] = new Option('D', '4', false, false);
	select.options[select.options.length] = new Option('E', '5', false, false);
	select.options[select.options.length] = new Option('F', '6', false, false);

}

/** Start button functionality **/
function startButton(){
	
	hideElement("startButton");
	disableElement("selectCat");
	disableElement("selectFilt");
	alert("Selected Category: " + selectedCategory + " - Selected Filter: " + selectedFilter);

}

/** Count vocab types **/
function countVocabTypes(){

	var regular = 0;
	var phrasal = 0;
	var acceptions = 0;
	var error = 0;

	for(var i=0; i<data.length; i++){
		if(data[i].unit !== undefined){
			regular++;
		}else if(data[i].phrasal !== undefined){
			phrasal++;
			acceptions += data[i].def.length;
		}else{
			error++;
		}
	}
	
	alert("Regular: " + regular + " - Phrasal: " + phrasal + " - Acceptions: " + acceptions + " - Total: " + data.length);
}
