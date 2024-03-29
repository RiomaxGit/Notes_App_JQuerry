$(document).ready(function () {
    // Function to display notes
    function displayNotes() {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        $('#notes-list').empty();
        notes.forEach(function (note, index) {
            $('#notes-list').append('<li data-index="' + index + '">' + note.title + ' <button class="edit-note-btn">Edit</button> <button class="delete-note-btn">Delete</button></li>');
        });
    }

    // Function to open dialog for adding/editing note
    function openNoteDialog(mode, index) {
        let title = (mode === 'edit') ? 'Edit Note' : 'Add Note';
        let buttonText = (mode === 'edit') ? 'Update' : 'Add';

        let dialog = $('#note-dialog').dialog({
            title: title,
            modal: true,
            buttons: {
                [buttonText]: function () {
                    let title = $('#note-title').val();
                    let content = $('#note-content').val();
                    let notes = JSON.parse(localStorage.getItem("notes")) || [];
                    if (mode === 'edit') {
                        notes[index] = { title: title, content: content };
                    } else {
                        notes.push({ title: title, content: content });
                    }
                    localStorage.setItem("notes", JSON.stringify(notes));
                    displayNotes();
                    $(this).dialog('close');
                },
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });

        // Fill fields if in edit mode
        if (mode === 'edit') {
            let notes = JSON.parse(localStorage.getItem("notes")) || [];
            let note = notes[index];
            $('#note-title').val(note.title);
            $('#note-content').val(note.content);
        }
    }

    // Event listener for Add Note button
    $('#add-note-btn').on('click', function () {
        openNoteDialog('add');
    });

    // Event listener for Edit and Delete buttons
    $('#notes-list').on('click', '.edit-note-btn', function () {
        let index = $(this).closest('li').data('index');
        openNoteDialog('edit', index);
    }).on('click', '.delete-note-btn', function () {
        let index = $(this).closest('li').data('index');
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    });

    // Logout functionality
    $('#logout-btn').on('click', function () {
        sessionStorage.clear();
        window.location.href = "index.html";
    });

    // Check if user is logged in
    let username = sessionStorage.getItem("username");
    if (username) {
        $('#username').text(username);
        displayNotes();
    } else {
        window.location.href = "index.html";
    }
});
