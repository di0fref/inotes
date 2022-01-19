import {useEffect, useState} from "react";
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {Search} from "@mui/icons-material";

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

function Notelist(props) {

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
    }

    return (
        <div className="flex-shrink-0 dark:bg-gray-800 dark:text-gray-200 border-r w-80 dark:border-gray-700 note-list">
            <div className={"p-2 mt-2"}>
                <button type="button" className="flex w-full items-center text-left space-x-3 px-4 h-10 bg-white ring-1 ring-gray-900/40 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-gray-400 dark:bg-gray-600 dark:ring-0 dark:text-gray-300 dark:highlight-white dark:hover:bg-gray-700">
                    <Search sx={{height: 20, width: 20}}/>
                    <span className="flex-auto text-sm text-gray-200">Quick search...</span><kbd className="font-sans font-semibold dark:text-gray-500"><abbr title="Command" className="no-underline text-gray-300 dark:text-gray-500">⌘</abbr> K</kbd>
                </button>
            </div>
            <div className={"mb-4 mt-1 flex items-center justify-center dark:bg-gray-800"}>
                <div className={"font-semibold"}>Customers</div>
            </div>
            <div className={"overflow-y-auto list"}>
                {notes ?
                    notes.map((note, index) => {
                        return (
                            <Link to={`#`}
                                  key={index}
                                  onClick={() => noteClicked(note.id)}>
                                <div className={`hover:bg-gray-700/30 note-card flex justify-center ${(activeNote === note.id) ? "dark:bg-gray-700/50 _selected" : ""}`}>
                                    <div className="flex flex-col w-full border-t dark:border-gray-700/60 md:flex-row ">
                                        <div className="flex flex-col justify-start p-4">
                                            <h5 className="mb-2 font-semibold text-base">{note.name ? note.name : "Untitled"}</h5>
                                            {/*<p className="mb-4 text-sm ">*/}
                                            {/*    {getIngress(note.text)}*/}
                                            {/*</p>*/}
                                            <p className="text-xs">Updated <Moment fromNow ago>{note.updated_at}</Moment> ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    : null}
            </div>
        </div>
    )
}

export default Notelist
