import ReactQuill, {Quill} from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {TextareaAutosize, Tooltip} from "@mui/material";
import {Alarm, Lock, LockOutlined} from "@mui/icons-material";
import Moment from "react-moment";

function QuillEditor(props) {

    const [note, setNote] = useState([])
    const [title, setTitle] = useState(props.note.name || "Untitled")
    const [locked, setLocked] = useState(props.note.locked)
    const [dateModified, setDateModified] = useState(props.note.updated_at)
    const [deleted, setDeleted] = useState(props.note.deleted);
    const [value, setValue] = useState(null)
    const editorRef = useRef(null);

    const isMounted = useRef(null)

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

    const saveTitle = () => {
        /* Notify dispatcher of note title changed */
        props.titleChangeHandle(title)
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

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


    useEffect(() => {
        const timer = setTimeout(() => saveToBackend(), 1000);
        return () => clearTimeout(timer);
    }, [value])


    return (
        <div className={"ml-2"}>
            <div className={"mx-3 mt-6 mb-2"}>
                <div className={"flex items-center justify-start"}>
                    <div><Alarm/></div>
                    <div className={"ml-2"}>Updated <Moment fromNow={note.updated_at}/></div>
                    {locked
                        ?<Tooltip title={"Editing protected"}><div><LockOutlined className={"text-red-500 ml-2"}/></div></Tooltip>
                        :null}
                </div>
            </div>
            <TextareaAutosize
                onBlur={saveTitle}
                readOnly={locked || deleted ? true : false}
                maxLength="100"
                onChange={updateTitle}
                placeholder={"Give your document a title"}
                value={title || ""}
                id={"title-input"}
                className={"font-extrabold tracking-tight dark:text-white bg-transparent px-3 w-full text-5xl  border-0 focus:outline-none focus:ring-0"}
            />
            <ReactQuill
                readOnly={locked || deleted ? true : false}
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
