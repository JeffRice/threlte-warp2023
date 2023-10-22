<script lang="ts">
import '../../app.css'
import './../styles.css'
import {width, height}  from './stores.js';
import { onMount } from 'svelte'





	let visible = false
	let testDate



 onMount(() => {

	testDate = new Date(Date.now())

	console.log(testDate)

	let sky = document.querySelectorAll("#retrobg-sky");

	sky[0].style.opacity=1


	var diff = Math.abs(new Date() - new Date('2023/10/31 00:00:00'));

	console.log(diff)

	console.log(millisToMinutesAndSeconds(diff))

    let display = document.querySelector('#time');
    startTimer(millisToMinutesAndSeconds(diff) * 60, display);

	

 })




// https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

 function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  return minutes
}






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

  
      
      <slot />
      
    </main>

	<div style="top:0;width:100%;height:50px;text-align: center; color:white;" class="ui">
		

		<div style='top: 10%; width:100%;	margin-left:auto;auto; border-left: 0; border-right: 0; font-size: 1.75rem; font-weight: 800;' class="ui game-menu">
			<p style="margin-block-start: 0; margin-block-end: 0;">
				<h1 class="page-title">Welcome to Threlte Castle</h1>		
				
				<div>Halloween countdown <span id="time">05:00</span> minutes!</div>

	  </div>

	</div>



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

/* background pattern from heropatterns.com */
body,
html {
	height: 100%;
	display: flex;
	background-color: #303030;
	justify-content: center;
	align-items: center;
	color: lighten(#b2ff59, 0%);
	flex-flow: column;
}

@font-face {
  font-family: "Creepy";
  src: url("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Fonts/Creepy.woff?raw=true") format("woff"), url("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Fonts/Creepy.woff2?raw=true") format("woff2")
}

@font-face {
  font-family: "Lunacy";
  src: url("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Fonts/Lunacy.woff") format("woff"), url("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Fonts/Lunacy.woff2") format("woff2")
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100vh;
  cursor: url("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Cursors/Ghost.cur"), auto;
}

body {
  margin: 0;
  background: radial-gradient(#9D5900, #3D2200);
}

.page-title {
  color: #FF6D00;
  font-family: Creepy, serif;
  font-weight: normal;
  text-align: center;
  font-size: 1.5em;
}

.game-info-container {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
}

.game-info {
  font-family: Lunacy, serif;
  color: #FFBB89;
  font-size: 4em;
}

.game-container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  margin: 50px;
  justify-content: center;
  perspective: 500px;
}

.card {
  position: relative;
  height: 175px;
  width: 125px;
}

.card:hover {
  cursor: url("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Cursors/GhostHover.cur"), auto;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  backface-visibility: hidden;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  transition: transform 500ms ease-in-out;
}

.card.visible .card-back {
  transform: rotateY(-180deg);
}

.card.visible .card-front {
  transform: rotateY(0)
}

.card.matched .card-value {
  animation: dance 1s linear infinite 500ms;
}

.overlay-text {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
  color: #FF6D00;
  font-family: Creepy, serif;
}

.overlay-text-small {
  font-size: .3em;
}

.overlay-text.visible {
  display: flex;
  flex-direction: column;
  animation: overlay-grow 500ms forwards;
}

@keyframes overlay-grow {
  from {
    background-color: rgba(0, 0, 0, 0);
    font-size: 0;
  }
  to {
    background-color: rgba(0, 0, 0, .8);
    font-size: 10em;
  }
}

@keyframes dance {
  0%, 100%  {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-30deg);
  }
  75% {
    transform: rotate(30deg);
  }
}

.card-back {
  background-color: black;
  border-color: #FF6D00;
}

.card-front {
  background-color: #FFBB89;
  border-color: #333;
  transform: rotateY(180deg);
}

.card-value {
  transition: transform 100ms ease-in-out;
  transform: scale(.9);
}

.card-front:hover .card-value {
  transform: scale(1);
}

.cob-web {
  position: absolute;
  width: 47px;
  height: 47px;
  transition: width 100ms ease-in-out, height 100ms ease-in-out;
}

.card-face:hover .cob-web {
  width: 52px;
  height: 52px;
}

.cob-web-top-left {
  transform: rotate(270deg);
  top: 0;
  left: 0;
}

.cob-web-top-right {
  top: 0;
  right: 0;
}

.cob-web-bottom-left {
  transform: rotate(180deg);
  bottom: 0;
  left: 0;
}

.cob-web-bottom-right {
  transform: rotate(90deg);
  bottom: 0;
  right: 0;
}

.spider {
  align-self: flex-start;
  transform: translateY(-10px);
  transition: transform 100ms ease-in-out;
}

.card-back:hover .spider {
  transform: translateY(0)
}

@media (max-width: 600px) {
  .game-container {
    grid-template-columns: repeat(2, auto);
  }

  .game-info-container {
    flex-direction: column;
    align-items: center;
  }
}








</style>
