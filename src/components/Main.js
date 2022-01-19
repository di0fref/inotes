import Sidebar from "./Sidebar";
import Content from "./Content";
import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {useNavigate, useParams} from "react-router-dom";
import useUrl from "./hooks/useUrl";
import FolderService from "../service/FolderService";
import Notelist from "./Notelist";
import SideTest from "./SideTest";

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
        (async () => {
            let response = await FolderService.tree(0);
            setTreeData(response.data)
            console.log(response.data)
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
                folderHandleClick(result.data.folder_id)
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

    const folderHandleClick = (id) => {
        setCurrentFolder({
            id: id,
        })

        NotesService.getAll(id).then((result) => {
            setNotes(result.data)
        })
    }

    const setLockedHandle = (locked) => {
        NotesService.update(currentNote.id, {
            locked: locked
        }).then((result) => {
            setCurrentNote(result.data)
            setLocked(!locked)
        })
    }

    const noteCreateHandle = () => {
        NotesService.create({
            folder_id: currentFolder.id || 0,
            name: ""
        }).then((result) => {
            setCurrentNote(result.data)
            setNoteCreated(!noteCreated)
            navigator(`/folder/${currentFolder.id}/note/${result.data.id}`)
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className={"wrapper flex w-full h-screen"}>
            <SideTest noteCreateHandle={noteCreateHandle} trashed={trashed} bookMarked={bookMarked} currentNote={currentNote} treeData={treeData} folderHandleClick={folderHandleClick} key={"sidebar"} folder={currentFolder}/>
            <Content noteCreateHandle={noteCreateHandle} titleChangeHandle={titleChangeHandle} setLockedHandle={setLockedHandle} setBookmark={setBookmark} bookMarked={bookMarked} key={"content"} currentFolder={currentFolder} currentNote={currentNote}/>
        </div>
    )
}

export default Main
