function doSolve(clauses, assignment) {
  let isSat = false;
  let suprema = false;

let assignmentExtra = [];

for (let x = 0; x < assignment.length; x++) {
  assignmentExtra[x] = '1';
}
  for (;((!isSat)&&(!suprema));) {
    let b = false;
    if(assignment == assignmentExtra){
      suprema = true;
    }
    for (let i = 0; ((i < clauses.length) && (!isSat)); i ++) {
      let aux = [];
      for (let k = 0; k <clauses[i].length; k ++) {
        let n = parseInt(clauses[i][k]);
        if (n < 0) {
          n *= -1;
        }
        if(assignment[n-1] === '0'){
          if (clauses[i][k].charAt(0) === '-') {
            aux[k] = true;
          }else{
            aux[k] = false;
          }
        }else{
          if (clauses[i][k].charAt(0) === '-') {
            aux[k] = false;
          }else{
            aux[k] = true;
          }
        }
        let clausulaX = false;
        for (let f = 0; f < aux.length; f++) {
          if(aux[f]){
            clausulaX = true;
          }
        }
      }

      if(!clausulaX){
        b = true;
      }
    }
    isSat = true;
    if(b){
      isSat = false;
      assignment = nextAssignment(assignment);
      console.log(assignment);
    }
  }
return assignment;

}