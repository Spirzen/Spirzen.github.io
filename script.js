document.querySelectorAll('.tab-link, .tab-switch').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelectorAll('.tab-link').forEach(item => item.classList.remove('active'));

    document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));

    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');

    if (this.classList.contains('tab-link')) {
      this.classList.add('active');
    }
  });
});