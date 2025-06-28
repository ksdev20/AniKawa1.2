import { toggleWatchlist } from "../majorJs/anime-card.mjs";

function updateEpisodePage(episodeData, animeData) {
    /*storing values*/
    const embedUrl = episodeData?.url;
    const aTitle = animeData?.animeTitle;
    const aScore = animeData?.score;
    const aLanguage = animeData?.lang;
    const eTitle = episodeData?.episodeDetails?.[0]?.title || `Episode ${episodeData?.episodeNumber}`;
    const eDescription = episodeData?.episodeDetails?.[0]?.description || "No description.";

    /*accessing elements*/
    const iframe = document.getElementById("episode-iframe");
    const aT = document.getElementById("a-title");
    const aS = document.getElementById("a-score");
    const eT = document.getElementById("e-title");
    const eL = document.getElementById("e-language");
    const eD = document.getElementById("e-des");
    const pL = document.getElementById("ecc-p-language");
    const nL = document.getElementById("ecc-n-language");

    /*assigning values*/
    iframe.src = embedUrl;
    aT.textContent = aTitle;
    aS.textContent = aScore;
    eT.textContent = eTitle;
    eD.textContent = eDescription;
    [eL, pL, nL].forEach(l => {
        l.textContent = aLanguage;
    });
}

function main() {
    const episodeJson = JSON.parse(localStorage.getItem('selectedEpisode'));
    if (!episodeJson) return;
    const episodeMain = episodeJson.episode;
    const idx = episodeJson.idx;
    const animeDetails = episodeJson.meta;
    const allEpisodes = episodeJson.allEpisodes;

    const previousEpisode = episodeJson?.allEpisodes[idx - 1];
    const nextEpisode = episodeJson?.allEpisodes[idx + 1];

    updateEpisodePage(episodeMain, animeDetails);

    if (previousEpisode) {
        document.getElementById("p-ep-img").src = previousEpisode?.episodeDetails?.[0]?.thumbnail || "../assets/anime-images/episode-thumbnail-alt-2.png";
        document.getElementById("p-ep-title").innerHTML = previousEpisode?.episodeDetails?.[0]?.title || `Episode ${previousEpisode?.episodeNumber}`;

        const newIdx = (previousEpisode?.episodeNumber - 1);

        const epData = {
            episode: previousEpisode,
            meta: animeDetails,
            idx: newIdx,
            allEpisodes
        };

        document.getElementById("previous-episode").addEventListener('click', () => {
            localStorage.setItem('selectedEpisode', JSON.stringify(epData));
            toggleWatchlist(epData, 'history').then(res => {
                if (res) {
                    window.location.reload();
                }
            });
        });
    } else {
        document.getElementById("previous-episode").style.display = "none";
    }

    if (nextEpisode) {
        document.getElementById("n-ep-img").src = nextEpisode?.episodeDetails?.[0]?.thumbnail || "../assets/anime-images/episode-thumbnail-alt-2.png";
        document.getElementById("n-ep-title").innerHTML = nextEpisode?.episodeDetails?.[0]?.title || `Episode ${nextEpisode?.episodeNumber}`;

        const newIdx = (nextEpisode?.episodeNumber - 1);

        const epData = {
            episode: nextEpisode,
            meta: animeDetails,
            idx: newIdx,
            allEpisodes
        };

        document.getElementById("next-episode").addEventListener('click', () => {
            localStorage.setItem('selectedEpisode', JSON.stringify(epData));
            toggleWatchlist(epData, 'history').then(res => {
                if (res) {
                    window.location.reload();
                }
            });
        });
    } else {
        document.getElementById("next-episode").style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', main);
