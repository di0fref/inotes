import {FaPlus, FaRegFileAlt, FaRegFolder} from "react-icons/fa";
import {FaChevronDown} from "react-icons/fa";
import {Menu} from '@headlessui/react'

export default function NewMenu(props) {

    const newDocumentClickHandle = () => {
        props.noteCreateHandle()
    }

    const newFolderClickHandle = () => {

    }
    const data = [
        {
            title: "Document",
            icon: <FaRegFileAlt className={"w-4 h-4"}/>,
            action: () => newDocumentClickHandle()
        },
        {
            title: "Folder",
            icon: <FaRegFolder className={"w-4 h-4"}/>,
            action: () => newFolderClickHandle()
        },
    ]

    return (
        <div className={"mt-3 mb-3 px-4"}>
            <Menu as="div" className="relative inline-block text-left w-full">
                <Menu.Button
                    className={"inline-flex justify-start items-center bg-blue-500 hover:bg-blue-600 w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none "}>
                    <FaPlus className={"mr-3 "}/>
                    New
                    <FaChevronDown
                        className="ml-2 -mr-1 text-violet-200 hover:text-violet-100 ml-auto w-3 h-3"
                        aria-hidden="true"/>
                </Menu.Button>
                <Menu.Items className={"dark:highlight-white_ bg-white text-slate-800 dark:bg-slate-700 absolute right-0 _md:left-72 w-72 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                    {data.map((item, index) => {
                        return <div className="px-1_ py-1" key={index}>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        onClick={item.action}
                                        className={`${
                                            active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                        } group flex items-center w-full px-2 py-2 text-sm`}>
                                        <span className={"ml-3 mr-4"}>{item.icon}</span>
                                        {item.title}
                                    </button>
                                )}
                            < /Menu.Item>
                        </div>
                    })}
                </Menu.Items>
            </Menu>
        </div>
    )
}
