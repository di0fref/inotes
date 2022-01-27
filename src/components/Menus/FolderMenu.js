import {Menu} from "@headlessui/react";
import {FaChevronDown, FaEllipsisV, FaFileAlt, FaRegFolder} from "react-icons/fa";

export default function FolderMenu(props) {

    const data = [
        {
            title: "Create document",
            action: (e) => _action(e),
            icon: <FaFileAlt/>
        },
        {
            title: "Create folder",
            action: null,
            icon: <FaRegFolder/>
        },
    ]

    const _action = (e) => {
        e.preventDefault();
        e.stopPropagation()
        props.noteCreateHandle(props.folder)
    }
    return (
        <>
            <div className={"flex items-center ml-auto mr-2"}>
                <Menu as="div" className="relative inline-block text-left w-full">
                    <Menu.Button className={"h-5 w-5 text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center justify-center ml-auto hover:bg-blue-600 rounded rounded-sm "}>
                        <FaEllipsisV className={"h-5 w-5 p-1"}/>
                    </Menu.Button>
                    <Menu.Items className={"z-10 bg-white text-slate-800 dark:bg-slate-700 absolute right-0 w-60 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                        {data.map((item, index) => {
                            return (
                                <div className="py-1" key={index}>
                                    <Menu.Item>
                                        {({active}) => (
                                            <div
                                                onClick={(e) => item.action(e)}
                                                className={`${
                                                    active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                } group flex items-center w-full px-2 py-2 text-sm cursor-pointer`}>
                                                <span className={"ml-3 mr-4"}>{item.icon}</span>
                                                <span>{item.title}</span>
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                            )
                        })}
                    </Menu.Items>
                </Menu>
            </div>
        </>
    )
}
