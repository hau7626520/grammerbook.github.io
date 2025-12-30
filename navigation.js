// --- CONFIGURATION ---

const NAV_STRUCTURE = {
    'Chapter 1 句子 Sentences': {
        id: 'ch1',
        expanded: true,
        color: 'indigo', // indigo, emerald, rose, etc.
        parts: {
            'Part 1 句子的定義': [
                { title: '1. 句子 (Sentences)', url: '1-1-1.html' },
                { title: '2. 主詞 (Subjects)', url: '1-1-2.html' },
                { title: '3. 述語 (Predicates)', url: '1-1-3.html' },
                { title: '4. 主詞補語 (Subject Complements)', url: '1-1-4.html' },
                { title: '5. 受詞 (Objects)', url: '1-1-5.html' },
                { title: '6. 狀語 (Adverbials)', url: '1-1-6.html' },
                { title: '7. 定語 (Attributives)', url: 'under_construction.html' },
                { title: '8. 受詞補語 (Object Complements)', url: 'under_construction.html' },
            ],
            'Part 2 句子的種類': [
                { title: 'Part 2 句子的種類', url: 'under_construction.html' }
            ]
        }
    },
    'Chapter 2 名詞 Nouns': {
        id: 'ch2',
        expanded: false,
        color: 'emerald',
        parts: {
            'Part 1 名詞的定義': [
                { title: '1. 何謂名詞?', url: 'under_construction.html' },
                { title: '2. 人物', url: 'under_construction.html' },
                { title: '3. 無生命的事物', url: 'under_construction.html' },
                { title: '4. 生物', url: 'under_construction.html' },
                { title: '5. 情感', url: 'under_construction.html' },
                { title: '6. 地點', url: 'under_construction.html' },
            ],
            'Part 2 名詞的種類': [
                { title: '1. 普通名詞', url: 'under_construction.html' },
                { title: '2. 專有名詞', url: 'under_construction.html' },
                { title: '3. 抽象名詞', url: 'under_construction.html' },
                { title: '4. 集合名詞', url: 'under_construction.html' },
                { title: '5. 複合名詞', url: 'under_construction.html' },
            ],
            'Part 3 可數名詞與不可數名詞': [
                { title: '1. 可數名詞', url: 'under_construction.html' },
                { title: '2. 不可數名詞', url: 'under_construction.html' },
                { title: '3. 作可數名詞或不可數名詞時, 意義有所不同的名詞', url: 'under_construction.html' },
                { title: '4. 可數與不可數名詞常用的限定詞: some和any', url: 'under_construction.html' },
            ],
            'Part 4 名詞的單數複數形式': [
                { title: '1. 單複數名詞的定義', url: 'under_construction.html' },
                { title: '2. 規則名詞&複數形式', url: 'under_construction.html' },
                { title: '3. 不規則名詞&複數形式', url: 'under_construction.html' },
                { title: '4. 單位數量名詞&複數形式', url: 'under_construction.html' },
                { title: '5. 複合名詞&複數形式', url: 'under_construction.html' },
                { title: '6. 外來名詞&複數形式', url: 'under_construction.html' },
                { title: '7. 人名&複數形式', url: 'under_construction.html' },
                { title: '8. 永遠都是複數形式的名詞', url: 'under_construction.html' },
            ],
            'Part 5 名詞的所有格': [
                { title: '1. 所有格的定義', url: 'under_construction.html' },
                { title: '2. 所有格的構成', url: 'under_construction.html' },
                { title: "3. 意義上相同的所有格: \"'s\"和\"of + 名詞\"", url: 'under_construction.html' },
                { title: "4. 結構的不同用法: \"'s\"和\"of + 名詞\"", url: 'under_construction.html' },
                { title: '5. 所有格可單獨使用', url: 'under_construction.html' },
                { title: '6. 所有格修飾另一個所有格', url: 'under_construction.html' },
                { title: '7. 專有名詞的所有格, 不和the/a/an連用', url: 'under_construction.html' },
                { title: '8. 與the連用 + 複數姓氏的所有格前面', url: 'under_construction.html' },
                { title: '9. 與the連用 + 普通名詞的所有格', url: 'under_construction.html' },
                { title: '10. 節慶名稱的所有格', url: 'under_construction.html' },
                { title: '11. 其他名詞的所有格', url: 'under_construction.html' },
                { title: '12. 成對名詞的所有格', url: 'under_construction.html' },
                { title: "13. 雙重所有格: of所有格 + 's所有格", url: 'under_construction.html' },
                { title: "14. 's所有格 + of所有格", url: 'under_construction.html' },
            ]
        }
    }
};

// This is a safelist for Tailwind CSS. By including the full class names here,
// we ensure the Just-in-Time compiler generates them.
const TAILWIND_SAFELIST = `
  text-indigo-700 bg-indigo-50 border-indigo-500
  text-emerald-700 bg-emerald-50 border-emerald-500
`;


// --- DYNAMIC STYLES ---

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        :root { --sidebar-width: 80; }
        #sidebar {
            width: calc(var(--sidebar-width) * 4px); /* w-80 -> 20rem -> 320px */
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            overflow-x: hidden;
        }
        body.sidebar-collapsed #sidebar {
            --sidebar-width: 20; /* w-20 -> 5rem -> 80px */
        }
        body.sidebar-collapsed .nav-text,
        body.sidebar-collapsed #sidebar .chapter-content {
            display: none;
        }
        
        #sidebar-toggle-btn .icon-open,
        body.sidebar-collapsed #sidebar-toggle-btn .icon-close {
            display: none;
        }
        body.sidebar-collapsed #sidebar-toggle-btn .icon-open {
            display: block;
        }
    `;
    document.head.appendChild(style);
}


// ---NAVIGATION RENDERING ---

function renderNavigation(currentPage) {
    let navHtml = '';
    const inactiveClass = 'hover:bg-slate-50';

    for (const chapterTitle in NAV_STRUCTURE) {
        const chapter = NAV_STRUCTURE[chapterTitle];
        const isExpanded = chapter.expanded;
        const chapterColor = chapter.color; 

        const chapterBtnClass = `text-${chapterColor}-700`;
        const activeClass = `bg-${chapterColor}-50 text-${chapterColor}-700 font-medium rounded-r-lg border-l-2 border-${chapterColor}-500 -ml-[2px]`;
        
        navHtml += `
            <div class="mb-4">
                <button onclick="toggleChapter('${chapter.id}', this)" class="w-full flex items-center justify-between font-bold ${chapterBtnClass} px-2 py-2 hover:bg-slate-50 rounded-lg transition text-left text-lg">
                    <span class="nav-text">${chapterTitle}</span>
                    <span class="icon text-xl">${isExpanded ? '−' : '+'}</span>
                </button>
                <div id="${chapter.id}" class="chapter-content ${isExpanded ? 'expanded' : 'collapsed'} ml-2 border-l-2 border-slate-100">
        `;

        for (const partTitle in chapter.parts) {
            const items = chapter.parts[partTitle];
            navHtml += `
                <div class="mb-4">
                    <h3 class="nav-text text-sm font-semibold text-slate-500 mt-2 mb-1 px-4">${partTitle}</h3>
            `;
            if (items.length > 0) {
                navHtml += '<ul class="space-y-1">';
                for (const item of items) {
                    const liClass = currentPage === item.url ? activeClass : inactiveClass;
                    navHtml += `
                        <li>
                            <a href="${item.url}" class="flex items-center gap-3 px-4 py-1 text-sm ${liClass} text-slate-600 transition">
                                <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                <span class="nav-text">${item.title}</span>
                            </a>
                        </li>
                    `;
                }
                navHtml += '</ul>';
            }
            navHtml += '</div>';
        }
        navHtml += '</div></div>';
    }
    
    const navElement = document.createElement('nav');
    navElement.className = 'flex-1 overflow-y-auto sidebar-scroll p-4';
    navElement.innerHTML = navHtml;

    const placeholder = document.getElementById('sidebar-placeholder');
    if(placeholder) {
        placeholder.innerHTML = ''; // Clear previous content
        placeholder.appendChild(navElement);

        const footerContent = document.createElement('div');
        footerContent.className = 'mt-auto pt-4 text-xs text-slate-400 px-2 italic text-center';
        footerContent.innerHTML = `
            (更多章節建置中)
        `;
        placeholder.appendChild(footerContent);

    } else {
        console.error('Sidebar placeholder not found!');
    }
}

function toggleChapter(id, btn) {
    const content = document.getElementById(id);
    const icon = btn.querySelector('.icon');
    if (document.body.classList.contains('sidebar-collapsed')) {
        return; // Don't toggle chapters if sidebar is collapsed
    }
    if (content.classList.contains('collapsed')) {
        content.classList.replace('collapsed', 'expanded');
        icon.textContent = '−';
    } else {
        content.classList.replace('expanded', 'collapsed');
        icon.textContent = '+';
    }
}


// --- SIDEBAR COLLAPSE LOGIC ---

function addSidebarToggleButton() {
    const mainHeader = document.querySelector('main > header > div');
    if (!mainHeader) return;

    const button = document.createElement('button');
    button.id = 'sidebar-toggle-btn';
    button.className = 'mr-6 text-slate-500 hover:text-indigo-600 transition';
    button.setAttribute('aria-label', 'Toggle sidebar');
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon-open" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
    `;
    
    button.addEventListener('click', toggleSidebar);
    mainHeader.insertBefore(button, mainHeader.firstChild);
}

function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
    const isCollapsed = document.body.classList.contains('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
}

function applyInitialSidebarState() {
    const sidebar = document.querySelector('aside');
    if (!sidebar) return;
    
    sidebar.id = 'sidebar'; // Assign ID for style targeting
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        document.body.classList.add('sidebar-collapsed');
    }
}

// --- INITIALIZATION ---

function initializeLayout(currentPage) {
    addDynamicStyles();
    renderNavigation(currentPage);
    addSidebarToggleButton();
    applyInitialSidebarState();
}
