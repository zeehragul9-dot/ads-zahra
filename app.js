async function loadAds() {
  const res = await fetch("ads.json");
  return await res.json();
}

function showAd(slot, ad) {
  const adDiv = document.getElementById(slot);
  if (!adDiv) return;

  adDiv.innerHTML = `
    <div class="ad-box">
      <span class="ad-close">&times;</span>
      ${ad.content}
    </div>
  `;

  adDiv.querySelector(".ad-close").addEventListener("click", () => {
    adDiv.innerHTML = "";
  });
}

function showOverlayAd(ad) {
  const overlay = document.getElementById("overlayAd");
  overlay.innerHTML = ad.content;
  overlay.style.display = "block";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 6000);
}

function rotateAds(ads) {
  setInterval(() => {
    const ad = ads[Math.floor(Math.random() * ads.length)];
    if (ad.type === "overlay") {
      showOverlayAd(ad);
    } else if (["top", "bottom", "left", "right"].includes(ad.position)) {
      showAd(ad.position + "Ad", ad);
    }
  }, Math.floor(Math.random() * 5000) + 10000);
}

// ---------------- VIDEO ADS ----------------
const adVideo = document.getElementById("adVideo");
const mainVideo = document.getElementById("mainVideo");
const skipBtn = document.getElementById("skipAdBtn");

function playVideoAd(ad, callback) {
  mainVideo.style.display = "none";
  adVideo.style.display = "block";
  skipBtn.style.display = "none";

  adVideo.src = ad.src;
  adVideo.currentTime = 0;
  adVideo.play();

  setTimeout(() => skipBtn.style.display = "block", ad.skipTime * 1000);

  adVideo.onended = callback;
  skipBtn.onclick = callback;
}

function startMainVideo() {
  adVideo.style.display = "none";
  skipBtn.style.display = "none";
  mainVideo.style.display = "block";
  mainVideo.dataset.started = true;
  mainVideo.play();
}

function resumeMainVideo() {
  adVideo.style.display = "none";
  skipBtn.style.display = "none";
  mainVideo.style.display = "block";
  mainVideo.play();
}

// Init
window.onload = async () => {
  const ads = await loadAds();
  rotateAds(ads);

  const preRoll = ads.find(ad => ad.type === "video" && ad.position === "preroll");
  if (preRoll) {
    playVideoAd(preRoll, startMainVideo);
  }

  let midRollPlayed = false;
  mainVideo.addEventListener("timeupdate", () => {
    if (mainVideo.currentTime > 15 && !midRollPlayed) {
      midRollPlayed = true;
      const midRoll = ads.find(ad => ad.type === "video" && ad.position === "midroll");
      if (midRoll) playVideoAd(midRoll, resumeMainVideo);
    }
  });
};
