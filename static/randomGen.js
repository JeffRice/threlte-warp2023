function createRandomGrid(){

    let holdingArr = []
      // for each row
      for(let i=0;i<32;i++){

        let currentRow=0
        while(currentRow < 5){
        //      console.log(i, (i*-2) )
          let cubeType = "normal"
          let randomHundo = getRandomInt(101)
      
          if(randomHundo>18){
          // skip
          }
          else{
    
            if(randomHundo<10&&randomHundo>5){
                cubeType = "blackCube"
                }
            if(randomHundo<5){
                cubeType = "bomb"
                }


            let randomSpot = {
                'x': -2 + (i*-4),
                "z": 8+(currentRow*4),
                "cubeType": cubeType
              }
    
           //   console.log(randomHundo, randomSpot)
              holdingArr.push(randomSpot)
          }
        
  
  
            currentRow++
          }
        }

     //   console.log('arr', holdingArr)
     return holdingArr
            
  }

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let testGroupA = createRandomGrid()
  let testGroupB = createRandomGrid()
  let testGroupC = createRandomGrid()

let randomLevelObj = {
    testGroupA,
    testGroupB,
    testGroupC
}

console.log(JSON.stringify(randomLevelObj))