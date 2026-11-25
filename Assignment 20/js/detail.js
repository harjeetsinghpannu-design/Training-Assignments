const STORAGE_KEY = "notes";

const backBtn =
    document.getElementById("back-btn");

const overlay =
    document.getElementById("overlay");

const deleteNoteModal =
    document.getElementById("delete-note-modal");

const closeDeleteModalBtn =
    document.getElementById("close-delete-modal");

const confirmDeleteNoteBtn =
    document.getElementById("confirm-delete-note");

const deleteBtn =
    document.getElementById("delete-btn");

const editBtn =
    document.getElementById("edit-btn");

const detailTitle =
    document.getElementById("detail-title");

const detailDate =
    document.getElementById("detail-date");

const detailImage =
    document.getElementById("detail-image");

const detailContent =
    document.getElementById("detail-content");

const noteIndicator =
    document.getElementById("note-indicator");

let currentNote = null;

init();

function init() {
    loadNote();
    bindEvents();
}

function bindEvents() {
    backBtn.addEventListener(
        "click",
        goBack
    );

    deleteBtn.addEventListener(
        "click",
        openDeleteModal
    );

    editBtn.addEventListener(
        "click",
        editNote
    );
    closeDeleteModalBtn.addEventListener(
        "click",
        closeDeleteModal
    );

    confirmDeleteNoteBtn.addEventListener(
        "click",
        deleteNote
    );
}

function loadNote() {
    const params =
        new URLSearchParams(
            window.location.search
        );

    const noteId =
        Number(params.get("id"));

    const notes =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || [];

    currentNote =
        notes.find(
            note => note.id === noteId
        );

    if (!currentNote) {
        window.location.href =
            "index.html";
        return;
    }

    renderNote();
}

function renderNote() {
    detailTitle.textContent =
        currentNote.title;

    detailDate.textContent =
        formatDate(
            currentNote.updatedAt
        );

    detailContent.textContent =
        currentNote.content;

    noteIndicator.style.backgroundColor =
        currentNote.color;

    if (currentNote.imageUrl) {
        detailImage.src =
            currentNote.imageUrl;

        detailImage.style.display =
            "block";
    } else {
        detailImage.style.display =
            "none";
    }
}

function goBack() {
    window.location.href =
        "index.html";
}

function openDeleteModal() {

    overlay.classList.add(
        "active"
    );

    deleteNoteModal.classList.add(
        "active"
    );
}

function closeDeleteModal() {

    overlay.classList.remove(
        "active"
    );

    deleteNoteModal.classList.remove(
        "active"
    );
}

function deleteNote() {
    closeDeleteModal();
    const notes =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || [];

    const updatedNotes =
        notes.filter(
            note =>
                note.id !== currentNote.id
        );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedNotes)
    );

    window.location.href =
        "index.html";
}

function editNote() {
    localStorage.setItem(
        "editNoteId",
        currentNote.id
    );

    window.location.href =
        "index.html";
}

function formatDate(timestamp) {
    return new Date(
        timestamp
    ).toLocaleDateString(
        "en-GB"
    );
}