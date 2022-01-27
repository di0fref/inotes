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
    const [docChanged, setDocChanged] = useState(false);


    const navigator = useNavigate()

    let params = useParams();

    useEffect(() => {
        (async () => {
            let response = await FolderService.tree(0);
            setTreeData(response.data)
        })();
    }, [dropped, noteCreated, titleChanged, folderCreated, locked, trashed]);

    useUrl(
        (params) => {
            if (params.folder && params.note) {
                noteClicked(params.note);
                folderClickedHandle(params.folder)
            }
            if (params.folder && !params.note) {
                folderClickedHandle(params.folder)
            }
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
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const docChangHandle = () => {
        folderClickedHandle(currentFolder.id)
        /* Insert into recent */
    }

    const titleChangeHandle = (title) => {
        NotesService.update(currentNote.id, {name: title})
            .then((result) => {
                setCurrentNote(result.data)
                setTitleChanged(!titleChanged)
                folderClickedHandle(currentFolder.id)
            }).catch((err) => {
            console.log(err);
        })
    }

    const moveToTrashHandler = (id) => {
        NotesService.update(id,{
            deleted: 1
        }).then((result) =>{
            setCurrentNote([])
            setTrashed(!trashed)
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

    const droppedHandler = (dropResultID, itemID) => {
        navigator("/folder/"+dropResultID+"/note/"+itemID)
        setDropped(!dropped)
    }

    const noteCreateHandle = (folder_id) => {
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

    const folderClickedHandle = (id) => {
        NotesService.getNotesByCategory(id).then((result) => {
            setNotes(result.data.notes)
        })
        setCurrentFolder({
            id: id
        })
    }
    return (
        <div className={"wrapper flex w-full h-screen"}>
            <SideTest folderClickedHandle={folderClickedHandle} droppedHandler={droppedHandler} noteCreateHandle={noteCreateHandle} trashed={trashed} bookMarked={bookMarked} currentNote={currentNote} treeData={treeData}  key={"sidebar"} currentFolder={currentFolder}/>
            <Notelist droppedHandler={droppedHandler} noteCreateHandle={noteCreateHandle} noteClicked={noteClicked} currentFolder={currentFolder} notes={notes} currentNote={currentNote}/>
            <Content moveToTrashHandler={moveToTrashHandler} docChangHandle={docChangHandle} noteCreateHandle={noteCreateHandle} titleChangeHandle={titleChangeHandle} setLockedHandle={setLockedHandle} setBookmark={setBookmark} bookMarked={bookMarked} key={"content"} currentFolder={currentFolder} currentNote={currentNote}/>
        </div>
    )
}

export default Main
