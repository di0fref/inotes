import ReactQuill, {Quill} from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";

function QuillEditor(props) {

    const [note, setNote] = useState([])
    const [title, setTitle] = useState(props.note.name || "Untitled")
    const [locked, setLocked] = useState(props.note.locked)
    const [dateModified, setDateModified] = useState(props.note.updated_at)
    const [deleted, setDeleted] = useState(props.note.deleted);
    const [value, setValue] = useState(null)
    const editorRef = useRef(null);

    const saveToBackend = () => {
        if (note.id) {
            const data = {
                text: JSON.stringify(editorRef.current.editor.getContents()),
                name: title,
            }
            NotesService.update(note.id, data)
                .then((result) => {

                }).catch((err) => {
                    console.log(err);
            });
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => saveToBackend(), 1000);
        return () => clearTimeout(timer);
    }, [value])

    useEffect(() => {
        if (props.note.id) {
            setValue(JSON.parse(props.note.text))
            setNote(props.note)
            setTitle(props.note.name)
            setDateModified(props.note.updated_at)
            setLocked(props.note.locked)
            setDeleted(props.note.deleted)
        }
    }, [props.note.id, props.note.locked, props.note.deleted])

    return (
        <div className={""}>
            <ReactQuill
                theme={"bubble"}
                placeholder="Click here to start writing"
                value={value}
                ref={editorRef}
                bounds={".quill"}
                onChange={setValue}/>
        </div>
    )
}

export default QuillEditor
