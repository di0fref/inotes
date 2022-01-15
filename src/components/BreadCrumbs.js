import {HiChevronRight, HiUser} from "react-icons/hi";
import {useEffect, useState} from "react";
import FolderService from "../service/FolderService";
import {Person, PersonOutlined} from "@mui/icons-material";

function BreadCrumbs(props) {

    const [breadCrumb, setBreadCrumb] = useState([])
    const [titleSaved, setTitleSaved] = useState(props.titleSaved);

    let p = []

    const getBreadCrumbs = (data) => {
        data.forEach((el, index) => {
            p.push(el.label)
            if (el.parent) {
                getBreadCrumbs(el.parent)
            }
        })
    }
    useEffect(() => {
        if (props.note.id) {
            FolderService.getBread(props.note.folder_id).then((result) => {
                getBreadCrumbs(result)

                p.push("My documents")
                p.reverse()
                p.push(props.title ? props.title : "Untitled")

                setBreadCrumb(p)
            })
        }
    }, [titleSaved, props.note.name])


    return (
        <div className={"ml-4 text-sm mr-2 text-gray-700 dark:text-gray-200"}>
           {breadCrumb.join(" / ")}
        </div>

    )
}

export default BreadCrumbs
