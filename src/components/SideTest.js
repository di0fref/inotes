import {useEffect, useState} from "react";
import {
    ArticleOutlined,
    Expand,
    ExpandLess,
    ExpandMore,
    FolderOutlined,
    Person,
    PersonOutline
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function SideItem(props) {

    const [open, setOpen] = useState(false)
    const navigator = useNavigate()
    const clickHandle = (id, type, folder_id) => {
        if (type === "note") {
            navigator(`/folder/${folder_id}/note/${id}`)
        } else {
            setOpen(!open);
            props.folderHandleClick(id)
        }
    }
    return (
        <>
            <button onClick={
                () => {setOpen(!open)
                clickHandle(props.items.id, props.items.type, props.items.folder_id)}
            } className={`w-full px-2`}

            >
                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1
                    ${props.items.type === "note"
                    ? (props.currentNote.id === props.items.id)?"bg-gray-600/10":""
                    : null
                }`}
                     style={{
                         marginLeft: props.depth * 2,
                     }}
                >
                    <span className={"mr-2 ml-4"}>
                        {(props.items.type === "folder")
                            ? <FolderOutlined sx={{width: 18}} className={"dark:text-gray-400 text-gray-700"}/>
                            : <ArticleOutlined sx={{width: 18}} className={"dark:text-gray-400 text-gray-700"}/>
                        }
                    </span>
                    <span className={""}>{props.items.name}</span>
                    <span className={"ml-auto mr-2"}>
                      {(props.items.items && props.items.items.length > 0)
                          ? open ? <ExpandLess className={"dark:text-gray-400 text-gray-700"}/> :
                              <ExpandMore className={"dark:text-gray-400 text-gray-700"}/>
                          : null
                      }
                    </span>
                </div>
            </button>

            {(props.items.items) ? (
                props.items.items.map((subItem, index) => {
                    return (
                        <div key={index} className={`${open ? "block" : "hidden"}`}>
                            <SideItem
                                key={index}
                                items={subItem}
                                depth={props.depth + 12}
                                currentNote={props.currentNote}
                            />
                        </div>
                    )
                })
            ) : null}
        </>
    )
}


export default function SideTest(props) {

    const [tree, setTree] = useState(props.treeData)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    return (
        <div className={`
                z-10
                absolute
                md:static
                transition-all
                ease-on-out
                duration-300
                sidebar
                w-76
                w-3/4_
                h-screen_
                -ml-76
                bg-lb
                md:ml-0
                flex-shrink-0
                px-4_
                py-2
                border-r
                dark:border-gray-700/30 prose`}>
            <div className={"text-gray-300 text-sm"}>
                <button onClick={() => setOpen(!open)} className={"w-full px-2"}>
                    <div className={"flex items-center py-2 hover:bg-gray-600/20 rounded mb-1"}>
                        <span className={"mr-2 ml-4"}>
                            <PersonOutline className={"dark:text-gray-400 text-gray-700"}/>
                        </span>
                        <span className={"font-semibold"}>My documents</span>
                        <span className={"ml-auto mr-2"}>
                          {open
                              ? <ExpandLess className={"dark:text-gray-400 text-gray-700"}/>
                              : <ExpandMore className={"dark:text-gray-400 text-gray-700"}/>
                          }
                    </span>
                    </div>
                </button>
                <div className={`${open ? "block" : "hidden"} ml-8`}>
                    {tree.map((subItem, index) => {
                        return (
                            <SideItem
                                items={subItem}
                                key={index}
                                depth={0}
                                currentNote={props.currentNote}
                            />
                        )
                    })}
                </div>
            </div>
         </div>
    )
}
