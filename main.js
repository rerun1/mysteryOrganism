const currentNumbers = [];

const pAequorFactory = (number) => {

  const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };

  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };

  const dnaArray = mockUpStrand();

  if (!currentNumbers.includes(number)) {

    currentNumbers.push(number);

    return {
      specimenNumber: number,
      dna: dnaArray,
      mutate() {
        const randomIndex = Math.floor(Math.random()*15);
        if (this.dna[randomIndex]==='A'){
          this.dna[randomIndex] = 'T';
        } else if (this.dna[randomIndex] === 'T') {
          this.dna[randomIndex] = 'C';
        } else if (this.dna[randomIndex]==='C') {
          this.dna[randomIndex] = 'G';
        } else {
          this.dna[randomIndex]='A';
        }
        return this.dna;
      },
      compareDNA(specNumObj){
        let arrayMatch = 0;
        for (let i = 0; i < 15; i++ ){
          if (this.dna[i] === specNumObj.dna[i]) {
            arrayMatch += 1;
          }
        }
        const percentageMatch = (arrayMatch/15).toFixed(2)*100;
        console.log(`there is a ${percentageMatch} percent match between these two specimens`);
      },
      willLikelySurvive(){
        let cgCount = 0;
        for (let i = 0; i < 15; i++ ) {
          if(this.dna[i] === 'C' || this.dna[i] === 'G'){
          cgCount += 1;
          }
        }
        const percentSurvive = (cgCount/15).toFixed(2)*100;
        if (percentSurvive >= 60){
          return true;
        } else {
          return false;
        }
      }
    }
  } else if (currentNumbers.includes(number)) {
      console.log("That number has already been used, please pick a new name and number");
  }
};

const createSurvivingOrganism = () => {
  let thirtySurvivors = [];
  let i = 1;

  do {
    let test = pAequorFactory(i);
    if(test.willLikelySurvive()){
      thirtySurvivors.push(test);
    }
    i++;
  } while (thirtySurvivors.length < 30);

  return thirtySurvivors;
  console.log(thirtySurvivors);
}

const survivors = createSurvivingOrganism();
