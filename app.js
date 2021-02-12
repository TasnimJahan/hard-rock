const searchSongs = () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    //load data
    fetch(url)
        .then(response => response.json())
        .then(data => displaySong(data.data))
        .catch(error => displayError("something went wrong,, please try again letter"));
}


// fetch er alternative(async await)
// const searchSongs = async () => {
//     const searchText = document.getElementById("search-field").value;
//     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
//     //load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySong(data.data);
// }

const displaySong = (songs) => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    songs.forEach(song => {
        console.log(song);
        console.log(song.artist.name);
        const songDiv = document.createElement("div");
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

// const getLyric = (artist, title) => {
//     const urlOfLyrics = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(urlOfLyrics)
//         .then(response => response.json())
//         .then(data => displayLyrics(data.lyrics))
//         .catch(error => console.log(error));
// }

// fetch er alternative holo async await
const getLyric =async (artist, title) => {
    const urlOfLyrics = `https://api.lyrics.ovh/v1/${artist}/${title}`

    try {
        const response =await fetch(urlOfLyrics);
        const data =await response.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        // displayError(error);
        displayError("I failed to load lyrics, Please try again");
    }
}

const displayLyrics = (lyrics) => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}

const displayError = (error) => {
    const errorTag = document.getElementById("error-message");
    errorTag.innerText = error;
}