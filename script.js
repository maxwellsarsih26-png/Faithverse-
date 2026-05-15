// Bible data
const bibleBooks = {
    oldTestament: [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
        '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
        'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
        'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
        'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
        'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
        'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
    ],
    newTestament: [
        'Matthew', 'Mark', 'Luke', 'John', 'Acts',
        'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
        'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
        '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
        '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
        'Jude', 'Revelation'
    ]
};

const sampleVerses = [
    { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", reference: "Proverbs 3:5-6" },
    { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
    { text: "The Lord is my shepherd, I lack nothing.", reference: "Psalm 23:1" },
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11" },
    { text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "Matthew 6:33" },
    { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31" },
    { text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.", reference: "Ephesians 2:8-9" },
    { text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" }
];

// Chapter counts for all books in the Old and New Testaments
const chapterCounts = {
    Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
    Joshua: 24, Judges: 21, Ruth: 4, '1 Samuel': 31, '2 Samuel': 24,
    '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, Ezra: 10,
    Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
    Ecclesiastes: 12, 'Song of Solomon': 8, Isaiah: 66, Jeremiah: 52, Lamentations: 5,
    Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9,
    Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3,
    Zephaniah: 3, Haggai: 2, Zechariah: 14, Malachi: 4,
    Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28,
    Romans: 16, '1 Corinthians': 16, '2 Corinthians': 13, Galatians: 6, Ephesians: 6,
    Philippians: 4, Colossians: 4, '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6,
    '2 Timothy': 4, Titus: 3, Philemon: 1, Hebrews: 13, James: 5,
    '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1,
    Jude: 1, Revelation: 22
};

// DOM elements
let currentVerseIndex = 0;
let lastSelectedVerse = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading animation
    setTimeout(() => {
        document.getElementById('loading').classList.add('hide');
    }, 1000);

    // Initialize components
    initializeNavigation();
    initializeBooks();
    initializeDailyVerse();
    initializeSearch();
    initializeThemeToggle();
    initializeTypingAnimation();
    initializeScrollEffects();

    // Set initial daily verse
    displayDailyVerse();
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
}

// Books functionality
function initializeBooks() {
    const oldTestamentGrid = document.querySelector('#old-testament .books-grid');
    const newTestamentGrid = document.querySelector('#new-testament .books-grid');

    // Populate Old Testament books
    bibleBooks.oldTestament.forEach(book => {
        const bookCard = createBookCard(book);
        oldTestamentGrid.appendChild(bookCard);
    });

    // Populate New Testament books
    bibleBooks.newTestament.forEach(book => {
        const bookCard = createBookCard(book);
        newTestamentGrid.appendChild(bookCard);
    });

    // Initialize book selector
    const bookSelect = document.getElementById('book-select');
    Object.values(bibleBooks).flat().forEach(book => {
        const option = document.createElement('option');
        option.value = book;
        option.textContent = book;
        bookSelect.appendChild(option);
    });

    bookSelect.addEventListener('change', updateChapterSelector);
    document.getElementById('chapter-select').addEventListener('change', displayChapter);
    document.getElementById('verse-select').addEventListener('change', displayVerse);
}

function createBookCard(bookName) {
    const card = document.createElement('div');
    card.className = 'book-card fade-in';
    card.textContent = bookName;
    card.addEventListener('click', () => selectBook(bookName));
    return card;
}

function selectBook(bookName) {
    const bookSelect = document.getElementById('book-select');
    bookSelect.value = bookName;
    updateChapterSelector();
    scrollToSection('reading');
}

function updateChapterSelector() {
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    const selectedBook = bookSelect.value;

    // Clear existing options
    chapterSelect.innerHTML = '<option value="">Select a Chapter</option>';

    const verseSelect = document.getElementById('verse-select');
    verseSelect.innerHTML = '<option value="">Select a Verse</option>';
    verseSelect.disabled = true;

    if (selectedBook && chapterCounts[selectedBook]) {
        const count = chapterCounts[selectedBook];
        for (let chapter = 1; chapter <= count; chapter++) {
            const option = document.createElement('option');
            option.value = chapter;
            option.textContent = `Chapter ${chapter}`;
            chapterSelect.appendChild(option);
        }
    }
}

function displayChapter() {
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    const verseSelect = document.getElementById('verse-select');
    const verseDisplay = document.getElementById('verse-display');

    const selectedBook = bookSelect.value;
    const selectedChapter = chapterSelect.value;

    if (!selectedBook || !selectedChapter) {
        verseDisplay.innerHTML = '<p>Select a book and chapter to start reading.</p>';
        return;
    }

    verseSelect.innerHTML = '<option value="">Select a Verse</option>';
    verseSelect.disabled = true;

    verseDisplay.innerHTML = `<h3>${selectedBook} Chapter ${selectedChapter}</h3><p>Loading chapter text...</p>`;
    verseDisplay.classList.add('loading');

    fetchChapterContent(selectedBook, selectedChapter)
        .then(chapterText => {
            verseDisplay.classList.remove('loading');
            populateVerseSelect(chapterText);
            verseSelect.disabled = false;
            verseDisplay.innerHTML = `<h3>${selectedBook} Chapter ${selectedChapter}</h3>`;
            chapterText.forEach(({ verse, text }) => {
                verseDisplay.innerHTML += `<p><sup>${verse}</sup> ${text}</p>`;
            });
        })
        .catch(error => {
            verseDisplay.classList.remove('loading');
            verseDisplay.innerHTML = `<h3>${selectedBook} Chapter ${selectedChapter}</h3><p>Unable to load chapter content. Please try again.</p>`;
            console.error('Bible API error:', error);
        });
}

async function fetchChapterContent(book, chapter) {
    const normalizedBook = normalizeBookName(book);
    const query = encodeURIComponent(`${normalizedBook} ${chapter}`);
    const apiUrl = `https://bible-api.com/${query}?translation=kjv`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch chapter: ${response.status}`);
    }

    const data = await response.json();
    if (!data.verses || !Array.isArray(data.verses) || data.verses.length === 0) {
        throw new Error('No verses returned from API');
    }

    return data.verses.map(verse => ({
        verse: verse.verse,
        text: verse.text.trim()
    }));
}

async function fetchVerseContent(book, chapter, verse) {
    const normalizedBook = normalizeBookName(book);
    const query = encodeURIComponent(`${normalizedBook} ${chapter}:${verse}`);
    const apiUrl = `https://bible-api.com/${query}?translation=kjv`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch verse: ${response.status}`);
    }

    const data = await response.json();
    if (!data.verses || !Array.isArray(data.verses) || data.verses.length === 0) {
        throw new Error('No verse returned from API');
    }

    return data.verses.map(result => ({
        verse: result.verse,
        text: result.text.trim()
    }));
}

function normalizeBookName(book) {
    const bookMap = {
        '1 Samuel': '1 Samuel',
        '2 Samuel': '2 Samuel',
        '1 Kings': '1 Kings',
        '2 Kings': '2 Kings',
        '1 Chronicles': '1 Chronicles',
        '2 Chronicles': '2 Chronicles',
        'Song of Solomon': 'Song of Solomon',
        '1 Corinthians': '1 Corinthians',
        '2 Corinthians': '2 Corinthians',
        '1 Thessalonians': '1 Thessalonians',
        '2 Thessalonians': '2 Thessalonians',
        '1 Timothy': '1 Timothy',
        '2 Timothy': '2 Timothy',
        '1 Peter': '1 Peter',
        '2 Peter': '2 Peter',
        '1 John': '1 John',
        '2 John': '2 John',
        '3 John': '3 John'
    };

    return bookMap[book] || book;
}

function populateVerseSelect(chapterText) {
    const verseSelect = document.getElementById('verse-select');
    verseSelect.innerHTML = '<option value="">Select a Verse</option>';
    chapterText.forEach(({ verse }) => {
        const option = document.createElement('option');
        option.value = verse;
        option.textContent = `Verse ${verse}`;
        verseSelect.appendChild(option);
    });

    // Try to restore last selected verse if it exists in this chapter
    if (lastSelectedVerse && chapterText.some(v => v.verse === lastSelectedVerse)) {
        verseSelect.value = lastSelectedVerse;
    }
}

function displayVerse() {
    const verseSelect = document.getElementById('verse-select');
    lastSelectedVerse = verseSelect.value;
    
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    const verseDisplay = document.getElementById('verse-display');

    const selectedBook = bookSelect.value;
    const selectedChapter = chapterSelect.value;
    const selectedVerse = verseSelect.value;

    if (!selectedBook || !selectedChapter || !selectedVerse) {
        return;
    }

    verseDisplay.innerHTML = `<h3>${selectedBook} ${selectedChapter}:${selectedVerse}</h3><p>Loading verse text...</p>`;
    verseDisplay.classList.add('loading');

    fetchVerseContent(selectedBook, selectedChapter, selectedVerse)
        .then(verseData => {
            verseDisplay.classList.remove('loading');
            verseDisplay.innerHTML = `<h3>${selectedBook} ${selectedChapter}:${selectedVerse}</h3>`;
            verseData.forEach(({ verse, text }) => {
                verseDisplay.innerHTML += `<p><sup>${verse}</sup> ${text}</p>`;
            });
        })
        .catch(error => {
            verseDisplay.classList.remove('loading');
            verseDisplay.innerHTML = `<h3>${selectedBook} ${selectedChapter}:${selectedVerse}</h3><p>Unable to load verse content. Please try again.</p>`;
            console.error('Bible API error:', error);
        });
}

// Daily verse functionality
function initializeDailyVerse() {
    document.getElementById('new-daily-verse').addEventListener('click', displayDailyVerse);
    document.getElementById('favorite-verse').addEventListener('click', toggleFavorite);
}

function displayDailyVerse() {
    const verseText = document.getElementById('daily-verse-text');
    const randomVerse = sampleVerses[Math.floor(Math.random() * sampleVerses.length)];
    verseText.textContent = `"${randomVerse.text}" - ${randomVerse.reference}`;
    currentVerseIndex = sampleVerses.indexOf(randomVerse);
}

function toggleFavorite() {
    const button = document.getElementById('favorite-verse');
    button.classList.toggle('favorited');
    const isFavorited = button.classList.contains('favorited');
    button.textContent = isFavorited ? '❤️ Favorited' : '❤️ Favorite';

    if (isFavorited) {
        // In a real app, you'd save this to localStorage or a database
        console.log('Verse favorited:', sampleVerses[currentVerseIndex]);
    }
}

// Search functionality
function initializeSearch() {
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (!query) {
        resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const results = sampleVerses.filter(verse =>
        verse.text.toLowerCase().includes(query) ||
        verse.reference.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No verses found matching your search.</p>';
        return;
    }

    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result fade-in';
        resultElement.innerHTML = `
            <p class="verse-text">"${highlightText(result.text, query)}"</p>
            <p class="verse-reference">${result.reference}</p>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        themeToggle.textContent = isLightMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}

// Typing animation for hero title
function initializeTypingAnimation() {
    const titleElement = document.getElementById('hero-title');
    const text = "Welcome to FaithVerse";
    let index = 0;

    titleElement.textContent = '';

    function typeWriter() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add glow effect to accent elements
function addGlowEffect() {
    const accentElements = document.querySelectorAll('.btn-primary, .nav-logo h2');
    accentElements.forEach(element => {
        element.classList.add('glow');
    });
}

setTimeout(addGlowEffect, 2000);
