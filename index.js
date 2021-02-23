
(function onload() {
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
        const buttonReminder = document.createElement('button')
        const buttonDelete = document.createElement('button')

        h4.textContent = `${i++}. ${note.title}`
        p.textContent = note.text
        buttonEdit.textContent = 'Editar' 
        buttonReminder.textContent = 'Recordar'
        buttonDelete.textContent = 'Eliminar'

        li.setAttribute('class', 'note')
        buttonEdit.setAttribute('class', 'note__list__edit')
        buttonReminder.setAttribute('class', 'note__list__reminder')
        buttonDelete.setAttribute('class', 'note__list__delete')
        

        li.appendChild(h4)
        li.appendChild(p)
        li.appendChild(buttonEdit)
        li.appendChild(buttonReminder)
        li.appendChild(buttonDelete)

        buttonEdit.onclick = () => {
          const titleToEdit = h4.textContent.slice(3)
          const textToEdit = p.textContent

          titleInput.value = titleToEdit
          textInput.value = textToEdit

          li.setAttribute('class', 'note note__on__edit')
          buttonEdit.setAttribute('class', 'note__list__delete button__on__edit')
          buttonReminder.setAttribute('class', 'hidden')
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

        buttonReminder.onclick = () => {
          titleInput.setAttribute('class', 'hidden')
          textInput.setAttribute('class', 'hidden')

          li.setAttribute('class', 'note note__on__reminder')
          buttonEdit.setAttribute('class', 'hidden')
          buttonReminder.setAttribute('class', 'note__list__reminder button__on__reminder')
          buttonDelete.setAttribute('class', 'hidden')
          buttonSubmitForm.setAttribute('class', 'hidden')

          const containerDate = document.createElement('div')

          const dateInput = document.createElement('input')
          dateInput.setAttribute('type', 'date')
          dateInput.setAttribute('min', '2021-01-01')
          dateInput.setAttribute('max', '2025-12-31')
          dateInput.setAttribute('class', 'note__form__input')
          form.appendChild(dateInput)

          const timeInput = document.createElement('input')
          timeInput.setAttribute('type', 'time')
          timeInput.setAttribute('class', 'note__form__input')
          form.appendChild(timeInput)

          const buttonToRemind = document.createElement('button')
          buttonToRemind.textContent = 'Recordar'
          buttonToRemind.setAttribute('class', 'note__form__submit__reminder')
          form.appendChild(buttonToRemind)

          h2Form.textContent = 'Ingresar Fecha'

          buttonReminder.textContent = 'Recordando'
          buttonReminder.setAttribute('disabled', '')

          buttonToRemind.onclick = (e) => {
            e.preventDefault()

            let date = dateInput.value
            let time = timeInput.value

            function getPermissionNotification() {
               Notification.requestPermission()
            }

            if(!("Notification" in window)) {
              alert("Este navegador no soporta las notificaciones")
            } else if (Notification.permission == "granted") {
              new Notification("CHUPALO!")
            } else if (Notification.permission !== "denied") {
              getPermissionNotification()
              if(Notification.permission == "granted") {
                new Notification("CHUPALO!")
              }
            }
            
            displayNote()

            h2Form.textContent = `Registrar Nota`
            timeInput.remove()
            dateInput.remove()
            buttonToRemind.remove()
            containerDate.remove()
            li.setAttribute('class', 'note')
            buttonEdit.setAttribute('class', 'note__list__edit')
            buttonReminder.setAttribute('class', 'note__list__reminder')
            buttonDelete.setAttribute('class', 'note__list__delete')
            buttonSubmitForm.setAttribute('class', 'note__form__submit')

            titleInput.setAttribute('class', 'note__form__input')
            textInput.setAttribute('class', 'note__form__input')
          }
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

  function leapYear(year) {
    if (((year % 4 == 0) && (year % 100 != 0 )) || (year % 400 == 0)){
      return true
    } else {
      return false
    }
  }  
  
})()
