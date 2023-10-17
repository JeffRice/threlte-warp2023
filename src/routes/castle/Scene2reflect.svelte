<script lang="ts">
import { useLoader } from '@threlte/core'
import { TextureLoader } from 'three'
import {  T, useFrame, useThrelte } from '@threlte/core'
import { OrbitControls, interactivity  } from '@threlte/extras'
import { onMount } from 'svelte'
import { Clock } from 'three'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js/dist/tween.esm.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import { transitions } from '@threlte/extras'
// import  from './stores.js';
import { Audio, AudioListener } from '@threlte/extras'
import type { Material, Mesh } from 'three'

const BM_texture3 = useLoader(TextureLoader).load('./black_marbleDark.png')
const BM_texture2 = useLoader(TextureLoader).load('./black_marble2.png')


/* $: $gameMode, checkGameMode(); */


let stats = new Stats(); 
let container = document.querySelector('#tester')
container.appendChild( stats.dom );
for (const child of container.children) {
child.setAttribute('style', 'position: relative; display: none;');
//  child.setAttribute('style', 'display: none;');
}

let light
let showCube = true
let showCubes = {}
let currentLevel = 0
let gridShiftCooldown = true
let tickerRunning = false
let activeSpots = new Set()
let droppingRow = false
let droppingQueue = []
let rotation = 0
let currentLocation = [10, 2, 16]
let droppedRows = 0
let ticker
let importedControls
let controlsComponent
let enablePause = false
let cubesInLevel = 0
let timeoutHandle


let deletedSpots = new Set()

let startingGridA
let startingGridB
let startingGridC



// backup original grid positions and quaternions
let startingGridAPosition
let startingGridBPosition
let startingGridCPosition

let startingGridAQuaternion
let startingGridBQuaternion
let startingGridCQuaternion

let startingGridARotation
let startingGridBRotation
let startingGridCRotation

let startingGroupAPos 
let startingGroupBPos 
let startingGroupCPos 
let startingGroupAQ 
let startingGroupBQ 
let startingGroupCQ 
    

$: showCubes = showCubes

$: activeSpots = activeSpots




$:  checkTrue = () => {
let rotatingCursors = scene.children.filter(x => x.name==='rotatingCursor')

  if(rotatingCursors){
    for(const item of rotatingCursors){
      item.rotation.y = rotation*2
    }
  }

  

  if(droppedRows + droppingQueue.length>59){
    //  console.log('end game early.')
      gameMode.update(n => 'over');
      gameMenu.update(n => true);
      recap.update(n => true);
      droppingQueue = []
      droppedRows = 0
  }

  if(droppedRows===60){
    //  console.log('end game.')
      gameMode.update(n => 'over');
      gameMenu.update(n => true);
      recap.update(n => true);
      droppingQueue = []
  }

}


transitions()
interactivity()
const {  scene } = useThrelte()



useFrame((state, delta) => {
  rotation += delta
  checkTrue()
  TWEEN.update()
   stats.update()
   light.position.set( currentLocation[0], currentLocation[1], currentLocation[2]  );

   let pCam = scene.children.filter(x => x.name==='pCamera')        
   if(pCam[0].children.length){ 
     //  // //console.log('songAudio', pCam[0].children[0])
     // pCam[0].children[0].gain.gain.value=$storeMusicVolume
   }
  

    if(droppingQueue.length){

      //only a test
      if(!droppingRow){
        //console.log('space dropping row', droppingRow, droppingQueue)
            // set flag for length of tween
            droppingRow = true
          setTimeout(() => {
          
            droppingRow = false
          }, 1500); //enough time to run the transition effect

          dropLastRow()
      }


    }

})




      const geometry = new THREE.BoxGeometry( 4, 25, 20.2 ); 
      const material = new THREE.MeshBasicMaterial( {color: 'black'} ); 
      const baseCube = new THREE.Mesh( geometry, material ); 



      const testmaterial = new THREE.ShaderMaterial({
uniforms: {
  color1: {
    value: new THREE.Color("BlueViolet")
  },
  color2: {
      value: new THREE.Color("DarkSlateBlue")
      
  }
},
vertexShader: `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`,
fragmentShader: `
  uniform vec3 color1;
  uniform vec3 color2;

  varying vec2 vUv;
  
  void main() {
    
    gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
  }
`,
// wireframe: true
  transparent: true,

});


const uniforms = { type: 't', value: BM_texture3};

const materialPlus = new THREE.ShaderMaterial({  
      uniforms: { type: 't', value: BM_texture3},
      vertexShader: testmaterial.vertexShader,
      fragmentShader: testmaterial.fragmentShader
});

const vertexShader = testmaterial.vertexShader
const fragmentShader = testmaterial.fragmentShader





/* 
let baseCubes=[]
    for(let i=-35; i< 25; i++){
      baseCubes[i] = new THREE.Mesh( geometry, testmaterial ); 
      baseCubes[i].name='baseRow' 
      baseCubes[i].position.y = -22.5;
      baseCubes[i].position.z = 16;
      baseCubes[i].position.x = 62 + (4*i);
      baseCubes[i].layers.enable( 0 )
      baseCubes[i].layers.enable( 1 )
      scene.add( baseCubes[i] );
    }
 */



let testClock = new Clock()
testClock.start()

function removeItem (e) {
  // //console.log('Mesh has been clicked!')
  // //console.log(e.object)
  e.object.removeFromParent()
}




function onKeyDown(e) {


    if(e.ctrlKey && e.key==='r' || e.key==='F5'){
      location.reload()
    }


    if(e.key==='w'){
        currentLocation[0]-=4  
    }

    if(e.key==='a'){
        currentLocation[2]+=4
    }


    if(e.key==='s'){
        currentLocation[0]+=4
    }

    if(e.key==='d'){
        currentLocation[2]-=4  
    }








  let pCam = scene.children.filter(x => x.name==='pCamera')
  let currentX = currentLocation[0]+50
  let currentZ = currentLocation[2]

  if(pCam[0].position.x!= currentX || pCam[0].position.z!= currentZ){
      updateCamPos()
  }



}


  function updateCamPos(){
    let pCam = scene.children.filter(x => x.name==='pCamera')
   let currentX = currentLocation[0]+45

if(pCam[0].position.x!=currentX){
   //console.log('update X')
   new TWEEN.Tween(pCam[0].position)
               .to({x: currentX}, 1000)
               .easing(TWEEN.Easing.Sinusoidal.InOut)
               .start();
 }

 let currentZ = currentLocation[2]

 if(pCam[0].position.z!=currentZ){
   //console.log('update Z')
   new TWEEN.Tween(pCam[0].position)
               .to({z: currentZ}, 1000)
               .easing(TWEEN.Easing.Sinusoidal.InOut)
               .start();
 }

  }


  function playCaptureSound(){
    let pCam = scene.children.filter(x => x.name==='pCamera')
    const listener = pCam[0].children[0]

    const capture = new THREE.Audio( listener );
    capture.name="charge"
    // //console.log('strangerSong', strangerSong)
        
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
        
    audioLoader.load( 'swoosh-5.mp3', function( buffer ) {
      capture.setBuffer( buffer );
      capture.setLoop( false );
      capture.setVolume( 0.35 );
      capture.setPlaybackRate( 1 );
      capture.play();
    });
  }







/* var plane=[];
var qty=12;
var hz_qty=20;
var vt_qty=5;
var half_hz=(qty*hz_qty)/2;
const gridB = new THREE.Group();
gridB.name='gridB';
for(let p=1;p<=qty;p++){
plane[p]=new THREE.GridHelper(hz_qty,vt_qty,'#666','#666');
plane[p].name='grid' + p
plane[p].position.set(-half_hz+(hz_qty*p)-hz_qty/2,0.01,16);
gridB.add(plane[p]);
// scene.add(plane[p]);
}

scene.add(gridB);
gridB.position.x=40
gridB.position.y=0.1
 */
function doWave(){
  let baseRows = scene.children.filter(x => x.name==='baseRow')
  let i = 1
  for(const item of baseRows){
    
    setTimeout(function timer() {
        // move up each one just a few MS later than the last
        // //console.log('item', item)
      let newSpot = item.position.y + 9.75
                
                new TWEEN.Tween(item.position)
                .to({y: newSpot}, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
}, i * 75);
      i++
  }


  if(sceneMirror[0].position.x===-160){
    new TWEEN.Tween(sceneMirror[0].position)
                .to({x: sceneMirror[0].position.x + 200}, 12000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start(); 
  }


}


onMount(() => {


  let cursorM = scene.children.filter(x => x.name==='cursorGroup')
  let pCam = scene.children.filter(x => x.name==='pCamera')
  let lookAtCamera = scene.children.filter(x => x.name==='lookAt')



  pCam[0].layers.enable(0)
  pCam[0].layers.enable(1)

  // backup original rotation
  var startRotation = lookAtCamera[0].quaternion.clone();


  cursorM[0].children[0].layers.enable(1)
  cursorM[0].children[0].layers.set(1)

  light = new THREE.PointLight( 0x0040ff, 3, 12 );
  light.position.set( currentLocation[0], currentLocation[1], currentLocation[2]  );
  scene.add( light );


  let captureLight = new THREE.PointLight( 0xffffff, 4, 36, 4 );
  captureLight.position.set( 2,  0.25, 16  );
  captureLight.name="captureLight"
 // scene.add( captureLight );

/*     let div = document.createElement("div");
  div.append("Some text");
  let container = document.querySelector('#threeCanvas')
  container.appendChild( div );

*/



// white spotlight shining from the side, modulated by a texture, casting a shadow
const spotLight = new THREE.SpotLight( 0xffffff,  8);
spotLight.position.set( 2,  0.25, 16  );

spotLight.map = new THREE.TextureLoader().load( './sunlight-.png' );

spotLight.castShadow = true;
spotLight.intensity = 3;


spotLight.castShadow = true;
spotLight.angle = 1;
spotLight.penumbra = 0.2;
spotLight.decay = 1.5;
spotLight.distance = 200;

/* let northStar = scene.children.filter(x => x.name==='northStar')


spotLight.target = ( northStar[0] );

 */
// scene.add( spotLight );

  // move gridhelper
  let gridHlpr = scene.children.filter(x => x.name.includes('grid'))

  //console.log('gridhelper: ', gridHlpr)



  // clone gridhelper
  let gridB = scene.children.filter(x => x.name==='gridB')

    startingGridB = scene.children.filter(x => x.name==='gridB')

    // backup original grid positions and quaternions

    startingGridBPosition = JSON.stringify(startingGridB[0].position)  



    startingGridBQuaternion =  JSON.stringify(startingGridB[0].quaternion) 

 
    //console.log('startingGridAQuaternion', startingGridAQuaternion, startingGridAPosition)

    enablePause = true
    
    
/*   setTimeout(() => {

          // starting game UI. choose classic arcade mode, daily game,  (intro/tutorial, + random level?)

          ticker = new AdjustingInterval(moveGroup, 1500);
          toggleTicker(ticker)
          enablePause = true

      }, 1500); //start game after 2 seconds
       */

});


</script>
<!--
<Controls bind:this={controlsComponent} />
-->
<T.Group
name={'cursorGroup'}
position.x={currentLocation[0]}
position.y={8}
position.z={currentLocation[2]}
rotation.y={rotation*2}
castShadow>


<T.Mesh
name={'myCursorMesh'}
scale.x={1.5}
scale.y={1.5}
scale.z={1.5}
castShadow receiveShadow
on:click={removeItem}
on:create={({ ref }) => {
  ref.lookAt(0, 17.5, 0);
  ref.rotateX(45);
  ref.rotateZ(-15);
}}
>

<T.TetrahedronGeometry />

<T.MeshStandardMaterial color={'#8080ff'}   />

</T.Mesh>


</T.Group>


<T.Mesh
name={'myCursorFloor'}
position.x={currentLocation[0]}
position.y={-.15}
position.z={currentLocation[2]}
scale.x={4.55}
scale.y={1}
scale.z={4.55}
castShadow receiveShadow
>

<T.BoxGeometry />
<T.MeshStandardMaterial color={'#8080ff'} emissive={'#8080ff'} emissiveIntensity={3} transparent={true} opacity={0.35} />
<!--
<T.MeshStandardMaterial color={testGlowColor} emissive={'#8080ff'} emissiveIntensity={3} transparent={true} opacity={0.35} />
-->

</T.Mesh>


<T.Group
name={'myGroup'}
castShadow
>

<!-- 
{#if currentLevel===1}
<Level1 {showCubes} />
{/if}
-->

</T.Group>





<T.PerspectiveCamera
  name={'pCamera'}
  makeDefault
  position={[-80, 50, 16]}
  on:create={({ ref }) => {
      ref.lookAt(0, 0, 16);
  }}
  
>
<!-- <OrbitControls enableZoom />  --> 
  <OrbitControls enableDamping />
  <AudioListener
    id="global-audio"
  />
</T.PerspectiveCamera>

<!-- <Audio
id="global-audio"
src={'stranger-things.mp3'}
autoplay={false}
loop={true}
volume={0.5}
/> -->

<T.PerspectiveCamera
  name={'lookAt'}
  position={[50, 24, 16]}
  on:create={({ ref }) => {
      ref.lookAt(0, 1, 16);
  }}
>


</T.PerspectiveCamera>

<T.Mesh
name={'westWing'}
position.x={0}
position.y={10}
position.z={20}

scale.x={30}
scale.y={40}
scale.z={40}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.BoxGeometry />


</T.Mesh>


<T.Mesh
name={'westWing2'}
position.x={0}
position.y={10}
position.z={42}

scale.x={40}
scale.y={40}
scale.z={40}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.BoxGeometry />


</T.Mesh>

<T.Mesh
name={'westHall'}
position.x={-32}
position.y={10}
position.z={42}

scale.x={50}
scale.y={40}
scale.z={30}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.BoxGeometry />


</T.Mesh>

<T.Mesh
name={'frontEntrance'}
position.x={-70}
position.y={10}
position.z={28}

scale.x={30}
scale.y={40}
scale.z={40}

rotation.y={ -30 * (Math.PI / 180)}

>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.BoxGeometry />


</T.Mesh>

<T.Mesh
name={'centralTower'}
position.x={-62}
position.y={36}
position.z={36}

scale.x={12}
scale.y={22}
scale.z={12}



>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.CylinderGeometry />


</T.Mesh>

<T.Mesh
name={'centralTowerLvl2'}
position.x={-62}
position.y={50}
position.z={36}

scale.x={12}
scale.y={16}
scale.z={12}



>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.BoxGeometry />


</T.Mesh>

<T.Mesh
name={'eastTower'}
position.x={-83}
position.y={20}
position.z={8}

scale.x={6.5}
scale.y={66}
scale.z={6.5}



>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={materialPlus.uniforms}
  />
<!--   uniforms={materialPlus.uniforms} -->

  <T.MeshStandardMaterial  />

<T.CylinderGeometry />


</T.Mesh>



<T.Mesh
name={'bigBox'}
position.x={100}
position.y={10}
position.z={16}

scale.x={10}
scale.y={10}
scale.z={80}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
   
  />

  <T.MeshStandardMaterial  map={$BM_texture3} />

<T.BoxGeometry />


</T.Mesh>




<T.Mesh
name={'groundStart'}
position.x={62}
position.y={-24}
position.z={16}

scale.x={200}
scale.y={10}
scale.z={200}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={testmaterial.uniforms}
  />



<T.BoxGeometry />


</T.Mesh>






<T.AmbientLight intensity={0.275} />
<T.DirectionalLight castShadow position={[6, 20, 4]} />


<svelte:window on:keydown|preventDefault={onKeyDown} />

