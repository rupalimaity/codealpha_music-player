const songs = [
    {
        title: "Tumse hi",
        artist: "Mohit chauhan",
        src: "audio 1.mpeg",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJWpVi7ZuZF8PwaAIzZ66oRMx9oSwUOGZlBG4hZe05sg&s=10"
    },
    {
        title: "chahaat",
        artist: "Raghat fatah ali khan",
        src: "audio2.mpeg",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3oi90pVKCi973unqwxOgofzWf5zVzRJi6ppmks1f0hg&s=10"
    },
    {
        title: "khuda bhi",
        artist: "Mohit chauhan",
        src: "audio3.mpeg",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxFHMjTlbtKjKHEuAoGmEuAqpvGpx7vsYQ6j0NBU2YA&s=10"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;
let repeat = false;

// Load Song
function loadSong(index){

    audio.src = songs[index].src;

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    cover.src = songs[index].cover;

}

loadSong(currentSong);

// Play / Pause
function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

}

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

}

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }else{

        playSong();

    }

});

// Next Song
function nextSong(){

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

}

// Previous Song
function prevSong(){

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

}

nextBtn.addEventListener("click",nextSong);

prevBtn.addEventListener("click",prevSong);

// Progress Bar
audio.addEventListener("timeupdate",()=>{

    const percent=(audio.currentTime/audio.duration)*100;

    progress.value=percent || 0;

    current.textContent=formatTime(audio.currentTime);

    duration.textContent=formatTime(audio.duration);

});

// Seek
progress.addEventListener("input",()=>{

audio.currentTime=(progress.value/100)*audio.duration;

});

// Volume
volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

// Time Format
function formatTime(time){

if(isNaN(time)) return "0:00";

let min=Math.floor(time/60);

let sec=Math.floor(time%60);

if(sec<10){

sec="0"+sec;

}

return `${min}:${sec}`;

}

// Playlist
songs.forEach((song,index)=>{

const li=document.createElement("li");

li.textContent=`🎵 ${song.title}`;

li.onclick=()=>{

currentSong=index;

loadSong(index);

playSong();

};

playlist.appendChild(li);

});

// Repeat
repeatBtn.addEventListener("click",()=>{

repeat=!repeat;

repeatBtn.style.color=repeat?"#00ff88":"white";

});

// Shuffle
shuffleBtn.addEventListener("click",()=>{

currentSong=Math.floor(Math.random()*songs.length);

loadSong(currentSong);

playSong();

});

// Auto Next
audio.addEventListener("ended",()=>{

if(repeat){

playSong();

}else{

nextSong();

}

});