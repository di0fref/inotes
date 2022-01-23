import {useEffect, useState} from "react";
import Moment from 'react-moment';
import {Link, useNavigate} from "react-router-dom";
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {Search} from "@mui/icons-material";
import {FaBars, FaHamburger, FaLock, FaRegEdit, FaTrash} from "react-icons/fa";
import {Tooltip} from "@mui/material";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "./Constants";
import log from "tailwindcss/lib/util/log";
import NotesService from "../service/NotesService";

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

function NoteCard(props) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: props.note,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                NotesService.update(item.id,{
                    folder_id: dropResult.id
                }).then((result) => {
                    props.droppedHandler(dropResult.id, item.id)
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const attacheRef = (el) => {
        drag(el)
    }
    const momentConfig = {
        lastDay: '[Yesterday at] HH:MM',
        sameDay: '[Today at] HH:MM',
        nextDay: '[Tomorrow at] HH:MM',
        lastWeek: '[last] dddd [at] HH:MM',
        nextWeek: 'dddd [at] HH:MM',
        sameElse: "YYYY-MM-DD",
    }

    const strip = (text) => {
        return text.replace(/(<([^>]+)>)/gi, "");
    }
    const getIngress = (text) => {

        if (typeof text === "string") {
            let json = JSON.parse(text);
            let converter = new QuillDeltaToHtmlConverter(json.ops, {});
            return strip(converter.convert().trunc(95));
        }
        return "..."
    };
    const [note, setNote] = useState([])

    return (
        <button role="card" ref={attacheRef} className={"text-left border-t_ dark:border-gray-700/90 w-full border-slate-100"}
                onClick={() => props.noteClicked(props.note.id)}>
            <div className={"my-2"}/>
            <div className={`mx-3 rounded hover:bg-slate-100 dark:hover:bg-gray-700/20 note-card flex justify-center _mb-1 ${(props.currentNote.id === props.note.id) ? "dark:bg-gray-700/30 bg-slate-100" : ""}`}>
                <div className="border-b dark:border-gray-700/20 flex flex-col w-full md:flex-row">
                    <div className="flex flex-col justify-start p-4">
                        <div className={"flex items-center justify-between mb-2"}>
                            <p className="font-semibold text-base dark:text-gray-300 text-slate-800">{props.note.name ? props.note.name : "Untitled"}</p>
                            <p className={"text-opacity-40 text-slate-700 dark:text-slate-200 dark:text-opacity-40"}>{props.note.locked ?
                                <FaLock className={"h-3 w-3"}/> : ""}</p>
                        </div>
                        <p className="mb-4 text-s ">
                            <span className={"dark:text-sky-500 text-sky-600"}>
                                <Moment calendar={momentConfig}>{props.note.updated_at}</Moment>
                            </span>
                            <span className={"dark:text-gray-300 break-words text-slate-800"}> {getIngress(props.note.text)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </button>
    )
}

function Notelist(props) {

    const navigator = useNavigate()

    const [notes, setNotes] = useState([])
    const [activeNote, setActiveNote] = useState(null)

    useEffect(() => {
        setNotes(props.notes)
    }, [props.notes])


    const noteClicked = (id) => {
        setActiveNote(id)
        props.noteClicked(id)
        navigator(`/folder/${props.currentFolder.id || 0}/note/${id}`)
    }
    return (
        <div className="
            z-10
            bg-white
            dark:bg-gray-900
            flex-shrink-0
            dark:text-gray-200
            border-r
            md:w-80
            w-full
            dark:border-gray-800
            note-list
             absolute
             md:static
            ">
            <div className={"flex items-center h-14 justify-between border-b px-4 dark:border-gray-700/20 border-slate-100"}>
                <div className={"flex-grow"}>
                    <input placeholder={"Search"} className=" w-full rounded rounded-lg dark:bg-gray-800 px-4 h-8 focus:outline-none focus:ring-1 focus:ring-gray-700"/>
                </div>
                <Tooltip title={"Create document"}>
                    <button className={"ml-4 dark:text-gray-400 text-slate-500 hover:dark:text-gray-200"} onClick={props.noteCreateHandle}>
                        <FaRegEdit/>
                    </button>
                </Tooltip>
            </div>
            <div className={"mb-2 mt-2 flex items-center"}>
                {/*<div className={"ml-2"}><FaBars/></div>*/}
                <div className={"font-semibold dark:text-gray-300 text-slate-800 mx-auto"}>
                    {props.currentFolder.name}
                </div>
            </div>
            <div className={"overflow-y-auto list"}>
                {notes ?
                    notes.map((note, index) => {
                        return (
                            <NoteCard
                                key={index}
                                noteClicked={noteClicked}
                                note={note}
                                currentNote={props.currentNote}
                                droppedHandler={props.droppedHandler}
                            />
                        )
                    })
                    : null}
            </div>
        </div>
    )
}

export default Notelist
