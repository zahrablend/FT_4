const description = document.querySelector('#add_note');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (!savedNotes) {
        savedNotes = [];
        localStorage.setItem('notes', JSON.stringify(savedNotes));
    }
    savedNotes.forEach(note => createNote(note.id, note.title, note.description));
});

description.addEventListener('focus', () => {
    if (!document.querySelector('#add_title')) {
        const textInputContainer = document.createElement('div');
        textInputContainer.className = 'text_input1';
        form.prepend(textInputContainer);

        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'add_title');
        titleInput.setAttribute('id', 'add_title');
        titleInput.setAttribute('placeholder', 'Title');
        textInputContainer.append(titleInput);
    }

    if (!document.querySelector('#cancel_btn')) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'btn_input2';
        form.append(btnContainer);

        const cancelBtn = document.createElement('input');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.setAttribute('id', 'cancel_btn');
        cancelBtn.classList.add('btn_style', 'red');
        cancelBtn.setAttribute('value', 'Cancel');
        btnContainer.append(cancelBtn);
        cancelBtn.addEventListener('click', () => {
            document.querySelector('#add_title').value = '';
            document.querySelector('#add_note').value = '';
        })
    }
});

const notesContainer = document.querySelector('.notes_container');
const createNoteBtn = document.querySelector('#create_note_btn');
createNoteBtn.addEventListener('click', () => {
    const title = document.querySelector('#add_title').value;
    const note = document.querySelector('#add_note').value;
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    const id = savedNotes.length ? savedNotes[savedNotes.length - 1].id + 1 : 1;
    createNote(id, title, note);

    savedNotes.push({id, title, description: note});
    localStorage.setItem('notes', JSON.stringify(savedNotes));
});

const createNote = (id, title, note) => {
    const card = document.createElement('div');
    card.className = 'card';

    const binIcon = document.createElement('img');
    binIcon.className = 'bin_icon';
    binIcon.src = 'images/delete_icon.png';
    binIcon.alt = 'delete card';
    binIcon.addEventListener('click', () => deleteNote(card, id));

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const p = document.createElement('p');
    p.textContent = note;
    p.addEventListener('click', () => p.className = 'done');

    card.append(binIcon, h2, p);
    notesContainer.prepend(card);
}

const deleteNote = (card, id) => {
    card.remove();
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    savedNotes = savedNotes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
}