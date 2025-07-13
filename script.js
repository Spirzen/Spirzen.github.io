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

function loadProject(projectId) {
	const details = document.getElementById("projectDetails");
	let content = "";
	switch (projectId) {
		case "InProgress":
			content = `
				<h2>В работе</h2>
				<p><strong>Стек:</strong> В работе</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">В работе</a></p>
				<p><strong>Описание:</strong> В работе</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">В работе;</li>
					<li align="left">В работе;</li>
					<li align="left">В работе;</li>
					<li align="left">В работе; </li>
					<li align="left">В работе.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/" alt="Скриншот проекта"></p>
			`;
			break;

		case "Budman":
			content = `
				<h2>Budman - Бюджетный менеджер</h2>
				<p><strong>Стек:</strong> JavaScript, HTML, CSS</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Budman" target="_blank">https://github.com/Spirzen/Budman</a></p>
				<p><strong>Описание:</strong> Это бюджетный менеджер - удобный и простой в использовании инструмент для планирования личного бюджета. Программа позволяет пользователям прогнозировать финансовое состояние на срок до 5 лет вперёд, учитывая ежемесячные доходы и расходы.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">Учёт начального остатка : пользователь указывает сумму текущего счёта;</li>
					<li align="left">Выбор стартового месяца и года : расчёт начинается с нужной даты;</li>
					<li align="left">Гибкое добавление доходов и расходов : можно ввести несколько строк (например, зарплата, подработка, кредиты, аренда и т.д.);</li>
					<li align="left">Автоматический расчёт итоговых сумм : программа складывает все доходы и расходы по категориям; </li>
					<li align="left">Прогноз на 5 лет вперёд : формируется таблица с ежемесячным отображением.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/Budman.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "SimpleSurvivors":
			content = `
				<h2>Simple Survivors</h2>
				<p><strong>Стек:</strong> C#, Windows Forms, GDI+, двойная буферизация, System.Media, сериализация объектов в файл через BinaryFormatter</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Simple-Survivors" target="_blank">https://github.com/Spirzen/Simple-Survivors</a></p>
				<p><strong>Описание:</strong> Простая аркадная игра в стиле Vampire Survivors с минимальной графикой и максимальным удовольствием от процесса. 2D-игра в жанре survival rogue-lite, где игроку предстоит выживать среди постоянно появляющихся врагов, получать опыт за убийства, повышать уровень и выбирать полезные бонусы для усиления. Цель проста: продержаться как можно дольше, уворачиваясь от противников и автоматически атакуя их.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">Перемещение: W, A, S, D;</li>
					<li align="left">Автоматическая атака каждые несколько секунд;</li>
					<li align="left">Визуальные эффекты при попадании и получении урона;</li>
					<li align="left">После повышения уровня игрок выбирает один из трёх бонусов; </li>
					<li align="left">Потенциально бесконечный геймплей.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/SimpleSurvivors.png" alt="Скриншот проекта"></p>
			`;
			break;
			
		case "SimpleCRM":
			content = `
				<h2>SimpleCRM</h2>
				<p><strong>Стек:</strong> C#, ASP.NET, PostgreSQL, Entity Framework Core, Identity Framework, HTML, CSS, JavaScript, Bootstrap, Razor Pages, AutoMapper, FluentValidation, Logging</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SimpleCRM" target="_blank">https://github.com/Spirzen/SimpleCRM</a></p>
				<p><strong>Описание:</strong> Простая система управления обращениями (CRM), разработанная на основе ASP.NET. Она предоставляет пользователям возможность регистрироваться, авторизовываться, создавать, просматривать и редактировать обращения. Система поддерживает роли пользователей (например, "Администратор" и "Пользователь"), что позволяет гибко управлять доступом к функционалу.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">регистрация и авторизация пользователей (с поддержкой ролей);</li>
					<li align="left">редактирование профиля (имя, email, пароль);</li>
					<li align="left">создание, редактирование и удаление обращений;</li>
					<li align="left">назначение ответственного сотрудника за обращение; </li>
					<li align="left">административная панель.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/SimpleCRM.png" alt="Скриншот проекта"></p>
			`;
			break;
		
		case "CurConverter":
			content = `
				<h2>Конвертер валют ЦБ</h2>
				<p><strong>Стек:</strong> C#, .NET, ASP.NET, Entity Framework Core, Microsoft SQL Server, XML API, Http, HTML, CSS</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/CurConverter.git" target="_blank">https://github.com/Spirzen/CurConverter.git</a></p>
				<p><strong>Описание:</strong> Веб-приложение для просмотра актуальных курсов валют ЦБ и выполнения конвертации.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">автоматическая загрузка курсов валют из API ЦБ РФ;</li>
					<li align="left">возможность конвертации путём выбора суммы, исходной и целевой валюты;</li>
					<li align="left">курсы автоматически сохраняются в базе данных; </li>
					<li align="left">отображается код, название, курс и дата обновления.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/CurConverter.png" alt="Скриншот проекта"></p>
			`;
			break;
		
		case "WordTrainer":
			content = `
				<h2>WordTrainer</h2>
				<p><strong>Стек:</strong> C#, WPF, SQLite</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/WordTrainer" target="_blank">https://github.com/Spirzen/WordTrainer</a></p>
				<p><strong>Описание:</strong> WPF-приложение, которое позволяет учить слова на английском языке. Приложение подбирает случайное слово и пользователь может написать перевод.   </p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">валидация - проверка на корректность перевода, введённого пользователем;</li>
					<li align="left">возможность показать перевод;</li>
					<li align="left">выбор уровня сложности (низкий, средний, высокий); </li>
					<li align="left">выбор режима работы (англо-русский или русско-английский).</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/WordTrainer.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "CSVJSONConverter":
			content = `
				<h2>CSV-JSON Converter</h2>
				<p><strong>Стек:</strong> C#, .NET, WPF, CSV, CSVHelper, JSON, Newtonsoft.Json, ClickHouse.</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/CSV-JSON-Converter" target="_blank">https://github.com/Spirzen/CSV-JSON-Converter</a></p>
				<p><strong>Описание:</strong> CSV-JSON Converter - приложение для преобразования данных из формата CSV в JSON с ориентацией на колоночную архитектуру. Основная цель - создать конвертер данных для работы с ClickHouse.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">Загрузка CSV-файлов;</li>
					<li align="left">Отображение содержимого файла (предпросмотр);</li>
					<li align="left">Преобразование в JSON с предпросмотром результата; </li>
					<li align="left">Возможность сохранения результата.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/CSV-to-JSON.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "SQLGenerator":
			content = `
				<h2>SQL Generator</h2>
				<p><strong>Стек:</strong> C#, WPF, MVVM, XAML</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SQL-Generator" target="_blank">https://github.com/Spirzen/SQL-Generator</a></p>
				<p><strong>Описание:</strong> инструмент для генерации SQL-запросов с использованием графического интерфейса. Проект позволяет пользователям создавать запросы типа SELECT, INSERT, UPDATE, DELETE без необходимости вручную писать SQL-код. Это особенно полезно для начинающих разработчиков, аналитиков или тех, кто хочет быстро протестировать свои запросы.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">поддержка SELECT, INSERT, UPDATE, DELETE;</li>
					<li align="left">поддержка JOIN (INNER, LEFT, RIGHT, FULL);</li>
					<li align="left">фильтрация данных (WHERE с выбором операторов =, <>, LIKE, IS NULL и др);</li>
					<li align="left">возможность скопировать запрос в буфер обмена</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/SQLGenerator.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "CatalogueWebApp":
			content = `
				<h2>CatalogueWebApp - работа с каталогом</h2>
				<p><strong>Стек:</strong> C#, ASP.NET, MongoDB, ElasticSearch, Docker, Boostrap</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Catalogue-Helper" target="_blank">https://github.com/Spirzen/Catalogue-Helper</a></p>
				<p><strong>Описание:</strong> Управление каталогом товаров. Позволяет загружать JSON-файлы с данными о товарах, инициализировать NoSQL базу данных MongoDB, выполнять поиск с использованием ElasticSearch. Имеется фильтрация, сортировка, пагинация.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/CatalogueWebApp.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "DocGenerator":
			content = `
				<h2>Генератор технической документации Markdown - PDF</h2>
				<p><strong>Стек:</strong> C#, MAUI, Markdig, HtmlToPdf, Handlebars, YAML, HTML</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/DocGenerator" target="_blank">https://github.com/Spirzen/DocGenerator</a></p>
				<p><strong>Описание:</strong> Утилита для преобразования Markdown-файлов в PDF-документы. Данное приложение берёт Markdown-файлы +YAML-шаблоны и генерирует красивый PDF/HTML с оглавлением, подсветкой кода, темами.</p>
				<p>Программа позволяет загружать файлы с расширением .md, .yaml, выбирать тему и формат выходного файла, а также выбирать место сохранения результата.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/DocGenerator.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "RandomMediaBot":
			content = `
				<h2>Random Media Bot</h2>
				<p><strong>Стек:</strong> C#, Telegram Bot, API, SQLite, Docker</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">Закрытый код</a></p>
				<p><strong>Описание:</strong> Random Media Bot - это Telegram-бот, который позволяет подобрать случайный фильм, игру, книгу, дораму, аниме, сериал или индийский фильм. Достаточно просто написать или выбрать в меню кнопку, и в ответ получим ссылку для приобретения в доступных магазинах (если есть в продаже), краткое описание, сведения об жанре, авторе, платформах, и т.д.</p>
				<p>Написанный на C# проект, консольное приложение, развернутое на Docker, которое обрабатывает запросы через крупную базу данных SQLite.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/RandomMediaBot.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "IndianFilmManager":
			content = `
				<h2>Indian Film Manager</h2>
				<p><strong>Стек:</strong> C#, ASP.NET Core, Entity Framework Core, SQLite, HTML, CSS, JavaScript, Bootstrap, jQuery (для работы с автодополнением), LINQ, Razor Pages, AJAX</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Indian-Film-Manager" target="_blank">https://github.com/Spirzen/Indian-Film-Manager</a></p>
				<p><strong>Описание:</strong> Indian Film Manager — это веб-приложение для управления данными о фильмах, актёрах и жанрах. Проект создан для удобного хранения, поиска и редактирования информации о фильмах, а также связанных с ними данных. ASP.NET, ORM - Entity Framework Core.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">управление фильмами - добавление, редактирование, удаление, указание года выпуска, рейтинга, актёров и жанров для каждого фильма;</li>
					<li align="left">управление актёрамии - добавление, редактирование, удаление актёров;</li>
					<li align="left">управление жанрами, привязка к фильмам.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/IndianFimManager.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "LogManager":
			content = `
				<h2>LogManager</h2>
				<p><strong>Стек:</strong> C#, .NET, WPF, MVVM, LINQ, Regex, CSV.</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Log-Manager" target="_blank">https://github.com/Spirzen/Log-Manager</a></p>
				<p><strong>Описание:</strong> Инструмент для анализа, фильтрации и экспорта логов, построенный по MVVM.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">Поддержка загрузки текстовых файлов с логами;</li>
					<li align="left">Автоматический парсинг строк с использованием регулярных выражений;</li>
					<li align="left">Поддержка формата логов [Дата/время] Уровень: Сообщение;</li>
					<li align="left">Поиск по тексту и фильтрация по уровню (INFO, WARN, ERROR);</li>
					<li align="left">Группировка записей по уровню и по дате;</li>
					<li align="left">Возможность экспорта отфильтрованных логов в CSV.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/Log Manager.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "QRGenerator":
			content = `
				<h2>Генератор QR-кодов</h2>
				<p><strong>Стек:</strong> C#, ASP.NET, ZXing.Net (библиотека для генерации QR-кодов), HTML, CSS.</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/QR-Generator.git" target="_blank">https://github.com/Spirzen/QR-Generator.git</a></p>
				<p><strong>Описание:</strong> Веб-приложение на ASP.NET Core, которое позволяет генерировать QR-коды из текста или ссылок. Приложение предоставляет удобный интерфейс для ввода данных, отображения сгенерированного QR-кода и его сохранения в формате PNG.</p>
				<p>Есть и консольный вариант приложения.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/QR Generator.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "GameLibraryManager":
			content = `
				<h2>Game Library Manager</h2>
				<p><strong>Стек:</strong> C#, .NET, ASP.NET Razor Pages, Entity Framework Core, SQLite, HTML, CSS.</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Game-Library-Manager" target="_blank">https://github.com/Spirzen/Game-Library-Manager</a></p>
				<p><strong>Описание:</strong> Веб-приложение на базе ASP.NET Core, предназначенное для управления библиотекой игр. Пользователи могут добавлять, редактировать, удалять и просматривать информацию о играх через удобный пользовательский интерфейс (выполнять CRUD-операции с использованием Entity Framework Core). </p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">добавление игр с указанием названия, жанра, года, разработчика и платформ;</li>
					<li align="left">редактирование путём обновления данных существующих игр;</li>
					<li align="left">удаление игр из библиотеки;</li>
					<li align="left">просмотр списка игр в виде таблицы.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/Game_Library_Manager.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "GISOGDWiki":
			content = `
				<h2>База знаний по ГИСОГД РБ и ИСУП</h2>
				<p><strong>Стек:</strong> MediaWiki, PHP, MySQL</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">Закрытый код</a></p>
				<p><strong>Описание:</strong> При работе в ГБУ РГЦ на должности начальника отдела, возникла необходимость эффективно обучать и доносить информацию до пользователей региональной системы. По итогу, создал огромную базу знаний, наполненную кучей информации о цифровизации строительства. Все статьи, разделы, созданы, развернуты и написаны мною лично. </p>
				<p> Используя платформу MediaWiki, создал, развернул и написал систему. Поначалу она касалась только региональной ГИСОГД РБ, затем подключил туда ИСУП, федеральную систему. Развернута на мощностях ГБУ РГЦ. Сейчас я там уже не работаю, и фактически поддержка оставлена в руки оператора ГИСОГД РБ.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/Wiki.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "RandomGameLauncher":
			content = `
				<h2>Random Game Launcher</h2>
				<p><strong>Стек:</strong> C#, WPF, SQLite, Steam</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">Закрытый код</a></p>
				<p><strong>Описание:</strong> Небольшой проект собственной разработки для личного пользования. Программа для ПК, которая позволяет рандомизировать и запускать установленные программы или игры на компьютере. В ряде случаев пользователю хочется поиграть, но коллекция огромная, и приходится тратить время на выбор. </p>
				<p> Лаунчер позволяет выбрать папку с ярлыками, добавить интеграцию со Steam (система проверит, какие игры установлены локально), рандомизировать - система при этом подберет случайную игру, и запустить. При этом есть система фильтрации, поиска, избранного, категорий и даже две темы - темная и светлая.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/RandomGameLauncher.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "OMSU":
			content = `
				<h2>Симулятор ОМСУ</h2>
				<p><strong>Стек:</strong> HTML, CSS, JavaScript</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">Закрытый код</a></p>
				<p><strong>Описание:</strong> Один из простейших проектов - игра-кликер на базе HTML. Симулятор главы муниципалитета, где нужно всё время подписывать документы, подписывать снова и снова, и при этом будет расти уровень бюджета. На бюджетные средства можно создавать отделы, подведомственные учреждения, школы, больницы и тд. А в каждый отдел и подведомственное учреждение можно нанимать сотрудников разных рангов - начальник, ведущий, специалист. </p>
				<p>Они все дают прибыль, эта прибыль идет в бюджет. Расходы идут на зарплаты, обязательные мероприятия, генерируемые случайным образом (праздник в честь юбилея города, неожиданные проверки, катастрофы), а также на налоги. Излишки бюджета можно выделять как премии сотрудникам.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/OMSU.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "MiniBrowser":
			content = `
				<h2>Мини-браузер</h2>
				<p><strong>Стек:</strong> C#, Windows Forms, WebView2, HTTPS</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Browser" target="_blank">https://github.com/Spirzen/Browser</a></p>
				<p><strong>Описание:</strong> Небольшой браузер на WebView2, с поддержкой навигации и перехода по HTTPS-ссылкам, с использованием паттерна MVVM (Model-View-ViewModel). Практика разбиения кода по папкам и файлам, а также работа с Windows Forms</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/Browser.png" alt="Скриншот проекта"></p>
			`;
			break;
		
		case "KnowledgeBase":
			content = `
				<h2>База знаний типовых решений</h2>
				<p><strong>Стек:</strong> Markdown, Obsidian</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">Закрытый код</a></p>
				<p><strong>Описание:</strong> База знаний по IT, включая теорию по различным разделам, заканчивая типовыми решениями разных задач по языкам программирования. Личный проект, не содержащий коммерческих тайн, только собственные идеи и статьи собственного авторства. Использую для изучения технологий в свободное время.</p>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/ObsidianWiki.png" alt="Скриншот проекта"></p>
			`;
			break;

		case "CreditCalculator":
			content = `
				<h2>CreditCalculator</h2>
				<p><strong>Стек:</strong> Java, JFrame, JOptionPane</p>
				<p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/CreditCalculator" target="_blank">https://github.com/Spirzen/CreditCalculator</a></p>
				<p><strong>Описание:</strong> Кредитный калькулятор, который позволяет ввести сумму кредита, процентную ставку и срок (в годах), а затем рассчитать и получить общую сумму и размер переплаты.</p>
				<p>Основные возможности</p>
				<ul align="left">
					<li align="left">Пользовательский интерфейс;</li>
					<li align="left">Возможность ввода данных (сумма, ставка, срок кредита);</li>
					<li align="left">Расчёт общей суммы и размера переплаты.</li>
				</ul>
				<p><strong>Скриншот:</strong></p>
				<p><img src="Resources/Screenshots/CreditCalculator.jpg" alt="Скриншот проекта"></p>
			`;
			break;
	}

	details.innerHTML = content;
}