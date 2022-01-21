import {useEffect, useState} from "react";
import Moment from 'react-moment';
import {Link, useNavigate} from "react-router-dom";
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {Search} from "@mui/icons-material";

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

function Notelist(props) {

    const momentConfig = {
        lastDay: '[Yesterday at] HH:MM',
        sameDay: '[Today at] HH:MM',
        nextDay: '[Tomorrow at] HH:MM',
        lastWeek: '[last] dddd [at] HH:MM',
        nextWeek: 'dddd [at] HH:MM',
        sameElse: "YYYY-MM-DD",
    }
    const navigator = useNavigate()

    const [notes, setNotes] = useState([])
    const [activeNote, setActiveNote] = useState(null)

    useEffect(() => {
        setNotes(props.notes)
    }, [props.notes, props.currentFolder.name])


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

    const noteClicked = (id) => {
        setActiveNote(id)
        props.noteClicked(id)
        navigator(`/folder/${props.currentFolder.id}/note/${id}`)
    }

    return (
        <div className="bg-white dark:bg-gray-900 flex-shrink-0 _dark:bg-gray-800 dark:text-gray-200 border-r w-80 dark:border-gray-800 note-list">
            {/*<div className={"p-2 mt-2"}>*/}

            {/*    <button type="button" className="flex w-full items-center text-left space-x-3 px-4 h-10 bg-white ring-1 ring-gray-900/40 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-gray-400 dark:bg-gray-600 dark:ring-0 dark:text-gray-300 dark:highlight-white dark:hover:bg-gray-700">*/}
            {/*        <Search sx={{height: 20, width: 20}}/>*/}
            {/*        <span className="flex-auto text-sm text-gray-200">Quick search...</span><kbd className="font-sans font-semibold dark:text-gray-500"><abbr title="Command" className="no-underline text-gray-300 dark:text-gray-500">⌘</abbr> K</kbd>*/}
            {/*    </button>*/}

            {/*</div>*/}
            <div className={"mb-4 mt-1 flex items-center justify-center"}>
                <div className={"font-semibold dark:text-gray-300 text-slate-800"}>{props.currentFolder.name}</div>
            </div>
            <div className={"overflow-y-auto list"}>
                {notes ?
                    notes.map((note, index) => {
                        return (
                            <button className={"text-left border-t dark:border-gray-700/20 mx-3 border-slate-100"}
                                    key={index}
                                    onClick={() => noteClicked(note.id)}>
                                <div className={`rounded hover:bg-slate-100 dark:hover:bg-gray-700/20 note-card flex justify-center ${(props.currentNote.id === note.id) ? "dark:bg-gray-700/30 bg-slate-100" : ""}`}>
                                    <div className="flex flex-col w-full md:flex-row">
                                        <div className="flex flex-col justify-start p-4">
                                            <h5 className="mb-2 font-semibold text-base dark:text-gray-300 text-slate-800">{note.name ? note.name : "Untitled"}</h5>
                                            <p className="mb-4 text-s ">
                                                <span className={"text-sky-500"}>
                                                    <Moment calendar={momentConfig}>{note.updated_at}</Moment>
                                                </span>
                                                <span className={"dark:text-gray-300 break-words text-slate-800"}> {getIngress(note.text)}</span>
                                            </p>
                                            {/*<p className="text-xs">Updated <Moment fromNow ago>{note.updated_at}</Moment> ago*/}
                                            {/*</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )
                    })
                    : null}
            </div>
        </div>
    )
}

export default Notelist
