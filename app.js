'use strict';

const $formNote = document.getElementById('formNote')
const $title = document.getElementById('title')
const $text = document.getElementById('text')
const $buttonSubmit = document.getElementById('buttonSubmit')
const $containerNote = document.getElementById('containerNote')

$formNote.onsubmit = (e) => {
  e.preventDefault()

  getNote()
}

const getNoteList = () => JSON.parse(localStorage.getItem('Notes'))

const getNote = (isEditing) => {
  const titleValue = $title.value
  const textValue = $text.value

  if(titleValue === '' && textValue === '') return alert('Ingrese un título y texto')
  if(titleValue === '') return alert('Ingrese un título')
  if(textValue === '') return alert('Ingrese un texto')

  const note = { title: titleValue, text: textValue }

  if(!isEditing) saveNote(note)
  else return note
}

const saveNote = (note) => {
  cleanInputs()

  let noteList = []
  noteList.push(note)

  if (!isLocalStorageUsed()) {
    console.log('Deactive')
    localStorage.setItem('Notes', JSON.stringify(noteList))
  } else {
    console.log('Active')
    noteList = JSON.parse(localStorage.getItem('Notes'))
    noteList.push(note)
    localStorage.setItem('Notes', JSON.stringify(noteList))
  }

  displayNote()
}

const displayNote = () => {
  const noteList = getNoteList()

  if(isLocalStorageUsed()) {
    $containerNote.innerHTML = ''
    noteList.forEach(({title, text}, index) => {
      const id = `note-${index}` 
      const numberToNote = index + 1 
      const templateNote = `
        <li id="${id}" class="note">
          <h4>${numberToNote}. ${title}</h4>
          <p>${text}</p>
          <button onclick="editNote('${id}', '${title}', '${text}', ${index})" class="note__list__edit">Editar</button>
          <button onclick="deleteNote('${id}', ${index})" class="note__list__delete">Eliminar</button>
        </li>
      `
      $containerNote.innerHTML += templateNote

    })
  } else {
    const templateWithoutNote = '<p>No se ah creado ninguna tarea.</p>' 
    $containerNote.innerHTML = templateWithoutNote
  }
}

const isLocalStorageUsed = () => {
  if(localStorage.key(0) === null || localStorage.getItem('notes') === '[]') return false 
  else return true
}

const cleanInputs = () => {
  $title.value = ''
  $text.value = ''
}

const editNote = (id, title, text, index) => {
  const noteList = getNoteList()

  const buttonToEdit = document.createElement('button')
  buttonToEdit.textContent = 'Editar'
  buttonToEdit.setAttribute('class', 'note__form__submit')
  
  $title.value = title,
  $text.value = text
  
  $buttonSubmit.style.display = 'none'
  $formNote.appendChild(buttonToEdit)


  buttonToEdit.onclick = (e) => {
    e.preventDefault()

    const note = getNote(true)
    noteList[index].title = note.title
    noteList[index].text = note.text

    localStorage.setItem('Notes', JSON.stringify(noteList))
    displayNote()

    cleanInputs()
    buttonToEdit.remove()
    $buttonSubmit.style.display = 'block'
  }
}

const deleteNote = (id, index) => {
  const elementToDelete = document.getElementById(id)
  const noteList = getNoteList()

  elementToDelete.remove()
  noteList.splice(index, 1)
  localStorage.setItem('Notes', JSON.stringify(noteList))
  displayNote()
}

displayNote()


