import { writable } from 'svelte/store';

export const gameMenu = writable(true);

export const sceneLoaded = writable(true);

//dimensions
export const width = writable();
export const height = writable();