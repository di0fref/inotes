import Sidebar from "./Sidebar";
import Notelist from "./Notelist";
import Content from "./Content";
import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {useNavigate, useParams} from "react-router-dom";
import useUrl from "./hooks/useUrl";
import FolderService from "../service/FolderService";

function Main() {

    const [notes, setNotes] = useState([])
    const [currentFolder, setCurrentFolder] = useState({})
    const [currentNote, setCurrentNote] = useState([])
    const[treeData, setTreeData] = useState([])
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
        (type, id) => {
            noteClicked(type, id);
        },
        [params]
    );

    const noteClicked = (type, id) => {
        NotesService.get(id)
            .then((result) => {
                setCurrentNote(result.data);
                /* Insert into recent */
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const folderHandleClick = (id, name) => {
        NotesService.getNotesByCategory(id).then((result) => {
            setNotes(result.data)
            setCurrentFolder({
                name: name,
                id: id
            })
        })
    }

    return (
        <div className={"wrapper flex w-full h-screen dark:bg-gray-800"}>
            <Sidebar treeData={treeData} folderHandleClick={folderHandleClick} key={"sidebar"} folder={currentFolder}/>
            {/*<Notelist notes={notes} key={"note-list"} currentFolder={currentFolder}/>*/}
            <Content key={"content"} currentFolder={currentFolder} currentNote={currentNote}/>
        </div>
    )
}

export default Main
