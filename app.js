"use strict";

// Native buttons support Tab, Enter and Space. Each group owns only its section.
document.querySelectorAll(".language-control").forEach((group) => {
  const section = group.closest("section");
  group.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      group.querySelectorAll("button").forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
      section.querySelectorAll("[data-language-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.languagePanel !== language;
      });
    });
  });
});

function isLocalHost(hostname) {
  return ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
}

function resourceUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value.trim();
  // Only web URLs or files in this static site's assets. Never filesystem paths.
  if (!/^https?:\/\//i.test(raw) && !/^(?:\.\/)?assets\//.test(raw)) return null;
  const url = new URL(raw, document.baseURI);
  return ["http:", "https:"].includes(url.protocol) ? url : null;
}

function configureLink(key, url, title = "") {
  if (!url) return;
  const slot = document.querySelector(`[data-resource="${key}"]`);
  const anchor = document.createElement("a");
  anchor.className = "resource-button";
  anchor.textContent = slot.textContent;
  anchor.href = url.href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  slot.title = title;
  slot.replaceChildren(anchor);
}

async function configureResources() {
  try {
    const response = await fetch("config.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`config.json HTTP ${response.status}`);
    const config = await response.json();
    let demo = resourceUrl(config.demo_public);
    if (demo && isLocalHost(demo.hostname)) demo = null;
    // A private debug URL is enabled only when the page itself is opened locally.
    // Public/static hosting never presents 127.0.0.1 as a public Demo address.
    if (!demo && isLocalHost(location.hostname)) {
      configureLink("demo", resourceUrl(config.demo_local), "本地调试入口；远程访问需转发 7860");
    } else {
      configureLink("demo", demo);
    }
    const videoUrl = resourceUrl(config.video);
    if (videoUrl) {
      const player = document.createElement("video");
      player.controls = true;
      player.preload = "metadata";
      player.playsInline = true;
      player.setAttribute("aria-label", "MedPrompt demo video");
      const posterUrl = resourceUrl(config.video_poster);
      if (posterUrl) player.poster = posterUrl.href;
      const sources = [[videoUrl, "video/mp4"], [resourceUrl(config.video_webm), "video/webm"]];
      sources.forEach(([url, type]) => {
        if (!url) return;
        const source = document.createElement("source");
        source.src = url.href;
        source.type = type;
        player.append(source);
      });
      const placeholder = document.getElementById("video-placeholder");
      placeholder.hidden = true;
      document.getElementById("demo-video").append(player);
      player.addEventListener("error", () => {
        player.remove();
        placeholder.hidden = false;
      });
    }
  } catch (error) {
    // Retain the real disabled states and video placeholder if config is missing.
    console.warn("Resource links remain unconfigured:", error.message);
  }
}

configureResources();
