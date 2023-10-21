<script lang="ts">
import '../../app.css'
import './../styles.css'
// import { page } from "$app/stores"
import {width, height, gameMenu}  from './stores.js';
import { onMount } from 'svelte'


  //to menu width/height on resize
/*   $: if ($width || $height) {
    //console.log('w + h', $width, $height) 
	// ingameMenu.setAttribute('style', 'width: ' + ($width/3));
  } */

/*   function showMenu(){
	// //console.log('but howe', $sceneLoaded)
	if($sceneLoaded===true){
		// //console.log('TRUE TRUE howe', $sceneLoaded)
	}
  } */

function handleOnChange(event) {
	//save value to store	
    //  storeMusicVolume.update(n => event.target.value);
	//  localStorage.setItem("storeMusicVolume", event.target.value);
	}

	let combo: int
	let timeoutHandle
	let visible = false
	let performanceMode = false
	let msgTest = false
	let comboScore = 0
	let perfNot = false
	let fpsDiv = false
	let bgImage = true
	let testDate




function fps(){

	let container = document.querySelector('#tester')



if(!fpsDiv){
	for (const child of container.children) {
  child.setAttribute('style', 'display: block;');
  localStorage.setItem("fps", 'true');
}
}
else{
	for (const child of container.children) {
  child.setAttribute('style', 'display: none;');
  localStorage.setItem("fps", 'false');
}	
}
fpsDiv=!fpsDiv



}


 onMount(() => {

	testDate = new Date(Date.now())

	let sky = document.querySelectorAll("#retrobg-sky");
	let ground = document.querySelectorAll("#retrobg-ground");

	sky[0].style.opacity=1
// 	ground[0].style.opacity=1





		





 })






</script>


<div id="retrobg">
	<div id="retrobg-sky">
		{#if visible}
		<div id="retrobg-sunWrap">
			<div id="retrobg-sun"></div>
		</div>
		{/if}
	</div>

  <div class="app">

  
    <main  id="threeCanvas" bind:clientWidth={$width} bind:clientHeight={$height}>
  
  
    <div id="tester"></div>
  
      
      <slot />
      
    </main>
    </div>
    



    </div>




<style>
  main {
	min-height: 94vh;
    min-width:  94vw;
    margin: 0;
    background-attachment: fixed;
    z-index: 50;
  }

  .app{
	display: flex;
    align-items: center;
    justify-content: center;
  }

 .ui {
  position: absolute;
  z-index: 9000;
  font-family:'Courier New', Courier, monospace;
  font-size: large;
  font-weight: 800;
  }

  h1, h2, p {
    font-weight: 800;
}


  .ui-control{
	z-index: 9999;
    padding: 2px;
    cursor: grab;
    display: block;
  }

  .uiMsgClass {
	left:0;
	top:50%;
	width:100%;
	height:50px;
	text-align: center; 
	color:white;
  }

  .game-menu{
	top:35%;text-align: center;
	border: solid 10px #1e0a66;
	padding: 10px; color:white;
	background-color: rgba(0,0,0,.75);
	min-width: 600px;
	font-weight: 800;
/* 	width: calc( var(--width) / 3px); */
  }

  .intro-content{
	position: absolute;
    top: -45%;
	left: -5%;
    text-align: center;
    border: solid 10px #1e0a66;
    padding: 10px;
    color: white;
 	background-color: rgba(0,0,0);
    min-width: 550px;
    max-height: 550px;
    width: 100%;
    overflow-y: scroll;
  }

  .controls-list{
	padding: 20px;
  }



  	.flex-grid {
	display: flex;
	text-align: left;
	margin-top: 5px;
    background-color: #282525;
    padding: 4px;
	}
	.col {
	flex: 2;
	}

  .hidden{
	display:none;
  }

/* ............................................................... */
/* ............................................................... */
/* ............................................................... */
#retrobg {
	position: relative;
	overflow: hidden;
	height: 100%;
	color: #a3c;
	background-color: #000;
}

/* ............................................................... */

#retrobg-sky {
	position: absolute;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	top: 0;
	width: 100%;
	opacity: 0.01;
	height: 65%;
	background-repeat: no-repeat;
	background-size:cover;
/* 	background-image: url("/synth.jpg"); */
	background-image: url("/darkTreesbg.webp");
	background-blend-mode: screen;
}

/* ............................................................... */
#retrobg-sunWrap {
	position: relative;
	width: 40%;
	margin-bottom: -15%;
}
#retrobg-sun {
	--glow-color: #d44;
	padding-top: 100%;
	border-radius: 50%;
	background-image: linear-gradient( #fcdf11, #ff623f, #fe2085 50% );
	box-shadow: 0 0 160px 80px var( --glow-color );
	animation: 2s ease infinite alternate retrobg-sun-glow-anim;
}
/* @supports (-moz-appearance:none) {
  #retrobg-sun {
    display: none;
}
} */
.retrobg-shutdown #retrobg-sun {
	background-image: linear-gradient( #000, #000 40% );
	--glow-color: #000;
}
@keyframes retrobg-sun-glow-anim {
	from { box-shadow: 0 0 160px 80px var( --glow-color ); }
	to   { box-shadow: 0 0 200px 95px var( --glow-color ); }
}

/* ............................................................... */
#retrobg-stars {
	position: absolute;
	width: 100%;
	height: 100%;
}
.retrobg-star {
	position: absolute;
	border-radius: 50%;
	width: 2px;
	height: 2px;
	background-color: #fff;
}

/* ............................................................... */
#retrobg-mountains {
	position: absolute;
	width: 100%;
	height: 30%;
}
.retrobg-mountain {
	position: absolute;
	width: 30%;
	height: 100%;
	background-image: linear-gradient( #000 70%, #111 85%, #fff1 );
}
#retrobg-mountains-left { left: 0; clip-path: polygon( 0% 100%,0% 55%,5% 60%,10% 55%,20% 50%,25% 42%,30% 38%,33% 35%,40% 45%,50% 50%,60% 70%,70% 85%,75% 82%,80% 91%,85% 90%,90% 95%,95% 98%,100% 100% ); }
#retrobg-mountains-right { right: 0; clip-path: polygon( 0% 100%,5% 95%,10% 85%,15% 87%,20% 80%,25% 78%,30% 65%,40% 70%,50% 57%,60% 53%,67% 68%,70% 70%,75% 66%,80% 55%,90% 50%,95% 60%,100% 57%,100% 100% ); }

/* ............................................................... */
#retrobg-cityWrap {
	position: absolute;
	width: 45%;
	margin-left: 40%;
}

#retrobg-cityWrap2 {
	position: absolute;
	width: 30%;
	margin-left: -50%;
}
#retrobg-city {
	padding-top: 20%;
}
.retrobg-building {
	position: absolute;
	width: 5%;
	height: 100%;
	bottom: 0;
	border-radius: 4px 4px 0 0;
	background-image: linear-gradient( 0deg, rgba( 17, 17, 34, 0 ), #112 30px, #000 );
}
.retrobg-building:nth-child( odd ) {
	background-image: linear-gradient( 0deg, rgba( 24, 24, 42, 0 ), #223 30px, #000 );
}
.retrobg-antenna::after {
	content: "";
	position: absolute;
	left: 50%;
	margin-left: calc( -1px - 5% );
	bottom: 100%;
	width: 10%;
	min-width: 2px;
	height: 33%;
	background-color: #000;
}

/* ............................................................... */
#retrobg-ground {
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 35%;
	bottom: 0;
	border-top: 2px solid #bf578c;
	background-color: #000;
	opacity: 0.01
}
.retrobg-shutdown #retrobg-ground {
	border-color: #000;
}
#retrobg-groundShadow {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-image: linear-gradient( #000 0%, transparent );
}

/* ............................................................... */
#retrobg-linesWrap {
	height: 100%;
	perspective: 1000px;
	perspective-origin: center top;
}
#retrobg-lines {
	position: absolute;
	width: 100%;
	height: 100%;
	transform-origin: top center;
	animation: .35s linear infinite retrobg-lines-anim;
}
.retrobg-shutdown #retrobg-lines {
	animation-duration: 5s;
}
@keyframes retrobg-lines-anim {
	from { transform: rotateX( 84deg ) translateY( 0 ); }
	to { transform: rotateX( 84deg ) translateY( 100px ); }
}
#retrobg-hlines,
#retrobg-vlines {
	position: absolute;
	left: calc( ( 900% - 100% ) / -2 );
	width: 900%;
	height: 500%;
}
#retrobg-vlines {
	display: flex;
	justify-content: center;
}
.retrobg-hline,
.retrobg-vline {
	width: 100%;
	height: 100%;
	background-color: currentColor;
}
.retrobg-hline { height: 3px; }
.retrobg-vline { width: 3px; }
.retrobg-hline + .retrobg-hline { margin-top: 98px; }
.retrobg-vline + .retrobg-vline { margin-left: 48px; }

/*  .gameModes{
	border: 8px solid transparent;
    content: " ";
    height: 0;
    border-right-color: #f1f1f1;
    margin-top: 4px;
    display: block;

}  */

.gameModes {
	margin: 0;
    padding: 8px 0 0 0;
    height: 36px;
    overflow: hidden;
}

.gameModes:hover{
	background-color: #676bc9;
	cursor: pointer;
	box-shadow: 1px 1px 1px 2px;
	display:block
}

button:hover{

	cursor: pointer;

}


/* #arrow::after{
    border: 8px solid transparent;
    content: " ";
    height: 0;
    width: 0;
    pointer-events: none;
    border-right-color: #f1f1f1;
    margin-top: 4px;
	margin-left: 4px;
    position: absolute;
	display: none;

}

 */

.down-arrow {
	color: #fff;
	font-size: 30px;
	position: absolute;
	bottom: 30px;
	left: 49.5%;
	-webkit-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	transform: translateX(-50%);
}
.down-arrow a {
	color: #fff;
}


#dailyArrow {
	display:none;
}

#introArrow {
	display:none;
}
#classicArrow {
	display:none;
}
#randomArrow {
	display:none;
}

/* Float animation style*/

.float-arrow {
    position: relative;
    bottom: 33px;
    left: 95%;
    width: 60px;
    margin-left: -30px;
	animation-duration: 2s;
    animation-delay: 0s;
    animation: float 2s infinite;
    -webkit-animation: float 2s infinite;
    -moz-animation: float 2s infinite;
    -o-animation: float 2s infinite;

}

@-webkit-keyframes float {
    0% {
        -webkit-transform: translateX(0);
    }

    50% {
        -webkit-transform: translateX(-30px);
    }

    100% {
        -webkit-transform: translateX(0);
    }
}

@-moz-keyframes float {
    0% {
        -webkit-transform: translateX(0);
    }

    50% {
        -webkit-transform: translateX(-30px);
    }

    100% {
        -webkit-transform: translateX(0);
    }
}

@-o-keyframes float {
    0% {
        -webkit-transform: translateX(0);
    }

    50% {
        -webkit-transform: translateX(-30px);
    }

    100% {
        -webkit-transform: translateX(0);
    }
}

@keyframes float {
    0% {
        -webkit-transform: translateX(0);
    }

    50% {
        -webkit-transform: translateX(-30px);
    }

    100% {
        -webkit-transform: translateX(0);
    }
}

</style>
