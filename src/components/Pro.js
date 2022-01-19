import useCollapse from 'react-collapsed';
import {useState} from "react";
import {PersonOutline} from "@mui/icons-material";
import {FaChevronDown, FaChevronRight, FaRegFileAlt, FaRegFolder} from "react-icons/fa";


function ProItem(props) {
    const [isExpanded, setExpanded] = useState(false);

    const config = {
        defaultExpanded: false,
        isExpanded: isExpanded
    }

    const {getCollapseProps, getToggleProps} = useCollapse(config);
    const handleOnClick = () => {
        setExpanded(!isExpanded);
    }
    return (
        <>
            <div className={"text-sm py-2 hover:bg-gray-600/20 rounded mb-1"} {...getToggleProps({onClick: handleOnClick})}
                 style={{
                     marginLeft: props.depth * 2,
                 }}>
                <div className={"flex items-center"}>
                    <div className={"mr-2 ml-4"}>
                        {(props.items.type === "folder")
                            ? <FaRegFolder className={"dark:text-slate-400 text-gray-500"}/>
                            : <FaRegFileAlt className={"dark:text-slate-400 text-gray-500"}/>
                        }
                    </div>
                    <div>{props.items.name}</div>
                    <div className={"ml-auto"}>
                        {(props.items.items && props.items.items.length > 0)
                            ? isExpanded
                                ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                                : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                            : null
                        }
                    </div>
                </div>
            </div>
            {(props.items.items) ? (
                <div {...getCollapseProps()}>
                    {props.items.items.map((subItem, index) => {
                        return (
                            <ProItem items={subItem} depth={props.depth + 10}/>
                        )
                    })}
                </div>
            ) : null}
        </>
    )
}

export default function Pro(props) {

    const [isExpanded, setExpanded] = useState(false);
    const {getCollapseProps, getToggleProps} = useCollapse({isExpanded});
    const handleOnClick = () => {
        setExpanded(!isExpanded);
    }

    return (
        <>
            <div className={"text-sm"} {...getToggleProps({onClick: handleOnClick})}>
                <div className={"flex items-center"}>
                    <div><PersonOutline/></div>
                    <div>My documents</div>
                    <div className={"ml-auto"}>
                        {isExpanded
                        ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                        : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>}
                    </div>
                </div>
            </div>
            <div {...getCollapseProps()} className={"ml-6"}>
                {props.treeData.map((subItem, index) => {
                    return <ProItem items={subItem} key={index} depth={0}/>
                })}
            </div>
        </>
    )
}
