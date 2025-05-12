// Логика переключения вкладок
document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
  
      // Убираем активный класс у всех ссылок
      document.querySelectorAll('.tab-link').forEach(item => item.classList.remove('active'));
  
      // Добавляем активный класс текущей ссылке
      this.classList.add('active');
  
      // Скрываем все вкладки
      document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
  
      // Показываем выбранную вкладку
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });