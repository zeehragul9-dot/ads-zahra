(function() {
  // 1. Inject CSS
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://zeehragul9-dot.github.io/ads-zahra/style.css";
  document.head.appendChild(css);

  // 2. Detect main video source
  const scriptTag = document.currentScript;
  const videoSrc = scriptTag.getAttribute("data-video") 
    || "https://zeehragul9-dot.github.io/ads-zahra/sample.mp4";

  // 3. Inject Ad Slots + Videos
  const container = document.createElement("div");
  container.innerHTML = `
    <div id="topAd"></div>
    <div id="leftAd"></div>
    <div id="rightAd"></div>
    <div id="bottomAd"></div>
    <div id="overlayAd"></div>

    <video id="mainVideo" width="600" controls>
      <source src="${videoSrc}" type="video/mp4">
    </video>

    <video id="adVideo" width="600" style="display:none;" muted></video>
    <button id="skipAdBtn" style="display:none;">Skip Ad</button>
  `;
  document.body.appendChild(container);

  // 4. Load Ads Logic
  const script = document.createElement("script");
  script.src = "https://zeehragul9-dot.github.io/ads-zahra/app.js";
  document.body.appendChild(script);
})();
