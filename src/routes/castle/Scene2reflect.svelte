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

import { useTexture } from '@threlte/extras'
import { RepeatWrapping } from 'three'


  const map = useTexture('purpleStone.jpg',  {
    transform: (texture) => {
      texture.wrapS = RepeatWrapping
      texture.wrapT = RepeatWrapping
      texture.repeat.set(4, 4)
      return texture
    }
  })


  

  const darkWallMap = useTexture('darkStoneWall.webp', {
    transform: (texture) => {
      texture.wrapS = RepeatWrapping
      texture.wrapT = RepeatWrapping
      texture.repeat.set(4, 4)
      return texture
    }
  })


  const { load } = useLoader(TextureLoader)
  const textures = load({
    texture1: 'purpleStone.jpg',
    texture2: 'download.jpg'
  })






  const Stone_texture = useLoader(TextureLoader).load('./castleWall.png')

  const darkWall = useLoader(TextureLoader).load('./darkWall1.jpg')




/* $: $gameMode, checkGameMode(); */


let stats = new Stats(); 
let container = document.querySelector('#tester')
container.appendChild( stats.dom );
for (const child of container.children) {
child.setAttribute('style', 'position: relative; display: none;');
//  child.setAttribute('style', 'display: none;');
}

let light
let showCubes = {}
let activeSpots = new Set()
let droppingRow = false
let droppingQueue = []
let rotation = 0
let currentLocation = [10, 2, 16]
let droppedRows = 0

$: showCubes = showCubes

$: activeSpots = activeSpots



transitions()
interactivity()
const {  scene } = useThrelte()



useFrame((state, delta) => {
  rotation += delta
  TWEEN.update()
   stats.update()

   let pCam = scene.children.filter(x => x.name==='pCamera')        
   if(pCam[0].children.length){ 
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




const materialPlus = new THREE.ShaderMaterial({  
      uniforms: { type: 't', value: Stone_texture},
      vertexShader: testmaterial.vertexShader,
      fragmentShader: testmaterial.fragmentShader
});

const vertexShader = testmaterial.vertexShader
const fragmentShader = testmaterial.fragmentShader


const darkTestMaterial = new THREE.ShaderMaterial({
uniforms: {
  color1: {
    value: new THREE.Color("rgb(42, 23, 81)")
  },
  color2: {
      value: new THREE.Color("rgb(60, 35, 119)")
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




const darkMaterialPlus = new THREE.ShaderMaterial({  
      uniforms: { type: 't', value: Stone_texture},
      vertexShader: darkTestMaterial.vertexShader,
      fragmentShader: darkTestMaterial.fragmentShader
});

const darkVertexShader = darkTestMaterial.vertexShader
const darkFragmentShader = darkTestMaterial.fragmentShader




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


onMount(() => {

/* 
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
 */

 // scene.add( captureLight );

/*     let div = document.createElement("div");
  div.append("Some text");
  let container = document.querySelector('#threeCanvas')
  container.appendChild( div );

*/



// white spotlight shining from the side, modulated by a texture, casting a shadow
/* const spotLight = new THREE.SpotLight( 0xffffff,  8);
spotLight.position.set( 2,  0.25, 16  );

spotLight.map = new THREE.TextureLoader().load( './sunlight-.png' );

spotLight.castShadow = true;
spotLight.intensity = 3;


spotLight.castShadow = true;
spotLight.angle = 1;
spotLight.penumbra = 0.2;
spotLight.decay = 1.5;
spotLight.distance = 200;
 */
    






init();
// animate();

function init() {


  let group;
  group = new THREE.Group();
  group.position.y = 0;
  scene.add( group );

  const loader = new THREE.TextureLoader();
  const texture = loader.load( 'download.jpg' );
  texture.colorSpace = THREE.SRGBColorSpace;

  // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 0.008, 0.008 );

  function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {

    // flat shape with texture
    // note: default UVs generated by THREE.ShapeGeometry are simply the x- and y-coordinates of the vertices

    let geometry 
    let mesh 


    // extruded shape

    geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

    mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
    mesh.position.set( x, y, z - 75 );
    mesh.rotation.set( rx, ry, rz );
    mesh.scale.set( s, s/1.5, s );
    group.add( mesh );

   // addLineShape( shape, color, x, y, z, rx, ry, rz, s );

  }

  const x = 0, y = 0;


  // Track

  const trackShape = new THREE.Shape()
    .moveTo( 40, 40 )
    .lineTo( 40, 160 )
    .absarc( 60, 160, 20, Math.PI, 0, true )
    .lineTo( 80, 40 )
    .lineTo( 60, 40);


  // Circle

  const circleRadius = 40;



  // Arc circle

  const arcShape = new THREE.Shape()
    .moveTo( 50, 10 )
    .absarc( 10, 10, 40, 0, Math.PI * 2, false );

  const holePath = new THREE.Path()
    .moveTo( 20, 10 )
    .absarc( 10, 10, 10, 0, Math.PI * 2, true );

  arcShape.holes.push( holePath );






  const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

  // addShape( shape, color, x, y, z, rx, ry,rz, s );

//   addShape( trackShape, extrudeSettings, 0x008080, 200, - 100, 0, 0, 0, 0, 1 );

  addShape( trackShape, extrudeSettings, 'hotpink', -12, -15, 97, 0, 0, 0,  0.20 );

  addShape( trackShape, extrudeSettings, 'hotpink', -42, -14, 102, 0, 0, 0,  0.15 );

  addShape( trackShape, extrudeSettings, 'hotpink', -42, 10, 102, 0, 0, 0,  0.15 );

  addShape( trackShape, extrudeSettings, 'hotpink', -71, 0, 75, 0, -30 * (Math.PI / 180), 0,  0.25 );



}



//



//

/* function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
  renderer.render( scene, camera );

} */






});


const texLoader = new THREE.TextureLoader();

const texURL1 = 'purpleStone.jpg';
const texURL2 = 'purpleStone.jpg';
const texURL3 = 'purpleStone.jpg';

const texURL4 = 'darkWall1.jpg';
const texURL5 = 'darkWall1.jpg';
const texURL6 = 'darkWall1.jpg';

const mat1 = new THREE.MeshBasicMaterial({color: 0xffffff, map: texLoader.load(texURL1)});
const mat2 = new THREE.MeshBasicMaterial({color: 0xffffff, map: texLoader.load(texURL2)});
const mat3 = new THREE.MeshBasicMaterial({color: 0xffffff, map: texLoader.load(texURL3)});

const mat4 = new THREE.MeshBasicMaterial({color: 0xffffff, map: texLoader.load(texURL4)});
const mat5 = new THREE.MeshBasicMaterial({color: 0xffffff, map: texLoader.load(texURL5)});
const mat6 = new THREE.MeshBasicMaterial({color: 0xffffff, map: texLoader.load(texURL6)});


const  multiMaterial = [
  mat1,
  mat2,
  mat3,
  mat4,
  mat5,
  mat6
];

</script>

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


<T.PerspectiveCamera
  name={'lookAt'}
  position={[50, 24, 16]}
  on:create={({ ref }) => {
      ref.lookAt(0, 1, 16);
  }}
>


</T.PerspectiveCamera>


<!-- Castle Meshes-->


<!-- textured mesh -->
{#await map then value}
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

    <T.MeshStandardMaterial map={value}/>

  <T.BoxGeometry />


  </T.Mesh>


<!-- <T.Mesh
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


<T.MeshBasicMaterial map={value} />

<T.BoxGeometry />


</T.Mesh>
 -->

<T.Mesh
name={'westWing2'}
position.x={0}
position.y={10}
position.z={42}

scale.x={40}
scale.y={40}
scale.z={40}
>

  <T.MeshStandardMaterial map={value}/>

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

    <T.MeshStandardMaterial map={value}/>

<T.BoxGeometry />


</T.Mesh>


<T.Mesh
name={'eastHall'}
position.x={-107}
position.y={10}
position.z={6}

scale.x={30}
scale.y={40}
scale.z={40}

rotation.y={ -30 * (Math.PI / 180)}

>

  <T.MeshStandardMaterial map={value}  />

<T.BoxGeometry />


</T.Mesh>

<T.Mesh
name={'eastTower'}
position.x={-83}
position.y={20}
position.z={8}

scale.x={5.5}
scale.y={60}
scale.z={5.5}



>

  <T.MeshStandardMaterial map={value}  />

  <T.CylinderGeometry />


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


  <T.MeshStandardMaterial map={value}  />

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


  <T.MeshStandardMaterial map={value}  />

  <T.BoxGeometry />


</T.Mesh>


{/await}

<!-- window arc -->
<T.Mesh
name={'window1'}
position.x={17.5}
position.y={20}
position.z={50}

scale.x={5}
scale.y={6}
scale.z={5}>

  <T.ExtrudeGeometry />
  <T.MeshPhongMaterial color='hotpink' />
</T.Mesh>

<T.Mesh
name={'window2'}
position.x={17.5}
position.y={20}
position.z={30}

scale.x={5}
scale.y={6}
scale.z={5}>

  <T.ExtrudeGeometry />
  <T.MeshPhongMaterial color='hotpink' />
</T.Mesh>

<T.Mesh
name={'window3'}
position.x={17.5}
position.y={0}
position.z={50}

scale.x={5}
scale.y={10}
scale.z={5}>

  <T.ExtrudeGeometry />
  <T.MeshPhongMaterial color='hotpink' />
</T.Mesh>

<T.Mesh
name={'window4'}
position.x={17.5}
position.y={0}
position.z={30}

scale.x={5}
scale.y={10}
scale.z={5}>

  <T.ExtrudeGeometry />
  <T.MeshPhongMaterial color='hotpink' />
</T.Mesh>






<!-- weather vane -->

<T.Mesh
name={'groundStartPlane'}
position.x={62}
position.y={50}
position.z={36}


scale.x={30}
scale.z={30}

rotation.x={ -180 * (Math.PI / 180)}
rotation.y={ -90 * (Math.PI / 180)}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={testmaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

</T.Mesh>


<T.Mesh
name={'groundStartPlane2'}
position.x={62}
position.y={50}
position.z={36}


scale.x={30}
scale.z={30}

rotation.x={ -180 * (Math.PI / 180)}
>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={testmaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

  

</T.Mesh>



<!-- Ground Planes-->

<T.Group
name={'hillGroup'}
castShadow

rotation.z={ 25 * (Math.PI / 180)}
>


<T.Mesh
name={'hillWestFace1'}
position.x={16}
position.y={-34}
position.z={40}

scale.x={60}
scale.y={40}
scale.z={40}

rotation.x={ -180 * (Math.PI / 180)}
rotation.y={ -90 * (Math.PI / 180)}
>

  <T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={testmaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

</T.Mesh>


<T.Mesh
name={'hillWestFace2'}
position.x={0}
position.y={-34}
position.z={90}

scale.x={50}
scale.y={40}
scale.z={40}

rotation.x={ -180 * (Math.PI / 180)}
rotation.y={ -50 * (Math.PI / 180)}


>

  <T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={testmaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

</T.Mesh>


<T.Mesh
name={'hillSouthFace1'}
position.x={-10}
position.y={-34}
position.z={10}

scale.x={50}
scale.y={40}
scale.z={40}

rotation.x={ -180 * (Math.PI / 180)}
rotation.y={ -180 * (Math.PI / 180)}
rotation.z={ -1 * (Math.PI / 180)}


>

  <T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={darkTestMaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

</T.Mesh>

<T.Mesh
name={'hillSouthFace3'}
position.x={-36}
position.y={-14}
position.z={0}

scale.x={90}
scale.y={40}
scale.z={40}

rotation.x={ -180 * (Math.PI / 180)}
rotation.y={ -180 * (Math.PI / 180)}
rotation.z={ -25 * (Math.PI / 180)}


>

  <T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={darkTestMaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

</T.Mesh>


</T.Group>

<!-- 
<T.Mesh
name={'hillWestFace1'}
position.x={2}
position.y={0}
position.z={36}

scale.x={300}
scale.z={300}
scale.y={40}

rotation.x={ -180 * (Math.PI / 180)}

>

<T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={testmaterial.uniforms}
    side={THREE.DoubleSide}
  />


  <T.PlaneGeometry />

</T.Mesh>
 -->




<T.AmbientLight intensity={0.275} />
<T.DirectionalLight castShadow position={[6, 20, 4]} />


<svelte:window on:keydown|preventDefault={onKeyDown} />

