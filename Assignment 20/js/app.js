const STORAGE_KEY = "notes";
const LAST_COLOR_KEY = "lastColor";
const EDIT_NOTE_KEY = "editNoteId";

let notes = [];

let visibleCount = 10;

let selectedColor = "#DEC1EB";

let editingNoteId = null;

const notesGrid = document.getElementById("notes-grid");

const emptyState = document.getElementById("empty-state");

const overlay = document.getElementById("overlay");

const noteModal = document.getElementById("note-modal");

const newNoteBtn = document.getElementById("new-note-btn");

const deleteAllBtn = document.getElementById("delete-all-btn");

const saveNoteBtn = document.getElementById("save-note-btn");

const loadMoreBtn = document.querySelector(".load-more-btn");

const closeBtn = document.querySelector(".close-btn");

const noteTitleInput = document.getElementById("note-title");

const imageUrlInput = document.getElementById("image-url");

const noteContentInput = document.getElementById("note-content");

const colorOptions = document.querySelectorAll(".color-option");

const deleteAllModal = document.getElementById("delete-all-modal");

const confirmDeleteAllBtn =document.getElementById("confirm-delete-all-btn");

const closeNoteModalBtn = document.getElementById("close-note-modal-btn");

const closeDeleteAllModalBtn =document.getElementById("close-delete-all-modal-btn");

init();

function init() {

    loadNotes();

    loadLastColor();

    renderNotes();

    bindEvents();

    checkEditMode();

}

function checkEditMode() {

    const editId = Number(localStorage.getItem(EDIT_NOTE_KEY));

    if (!editId) {
        return;
    }

    const note = notes.find(note => note.id === editId);

    if (!note) {
        return;
    }

    editingNoteId = editId;

    noteTitleInput.value =note.title;

    imageUrlInput.value =note.imageUrl || "";

    noteContentInput.value = note.content;

    selectedColor = note.color;

    colorOptions.forEach(option => {

        option.classList.remove("selected");

        if (option.dataset.color ===note.color) {
            option.classList.add("selected");
        }

    });

    validateForm();

    overlay.classList.add("active");

    noteModal.classList.add("active");

    localStorage.removeItem(EDIT_NOTE_KEY);
}

function bindEvents() {

    newNoteBtn.addEventListener("click",openNewNoteModal);

    saveNoteBtn.addEventListener("click",saveNote);

    closeNoteModalBtn.addEventListener("click", closeNoteModal); 

    deleteAllBtn.addEventListener("click",openDeleteAllModal);

    confirmDeleteAllBtn.addEventListener("click", deleteAllNotes);

    closeDeleteAllModalBtn.addEventListener("click", closeDeleteAllModal);

    loadMoreBtn.addEventListener("click", loadMoreNotes);

    closeBtn.addEventListener("click", closeNoteModal);

    noteTitleInput.addEventListener("input", validateForm);

    noteContentInput.addEventListener("input", validateForm);

    colorOptions.forEach(option => {

        option.addEventListener(
            "click",
            function () {
                selectColor(this);
            }
        );
    });

    notesGrid.addEventListener("click", handleCardClick);
}

function openNewNoteModal() {

    editingNoteId = null;

    clearForm();

    overlay.classList.add("active");

    noteModal.classList.add("active");
}

function closeNoteModal() {

    overlay.classList.remove("active");

    noteModal.classList.remove("active");
}

function loadNotes() {

    const storedNotes = localStorage.getItem(STORAGE_KEY);

    notes = storedNotes ? JSON.parse(storedNotes) : [];
}

function saveNotes() {

    localStorage.setItem(STORAGE_KEY,JSON.stringify(notes));
}

function loadLastColor() {

    const savedColor = localStorage.getItem(LAST_COLOR_KEY);

    if (savedColor) {
        selectedColor = savedColor;
    }
}

function saveLastColor() {

    localStorage.setItem(LAST_COLOR_KEY, selectedColor);
}

function validateForm() {
    const title = noteTitleInput.value.trim();

    const content = noteContentInput.value.trim();

    const isValid = title && content;

    saveNoteBtn.disabled = !isValid;
}

function selectColor(button) {
    colorOptions.forEach(option => option.classList.remove("selected"));

    button.classList.add("selected");
    selectedColor = button.dataset.color;
}

function saveNote() {
    const title = noteTitleInput.value.trim();

    const imageUrl = imageUrlInput.value.trim();

    const content = noteContentInput.value.trim();

    const currentTime = Date.now();

    if (editingNoteId) {
        const existingNote = notes.find(note => note.id === editingNoteId);

        if (existingNote) {
            existingNote.title = title;

            existingNote.imageUrl = imageUrl;

            existingNote.content = content;

            existingNote.color = selectedColor;

            existingNote.updatedAt = currentTime;
        }

        editingNoteId = null;

    } else {

        const note = {
            id: currentTime,

            title,

            imageUrl,

            content,

            color: selectedColor,

            createdAt: currentTime,

            updatedAt: currentTime

        };

        notes.unshift(note);
    }

    sortNotes();

    saveLastColor();

    saveNotes();

    renderNotes();

    closeNoteModal();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function sortNotes() {

    notes.sort((a, b) => b.updatedAt - a.updatedAt);
}

function loadMoreNotes() {

    visibleCount += 10;

    renderNotes();
}


function openDeleteAllModal() {

    if (!notes.length) {
        return;
    }

    overlay.classList.add(
        "active"
    );

    deleteAllModal.classList.add(
        "active"
    );
}

function closeDeleteAllModal() {

    overlay.classList.remove("active");

    deleteAllModal.classList.remove("active");
}

function deleteAllNotes() {

    notes = [];

    saveNotes();

    renderNotes();

    closeDeleteAllModal();
}

function renderNotes() {
    notesGrid.textContent = "";
    toggleEmptyState();
    const fragment = document.createDocumentFragment();
    const visibleNotes = notes.slice(0, visibleCount);
    visibleNotes.forEach(note => {
        const card = createNoteCard(note);
        fragment.append(card);
    });
    notesGrid.append(fragment);
    toggleLoadMore();
}

function createNoteCard(note) {
    const card = document.createElement("article");

    card.className = "note-card";

    card.dataset.id = note.id;

    card.style.backgroundColor = note.color;

    const title = document.createElement("h3");

    title.className = "note-title";

    title.textContent = note.title;

    const date = document.createElement("p");

    date.className ="note-date";

    date.textContent = formatDate(note.updatedAt);

    card.append(title,date);

    if (note.imageUrl) {

        const image = document.createElement("img");

        image.className = "note-image";

        image.src = note.imageUrl;

        image.alt = note.title;

        card.append(image);
    }

    const preview =
        document.createElement("p");

    preview.className = "note-preview";

    preview.textContent = note.content;

    card.append(preview);

    return card;
}

function toggleEmptyState() {

    emptyState.style.display = notes.length ? "none" : "flex";
}

function toggleLoadMore() {
    if (
        notes.length <= visibleCount
    ) {

        loadMoreBtn.style.display = "none";

        return;
    }

    loadMoreBtn.style.display = "block";
}

function formatDate(timestamp) {

    return new Date(timestamp).toLocaleDateString("en-GB");
}

function clearForm() {

    noteTitleInput.value = "";

    imageUrlInput.value = "";

    noteContentInput.value = "";

    saveNoteBtn.disabled = true;

    colorOptions.forEach(option =>
        option.classList.remove("selected"));

    const activeColor =
        document.querySelector(`[data-color="${selectedColor}"]`);

    if (activeColor) {
        activeColor.classList.add("selected");
    }
}

function handleCardClick(event) {
    const card = event.target.closest(".note-card");

    if (!card) {
        return;
    }

    const noteId = card.dataset.id;

    window.location.href = `detail.html?id=${noteId}`;
}