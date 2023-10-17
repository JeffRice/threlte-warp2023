<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene2reflect from './Scene2reflect.svelte'
    import { useProgress } from '@threlte/extras'
	import { tweened } from 'svelte/motion'
	import { fade } from 'svelte/transition'
    import { sceneLoaded } from './stores.js';

	const {
    active, // Readable<boolean> – if the DefaultLoadingManager is active
    item, // Readable<string | undefined> – the currently loading item
    loaded, // Readable<number> - amount of items loaded
    total, // Readable<number> - total amount of items to load
    errors, // Readable<string[]> - all error messages
    progress, // Readable<number> - normalized (0-1) loading progress
    finishedOnce // Readable<boolean> – whether a progress of 1 has been achieved ever.
  } = useProgress()

	const tweenedProgress = tweened($progress, {
		duration: 750
	})
	$: tweenedProgress.set($progress), check()

    function check(){


        if($loaded===$total && $finishedOnce === false){
			//console.log('active?', $active, $loaded, $total, $progress, $tweenedProgress, progress, tweenedProgress)
			setTimeout(() => {
				sceneLoaded.update(n => true);
            }, 1500); //enough time to run the transition effect

        }

    }



</script>

{#if $sceneLoaded === false}
	<div transition:fade|local={{duration: 250}}	class="wrapper">
		<p class="loading">Loading</p>
		<div class="bar-wrapper">
			<div class="bar" style="width: {$tweenedProgress * 100}%" />
		</div>
	</div>
{/if}

<Canvas>
    <Scene2reflect />
</Canvas>

<style>

.wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	align-items: center;
	justify-content: top;
	color: white;
    z-index: 9999;

}

.loading {
	font-size: 1.875rem;
	line-height: 1.25rem;
    margin-top:150px;
    justify-content: top;
    z-index: 9999;
}

.bar-wrapper {
	width: 33.333333%;
	height: 10px;
	border: 1px solid white;
	position: relative;
    z-index: 9999;
}

.bar {
	height: 100%;
	background-color: white;
    z-index: 9999;
}

</style>