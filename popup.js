// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const listPage = document.getElementById("list-page");
  const addNotePage = document.getElementById("add-note-page");
  const addNoteBtn = document.getElementById("add-note-btn");
  const backToListBtn = document.getElementById("back-to-list-btn");
  const noteForm = document.getElementById("note-form");
  const notesList = document.getElementById("notes-list");

  addNoteBtn.addEventListener("click", () => {
    listPage.style.display = "none";
    addNotePage.style.display = "flex";
  });

  backToListBtn.addEventListener("click", () => {
    addNotePage.style.display = "none";
    listPage.style.display = "flex";
  });

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;
    const timeStamp = new Date().toLocaleString();

    const note = {
      title,
      content,
      timeStamp,
    };

    saveNoteToStorage(note);
    displayNotes();
    noteForm.reset();
    backToListBtn.click();
  });

  function saveNoteToStorage(note) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function deleteNoteFromStorage(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const noteElement = document.createElement("div");
      noteElement.className = "note";
      noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <p>${note.timeStamp}</p>
          <button class="delete-note-btn" data-index="${index}">x</button>
          <hr />
        `;
      notesList.appendChild(noteElement);
    });

    document.querySelectorAll(".delete-note-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deleteNoteFromStorage(index);
      });
    });
  }

  displayNotes();
});
