import {useEffect, useState} from "react";
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';

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
    }

    return (
        <div className="
        flex-shrink-0
        absolute_
        md:relative_
        w-72
        w-full_
        border-r
        dark:border-gray-700
        h-full
        text-gray-900">
            <div className={"p-3 flex items-center justify-center dark:bg-gray-700"}>
                <div>{props.currentFolder.name}</div>
            </div>
            <div className={"overflow-y-auto h-full"}>
                {notes ?
                    notes.map((note, index) => {
                        return (
                            <Link to={`/notes/${note.id}`}
                                  key={index}
                                  onClick={() => noteClicked(note.id)}>
                                <div className={`hover:bg-gray-100 note-card flex justify-center ${(activeNote === note.id) ? "bg-gray-200 selected" : ""}`}>
                                    <div className="flex flex-col md:flex-row w-full border-t ">
                                        <div className="p-4 flex flex-col justify-start">
                                            <h5 className="text-gray-900 text-l font-semibold mb-2">Card title</h5>
                                            <p className="text-gray-700 text-base mb-4">
                                                {getIngress(note.text)}
                                            </p>
                                            <p className="text-gray-600 text-xs">Last
                                                updated <Moment fromNow ago>{note.updated_at}</Moment> ago</p>
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
