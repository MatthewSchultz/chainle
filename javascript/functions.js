const handleModalClick = function(event) {
  dx = document.querySelector(event.target.dataset.target);
  dx.showModal();

  dx.addEventListener('click', function (event) {
    var rect = dx.getBoundingClientRect();
    var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      dx.close();
    }
  });
};

const handleLinkClick = function(event) {
  // TODO: Navigate
};

window.addEventListener('load', (event) => {
  document.querySelectorAll('[data-action="modal"]').forEach((element) => {
    element.addEventListener('click', handleModalClick);
  });

  document.querySelectorAll('[data-action="link"]').forEach((element) => {
    element.addEventListener('click', handleLinkClick);
  });
});
