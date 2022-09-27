function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2F3d799ceaa881b4dd7a1202de03fd3edd.jpg?alt=media&token=fb67d555-66bc-4e50-b099-abfad82c2372",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSuzan%20%26%20Freek%2C%20Snelle%20-%20De%20Overkant.mp3?alt=media&token=a1aadf46-4aa3-45a0-b812-e45be7185c86",
		songname:"Bright Future",
		artistname:"Silent Partner"
	},
	{
		thumbnail:"http://s2.hulkshare.com/song_images/original/8/c/d/8cd78bb2fce2651b759f3586853f1885.jpg?dd=1467382578",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSnelle%20-%20Smoorverliefd%20(prod.%20Donda%20Nisha).mp3?alt=media&token=131c2295-c10a-4f3b-b408-dde6c1f0ba69",
		songname:"Bovi",
		artistname:"The Grand Affair"
	},
	{
		thumbnail:"https://image.freepik.com/free-vector/electro-music-album_53876-67225.jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSuzan%20%26%20Freek%2C%20Snelle%20-%20De%20Overkant.mp3?alt=media&token=a1aadf46-4aa3-45a0-b812-e45be7185c86",
		songname:"Sunny Looks Good on You",
		artistname:"Midnight North"
	},
	{
		thumbnail:"https://humanhuman.imgix.net/articles/49/ben_khan_1000.jpg?w=640&dpr=2&q=50&fm=jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSnelle%20-%20Smoorverliefd%20(prod.%20Donda%20Nisha).mp3?alt=media&token=131c2295-c10a-4f3b-b408-dde6c1f0ba69",
		songname:"Bright Eyed Blues",
		artistname:"Unicorn Heads"
	},
	{
		thumbnail:"https://humanhuman.imgix.net/articles/49/Lewis-Del-Mar-Waves.jpg?w=640&dpr=2&q=50&fm=jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSuzan%20%26%20Freek%2C%20Snelle%20-%20De%20Overkant.mp3?alt=media&token=a1aadf46-4aa3-45a0-b812-e45be7185c86",
		songname:"How it Began",
		artistname:"Silent Partner"
	},
	{
		thumbnail:"https://humanhuman.imgix.net/articles/49/fka-twigs.png?w=640&dpr=2&q=50&fm=jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSnelle%20-%20Smoorverliefd%20(prod.%20Donda%20Nisha).mp3?alt=media&token=131c2295-c10a-4f3b-b408-dde6c1f0ba69",
		songname:"Simon's Song",
		artistname:"Dan Lebowitz"
	},
        	{
		thumbnail:"http://weddingphotography.com.ph/wp-content/uploads/2011/02/01-how-to-photograph-group-portraits-for-music-album-cover-maroon-5.jpg",
		audio:"bensound-acousticbreeze.mp3",
		songname:"Calimba",
		artistname:"E's Jammy Jams"
	},
	{
		thumbnail:"https://humanhuman.imgix.net/articles/49/Leo-Kalyan-Daydream.jpg?w=640&dpr=2&q=50&fm=jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSnelle%20-%20Smoorverliefd%20(prod.%20Donda%20Nisha).mp3?alt=media&token=131c2295-c10a-4f3b-b408-dde6c1f0ba69",
		songname:"Scanline",
		artistname:"Mike Relm"
	},
	{
		thumbnail:"http://weddingphotography.com.ph/wp-content/uploads/2011/02/00-how-to-photograph-group-portraits-for-music-album-cover-goldhawks.jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSuzan%20%26%20Freek%2C%20Snelle%20-%20De%20Overkant.mp3?alt=media&token=a1aadf46-4aa3-45a0-b812-e45be7185c86",
		songname:"Flight To Tunisia",
		artistname:"Causmic"
	},
	{
		thumbnail:"http://weddingphotography.com.ph/wp-content/uploads/2011/02/11-how-to-photograph-group-portraits-for-music-album-cover-the-corrs.jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/artifex-a904f.appspot.com/o/songs%2FSnelle%2FSnelle%20-%20Smoorverliefd%20(prod.%20Donda%20Nisha).mp3?alt=media&token=131c2295-c10a-4f3b-b408-dde6c1f0ba69",
		songname:"Everglow",
		artistname:"Patrick Patrikios"
	}
];

let currentSongIndex = 0;

let player = _(".player"),
	toggleSongList = _(".player .toggle-list");

let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
};

toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}

function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src",song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";	
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src",song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		};
	});
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);

function userLike(x) {
    if ( x.classList.contains( "fa-heart") ) {
        x.classList.remove( "fa-heart" );
        x.classList.add( "fa-heart-o" );
    }
    else {
        x.classList.remove( "fa-heart-o" );
        x.classList.add( "fa-heart" );
    }
}