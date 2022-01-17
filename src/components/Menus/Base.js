// import {Add, Article, ArticleOutlined, ExpandMore, Folder, FolderOutlined} from "@mui/icons-material";
// import {ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import {FaPlus, FaRegFileAlt, FaRegFolder} from "react-icons/fa";
import {FaChevronDown} from "react-icons/fa";
import {Menu} from '@headlessui/react'

export default function MenuBase(props) {


    return (
        <div className={"mt-3 mb-3 px-4"}>
            <Menu as="div" className="relative inline-block text-left w-full">
                {/*<div>*/}
                <Menu.Button
                    className={"inline-flex justify-start items-center bg-blue-500 hover:bg-blue-600 w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none "}
                >
                    <FaPlus className={"mr-3 "}/>
                    Options
                    <FaChevronDown
                        className="ml-2 -mr-1 text-violet-200 hover:text-violet-100 ml-auto w-3 h-3"
                        aria-hidden="true"
                    />
                </Menu.Button>
                <Menu.Items className={"bg-white text-slate-800 dark:bg-gray-900 absolute left-0 w-56 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                    <div className="px-1_ py-1">
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    className={`${
                                        active ? 'dark:bg-gray-800 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                    } group flex items-center w-full px-2 py-2 text-sm`}
                                >
                                    <FaRegFileAlt className={"ml-3 mr-4"}/>
                                    Document
                                </button>
                            )}

                        < /Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    className={`${
                                        active ? 'dark:bg-gray-800 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                    } group flex rounded-md_ items-center w-full px-2 py-2 text-sm`}
                                >
                                    <FaRegFolder className={"ml-3 mr-4"}/>
                                    Folder
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    )
}
