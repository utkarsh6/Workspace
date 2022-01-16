console.log("hello")
import NotesAPI from "./NoteAPI.js";
import NoteAPI from "./NoteAPI.js";
import NotesView from "./NoteView.js";

const app= document.getElementById("app");
const view= new NoteView(app,{
    onNoteSelect(){
        console.log("note has been selected");
    }
})
// NotesAPI.SaveNotes({
//     id: 952860,
//     title: "New NotesAPI",
//     body: "I am new notes"
// })
// console.log(NoteAPI.getAllNotes());

// console.log(NoteAPI.DeleteNotes(952860));