import Sidebar from "./Sidebar";
import Content from "./Content";
import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {useNavigate, useParams} from "react-router-dom";
import useUrl from "./hooks/useUrl";
import FolderService from "../service/FolderService";
import Notelist from "./Notelist";

function Main() {

    const [notes, setNotes] = useState([])
    const [currentFolder, setCurrentFolder] = useState({})
    const [currentNote, setCurrentNote] = useState([])
    const [treeData, setTreeData] = useState([])
    const [dropped, setDropped] = useState(false);
    const [bookMarked, setBookMarked] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [titleChanged, setTitleChanged] = useState(false);
    const [folderCreated, setFolderCreated] = useState(false);
    const [locked, setLocked] = useState(false)
    const [trashed, setTrashed] = useState(false)


    const navigator = useNavigate()

    let params = useParams();


    useEffect(() => {

        // console.log("useEffect");
        (async () => {

            let response = await FolderService.tree(0);
            setTreeData(response.data)

            // let bookmarks = await NotesService.getBookMarks();
            // setBookMarks(bookmarks.data);
            //
            // let trashData = await NotesService.getTrash();
            // setTrash(trashData.data);

        })();
    }, [dropped, noteCreated, titleChanged, folderCreated, locked, trashed]);

    useUrl(
        (note_id, folder_id) => {
            noteClicked(note_id);
        },
        [params]
    );

    const setBookmark = () => {
        currentNote.bookmark = currentNote.bookmark ? 0 : 1;
        NotesService.update(currentNote.id, {
            bookmark: currentNote.bookmark
        }).then((result) => {
            setCurrentNote(result.data)
            setBookMarked(!bookMarked)
        })
    }
    const noteClicked = (id) => {
        NotesService.get(id)
            .then((result) => {
                setCurrentNote(result.data);
                /* Insert into recent */
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const titleChangeHandle = (title) => {
        NotesService.update(currentNote.id, {name: title})
            .then((result) => {
                setCurrentNote(result.data)
                setTitleChanged(!titleChanged)
            }).catch((err) => {
            console.log(err);
        })
    }

    const folderHandleClick = (id, name) => {
        setCurrentFolder({
            id: id,
            name: name
        })
    }

    const setLockedHandle = (locked) => {
        console.log(locked);
        NotesService.update(currentNote.id, {
            locked: locked
        }).then((result) => {
            setCurrentNote(result.data)
        })
    }
    return (
        <div className={"wrapper flex w-full h-screen"}>
            <Sidebar trashed={trashed} bookMarked={bookMarked} currentNote={currentNote} treeData={treeData} folderHandleClick={folderHandleClick} key={"sidebar"} folder={currentFolder}/>
            {/*<Notelist notes={notes} key={"note-list"} currentFolder={currentFolder}/>*/}
            <Content titleChangeHandle={titleChangeHandle} setLockedHandle={setLockedHandle} setBookmark={setBookmark} bookMarked={bookMarked} key={"content"} currentFolder={currentFolder} currentNote={currentNote}/>
        </div>
    )
}

export default Main
