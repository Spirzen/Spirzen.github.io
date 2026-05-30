const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀' : '◐';
}

const PIPELINE_STEPS = [
    { title: 'Бизнес-требования', text: 'Сбор и согласование целей с заказчиком, фиксация ограничений, рисков и критериев приёмки.' },
    { title: 'Анализ', text: 'Декомпозиция задачи, уточнение сценариев, приоритизация, согласование с бизнесом и ИТ.' },
    { title: 'BPMN и UML', text: 'Формализация процессов (BPMN 2.0), модели данных, диаграммы взаимодействия и состояний.' },
    { title: 'Архитектура', text: 'Выбор стека, границы сервисов, интеграции REST/SOAP, схемы БД, нефункциональные требования.' },
    { title: 'Разработка', text: 'Реализация на C#, Java, TypeScript, low-code (BPMSoft, ELMA365), коннекторы и автоматизация.' },
    { title: 'Тест и деплой', text: 'Проверка сценариев, регресс, CI/CD (GitLab, GitHub Actions), выкладка и сопровождение.' }
];

const ECO_DETAILS = {
    author: { title: 'Автор и методист', text: 'Тагиров Тимур — архитектура знаний, структура разделов, теги, демо и публикация с 2018 года.' },
    articles: { title: '3000+ статей', text: 'Markdown и MDX в docs/: энциклопедия, подборки, инструменты, контекст отраслей.' },
    lab: { title: 'Лаборатория и глоссарий', text: 'Практикумы, тренажёры, экзамены и алфавитный справочник терминов.' },
    docusaurus: { title: 'Docusaurus + React', text: 'SSG-сборка it-knowledge-base: тема, sidebar, PDF, «См. также», GitHub Actions → spirzen.ru.' },
    demos: { title: '120+ интерактивных демо', text: 'React-виджеты в статьях: терминал, Docker, SQL, Git, Kafka, нейросети и др.' },
    maui: { title: '.NET MAUI', text: 'Нативная оболочка itu-mobile-app: Shell, каталог, закладки, ru.spirzen.ituniverse.' },
    webview: { title: 'WebView и поиск', text: 'Статьи с spirzen.ru, локальный search-manifest, офлайн-закладки, навигация назад/вперёд.' },
    site: { title: 'spirzen.ru', text: 'Единая точка публикации: веб-читалка и источник контента для мобильного клиента.' }
};

const ECO_LINKS = {
    author: ['articles', 'lab'],
    articles: ['author', 'docusaurus', 'demos'],
    lab: ['author', 'docusaurus'],
    docusaurus: ['articles', 'demos', 'site'],
    demos: ['articles', 'docusaurus', 'site'],
    maui: ['webview', 'site'],
    webview: ['maui', 'site'],
    site: ['docusaurus', 'demos', 'webview']
};

function initAnalyticsPipeline() {
    const container = document.getElementById('analyticsPipeline');
    if (!container || container.dataset.ready) return;

    const steps = container.querySelectorAll('.pipe-step');
    const titleEl = document.getElementById('pipelinePanelTitle');
    const textEl = document.getElementById('pipelinePanelText');

    function activate(index) {
        steps.forEach((btn, i) => {
            const on = i === index;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        const step = PIPELINE_STEPS[index];
        if (step && titleEl && textEl) {
            titleEl.textContent = step.title;
            textEl.textContent = step.text;
        }
    }

    steps.forEach((btn) => {
        btn.addEventListener('click', () => activate(Number(btn.dataset.step)));
    });

    container.dataset.ready = '1';
}

function initEcoViz() {
    const viz = document.getElementById('ecoViz');
    if (!viz || viz.dataset.ready) return;

    const nodes = viz.querySelectorAll('.eco-node, .eco-hub');
    const titleEl = document.getElementById('ecoPanelTitle');
    const textEl = document.getElementById('ecoPanelText');

    function clearHighlight() {
        nodes.forEach((n) => n.classList.remove('active', 'dimmed', 'highlight'));
    }

    function selectEco(id) {
        const info = ECO_DETAILS[id];
        if (!info) return;

        clearHighlight();
        const related = new Set([id, ...(ECO_LINKS[id] || [])]);

        nodes.forEach((node) => {
            const nid = node.dataset.eco;
            if (!nid) return;
            if (nid === id) {
                node.classList.add('active', 'highlight');
            } else if (related.has(nid)) {
                node.classList.add('highlight');
            } else {
                node.classList.add('dimmed');
            }
        });

        if (titleEl) titleEl.textContent = info.title;
        if (textEl) textEl.textContent = info.text;
    }

    nodes.forEach((node) => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            const id = node.dataset.eco;
            if (node.classList.contains('active')) {
                clearHighlight();
                if (titleEl) titleEl.textContent = 'Экосистема';
                if (textEl) textEl.textContent = 'Выберите элемент схемы — подсветится связь с остальными узлами.';
                return;
            }
            selectEco(id);
        });
    });

    viz.dataset.ready = '1';
}

function initInteractiveDiagrams() {
    initAnalyticsPipeline();
    initEcoViz();
}

function initProjectList() {
    const list = document.querySelector('.project-list ul');
    if (!list || list.dataset.bound === '1') return;
    list.dataset.bound = '1';

    list.addEventListener('click', (e) => {
        const li = e.target.closest('li[data-project-id]');
        if (!li) return;
        loadProject(li.dataset.projectId);
        list.querySelectorAll('li[data-project-id]').forEach((item) => item.classList.remove('project-active'));
        li.classList.add('project-active');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getPreferredTheme());
    initInteractiveDiagrams();
    initProjectList();

    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });
});

// Логика переключения табов
document.querySelectorAll('.tab-link, .tab-switch').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Убираем активные классы
        document.querySelectorAll('.tab-link').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));

        const tabId = this.getAttribute('data-tab');
        
        if (tabId) {
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
                
                // Если это ссылка-переключатель (tab-switch), активируем соответствующую кнопку меню
                if (this.classList.contains('tab-switch')) {
                    const menuLink = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
                    if (menuLink) menuLink.classList.add('active');
                } else {
                    this.classList.add('active');
                }

                if (tabId === 'analytics' || tabId === 'it-book') {
                    initInteractiveDiagrams();
                }
            }
        }
    });
});

function switchTab(tabId) {
    const link = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
    if (link) {
        link.click();
    }
}

function enhanceProjectScreenshots(container) {
    if (!container) return;

    container.querySelectorAll('p > img').forEach((img) => {
        if (img.closest('.project-screenshot')) return;

        const parent = img.parentElement;
        if (!parent) return;

        const figure = document.createElement('figure');
        figure.className = 'project-screenshot';

        const frame = document.createElement('div');
        frame.className = 'project-screenshot__frame';

        img.loading = 'lazy';
        img.decoding = 'async';
        frame.appendChild(img);
        figure.appendChild(frame);

        const alt = (img.getAttribute('alt') || '').trim();
        if (alt && !/^скриншот/i.test(alt)) {
            const caption = document.createElement('figcaption');
            caption.className = 'project-screenshot__caption';
            caption.textContent = alt;
            figure.appendChild(caption);
        }

        parent.replaceWith(figure);
    });
}

function loadProject(projectId) {
    const details = document.getElementById("projectDetails");
    let content = "";
    const id = String(projectId || '').trim();
    
    const knownProjects = [
        'InProgress', 'JPGPDF', 'DockerfileGenerator', 'Budman', 'SimpleSurvivors', 'Pythonablo', 
        'SimpleCRM', 'SampleSupport', 'CurConverter', 'WordTrainer', 'CSVJSONConverter',
        'CatalogueWebApp', 'DocGenerator', 'RandomMediaBot', 'IndianFilmManager', 
        'LogManager', 'QRGenerator', 'GameLibraryManager', 'GISOGDWiki', 'RandomGameLauncher', 
        'OMSU', 'MiniBrowser', 'KnowledgeBase', 'CreditCalculator', 'AIAssistant', 
        'Camunda-Approval-Manager', 'ITUniverse', 'ITUniverseMobile', 'S3MediaManager', 'SteamRandomLauncher', 
		'SimplePCMessenger', 'XMLValidator', 'DockerMiniManager', 'Government',
        'AllStarsMVP', 'ArchiStyler', 'ArchiStylerOnline', 'RandomManager', 'DependencyGraphSentinel', 'DatabaseSchemaViewer',
        'CodeExampleValidator', 'PATHManager', 'SchemaMaker', 'SchemaMakerOnline',
        'SQLGeneratorOnline', 'SQLGenerator', 'Excel2SQL', 'AutoBattler', 'OnlineCardGame'
    ];
    
    if (!knownProjects.includes(id)) {
        content = `<h2>Ошибка</h2><p>Проект с таким идентификатором не найден.</p>`;
    } else {
        switch (id) {
            case "InProgress":
                content = `
                    <h2>В работе</h2>
                    <p><strong>Стек:</strong> В разработке</p>
                    <p><strong>Описание:</strong> Проект находится на стадии активной разработки.</p>
                `;
                break;
				
			case "Government":
                content = `
                    <h2>ГИСОГД РБ</h2>
                    <p><strong>Сайт:</strong> <a href="https://gisogd.bashkortostan.ru/" target="_blank" rel="noopener">gisogd.bashkortostan.ru</a></p>
					<p><strong>Стек:</strong> PostgreSQL, SQLite, Python, PHP, C#, REST API, Linux, Docker, BPMN, XML/JSON, ЕСИА, СМЭВ, ГИС.</p>
                    <p><strong>Масштаб:</strong> Одна из крупнейших в России государственных региональных информационных систем в области архитектуры и градостроительства.</p>
                    <p>Проектировал, внедрял, развивал, обеспечивал стабильность, безопасность и техническую поддержку.</p>
                    <p>Успешно внедрена во всех 63 муниципалитетах Республики Башкортостан. Реализована интеграция с ЕПГУ/СМЭВ/ЕГРН/ЕГРЮЛ и множеством других систем.</p>
                    <p>Создал сотни руководств, инструкций, регламентов, развернул свою Wiki (базу знаний), стал де-факто техническим писателем проекта.</p>
					<p>Обеспечивал 100% размещение градостроительной документации республики и успешно закрывал даже критические инциденты.</p>
					<h2>ИСУП</h2>
					<p><strong>Сайт:</strong> <a href="https://isup.roskapstroy.ru/" target="_blank" rel="noopener">isup.roskapstroy.ru</a></p>
					<p>Информационная система управления проектами.</p>
					<p>Облачная информационная система, предназначенная для автоматизации процессов управления строительными проектами на уровне государственного и муниципального заказчика..</p>
					<p>Обеспечивает комплексное управление, финансовый учет и мониторинг, автоматизацию основных процессов, согласование и подписание документации, и использование Low Code платформы для настройки и адаптации бизнес-процессов.</p>
					<h2>Портал согласования документации по планировке территории</h2>
					<p>Подсистема ГИСОГД РБ, предназначенная для автоматизации процесса согласования проектов планировки территории и проектов межевания территории в региональных органах исполнительной власти и муниципальных образованиях Республики Башкортостан.</p>
					<p>Реализована в рамках процесса цифровизации процессов подготовки, согласования и утверждения ДПТ.</p>
					<h2>СИРД</h2>
					<p>Система согласования исходно-разрешительной документации на базе ГИСОГД РБ.</p>
					<p>Реализована для автоматизации и упрощения процессов согласования документов в процессах подключения объектов к инженерным сетям, сокращающая время рассмотрения заявок и согласований.</p>
					<p>Позволяет органам исполнительной власти, застройщикам и ресурсоснабжающим организациям работать в едином информационном пространстве.</p>
					<h2>ГРАДДИАЛОГ.РБ</h2>
					<p><strong>Сайт:</strong> <a href="https://graddialog.bashkortostan.ru/" target="_blank" rel="noopener">graddialog.bashkortostan.ru</a></p>
					<p>Портал общественных обсуждений градостроительных проектов Республики Башкортостан на базе ГИСОГД РБ.</p>
					<p>Сервис, с помощью которого жители города могут ознакомиться с градостроительными проектами, задать вопросы архитекторам и разработчикам проектов и оставить свои предложения и замечания.</p>
					<h2>СТРОИМ.РБ</h2>
					<p><strong>Сайт:</strong> <a href="https://stroimrb.ru/" target="_blank" rel="noopener">stroimrb.ru</a></p>
					<p>Ранее - Стройпортал, ныне - портал центра цифровой трансформации строительной отрасли Республики Башкортостан.</p>
					<p>Функционал включает калькуляторы парковочных мест, процедур в строительстве, горячие ссылки с подробным сопровождением для оказания услуг.</p>
					<p>Предназначен для обеспечения методологической и экспертной поддержки участников строительной и градостроительной деятельности.</p>
                `;
                break;

            case "AllStarsMVP":
                content = `
                    <h2>AllStarsMVP — интеграционный микросервис</h2>
                    <p><strong>Стек:</strong> C#, ASP.NET Core 9, Blazor Server, EF Core, PostgreSQL, Quartz, YARP, JWT/RBAC, Docker, Kubernetes/Helm, Prometheus, OpenTelemetry, RabbitMQ/Kafka (модули)</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/AllStarsMVP" target="_blank" rel="noopener">https://github.com/Spirzen/AllStarsMVP</a></p>
                    <p><strong>Описание:</strong> Универсальный интеграционный хаб для внедрения BPM, CRM и ERP: ELMA365, BPMSoft/Creatio, 1С, SAP и любых REST-систем. Один сервис закрывает типовой контур — webhooks, исходящие API, проверка БД, Test Bench, очередь с retry, секреты, метрики и экспорт конфигурации в Git.</p>
                    <p>Модульная сборка: под заказчика подключаются только нужные расширения (database, messaging, secrets, observability, storage, mock).</p>
                    <ul align="left">
                        <li align="left">Админка Blazor: dashboard, коннекторы, webhooks, jobs, audit, встроенная справка;</li>
                        <li align="left">Очередь задач с приоритетами и экспоненциальным retry;</li>
                        <li align="left">GitOps export/import JSON и YAML, health/metrics, SSO OIDC (Keycloak/Azure AD);</li>
                        <li align="left">Docker Compose и Helm chart для production.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/AllStarsMVP.png" alt="AllStarsMVP"></p>
                `;
                break;

            case "ArchiStyler":
                content = `
                    <h2>ArchiStyler — от диаграммы к коду</h2>
                    <p><strong>Стек:</strong> C#, .NET 8, Avalonia 12, CommunityToolkit.Mvvm, System.Text.Json; генерация C# 12 и Java 17</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/ArchiStyler" target="_blank" rel="noopener">https://github.com/Spirzen/ArchiStyler</a></p>
                    <p><strong>Описание:</strong> Настольный визуальный проектировщик архитектуры: UML-подобная диаграмма классов, 60+ ролей (DAO, Service, Repository…), шаблоны MVP/MVVM/GoF/Repository из JSON, превью кода и обратный разбор в модель.</p>
                    <ul align="left">
                        <li align="left">Drag-and-drop на холсте, папки, 8 типов связей (inherits, implements, uses…);</li>
                        <li align="left">Экспорт <code>.cs</code>/<code>.java</code> + <code>.csproj</code>/<code>pom.xml</code>;</li>
                        <li align="left">Тёмная неоновая и светлая темы, сохранение <code>.archistyler.json</code>.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/ArchiStyler.png" alt="ArchiStyler"></p>
                `;
                break;

            case "ArchiStylerOnline":
                content = `
                    <h2>ArchiStyler Online</h2>
                    <p><strong>Сайт:</strong> <a href="https://spirzen.github.io/ArchiStylerOnline/" target="_blank" rel="noopener">spirzen.github.io/ArchiStylerOnline</a></p>
                    <p><strong>Стек:</strong> React 19, TypeScript, Vite 8, Zustand; GitHub Pages, GitHub Actions</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/ArchiStylerOnline" target="_blank" rel="noopener">https://github.com/Spirzen/ArchiStylerOnline</a></p>
                    <p><strong>Описание:</strong> Онлайн-версия ArchiStyler — SPA для проектирования UML-подобных схем классов в браузере: ООП, GoF и архитектурные стили (MVP, MVVM, Repository). Порт с десктопного Avalonia-приложения; данные остаются на устройстве.</p>
                    <ul align="left">
                        <li align="left">Классы, папки-слои, связи (наследование, реализация, композиция, зависимости);</li>
                        <li align="left">24+ шаблонов паттернов, превью кода C# и Java;</li>
                        <li align="left">Тёмная неоновая и светлая темы, автосохранение в localStorage, импорт/экспорт <code>.archistyler.json</code>;</li>
                        <li align="left">CSP, валидация JSON, без бэкенда и внешних API.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/ArchiStyler Online.png" alt="ArchiStyler Online"></p>
                    <p><strong>Десктопная версия:</strong> <a href="#" onclick="loadProject('ArchiStyler'); return false;">ArchiStyler</a></p>
                `;
                break;

            case "RandomManager":
                content = `
                    <h2>RandomManager</h2>
                    <p><strong>Сайт:</strong> <a href="https://spirzen.github.io/RandomManager/" target="_blank" rel="noopener">spirzen.github.io/RandomManager</a></p>
                    <p><strong>Стек:</strong> React 18, TypeScript, Vite 6, Framer Motion, @tanstack/react-virtual; GitHub Pages, GitHub Actions</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/RandomManager" target="_blank" rel="noopener">https://github.com/Spirzen/RandomManager</a></p>
                    <p><strong>Описание:</strong> SPA-каталог фильмов, игр и книг со случайным выбором с учётом фильтров. Статический сайт без бэкенда — каталог в JSON, удобно править и собирать для GitHub Pages.</p>
                    <ul align="left">
                        <li align="left">Три раздела: кино (жанры, актёры, рейтинг), игры (жанр, год, разработчик, платформа), книги (автор, год, жанр);</li>
                        <li align="left">Поиск и фильтры по жанрам, году, рейтингу, актёрам, разработчикам, платформам и авторам;</li>
                        <li align="left">Случайный выбор по текущей вкладке и активным фильтрам, с анимацией «рулетки»;</li>
                        <li align="left">Тёмная и светлая темы, виртуализированная сетка карточек для больших каталогов;</li>
                        <li align="left">Скрипты импорта из Steam, Wikipedia, Kinopoisk и IT Universe; локальная админка для CRUD в <code>data/*.json</code>.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/RandomManager.png" alt="RandomManager"></p>
                `;
                break;

            case "DependencyGraphSentinel":
                content = `
                    <h2>Dependency Graph Sentinel</h2>
                    <p><strong>Стек:</strong> Python 3.11+, FastAPI, Pydantic; React 18, TypeScript, Vite, @xyflow/react, Dagre</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Dependency-Graph-Sentinel" target="_blank" rel="noopener">https://github.com/Spirzen/Dependency-Graph-Sentinel</a></p>
                    <p><strong>Описание:</strong> Визуальный разведчик зависимостей для монореп и solution: .NET, Maven/Gradle, npm workspaces, Python. Три уровня схемы — модули, файлы, классы — плюс поиск циклов, нарушений слоёв UI→BLL→DAL, CVE, «объявлено vs используется».</p>
                    <ul align="left">
                        <li align="left">Интерактивный граф с карточкой сущности (поля, методы, связи);</li>
                        <li align="left">CLI и REST API <code>/api/analyze</code>, встроенные демо с намеренными нарушениями;</li>
                        <li align="left">Группировка папок и Dagre-раскладка для крупных репозиториев.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Dependency Graph Sentinel.png" alt="Dependency Graph Sentinel"></p>
                `;
                break;

            case "DatabaseSchemaViewer":
                content = `
                    <h2>Database Schema Viewer</h2>
                    <p><strong>Стек:</strong> Python 3.10+, FastAPI, Uvicorn, psycopg2, PyMySQL, pyodbc, oracledb; React 19, TypeScript, Vite 6, React Flow, dagre, html-to-image</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Database-Schema-Viewer" target="_blank" rel="noopener">https://github.com/Spirzen/Database-Schema-Viewer</a></p>
                    <p><strong>Описание:</strong> Локальный анализатор и визуализатор схем БД: SQLite, PostgreSQL, MySQL, MS SQL Server, Oracle. ER-диаграмма со связями FK, поиск по таблицам/столбцам, карточка таблицы, экспорт PNG — без тяжёлых IDE.</p>
                    <ul align="left">
                        <li align="left">Автообнаружение локальных серверов, демо SQLite из коробки;</li>
                        <li align="left">Оптимизация для 1000+ таблиц (компактный режим, виртуализация);</li>
                        <li align="left">Тёмная/светлая тема, данные не уходят в облако.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Database Schema Viewer.png" alt="Database Schema Viewer"></p>
                `;
                break;

            case "CodeExampleValidator":
                content = `
                    <h2>Code Example Validator</h2>
                    <p><strong>Стек:</strong> Python 3.10+, FastAPI, Uvicorn, Pydantic; HTML/CSS/vanilla JS</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/CodeExampleValidator" target="_blank" rel="noopener">https://github.com/Spirzen/CodeExampleValidator</a></p>
                    <p><strong>Описание:</strong> Локальный валидатор фрагментов кода из статей и документации: вставили snippet — получили отчёт о компиляции, предупреждениях и выводе программы. Поддержка Python, C#, Java, JavaScript (Node), PHP во временной изолированной папке.</p>
                    <ul align="left">
                        <li align="left">Умная обёртка тела <code>Main</code> для C# и префикс <code>&lt;?php</code> для PHP;</li>
                        <li align="left">Пошаговый отчёт ✓/✗, таймауты, REST API и Swagger;</li>
                        <li align="left">Всё на localhost — удобно при написании «Вселенной IT» и курсов.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Code Example Validator.png" alt="Code Example Validator"></p>
                `;
                break;

            case "PATHManager":
                content = `
                    <h2>PATH Manager</h2>
                    <p><strong>Стек:</strong> Electron 36, React 19, TypeScript, Vite 6; Windows Registry (<code>reg.exe</code>)</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/PATHManager" target="_blank" rel="noopener">https://github.com/Spirzen/PATHManager</a></p>
                    <p><strong>Описание:</strong> Настольное приложение для Windows: управление PATH и пользовательскими переменными окружения через понятный UI вместо <code>setx</code> и «Параметров системы».</p>
                    <ul align="left">
                        <li align="left">Умные названия (Python, Git, Java, .NET…) и подсказка команды проверки;</li>
                        <li align="left">Валидация дубликатов, недопустимых символов, защита системных имён;</li>
                        <li align="left">Пастельная тема, метки путей, NSIS-установщик.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/PATHManager.png" alt="PATH Manager"></p>
                `;
                break;

            case "SchemaMaker":
                content = `
                    <h2>Schema Maker</h2>
                    <p><strong>Стек:</strong> React 19, TypeScript, Vite 6, Konva, react-konva, jsPDF, uuid</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SchemaMaker" target="_blank" rel="noopener">https://github.com/Spirzen/SchemaMaker</a></p>
                    <p><strong>Описание:</strong> Лёгкий веб-строитель схем и блок-диаграмм: фигуры, связи с 8 точками крепления, рисование от руки, комментарии, экспорт PNG/JPG/PDF и сохранение проекта в JSON — без Visio и жёстких BPMN-нотаций.</p>
                    <ul align="left">
                        <li align="left">Панорама, масштаб 20–300%, рамка выделения, Transformer;</li>
                        <li align="left">34 пастельных заливки, DM Sans, локальное хранение в браузере;</li>
                        <li align="left">Идеален для архитектурных эскизов и быстрых процессов.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Schema Maker.png" alt="Schema Maker"></p>
                `;
                break;

            case "SchemaMakerOnline":
                content = `
                    <h2>Schema Maker Online</h2>
                    <p><strong>Сайт:</strong> <a href="https://spirzen.github.io/SchemaMakerOnline/" target="_blank" rel="noopener">spirzen.github.io/SchemaMakerOnline</a></p>
                    <p><strong>Стек:</strong> React 19, TypeScript, Vite 6, Konva, react-konva, jsPDF, uuid; GitHub Pages</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SchemaMakerOnline" target="_blank" rel="noopener">https://github.com/Spirzen/SchemaMakerOnline</a></p>
                    <p><strong>Описание:</strong> Онлайн-конструктор схем и блок-диаграмм в браузере — веб-порт Schema Maker. Фигуры, связи, рисование от руки, экспорт PNG/JPG/PDF и обмен проектами через JSON; черновик в localStorage, без сервера.</p>
                    <ul align="left">
                        <li align="left">Панорама, масштаб, пастельная палитра, комментарии;</li>
                        <li align="left">Защищённый импорт JSON (лимиты размера, валидация типов и цветов);</li>
                        <li align="left">CSP, санитизация имён файлов при экспорте.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Schema Maker Online.png" alt="Schema Maker Online"></p>
                    <p><strong>Десктопная версия:</strong> <a href="#" onclick="loadProject('SchemaMaker'); return false;">Schema Maker</a></p>
                `;
                break;

            case "ITUniverse":
                content = `
                    <h2>Вселенная IT — веб-энциклопедия</h2>
                    <p><strong>Сайт:</strong> <a href="https://spirzen.ru/" target="_blank" rel="noopener">spirzen.ru</a></p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/spirzen/it-knowledge-base" target="_blank" rel="noopener">it-knowledge-base</a></p>
                    <p><strong>Стек:</strong> Docusaurus 3.10, React 19, TypeScript, MDX, Mermaid, live-codeblock, Prism, html2canvas + jsPDF, Node 20+, GitHub Actions → GitHub Pages.</p>
                    <p><strong>Масштаб:</strong> 3000+ статей, 120+ интерактивных React-демо, 9 блоков энциклопедии, лаборатория, глоссарий, подборки, PDF-экспорт, «См. также», прогресс главы.</p>
                    <p>Флагманский образовательный проект: единая верифицируемая модель IT-знаний с 2018 года (контент), публичный SSG-сайт — с 2025. Автор, методист и Lead Developer — я.</p>
                    <p>Демо в статьях: терминал, Docker, SQL-тренажёры, Git, Kafka, RabbitMQ, нейросети, HTTP, ООП, CI/CD и др. Кастомный webpack chunk <code>demo-widgets</code> для производительности.</p>
                    <p><a href="#" class="tab-switch" data-tab="it-book">Подробнее на вкладке «Вселенная IT» →</a></p>
                    <p><img src="Resources/Screenshots/logoITU.png" alt="Вселенная IT"></p>
                `;
                break;

            case "ITUniverseMobile":
                content = `
                    <h2>Вселенная IT — мобильное приложение</h2>
                    <p><strong>GitHub:</strong> <a href="https://github.com/Spirzen/itu-mobile-app" target="_blank" rel="noopener">github.com/Spirzen/itu-mobile-app</a></p>
                    <p><strong>Пакет:</strong> <code>ru.spirzen.ituniverse</code></p>
                    <p><strong>APK:</strong> <a href="https://spirzen.ru/downloads/it-universe.apk" target="_blank" rel="noopener">Скачать с spirzen.ru</a></p>
                    <p><strong>Стек:</strong> .NET MAUI 10, Shell, XAML, WebView, Preferences, локальный JSON-манифест поиска.</p>
                    <p>Нативный клиент энциклопедии: каталог разделов, поиск (офлайн-манифест + sitemap онлайн), закладки, чтение статей через WebView с панелью навигации приложения.</p>
                    <p><strong>Платформы:</strong> Android (основной), Windows, iOS, Mac Catalyst.</p>
                    <ul>
                        <li>Контент загружается с <a href="https://spirzen.ru/" target="_blank">spirzen.ru</a> (Docusaurus SPA);</li>
                        <li>ArticleWebViewHelper — компактные стили чтения, скрытие дублирующей пагинации;</li>
                        <li>Синхронизация стека «назад» с <code>window.location.pathname</code>;</li>
                        <li>Индекс: <code>Resources/Raw/search-manifest.json</code>.</li>
                    </ul>
                    <p>Репозиторий: <a href="https://github.com/Spirzen/itu-mobile-app" target="_blank" rel="noopener">itu-mobile-app</a> — часть экосистемы «Вселенная IT».</p>
                `;
                break;

            case "SimpleCRM":
                content = `
                    <h2>SimpleCRM</h2>
                    <p><strong>Стек:</strong> C#, ASP.NET, PostgreSQL, Entity Framework Core, Identity Framework, HTML, CSS, JavaScript, Bootstrap, Razor Pages, AutoMapper, FluentValidation, Logging</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SimpleCRM" target="_blank">GitHub</a></p>
                    <p><strong>Описание:</strong> Учитывая, сколько я уже работаю со всякими CRM, BPM, ERP, SRM и прочими системами, разумеется я и для себя делал всякие CRM, в том числе эту - простая система управления обращениями (CRM), разработанная на основе ASP.NET. Она предоставляет пользователям возможность регистрироваться, авторизовываться, создавать, просматривать и редактировать обращения. Система поддерживает роли пользователей (например, "Администратор" и "Пользователь"), что позволяет гибко управлять доступом к функционалу.</p>
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

            case "OnlineCardGame":
                content = `
                    <h2>Тени Шпиля — Online Card Game</h2>
                    <p><strong>Сайт:</strong> <a href="https://spirzen.github.io/OnlineCardGame/" target="_blank" rel="noopener">spirzen.github.io/OnlineCardGame</a></p>
                    <p><strong>Стек:</strong> React 19, TypeScript 5.8, Vite 6, vite-plugin-pwa (Workbox), Vitest 3; GitHub Pages, GitHub Actions</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/OnlineCardGame" target="_blank" rel="noopener">https://github.com/Spirzen/OnlineCardGame</a></p>
                    <p><strong>Описание:</strong> Браузерный карточный roguelike в духе <em>Slay the Spire</em>: процедурная карта из 15 этажей, пошаговые бои с намерениями врагов, реликвии, лавка, события и встроенный редактор карт. Полностью на клиенте — прогресс и кастомные карты в <code>localStorage</code>, установка как PWA.</p>
                    <ul align="left">
                        <li align="left">3 класса (Воин, Плут, Страж), 70+ карт, 15 реликвий, 9 врагов с уникальными паттернами;</li>
                        <li align="left">узлы карты: бои, элиты, боссы, костёр, лавка, сундуки, случайные события;</li>
                        <li align="left">энергия, блок, сила, уязвимость, мульти-таргет, журнал боя в реальном времени;</li>
                        <li align="left">ежедневный забег с общим seed, статистика и таблица лидеров;</li>
                        <li align="left">редактор пользовательских карт — кастомные карты попадают в пул наград и лавки;</li>
                        <li align="left">контент в JSON (<code>cards.json</code>, <code>enemies.json</code>, <code>relics.json</code>), unit-тесты игровой логики (Vitest).</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/OnlineCardGame.png" alt="Online Card Game — бой"></p>
                    <p><strong>Десктопная версия:</strong> <a href="#" onclick="loadProject('AutoBattler'); return false;">AutoBattler — Тени Шпиля (Pygame)</a></p>
                `;
                break;

            case "SampleSupport":
                content = `
                    <h2>Центр поддержки (sample.support)</h2>
                    <p><strong>Стек:</strong> PHP 7.2+, MySQL 8 / MariaDB, MySQLi (prepared statements), Apache mod_rewrite, HTML5, CSS3, vanilla JavaScript, сессии</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/sample.support" target="_blank" rel="noopener">https://github.com/Spirzen/sample.support</a></p>
                    <p><strong>Демо:</strong> <a href="http://sample.support/" target="_blank" rel="noopener">sample.support</a> (локальный OSPanel)</p>
                    <p><strong>Описание:</strong> Демонстрационный пример сайта технической поддержки на «ванильном» PHP без фреймворка и Composer. Учебный хелпдеск с тикетами, базой знаний, тарифами и кабинетом поддержки — вымышленные продукты и данные, удобен для разбора классической архитектуры Front Controller за один вечер.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">регистрация и вход, роли admin / user, профиль и смена пароля;</li>
                        <li align="left">тикеты: статусы, приоритеты, категории, переписка в комментариях;</li>
                        <li align="left">база знаний со статьями и клиентским поиском;</li>
                        <li align="left">каталог продуктов и тарифов, лендинг с метриками SLA/CSAT;</li>
                        <li align="left">светлая и тёмная тема, адаптивная вёрстка, раздел «Стек и архитектура» на сайте.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/SampleSupport.png" alt="Скриншот проекта Центр поддержки"></p>
                `;
                break;

            case "JPGPDF":
                content = `
                    <h2>JPG-PDF конвертер</h2>
                    <p><strong>Стек:</strong> Python, Tkinter, Pillow, PDF, JPG</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/JPG-PDF" target="_blank">https://github.com/Spirzen/JPG-PDF</a></p>
                    <p><strong>Описание:</strong> Ох уж этот пайтон - можно такие вещи писать одним скриптом. Вот тут буквально всего ничего - а на руках программа с GUI на Python, которая объединяет несколько изображений (JPG/PNG) в один PDF-файл.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Выбор нескольких JPG или PNG изображений;</li>
                        <li align="left">Указание папки для сохранения PDF;</li>
                        <li align="left">Сохранение всех изображений в одном PDF-файле.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/JPG-PDF.png" alt="Скриншот проекта"></p>
                `;
                break;

            case "DockerfileGenerator":
                content = `
                    <h2>Dockerfile Generator</h2>
                    <p><strong>Стек:</strong> JavaScript, HTML, CSS, Node.js, js-yaml, FileReader API, Blob API</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/DockerfileGenerator" target="_blank">https://github.com/Spirzen/DockerfileGenerator</a></p>
                    <p><strong>Описание:</strong> Инструмент для генерации Dockerfile на основе YAML-конфигурации. Он позволяет быстро создавать Dockerfile без необходимости помнить синтаксис и структуру, просто описывая нужные параметры в удобном формате. Поначалу я хотел сделать его чисто скриптовым на Node.js, но потом всё же расширил до возможности работать и с графическим интерфейсом - действительно, теперь заметно лучше.</p>
                    <p>Проект предлагает два режима работы:</p>
                    <ul align="left">
                        <li align="left">Консольный — через Node.js CLI (node index.js);</li>
                        <li align="left">Веб-интерфейс — через браузер (index.html).</li>
                    </ul>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Генерация Dockerfile из YAML-конфига;</li>
                        <li align="left">Поддержка ключевых инструкций: FROM, WORKDIR, COPY, RUN, EXPOSE, ENV, CMD;</li>
                        <li align="left">Валидация YAML;</li>
                        <li align="left">Редактирование YAML в интерфейсе; </li>
                        <li align="left">Загрузка своего YAML-файла; </li>
                        <li align="left">Просмотр и скачивание сгенерированного Dockerfile; </li>
                        <li align="left">Автономная работа (в том числе без интернета).</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/DockerfileGenerator.png" alt="Скриншот проекта"></p>
                `;
                break;

            case "Budman":
                content = `
                    <h2>Budman - Бюджетный менеджер</h2>
                    <p><strong>Стек:</strong> JavaScript, HTML, CSS</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Budman" target="_blank">https://github.com/Spirzen/Budman</a></p>
                    <p><strong>Описание:</strong> Писал для себя, ведь порой очень нужная штука. Это бюджетный менеджер - удобный и простой в использовании инструмент для планирования личного бюджета. Программа позволяет пользователям прогнозировать финансовое состояние на срок до 5 лет вперёд, учитывая ежемесячные доходы и расходы.</p>
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
                    <p><strong>Описание:</strong> Всегда хотел создать такое, и решил попробовать сделать без использования готовых движков, на чистом коде. Простая аркадная игра в стиле Vampire Survivors с минимальной графикой и максимальным удовольствием от процесса. 2D-игра в жанре survival rogue-lite, где игроку предстоит выживать среди постоянно появляющихся врагов, получать опыт за убийства, повышать уровень и выбирать полезные бонусы для усиления. Цель проста: продержаться как можно дольше, уворачиваясь от противников и автоматически атакуя их.</p>
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

            case "Pythonablo":
                content = `
                    <h2>Pythonablo — Diabloid ARPG</h2>
                    <p><strong>Стек:</strong> Python 3.10+, Pygame 2.5+, JSON-данные, процедурная генерация карт и звука, EventBus, MIT</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Pythonablo" target="_blank" rel="noopener">https://github.com/Spirzen/Pythonablo</a></p>
                    <p><strong>Описание:</strong> Однопользовательская 2D isometric ARPG в духе Diablo — без готового движка, на чистом Python и Pygame. Исследуйте процедурные подземелья, собирайте лут с аффиксами и сетами, прокачивайте пассивные навыки и активные умения, сражайтесь с ордами монстров. Четыре режима (классика, арена, арена с боссами, скорость) и три уровня сложности; SFX и музыка генерируются кодом — внешние аудиофайлы не нужны.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">изометрическая карта с процедурными комнатами и коридорами, кэш этажей;</li>
                        <li align="left">ближний бой по курсору, рывок, удерживаемый «Вихрь», 4 активных умения с улучшениями;</li>
                        <li align="left">лут normal / magic / rare / legendary / set, легендарки с заменой умений, Кузнец и Наставник;</li>
                        <li align="left">события этажа, колонны-пилоны, NPC, боссы каждые 3 этажа;</li>
                        <li align="left">автосохранение и ручное сохранение из паузы (<code>save_data/save.json</code>).</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Pythonablo.png" alt="Pythonablo"></p>
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
                    <p><strong>Стек:</strong> C#, .NET 8, WPF, SQLite, MVVM</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/WordTrainer" target="_blank" rel="noopener">https://github.com/Spirzen/WordTrainer</a></p>
                    <p><strong>Описание:</strong> Обновлённый тренажёр английской лексики: случайные слова, проверка перевода, уровни сложности и режимы en↔ru. Удобный интерфейс для ежедневной практики.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">валидация перевода и подсказка правильного ответа;</li>
                        <li align="left">уровни сложности (низкий, средний, высокий);</li>
                        <li align="left">режимы англо-русский и русско-английский;</li>
                        <li align="left">локальная база слов в SQLite.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/WordTrainer2.png" alt="WordTrainer"></p>
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
                    <p><strong>Стек:</strong> C#, .NET 8, WPF, MVVM, XAML</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SQL-Generator" target="_blank" rel="noopener">https://github.com/Spirzen/SQL-Generator</a></p>
                    <p><strong>Описание:</strong> Визуальный конструктор SQL: SELECT, INSERT, UPDATE, DELETE с JOIN и WHERE без ручного набора синтаксиса. Обновлённый UI для быстрого прототипирования запросов аналитиками и разработчиками.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">SELECT, INSERT, UPDATE, DELETE;</li>
                        <li align="left">JOIN (INNER, LEFT, RIGHT, FULL);</li>
                        <li align="left">WHERE с операторами =, &lt;&gt;, LIKE, IS NULL и др.;</li>
                        <li align="left">копирование готового запроса в буфер обмена.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/SQL Generator2.png" alt="SQL Generator"></p>
                `;
                break;

            case "SQLGeneratorOnline":
                content = `
                    <h2>SQL Generator Online</h2>
                    <p><strong>Сайт:</strong> <a href="https://spirzen.github.io/SQLGeneratorOnline/" target="_blank" rel="noopener">spirzen.github.io/SQLGeneratorOnline</a></p>
                    <p><strong>Стек:</strong> React 19, TypeScript, Vite 6, SheetJS (xlsx); GitHub Pages, GitHub Actions</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/SQLGeneratorOnline" target="_blank" rel="noopener">https://github.com/Spirzen/SQLGeneratorOnline</a></p>
                    <p><strong>Описание:</strong> Онлайн-конструктор SQL и импорт Excel/CSV в SQL — объединяет наработки десктопного SQL Generator, Excel2SQL и UX SqlTrainer. Вся обработка в браузере, данные не отправляются на сервер.</p>
                    <ul align="left">
                        <li align="left">SELECT, INSERT, UPDATE, DELETE; JOIN, WHERE, ORDER BY, LIMIT, DISTINCT;</li>
                        <li align="left">Импорт .xlsx/.xls/.csv, диалекты PostgreSQL, MySQL, SQLite, SQL Server;</li>
                        <li align="left">Режимы CREATE+INSERT или только INSERT, скачивание .sql;</li>
                        <li align="left">CSP, лимиты файла и строк, санитизация имён и экранирование литералов.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/SQL Generator Online.png" alt="SQL Generator Online"></p>
                    <p><strong>Десктопные версии:</strong> <a href="#" onclick="loadProject('SQLGenerator'); return false;">SQL Generator</a>, <a href="#" onclick="loadProject('Excel2SQL'); return false;">Excel2SQL</a></p>
                `;
                break;

            case "Excel2SQL":
                content = `
                    <h2>Excel2SQL</h2>
                    <p><strong>Стек:</strong> C#, .NET 8, WPF, ClosedXML</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Excel2SQL" target="_blank" rel="noopener">https://github.com/Spirzen/Excel2SQL</a></p>
                    <p><strong>Описание:</strong> Утилита для преобразования данных из Excel (.xlsx) в SQL-скрипты INSERT: загрузите таблицу, укажите имя целевой таблицы — получите готовый batch для наполнения БД.</p>
                    <ul align="left">
                        <li align="left">чтение листов через ClosedXML;</li>
                        <li align="left">настройка имён столбцов и экранирование значений;</li>
                        <li align="left">удобно для миграций, тестовых данных и прототипов.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Excel2SQL2.png" alt="Excel2SQL"></p>
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
                    <h2>Генератор технической документации Markdown → PDF</h2>
                    <p><strong>Стек:</strong> C#, .NET MAUI 9, Markdig, iText pdfHTML, Handlebars.Net, YamlDotNet; Windows, Android, iOS, Mac Catalyst</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/DocGenerator" target="_blank" rel="noopener">https://github.com/Spirzen/DocGenerator</a></p>
                    <p><strong>Описание:</strong> Кроссплатформенный конвертер Markdown в PDF/HTML с YAML-шаблонами Handlebars: оглавление, подсветка кода, выбор темы и каталога сохранения. Обновлено на .NET 9 MAUI.</p>
                    <p>Программа загружает <code>.md</code> и <code>.yaml</code>, собирает документ по шаблону и экспортирует результат для технической документации и ГОСТ-материалов.</p>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/DocGenerator.png" alt="DocGenerator"></p>
                `;
                break;

            case "RandomMediaBot":
                content = `
                    <h2>Random Media Bot</h2>
                    <p><strong>Стек:</strong> C#, Telegram Bot, API, SQLite, Docker</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="" target="_blank">Закрытый код</a></p>
                    <p><strong>Описание:</strong> Поначалу писал для себя, чтобы с телефона подбирать кино на вечер. Random Media Bot - это Telegram-бот, который позволяет подобрать случайный фильм, игру, книгу, дораму, аниме, сериал или индийский фильм. Достаточно просто написать или выбрать в меню кнопку, и в ответ получим ссылку для приобретения в доступных магазинах (если есть в продаже), краткое описание, сведения об жанре, авторе, платформах, и т.д.</p>
                    <p>Написанный на C# проект, консольное приложение, развернутое на Docker, которое обрабатывает запросы через крупную базу данных SQLite.</p>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/RandomMediaBot.png" alt="Скриншот проекта"></p>
                `;
                break;

            case "IndianFilmManager":
                content = `
                    <h2>Indian Film Manager</h2>
                    <p><strong>Стек:</strong> C#, ASP.NET Core, Entity Framework Core, SQLite, Razor Pages, Bootstrap, jQuery (autocomplete), LINQ, AJAX</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Indian-Film-Manager" target="_blank" rel="noopener">https://github.com/Spirzen/Indian-Film-Manager</a></p>
                    <p><strong>Описание:</strong> Веб-каталог индийского кино: фильмы, актёры, жанры, рейтинги и связи many-to-many. Обновлённый интерфейс для удобного поиска и редактирования коллекции.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">CRUD фильмов с годом, рейтингом, актёрами и жанрами;</li>
                        <li align="left">справочники актёров и жанров;</li>
                        <li align="left">автодополнение и фильтрация в UI.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Indian Film Manager2.png" alt="Indian Film Manager"></p>
                `;
                break;

            case "LogManager":
                content = `
                    <h2>LogManager</h2>
                    <p><strong>Стек:</strong> C#, .NET, WPF, MVVM, LINQ, Regex, CSV.</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Log-Manager" target="_blank">https://github.com/Spirzen/Log-Manager</a></p>
                    <p><strong>Описание:</strong> Когда изучал логирование, написал такую утилиту для интереса. Инструмент для анализа, фильтрации и экспорта логов, построенный по MVVM.</p>
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
                    <p><strong>Стек:</strong> C#, ASP.NET Core, ZXing.Net, HTML, CSS</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/QR-Generator" target="_blank" rel="noopener">https://github.com/Spirzen/QR-Generator</a></p>
                    <p><strong>Описание:</strong> Веб-генератор QR из текста или URL с превью и сохранением PNG. Обновлённый UI; доступен и консольный вариант.</p>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/QR Generator2.png" alt="QR Generator"></p>
                `;
                break;

            case "GameLibraryManager":
                content = `
                    <h2>Game Library Manager</h2>
                    <p><strong>Стек:</strong> C#, ASP.NET Core Razor Pages, Entity Framework Core, SQLite, HTML, CSS</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Game-Library-Manager" target="_blank" rel="noopener">github.com/Spirzen/Game-Library-Manager</a></p>
                    <p><strong>Описание:</strong> Веб-библиотека игр: CRUD по названию, жанру, году, разработчику и платформам. Обновлённый каталог с удобной таблицей и формами редактирования.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">добавление, редактирование и удаление записей;</li>
                        <li align="left">фильтрация и просмотр коллекции;</li>
                        <li align="left">хранение в SQLite через EF Core.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/GameLibraryManager2.png" alt="Game Library Manager"></p>
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
                    <h2>Portfolio Browser — мини-браузер</h2>
                    <p><strong>Стек:</strong> C#, .NET 8, Windows Forms, Microsoft WebView2, HTTPS</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Browser" target="_blank" rel="noopener">https://github.com/Spirzen/Browser</a></p>
                    <p><strong>Описание:</strong> Компактный десктоп-браузер на WebView2: адресная строка, назад/вперёд, обновление. Обновлён на .NET 8 с аккуратной структурой проекта (MVVM-подход к UI).</p>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/Portfolio Browser2.png" alt="Portfolio Browser"></p>
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
                
            case "AIAssistant":
                content = `
                    <h2>Simple-AI-Assistant</h2>
                    <p><strong>Стек:</strong>TypeScript, LM Studio, Visual Studio Code</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Simple-AI-Assistant" target="_blank">https://github.com/Spirzen/Simple-AI-Assistant</a></p>
                    <p><strong>Описание:</strong> Расширение для Visual Studio Code, которое присоединяется к развёрнутой при помощи LMStudio LLM-модели, и позволяет использовать ИИ локально, использовать любой контекст и, к примеру, задавать вопросы по открытому в редакторе файлу - править, улучшать, консультироваться. Требует активный сервер LMStudio.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Можно установить бесплатно в Visual Studio Code;</li>
                        <li align="left">Можно получать ответы от нейросети прямо в редакторе;</li>
                        <li align="left">Качество ответов зависит от загруженной модели.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/AIAssistant.png" alt="Скриншот проекта"></p>
                `;
                break;
            
            case "Camunda-Approval-Manager":
                content = `
                    <h2>Camunda-Approval-Manager</h2>
                    <p><strong>Стек:</strong>Python (Flask), SQLAlchemy, Camunda BPM (REST API), HTML5, CSS3 (Flexbox/Grid), Vanilla JS, Docker, Docker Compose, SQLite, H2, Requests</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Camunda-Approval-Manager" target="_blank">https://github.com/Spirzen/Camunda-Approval-Manager</a></p>
                    <p><strong>Описание:</strong> Веб-приложение для управления процессами согласования заявок (обращений), интегрированное с BPMN-движком Camunda Platfom 7. Приложение позволяет пользователям создавать заявки, назначать исполнителей, проходить этапы согласования и завершать процессы в соответствии с заданным бизнес-процессом.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Поддержка ролевой модели (сейчас заявитель, исполнитель, согласующий и администратор);</li>
                        <li align="left">Интеграция с BPMN, автоматическая загрузка процесса при старте, управление задачами через REST API;</li>
                        <li align="left">Управление заявками, создание, просмотр и редактирование статусов;</li>
                        <li align="left">Быстрый вход с автозаполнением учётных данных для демо-режима.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/CamundaApproval2.png" alt="Скриншот проекта"></p>
                `;
                break;
				
			case "S3MediaManager":
                content = `
                    <h2>S3MediaManager</h2>
                    <p><strong>Стек:</strong>C#, ASP.NET Core Web API, MinIO Amazon S3, PostgreSQL, Entity Framework Core (Code First), Docker, Swagger/OpenAPI</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/S3MediaManager" target="_blank">https://github.com/Spirzen/S3MediaManager</a></p>
                    <p><strong>Описание:</strong> Проект на стеке .NET 10, демонстрирующий реализацию полноценного сервиса управления медиафайлами. Приложение обеспечивает загрузку файлов в объектное хранилище (MinIO), хранение метаданных в реляционной базе данных (PostgreSQL) и предоставляет REST API для взаимодействия с данными.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Локальная загрузка файлов, удаление файлов, получение списка;</li>
                        <li align="left">Использование API для интеграции с любыми клиентами - веб-сайтами, мобильными приложениями, десктопными программами;</li>
                        <li align="left">Применение Docker для простого развёртывания и тестирования;</li>
                        <li align="left">Масштабируемость за счет разделения ответственности между компонентами.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/S3MM.png" alt="Скриншот проекта"></p>
                `;
                break;
				
			case "AutoBattler":
                content = `
                    <h2>AutoBattler — Тени Шпиля</h2>
                    <p><strong>Стек:</strong> Python 3.10+, Pygame 2.5+, JSON-данные, процедурная генерация карты и звука, встроенный редактор карт, MIT</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/AutoBattler" target="_blank" rel="noopener">https://github.com/Spirzen/AutoBattler</a></p>
                    <p><strong>Описание:</strong> Карточный roguelike без готового движка — на чистом Python и Pygame. Процедурная карта из 15 этажей, глубокий бой с несколькими врагами одновременно, реликвии, магазин и мета-прогресс между забегами. Вдохновлено <em>Slay the Spire</em>, но с темпом боя ближе к коллекционным карточным играм: добор карт каждый ход, энергия, выбор цели атаки и видимые намерения врагов.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">66+ уникальных карт, 9 врагов, 15 реликвий и ~40 статус-эффектов (яд, кровотечение, оглушение, lifesteal и др.);</li>
                        <li align="left">узлы карты: бои, элиты, босс, костёр, лавка, сундук, случайные события;</li>
                        <li align="left">бой с несколькими целями, журнал событий в реальном времени, процедурные SFX без внешних файлов;</li>
                        <li align="left">встроенный редактор карт с живым предпросмотром — кастомные карты попадают в пул наград и магазина;</li>
                        <li align="left">контент и баланс через JSON (<code>cards.json</code>, <code>enemies.json</code>, <code>relics.json</code>), сохранение статистики между забегами.</li>
                    </ul>
                `;
                break;

			case "SteamRandomLauncher":
                content = `
                    <h2>Steam Random Launcher</h2>
                    <p><strong>Стек:</strong>Python, Pillow, Tkinter, SteamAPI, JSON</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Randomizer" target="_blank">https://github.com/Spirzen/Randomizer</a></p>
                    <p><strong>Описание:</strong> Простое кроссплатформенное приложение с графическим интерфейсом для случайного выбора и запуска установленных игр из библиотеки Steam.</p>
                    <p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Автоматическое обнаружение установленных игр Steam;</li>
                        <li align="left">Поддержка нескольких библиотек Steam (включая нестандартные расположения);</li>
						<li align="left">Отображение названия игры и её иконки (если найдена в кэше Steam);</li>
                        <li align="left">Запуск выбранной игры через протокол steam://run/;</li>
						<li align="left">Перетаскивание папок библиотек (Drag & Drop) для быстрого добавления путей;</li>
						<li align="left">Сохранение списка путей между запусками (steam_paths.json);</li>
                        <li align="left">Случайный выбор игры с анимацией прокрутки.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/SteamRandomLauncher.png" alt="Скриншот проекта"></p>
                `;
                break;
				
			case "SimplePCMessenger":
                content = `
                    <h2>Simple PC Messenger</h2>
                    <p><strong>Стек:</strong>C#, .NET 10, WPF, Sockets (TCP), NetworkStream, Console App, JSON, AesGcm Cryptography, XAML, MVVM, P2P, LAN.</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/Simple-PC-Messenger" target="_blank">https://github.com/Spirzen/Simple-PC-Messenger</a></p>
                    <p><strong>Описание:</strong> Кроссплатформенное десктопное приложение для обмена мгновенными сообщениями и передачи файлов, реализованное на C# (.NET). Проект демонстрирует гибридную архитектуру связи: Клиент-Сервер (для работы через интернет) и P2P (прямое соединение в локальной сети), а также закладывает фундамент для шифрования данных.</p>
					<p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Режим Клиент-Сервер: Работа через центральный сервер (удаленные пользователи, общий чат, передача файлов);</li>
                        <li align="left">Режим P2P (Peer-to-Peer): Прямое соединение между двумя клиентами в одной локальной сети (LAN) без участия сервера для обмена текстом и файлами;</li>
						<li align="left">Текстовые чаты с поддержкой личного общения и общих каналов;</li>
                        <li align="left">Отправка файлов любого размера с разбивкой на чанки, индикаторами прогресса и автоматическим сохранением;</li>
						<li align="left">Реализована база для шифрования трафика с использованием алгоритма AES-GCM (ключи генерируются и хранятся локально). В текущей версии работает режим "без шифрования" для отладки;</li>
						<li align="left">Автоматическое определение локального IP, проверка доступности портов, копирование IP в буфер обмена;</li>
                        <li align="left">Современный темный интерфейс на WPF с использованием XAML и MVVM-подобной структуры.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/SimplePCMessenger.png" alt="Скриншот проекта"></p>
                `;
                break;
				
			case "XMLValidator":
                content = `
                    <h2>XML Validator</h2>
                    <p><strong>Стек:</strong>Python, Tkinter, lxml, XML, MVC.</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/XML-Validator" target="_blank">https://github.com/Spirzen/XML-Validator</a></p>
                    <p><strong>Описание:</strong> Утилита, предназначенная для проверки соответствия XML-документов заданной XSD-схеме. Приложение предоставляет удобный интерфейс для выбора файлов, отображения статуса процесса и детального списка ошибок валидации.</p>
					<p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Выбор файла XSD через системный диалог;</li>
                        <li align="left">Выбор файла XML для проверки через системный диалог;</li>
						<li align="left">Проверка синтаксиса XML;</li>
                        <li align="left">Проверка соответствия структуре XSD (элементы, атрибуты, типы данных, обязательность полей);</li>
						<li align="left">Поддержка внешних ссылок внутри XSD (import/include), если пути указаны корректно;</li>
						<li align="left">Визуальный прогресс-бар, статусная строка и цветовая индикация результата;</li>
                        <li align="left">Детализированный список ошибок с указанием номера строки и столбца.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/XMLValidator.png" alt="Скриншот проекта"></p>
                `;
                break;
				
			case "DockerMiniManager":
                content = `
                    <h2>Docker Mini Manager</h2>
                    <p><strong>Стек:</strong>Python, Tkinter, Dockerfile, Docker.</p>
                    <p><strong>Ссылка на GitHub:</strong> <a href="https://github.com/Spirzen/DockerMini" target="_blank">https://github.com/Spirzen/DockerMini</a></p>
                    <p><strong>Описание:</strong> Легковесный, кроссплатформенный графический интерфейс (GUI) для управления Docker-контейнерами и образами, написанный на чистом Python с использованием стандартной библиотеки tkinter.</p>
					<p>Основные возможности</p>
                    <ul align="left">
                        <li align="left">Просмотр списка активных контейнеров, их остановка и удаление через удобный список с подтверждением действий;</li>
                        <li align="left">Вывод логов выполнения команд в реальном времени внутри приложения;</li>
						<li align="left">Умный конструктор, который формирует корректные команды docker на основе введенных параметров, предотвращая синтаксические ошибки;</li>
                        <li align="left">Поддержка всех базовых операций: Build, Run, Pull, Stop, Remove Image, Remove Container.</li>
                    </ul>
                    <p><strong>Скриншот:</strong></p>
                    <p><img src="Resources/Screenshots/DockerMiniManager.png" alt="Скриншот проекта"></p>
                `;
                break;
                
            default:
                content = `<h2>${id}</h2><p>Описание проекта в разработке.</p>`;
        }
    }

    details.innerHTML = content;
    enhanceProjectScreenshots(details);
}