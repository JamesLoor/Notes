const form = document.getElementById('formToCreateANote')
const h2Form = document.querySelector('#formToCreateANote h2')
const titleInput = document.querySelector('#formToCreateANote input') 
const textInput = document.querySelector('#formToCreateANote textarea') 
const containerNotes = document.getElementById('containerList') 
const buttonSubmitForm = document.querySelector('.note__form__submit')
const buttonNewNote = document.getElementById('buttonNewNote')

displayNote()

buttonNewNote.onclick = () => {
  titleInput.focus()
}

form.onsubmit = (e) => {
  e.preventDefault()

  getNote()
}

function getNote(editing) {
  if(titleInput.value == '' && textInput.value == '') {
    alert('Reciba un cordial saludo del creador. Porfavor inserte un mensaje no se pase de verga sino va a escribir nada no use esta página. Gracias, que tenga buen día')
  } else if(titleInput.value == '') {
    alert('Debe ingresar un titulo')
  } else if(textInput.value == '') {
    alert('Debe ingresar texto')
  } else {
    const titleValue = titleInput.value
    const textValue = textInput.value

    const note = {
      title: titleValue,
      text: textValue
    }

    titleInput.value = ''
    textInput.value = ''

    if(!editing) {
      saveNote(note)
    } else {
      return note
    }
  }
}

function saveNote(note) {
  let noteArray = []
  noteArray.push(note)
  if(!localStorage.key(0)) {
    localStorage.setItem('notes', JSON.stringify(noteArray))
  } else {
    let noteArray = JSON.parse(localStorage.getItem('notes'))
    noteArray.push(note)
    localStorage.setItem('notes', JSON.stringify(noteArray))
  }

  displayNote()
}

function displayNote() {
  const notes = JSON.parse(localStorage.getItem('notes'))

  if(localStorage.key(0) && (localStorage.getItem('notes') != '[]') ){
    containerNotes.innerHTML = ''
    let i = 1
    notes.forEach((note, index) => {
      // Create tags for each note 
      const li = document.createElement('li')
      const h4 = document.createElement('h4')
      const p = document.createElement('p') 
      const buttonEdit = document.createElement('button')
      const buttonDelete = document.createElement('button')

      h4.textContent = `${i++}. ${note.title}`
      p.textContent = note.text
      buttonEdit.textContent = 'Editar' 
      buttonDelete.textContent = 'Eliminar'

      li.setAttribute('class', 'note')
      buttonEdit.setAttribute('class', 'note__list__edit')
      buttonDelete.setAttribute('class', 'note__list__delete')

      li.appendChild(h4)
      li.appendChild(p)
      li.appendChild(buttonEdit)
      li.appendChild(buttonDelete)

      buttonEdit.onclick = () => {
        const titleToEdit = h4.textContent.slice(3)
        const textToEdit = p.textContent

        titleInput.value = titleToEdit
        textInput.value = textToEdit

        li.setAttribute('class', 'note note__on__edit')
        buttonEdit.setAttribute('class', 'note__list__delete button__on__edit')
        buttonDelete.setAttribute('class', 'hidden')
        buttonSubmitForm.setAttribute('class', 'hidden')

        const buttonToEdit = document.createElement('button')
        buttonToEdit.textContent = 'Editar'
        buttonToEdit.setAttribute('class', 'note__form__submit')
        form.appendChild(buttonToEdit)

        h2Form.textContent = `Editando nota ${(index + 1)}`
        titleInput.focus()

        buttonEdit.textContent = 'Editando'
        buttonEdit.setAttribute('disabled', '')

        buttonToEdit.onclick = (e) => {
          e.preventDefault()
          let edit = true
          let note = getNote(edit)

          const notes = JSON.parse(localStorage.getItem('notes'))
          notes[index].title = note.title
          notes[index].text = note.text
          localStorage.setItem('notes', JSON.stringify(notes))
          displayNote()

          h2Form.textContent = `Registrar Nota`
          buttonToEdit.remove()
          li.setAttribute('class', 'note')
          buttonEdit.setAttribute('class', 'note__list__delete')
          buttonDelete.setAttribute('class', 'note__list__delete')
          buttonSubmitForm.setAttribute('class', 'note__form__submit')
        }
      }

      buttonDelete.onclick = () => {
        li.remove()
        let notes = JSON.parse(localStorage.getItem('notes'))
        notes.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notes))
        displayNote()
      }

      containerNotes.appendChild(li)
    })  
  } else {
    dontHaveNotes()
  }
}

function dontHaveNotes() {
  const p = document.createElement('p')
  p.textContent = 'No se ah creado ninguna tarea.'
  containerNotes.appendChild(p)
}