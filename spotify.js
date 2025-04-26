// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Aashiqui 2", filePath: "songs/1.mp3", coverPath: "icon/1.jpg", duration: "3:15"},
    {songName: "DAMRU_ALA", filePath: "songs/2.mp3", coverPath: "icon/img.jpg", duration: "4:20"},
    {songName: "मेरी_गाड़ी_मेरा_बंगला_", filePath: "songs/3.mp3", coverPath: "icon/3.jpg", duration: "3:45"},
    {songName: "Chambal K Dakku ", filePath: "songs/4.mp3", coverPath: "icon/4.jpg", duration: "5:10"},
    {songName: "Shree_Radhe_Radhe", filePath: "songs/5.mp3", coverPath: "icon/img.jpg", duration: "6:30"},
    {songName: "Bapu_Zimidar", filePath: "songs/6.mp3", coverPath: "icon/img.jpg", duration: "4:05"},
    {songName: "Mharo_Seth_Rukhalo", filePath: "songs/7.mp3", coverPath: "icon/img.jpg", duration: "5:45"},
    {songName: "PAYAL_SONG", filePath: "songs/8.mp3", coverPath: "icon/img.jpg", duration: "4:50"},
    {songName: "सांवरिया_नाम_की_है_मरोड़", filePath: "songs/9.mp3", coverPath: "icon/img.jpg", duration: "3:55"},
    {songName: "Hostel_Sharry_Mann", filePath: "songs/10.mp3", coverPath: "icon/img.jpg", duration: "4:25"},
    {songName: "Laagi_Lagan_Shankara", filePath: "songs/11.mp3", coverPath: "icon/img.jpg", duration: "5:25"}
];

// Create song items dynamically
const songItemContainer = document.querySelector('.songItemContainer');
songItemContainer.innerHTML = ''; // Clear existing content
songs.forEach((song, i) => {
    songItemContainer.innerHTML += `
        <div class="songItem">
            <img src="${song.coverPath}" alt="${i}" class="cover-img">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay">
                <span class="timestamp">${song.duration} <i id="${i}" class="fa-regular songItemPlay fa-circle-play"></i></span>
            </span>
        </div>
    `;
});

// Auto play next song when current ends
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    playSelectedSong();
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => { 
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

// Seek functionality
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play song when clicked
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.replace('fa-circle-pause', 'fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.replace('fa-circle-play', 'fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    playSelectedSong();
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    playSelectedSong();
});

// Helper function to play selected song
function playSelectedSong() {
    makeAllPlays();
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play()
        .then(() => {
            masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
            document.getElementById(songIndex).classList.replace('fa-circle-play', 'fa-circle-pause');
            gif.style.opacity = 1;
        })
        .catch(error => {
            console.error("Playback failed:", error);
        });
}
