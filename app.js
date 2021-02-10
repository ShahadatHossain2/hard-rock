const dataLoad = () => {
    const searchText = document.getElementById('searchBox').value;
    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    const parent = document.getElementById('container');
    parent.innerHTML = "";
    songs.forEach(song => {
        const songsDiv = document.createElement('div');
        songsDiv.className = "single-result row align-items-center my-3 p-3";
        const album = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls src=${song.preview}></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
`;
        
        
        songsDiv.innerHTML = album;
        parent.appendChild(songsDiv);

    });
}

const getLyric = (artist,title) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => displayLyric(data.lyrics))
}

const displayLyric = lyric => {
    const lyricDiv = document.getElementById('lyricses');
    lyricDiv.innerText = lyric;
}