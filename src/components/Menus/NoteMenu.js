import {useEffect, useState} from "react";
import {FaChevronDown, FaEdit, FaFilePdf, FaShare, FaTrash} from "react-icons/fa";
import {Menu} from '@headlessui/react'
import Switch from "../Switch";

function NoteMenu(props) {

    const _action = (e) => {

    }
    useEffect(() => {
    }, [props.currentNote.locked])

    const lockHandle = (locked) => {
        props.setLockedHandle(props.currentNote.locked?0:1)
    }

    const data = [
        {
            title: "Download as PDF",
            icon: <FaFilePdf/>,
            action: () => _action()
        },
        {
            title: "Protect editing",
            icon: <FaEdit/>,
            action: () => lockHandle(),
            secondary: {
                item: <Switch handle={lockHandle} text={"Protect editing"} checked={props.currentNote.locked}/>
            }
        },
        {
            title: "Share document",
            icon: <FaShare/>,
            action: () => _action()
        },
        {
            title: "Move to trash",
            icon: <FaTrash/>,
            action: () => _action()
        },
    ]

    return (
        <>
            <div className={"mt-3 mb-3 px-4"}>
                <Menu as="div" className="relative inline-block text-left w-full">
                    <Menu.Button
                        className={"inline-flex justify-start items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none "}>
                        <div>Options</div>
                        <FaChevronDown
                            className="ml-2 -mr-1 text-violet-200 hover:text-violet-100  w-3 h-3"
                            aria-hidden="true"/>
                    </Menu.Button>

                    <Menu.Items className={"z-10 dark:highlight-white_ bg-white text-slate-800 dark:bg-slate-700 absolute right-0 _md:left-72 w-72 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                        {data.map((item, index) => {
                            return (
                                <div className="py-1" key={index}>
                                    <Menu.Item disabled={item.secondary?true:false} >
                                        {({active}) => (
                                            <div
                                                onClick={item.action}
                                                className={`${
                                                    active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                } group flex items-center w-full px-2 py-2 text-sm`}>
                                                <span className={"ml-3 mr-4"}>{item.icon}</span>
                                                <span>{item.title}</span>
                                                {item.secondary
                                                    ? <span className={"ml-auto mr-2"}>{item.secondary.item}</span>
                                                    :""
                                                }
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

export default NoteMenu
