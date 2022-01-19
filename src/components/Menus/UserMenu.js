import {useEffect, useState} from "react";
import {getAuth, signOut} from "firebase/auth";
import {FaChevronDown, FaCog, FaExclamation, FaSignOutAlt} from "react-icons/fa";
import {Menu} from '@headlessui/react'

function UserMenu() {

    const auth = getAuth();

    useEffect(() => {

    }, [])

    const signOutFirebase = () => {
        signOut(auth).then(() => {
            console.log("Signed out Firebase");
        }).catch((error) => {
            console.log("ERROR::Signed out Firebase");
        });
    }

    const user = auth.currentUser

    const data = [
        {
            title: "Settings",
            icon: <FaCog/>,
            action: true
        },
        {
            title: "Help",
            icon: <FaExclamation/>,
            action: true
        },
        {
            title: "Sign out",
            icon: <FaSignOutAlt/>,
            action: true
        },
    ];

    return (
        <div className={"mb-2"}>
            <Menu as="div" className="relative inline-block text-left w-full">
                <Menu.Button className={"text-slate-500 hover:bg-gray-600/20 dark:hover:bg-gray-700/80 inline-flex justify-start items-center w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none "}>
                    <div className={"flex"}>
                        <div><img src={user.photoURL} alt={"Avatar"} className={"rounded rounded-full h-10 w-10"}/></div>
                        <div className={"ml-3"}>
                            <p className={"text-left font-bold"}>{user.displayName}</p>
                            <p className={"text-left"}>{user.email}</p>
                        </div>
                    </div>
                </Menu.Button>
                <Menu.Items className={"z-10  bg-white text-slate-800 dark:bg-slate-700 absolute right-0 w-60 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
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

export default UserMenu
