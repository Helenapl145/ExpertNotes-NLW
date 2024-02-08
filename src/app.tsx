import { ChangeEvent, useState } from 'react'
import logo from '../src/assets/logoNlw.svg'
import { NoteCard } from './components/note-card'
import { NewNoteCard } from './components/note-new-card'
import { toast } from 'sonner';


interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    
    if(notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    
    return []
  })

  const [search, setSearch] = useState('')


  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDelete(id: string){
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))

    toast.message("Nota apagada com sucesso!")
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
     <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
    
        <img src={logo} alt="Logo da NLW Expert" />

        <form className='w-full '>
          <input 
            type="text" 
            placeholder='Busque as suas notas...'  
            className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none  placeholder:text-slate-600'
            onChange={handleSearch}
          />

        </form>

        <div  className='h-px bg-slate-700'/>

        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
           <NewNoteCard  onNoteCreated={onNoteCreated}/>
           
          {filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} onNoteDelete={onNoteDelete} />
          })}

        </div>
     
     </div>
  
    )
}


