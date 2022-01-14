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
        <div className={"ml-4 text-muted text-sm"}>
            {breadCrumb.join(" / ")}

            {/*<div className={"flex truncate"}>*/}
            {/*    <div className={"flex items-center"}>*/}
            {/*        <span><PersonOutlined className={"mr-2"}/></span>*/}
            {/*        <span>My documents</span>*/}
            {/*    </div>*/}
            {/*    {breadCrumb.map((item, index) => (*/}
            {/*        <div className={"flex items-center"} key={`${item}-b`}>*/}
            {/*            <span className={"mx-2"}><HiChevronRight/></span>*/}
            {/*            <span>{item}</span>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*    <div className={"flex items-center"}>*/}
            {/*        <span className={"mx-2"}><HiChevronRight/></span>*/}
            {/*        <span>{props.note.name ? props.note.name : "Untitled"}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>

    )
}

export default BreadCrumbs
