// localStorage.clear();
let notes = localStorage.getItem("notes")?JSON.parse(localStorage.getItem("notes")) :  [];
let noteListing = [];
let selectedNote = null;
let currentNodeId = null;
let isNewNote = false;
let lastId = localStorage.getItem("lastId")?parseInt(localStorage.getItem("lastId")): 0;
let showSidebar = true;


window.addEventListener('DOMContentLoaded', event => {

  for (const data of notes) {
    let li = document.createElement('li');
    li.className = `note-${data.id}`;
    li.innerHTML = data.text;
    notelist.appendChild(li);
  }

  document.getElementsByClassName("left")[0].style.display = 'block';
  document.getElementsByClassName("right")[0].style.display = 'none';

  function deselectEls() {
    if (selectedNote) {
      let selectedElem = document.getElementsByClassName('selected')[0];
      currentNodeId = null;
      if (selectedElem) {
        selectedElem.classList.remove('selected');
      }
    }
  }

  function reset() {
    deselectEls();
    selectedNote = null;
    isNewNote = true;
    noteinput.value = '';
  }

  const addNote = () => {
    reset();
    focus();
  }

  const focus = () => noteinput.focus();
  const saveNote = () => {
      if (noteinput.value.length > 1) {

        if (currentNodeId != null) {
          notes[currentNodeId].text = noteinput.value;
          let noteData = document.getElementsByClassName(`note-${selectedNote.id}`)[0];
          noteData.innerHTML = noteinput.value;
        } else {
          let newNote = {
            id: lastId,
            text: noteinput.value
          };
          let li = document.createElement('li');
          li.className = `note-${newNote.id}`;
          li.classList.add('selected');
          li.innerHTML = newNote.text;
          notelist.appendChild(li);
          notes.push(newNote);
          selectedNote = newNote;
          isNewNote = false;
          lastId++;
          currentNodeId = lastId;
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('lastId', JSON.stringify(lastId));
        focus();
        deselectEls();
    }
  }
  const removeNote = () => {
    if (selectedNote) {
      // remove note from array
      notes.splice(notes.indexOf(selectedNote), 1);
      // remove el from DOM
      let noteEl = document.getElementsByClassName(`note-${selectedNote.id}`)[0];
      noteEl.remove();
      lastId--;
      currentNodeId = null;
      localStorage.setItem('lastId', JSON.stringify(lastId));
      localStorage.setItem('notes', JSON.stringify(notes));
      reset();
    }
  }

  add.onclick = () => addNote();

  save.onclick = event => saveNote();

  removenote.onclick = event => removeNote();

  notelist.onclick = event => {
    if (event.target.tagName === 'LI') {
      let selectedList = document.getElementsByClassName('selected');
      for (const selectedElem of selectedList) {
        selectedElem.classList.remove('selected');
      }
      let li = event.target;
      let index = li.className[li.className.length - 1];
      selectedNote = notes.filter(note => note.id === +index)[0];
      // deselectEls();
      event.target.classList.add('selected');
      noteinput.value = selectedNote.text;
      // noteinput.id = selectedNote.id;
      currentNodeId = selectedNote.id;
      focus();
    }
  }

  toggle.onclick = event => {
    let container = document.getElementsByClassName('container')[0];
    showSidebar = !showSidebar;
    showSidebar ? container.classList.add('active') : container.classList.remove('active');
    if (showSidebar) {
      document.getElementsByClassName("left")[0].style.display = 'block';
      document.getElementsByClassName("right")[0].style.display = 'none';
    } else {
      document.getElementsByClassName("left")[0].style.display = 'none';
      document.getElementsByClassName("right")[0].style.display = 'block';
    }
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      saveNote();
    }
    if (event.key === 'Delete') {
      event.preventDefault();
      removeNote();
    }
    // if (event.key === 'n' && (event.ctrlKey || event.metaKey)) {
    //   event.preventDefault();
    //   addNote();
    // }
  });
});
