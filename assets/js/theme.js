import * as params from '@params';

const allTypes = ["all",  {{ range .Site.Sections }}"{{lower .Title}}",{{ end }}];
const filter = (event, type) => {
  const isMultiPage = !!document.querySelector('nav.multipage');

  if (isMultiPage) {
    return;
  }

  const isActive = event.target.classList.contains("active");

  showAll();
  if (!isActive) {
    hideAll();
    event.target.classList.add("active");
    if (type !== "other") {
      document
        .querySelectorAll(`.${type}`)
        .forEach((item) => item.classList.remove("hide"));
    } else {
      document
        .querySelectorAll(
          `.card${specificTypes.map((type) => `:not(.${type})`).join("")}`
        )
        .forEach((item) => item.classList.remove("hide"));
    }
  }
};

const showAll = () => {
  allTypes.forEach((type) => {
    document
      .querySelectorAll(`.${type}`)
      .forEach((item) => item.classList.remove("hide"));
    document
      .querySelectorAll(`nav:not(.multipage) .filter-${type}`)
      .forEach((filterItem) => filterItem.classList.remove("active"));
  });
};

const hideAll = () => {
  allTypes.forEach((type) => {
    document
      .querySelectorAll(`.container a.card`)
      .forEach((item) => item.classList.add("hide"));
  });
};

allTypes.forEach((type) => {
  document
    .querySelectorAll(`.filter-${type}`)
    .forEach((filterItem) =>
      filterItem.addEventListener("click", (event) => filter(event, type))
    );
});

const showAllButton = document.querySelector(`.show-all`)
if(showAllButton) {
  showAllButton.addEventListener("click", showAll);
}

{{ if .Site.Params.darkMode }}
const darkmode = document.querySelector('.toggle-dark-mode');
function toggleDarkMode() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkmode', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkmode', 'dark')
  }
}
if (darkmode) {
  darkmode.addEventListener('click', toggleDarkMode);
}

const isDark = localStorage.getItem('darkmode');
if(isDark && isDark === 'dark') {
  toggleDarkMode();
}
{{ end }}
