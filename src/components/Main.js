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
            }
            if (params.folder && !params.note) {
                folderHandleClick(params.folder)
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
            if (currentFolder.name === "Bookmarks") {
                folderHandleClick("bookmarks")
            }
        })
    }
    const noteClicked = (id) => {
        NotesService.get(id)
            .then((result) => {
                setCurrentNote(result.data);
                // folderHandleClick(result.data.folder_id)
                /* Insert into recent */
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const docChangHandle = () => {
        folderHandleClick(currentFolder.id)
    }
    const titleChangeHandle = (title) => {
        NotesService.update(currentNote.id, {name: title})
            .then((result) => {
                setCurrentNote(result.data)
                setTitleChanged(!titleChanged)
                folderHandleClick(currentFolder.id)
            }).catch((err) => {
            console.log(err);
        })
    }

    const folderHandleClick = (id) => {
        switch (id) {
            case "bookmarks":
                NotesService.getBookMarks().then((result) => {
                    setNotes(result.data)
                    setCurrentFolder({
                        id: 0,
                        name: "Bookmarks"
                    })
                    if (result.data.notes.length) {
                        setCurrentNote(result.data.notes[0])
                    } else {
                        setCurrentNote([])
                    }
                })
                break;
            case "tags":
                setCurrentFolder({
                    id: 0,
                    name: "Tags"
                })
                // if (result.data.notes.length) {
                //     setCurrentNote(result.data.notes[0])
                // } else {
                //     setCurrentNote([])
                // }
                break;
            case "recent":
                setCurrentFolder({
                    id: 0,
                    name: "Recent"
                })
                // if(result.data.notes.length) {
                //     setCurrentNote(result.data.notes[0])
                // }
                // else {
                //     setCurrentNote([])
                // }
                break;
            case "docs":
            case 0:
                NotesService.getNotesByCategory(0).then((result) => {
                    setNotes(result.data.notes)
                    setCurrentFolder({
                        id: 0,
                        name: "Documents"
                    })
                    if (result.data.notes.length) {
                        setCurrentNote(result.data.notes[0])
                    } else {
                        setCurrentNote([])
                    }
                })
                break;
            default:
                NotesService.getNotesByCategory(id).then((result) => {
                    setNotes(result.data.notes)
                    setCurrentFolder(result.data.folder)
                    if (result.data.notes.length) {
                        setCurrentNote(result.data.notes[0])
                    } else {
                        setCurrentNote([])
                    }
                })
                break;
        }
    }

    const setLockedHandle = (locked) => {
        NotesService.update(currentNote.id, {
            locked: locked
        }).then((result) => {
            setCurrentNote(result.data)
            setLocked(!locked)
            folderHandleClick(currentFolder.id)
        })
    }

    const droppedHandler = (dropResultID, itemID) => {
        setDropped(!dropped)
        folderHandleClick(dropResultID)
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
            <SideTest droppedHandler={droppedHandler} noteCreateHandle={noteCreateHandle} trashed={trashed} bookMarked={bookMarked} currentNote={currentNote} treeData={treeData} folderHandleClick={folderHandleClick} key={"sidebar"} folder={currentFolder}/>
            <Notelist droppedHandler={droppedHandler} noteCreateHandle={noteCreateHandle} noteClicked={noteClicked} currentFolder={currentFolder} notes={notes} currentNote={currentNote}/>
            <Content docChangHandle={docChangHandle} noteCreateHandle={noteCreateHandle} titleChangeHandle={titleChangeHandle} setLockedHandle={setLockedHandle} setBookmark={setBookmark} bookMarked={bookMarked} key={"content"} currentFolder={currentFolder} currentNote={currentNote}/>
        </div>
    )
}

export default Main
