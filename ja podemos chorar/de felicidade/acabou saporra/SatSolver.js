var fileName = 'simple2.cnf';

  let formula = readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  console.log(result);


function nextAssignment(currentAssignment){
let decimal = BinToDec(currentAssignment.join(''));
let next = DecToBin(decimal+1);
for (var i = currentAssignment.length-next.length; i > 0; i--) {
	next = '0'+next;
}
let newAssgnment =  next.split('');
return newAssgnment;
}

function doSolve(clauses, assignment) {
  let isSat = false;
  let suprema = false;

var assignmentsuprema = [];

for (var algumacoisa = 0; algumacoisa < assignment.length; algumacoisa++) {
  assignmentsuprema[algumacoisa] = '1';
}
  for (;((!isSat)&&(!suprema));) {
    var falso = false;
    var falsiane = true;
for(var e = 0;e < assignment.length;e++){
	if(assignment[e]!=assignmentsuprema[e]){
		falsiane = false;
	}
}
suprema = falsiane;
    for (let i = 0; ((i < clauses.length) && (!isSat)); i ++) {
      var Bclausula = [];
      for (let k = 0; k <clauses[i].length; k ++) {
        let n = parseInt(clauses[i][k]);
        if (n < 0) {
          n -= n + n;/*tempo de execução*/
        }
        if(assignment[n-1] === '0'){
          if (clauses[i][k].charAt(0) === '-') {
            Bclausula[k] = true;
          }else{
            Bclausula[k] = false;
          }
        }else{
          if (clauses[i][k].charAt(0) === '-') {
            Bclausula[k] = false;
          }else{
            Bclausula[k] = true;
          }
        }
        var Vclausula = false;
        for (let f = 0; f < Bclausula.length; f++) {
          if(Bclausula[f]){
            Vclausula = true;
          }
        }
      }

      if(!Vclausula){
        falso = true;
      }
    }
    isSat = true;
    if(falso){
      isSat = false;
      console.log(assignment);
      assignment = nextAssignment(assignment);
    }
  }
let result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}
  
function checkProblemSpecification(text, clauses, variables) {
var master2 = [];
var pos = -1;

for (var w = 0; w < text.length; w++) {
	if(text[w].charAt(0)==='p'){
	data = text[w].split(' ');
	var VAR = data[2];
	var CLAUSES = data[3];
}
}
  for (var i = 0; i < text.length; i++) {
	  if ((text[i].charAt(0)!=='c')&&(text[i].charAt(0)!=='p')&&(text[i]!=='')){
		  pos++;
		  master2[pos] = text[i];
	  }
	  }
return (master2.length == CLAUSES)&&(variables.length == VAR)
}

function readFormula(fileName) {
  const fs = require('fs');
  var x = ''+fs.readFileSync(fileName);
  let text = x.split('\n');
  let clauses = readClauses(text);
  let variables = readVariables(clauses);
  

  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
}

function readVariables(clauses){
  var add =  ['a'];
  var z = -1;
  for (var i = 0; i < clauses.length; i++) {
  	  for(var f = 0; f < clauses[i].length; f++) {
		  var achou = false;
		  for(var n = 0; n < add.length; n++) {
			  if(clauses[i][f].charAt(0)==='-'){
				  var beta = clauses[i][f].replace('-','');
			  }else{
				  var beta = clauses[i][f];
			  }
			  if(add[n]===beta){
				  achou = true;
			  }
		  }
		  if(!achou){
			  z++;
			  add[z] = beta;
		  }
	  }
  }
/*caso queira as variaveis do eito que elas são basta apagar tudo abaixa e 
adicionar "console.log(add);"*/
  for (var p = 0; p < add.length; p++) {
	  add[p] = '0';
  }
  return add;
}

function readClauses(text){
  var vars = [];
  var vars2 = []
  var parametro = -1;
  var master ='';
  x = 0;
  for (var i = 0; i < text.length; i++) {
	  if ((text[i].charAt(0)!=='c')&&(text[i].charAt(0)!=='p')&&(text[i]!=='')){
		  if(master === ''){
			  master = master.concat(text[i]);
		  }else{
		  master = master.concat(' '+text[i]);
	  }
	  }
	  }
	  var final = master.split(' ');
	  for (var f = 0; f < final.length; f++) {
		  if(final[f]!=0){
			  vars2[x] = final[f];
			  x++;
		  }else if(final[f]==''){
			  
		  }else{
			  x = 0;
			  parametro++;
			  vars[parametro] = vars2;
			  vars2 = [];
		  }
	  }
		  return(vars);
}

function BinToDec(algo){
  var res = 0;

  for (var i = algo.length-1; i >= 0; i--) {
	  if(algo.charAt(i)==1){
		  res += Math.pow(2, algo.length - 1 - i);
	  }
  }
  return res;
}

function DecToBin(numero){
  var binario = '';
  var achou = false;
  for (var i = 0; (i != -1)&&(!achou) ; i++) {
	  if(Math.pow(2,i)>numero){
		  achou = true;
	  }
  }
  for (var alfa = i-2; (alfa >= 0)&&(numero!=0); alfa--) {
	  if(numero - Math.pow(2,alfa) == 0){
		  numero -= Math.pow(2,alfa);
		  binario += '1';
		  for (;alfa > 0; alfa--) {
			  binario += '0';
		  }
	  }else if(numero - Math.pow(2,alfa) < 0){
		    binario += '0';
	  }else{
		  numero -= Math.pow(2,alfa);
		  binario += '1';
	  }
  }
  return binario;
}
