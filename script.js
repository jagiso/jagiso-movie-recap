/*
  JAGISO ፊልሞች Recap — site interactions and movie data.
  To link a recap, replace videoId: "" with the YouTube video ID only.
  Example: https://www.youtube.com/watch?v=AbCdEf12345 -> videoId: "AbCdEf12345"
*/
const channelUrl = "https://www.youtube.com/@jagisofilmochrecapamharic";

const movieDetails = {
  "The Guest": {
    genre: "Thriller", year: "2014",
    description: "A mysterious visitor arrives at a family’s home, and his friendly appearance slowly gives way to unsettling secrets. Add your own Amharic recap summary here.",
    videoId: ""
  },
  "Gifted": {
    genre: "Drama", year: "2017",
    description: "A young girl’s extraordinary talent places her future at the center of a family struggle. Add your own Amharic recap summary here.",
    videoId: ""
  },
  "The Menu": {
    genre: "Thriller", year: "2022",
    description: "A couple visits an exclusive restaurant on a remote island, where the evening’s carefully planned menu becomes increasingly disturbing. Add your own Amharic recap summary here.",
    videoId: ""
  },
  "Drishyam": {
    genre: "Thriller", year: "2015",
    description: "A family man uses his sharp instincts to protect his family when a crisis threatens to expose them. Add your own Amharic recap summary here.",
    videoId: ""
  },
  "The Beauty Inside": {
    genre: "Romance", year: "2005",
    description: "This starter entry needs the exact film details and recap you want to feature. Update this description in script.js before publishing.",
    videoId: ""
  },
  "Koi... Mil Gaya": {
    genre: "Sci-Fi", year: "2003",
    description: "A young man makes an extraordinary connection that changes his life and opens the door to an unexpected world. Add your own Amharic recap summary here.",
    videoId: ""
  }
};

const searchInput = document.getElementById("searchInput");
const filterList = document.getElementById("filterList");
const movieGrid = document.getElementById("movieGrid");
const cards = [...document.querySelectorAll(".movie-card")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const resetSearch = document.getElementById("resetSearch");
const dialog = document.getElementById("movieDialog");
const dialogClose = document.getElementById("dialogClose");
let activeFilter = "All";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const genre = card.dataset.genre;
    const matches = title.includes(query) && (activeFilter === "All" || genre === activeFilter);
    card.hidden = !matches;
    if (matches) visible++;
  });
  resultCount.textContent = `${visible} ${visible === 1 ? "story" : "stories"}`;
  emptyState.hidden = visible !== 0;
  movieGrid.hidden = visible === 0;
}

searchInput.addEventListener("input", applyFilters);
filterList.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  filterList.querySelectorAll(".filter-chip").forEach(chip => {
    const active = chip === button;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  applyFilters();
});

resetSearch.addEventListener("click", () => {
  searchInput.value = "";
  activeFilter = "All";
  filterList.querySelectorAll(".filter-chip").forEach(chip => {
    const active = chip.dataset.filter === "All";
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  applyFilters();
});

function openMovie(card) {
  const title = card.dataset.title;
  const details = movieDetails[title] || {};
  document.getElementById("dialogTitle").textContent = title;
  document.getElementById("dialogMeta").textContent = `${details.year || card.dataset.year}  •  ${details.genre || card.dataset.genre}`;
  document.getElementById("dialogDescription").textContent = details.description || "Add a description for this movie in script.js.";
  const videoWrap = document.getElementById("videoWrap");
  const videoHint = document.getElementById("videoHint");
  const frame = document.getElementById("youtubeFrame");
  if (details.videoId && /^[a-zA-Z0-9_-]{11}$/.test(details.videoId)) {
    frame.src = `https://www.youtube-nocookie.com/embed/${details.videoId}?rel=0`;
    videoWrap.hidden = false;
    videoHint.hidden = true;
  } else {
    frame.src = "";
    videoWrap.hidden = true;
    videoHint.hidden = false;
  }
  document.getElementById("dialogYoutubeLink").href = `${channelUrl}/search?query=${encodeURIComponent(title)}`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.open(`${channelUrl}/search?query=${encodeURIComponent(title)}`, "_blank", "noopener");
}

document.querySelectorAll("[data-open-movie]").forEach(button => {
  button.addEventListener("click", () => openMovie(button.closest(".movie-card")));
});
dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  document.getElementById("youtubeFrame").src = "";
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-25% 0px -65% 0px" });
  sections.forEach(section => observer.observe(section));
}

applyFilters();
