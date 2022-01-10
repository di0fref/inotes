import ReactQuill, {Quill} from 'react-quill';
import {useEffect, useRef, useState} from "react";

function QuillEditor(props) {

    const [note, setNote] = useState("")
    const [title, setTitle] = useState(props.note.name || "Untitled")
    const [locked, setLocked] = useState(props.note.locked)
    const [dateModified, setDateModified] = useState(props.note.updated_at)
    const [deleted, setDeleted] = useState(props.note.deleted);
    const editorRef = useRef(null);

    useEffect(() => {
        if (props.note.id) {
            setNote(JSON.parse(props.note.text))
            setTitle(props.note.name)
            setDateModified(props.note.updated_at)
            setLocked(props.note.locked)
            setDeleted(props.note.deleted)
        }
    }, [props.note.id, props.note.locked, props.note.deleted])

    return (
        <ReactQuill
            theme={"bubble"}
            placeholder="Click here to start writing"
            value={note}
            ref={editorRef}
            bounds={".quill"}
        />
    )
}

export default QuillEditor
