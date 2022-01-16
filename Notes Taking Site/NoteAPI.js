export default class NotesAPI{
    //methods to access nodes
    static getAllNotes(){
        // || or
        const notes=JSON.parse(localStorage.getItem("notesapp-notes")||"[]");
        return notes.sort((a,b)=>{
            // sort algorithm 
            return new Date(a.updated)> new Date(b.updated) ? -1:1;

        });

    }
    static SaveNotes(noteToSave){
        //enter new notse+save
        const notes=NotesAPI.getAllNotes();
        const existing=notes.find(notes =>noteToSave.id== noteToSave.id)
        if(existing){
            //edit
            existing.title = noteToSave.title;
            existing.body= noteToSave.body;
            existing.updated=new Date().toISOString();
            


        }
        else{ 
            //insert 
            noteToSave.id=Math.floor(Math.random()*1000000);
            noteToSave.updated= new Date().toISOString();
    
    
            notes.push(noteToSave);

        }
       
        // notesapp-notes is key and json.stringify is to overwrite the value
        localStorage.setItem("notesapp-notes",JSON.stringify(notes));

        
    }
    static DeleteNotes(id){
        const notes=NotesAPI.getAllNotes();
        const newNotes=notes.filter(note =>note.id!= id);
        localStorage.setItem("notesapp-notes",JSON.stringify(newNotes));

        
    }

}