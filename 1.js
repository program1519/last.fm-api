document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "API_KEY "; // แทนทีด้วย API_KEY 
    const username = "USERNAME "; // แทนที่ด้วย USERNAME 
    const recentTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;

    const recentTracksElement = document.getElementById("music");

    fetch(recentTracksUrl)
        .then((response) => response.json())
        .then((data) => {
            const recentTracks = data.recenttracks.track;
            recentTracks.forEach((track) => {
                const artist = track.artist["#text"];
                const song = track.name;
                const album = track.album["#text"];
                const image = track.image[1]["#text"]; // เลือกรูปภาพขนาดกลาง

                const listItem = document.createElement("li");

                
                const albumImage = document.createElement("img");
                albumImage.src = image;
                const albumLink = document.createElement("a");
                albumLink.href = track.url;
                albumLink.target = "_blank"; 
                albumLink.appendChild(albumImage);

                
                const trackInfo = document.createElement("div");
                trackInfo.innerHTML = `<strong>${artist}</strong> - ${song} (Album: ${album})`;

                listItem.appendChild(albumLink);
                listItem.appendChild(trackInfo);

                recentTracksElement.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("ดึงข้อมูลไม่ได้", error);
            recentTracksElement.innerHTML = "<p>ดึงข้อมูลไม่ได้</p>";
        });
});
