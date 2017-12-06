var fileName = 'hole4.cnf';

  let formula = readFormula(fileName)
  if (formula === 'dsfsafa') {
    console.log('< isSat: false, satisfyingAssignment: null>')
  } else {
  let result = doSolve(formula.clauses, formula.variables)
  console.log(result);
  }

function nextAssignment(currentAssignment){
let decimal = parseInt(currentAssignment.join(''), 2);
let next = (decimal+1).toString(2);
for (var i = currentAssignment.length-next.length; i > 0; i--) {
	next = '0'+next;
}
let newAssgnment =  next.split('');
return newAssgnment;
}

function doSolve(clauses, assignment) {
  let isSat = false;
  let suprema = false;

let assignmentsuprema = [];
 
for (let y = 0; y < assignment.length; y++) {
  assignmentsuprema[y] = '1';
}

  while ((!isSat)&&(!suprema)) {
    let falso = false;
    let falsiane = true;

for(let e = 0;e < assignment.length && falsiane;e++){
	if(assignment[e]!=assignmentsuprema[e]){
		falsiane = false;
	}
}
suprema = falsiane;

    for (let i = 0; ((i < clauses.length) && (!isSat)); i ++) {
      let Bclausula = [];

      for (let k = 0; k <clauses[i].length; k ++) {
        let n = parseInt(clauses[i][k]);
        if (n < 0) {
          n -= n + n;
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
for (var w = 0; w < text.length; w++) {
	if(text[w].charAt(0)==='p'){ 
	data = text[w].split(' ');
	var VAR = data[2];
	var CLAUSES = data[3];
}
}
return (clauses.length == CLAUSES)&&(variables.length == VAR)
}

function readFormula(fileName) {
  const fs = require('fs');
  let x = ''+fs.readFileSync(fileName, 'utf8');
  let text = x.split('\n');
  let clauses = readClauses(text);
  let variables = readVariables(clauses);
  

  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  if (specOk) {
    return result
  } else {
    return 'dsfsafa'
  }
}

function readVariables(clauses){
  var add =  ['a'];
  var z = -1;
  for (var i = 0; i < clauses.length; i++) {
  	  for(var f = 0; f < clauses[i].length; f++) {
		  var achou = false;
		  for(var n = 0; n < add.length && !achou; n++) {
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