let migrations = [
  function() {
    console.log('MIGRATION -- Initializing Storage');
  },
  function() {
    console.log('MIGRATION -- Setting color mode');
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('COLOR-MODE', 'dark');
    } else {
      localStorage.setItem('COLOR-MODE', 'light');
    }
  }
];

let migrateStorage = function() {
  // Get the current version:
  let currentVersion = localStorage.getItem('VERSION');

  // Current version not found, clear local storage and re-initialize:
  if(!currentVersion) {
    localStorage.clear();
    localStorage.setItem('VERSION', -1);
    currentVersion = -1;
  }

  // Run any migrations:
  while(currentVersion < (migrations.length - 1)) {
    currentVersion++;
    migrations[currentVersion]();
    localStorage.setItem('VERSION', currentVersion);
  }
}

window.addEventListener('load', (event) => {
  migrateStorage();
  document.body.classList.add(localStorage.getItem('COLOR-MODE'));
});
