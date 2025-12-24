// --- CONFIGURATION ---

const NAV_HTML_CONTENT = `
<div class="mb-4">
    <button onclick="toggleChapter('ch1', this)" class="w-full flex items-center justify-between font-bold text-indigo-700 px-2 py-2 hover:bg-slate-50 rounded-lg transition text-left text-lg">
        <span class="nav-text">Chapter 1 句子</span>
        <span class="icon text-xl">−</span>
    </button>
    <div id="ch1" class="chapter-content expanded ml-2 border-l-2 border-slate-100">
        <div class="mb-4">
            <h3 class="nav-text text-sm font-semibold text-slate-500 mt-2 mb-1 px-4">Part 1 句子的定義</h3>
            <ul class="space-y-1">
                <li><a href="1-1-1.html" class="flex items-center gap-3 px-4 py-1 text-sm {active_1_1_1} text-slate-600 hover:bg-slate-50 transition"><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="nav-text">1. 句子 (Sentences)</span></a></li>
                <li><a href="1-1-2.html" class="flex items-center gap-3 px-4 py-1 text-sm {active_1_1_2} text-slate-600 hover:bg-slate-50 transition"><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="nav-text">2. 主詞 (Subjects)</span></a></li>
                <li><a href="1-1-3.html" class="flex items-center gap-3 px-4 py-1 text-sm {active_1_1_3} text-slate-600 hover:bg-slate-50 transition"><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="nav-text">3. 述語 (Predicates)</span></a></li>
                <li><a href="1-1-4.html" class="flex items-center gap-3 px-4 py-1 text-sm {active_1_1_4} text-slate-600 hover:bg-slate-50 transition"><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="nav-text">4. 主詞補語 (Subject Complements)</span></a></li>
                <li><a href="#" class="flex items-center gap-3 px-4 py-1 text-sm text-slate-600 hover:bg-slate-50 transition"><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="nav-text">5. 受詞 (Objects)</span></a></li>
            </ul>
        </div>
    </div>
</div>
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


// --- NAVIGATION RENDERING ---

function renderNavigation(currentPage) {
    let navContent = NAV_HTML_CONTENT;
    const activeClass = 'bg-indigo-50 text-indigo-700 font-medium rounded-r-lg border-l-2 border-indigo-500 -ml-[2px]';
    
    navContent = navContent.replace('{active_1_1_1}', currentPage === '1-1-1.html' ? activeClass : 'hover:bg-slate-50');
    navContent = navContent.replace('{active_1_1_2}', currentPage === '1-1-2.html' ? activeClass : 'hover:bg-slate-50');
    navContent = navContent.replace('{active_1_1_3}', currentPage === '1-1-3.html' ? activeClass : 'hover:bg-slate-50');
    navContent = navContent.replace('{active_1_1_4}', currentPage === '1-1-4.html' ? activeClass : 'hover:bg-slate-50');

    const navElement = document.createElement('nav');
    navElement.className = 'flex-1 overflow-y-auto sidebar-scroll p-4';
    navElement.innerHTML = navContent;

    const placeholder = document.getElementById('sidebar-placeholder');
    if(placeholder) {
        placeholder.innerHTML = ''; // Clear previous content
        placeholder.appendChild(navElement);

        const footerContent = document.createElement('div');
        footerContent.className = 'mt-auto pt-4 text-xs text-slate-400 px-2 italic text-center';
        footerContent.innerHTML = `
            (更多章節建置中)
            <div class="mt-4">
                <a href="https://hits.dwyl.com/hau7626520/grammarbook.github.io">
                    <img src="https://hits.dwyl.com/hau7626529/grammarbook.github.io.svg?style=flat-square&show=unique" alt="Hits">
                </a>
            </div>
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