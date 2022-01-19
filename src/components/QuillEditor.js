import ReactQuill, {Quill} from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {TextareaAutosize, Tooltip} from "@mui/material";
import {Alarm, Lock, LockOutlined} from "@mui/icons-material";
import Moment from "react-moment";
import {FaClock, FaLock, FaRegClock} from "react-icons/fa";

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
        console.log("saveToBackend")
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
    const changeHandler = (content, delta, source, editor) => {
        setValue(content)
        if(source==="user"){
            const timer = setTimeout(() => saveToBackend(), 1000);
            return () => clearTimeout(timer);
        }
    }

    const saveTitle = () => {
        console.log("saveTitle")

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

    return (
        <div className={"ml-2"}>
            <div className={"mx-3 mt-6 mb-2"}>
                <div className={"flex items-center justify-start"}>
                    <div className={"text-slate-500"}><FaRegClock/></div>
                    <div className={"ml-2 text-slate-500 text-sm"}>Updated <Moment fromNow={note.updated_at}/></div>
                    {locked
                        ?<Tooltip title={"Editing protected"}><div className={"text-opacity-40 text-slate-700 dark:text-slate-200 dark:text-opacity-40"}><FaLock className={"ml-2"}/></div></Tooltip>
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
                onChange={changeHandler}/>
        </div>
    )
}

export default QuillEditor
