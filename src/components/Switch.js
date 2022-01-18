import {useEffect, useState} from "react";
import {Switch as S} from '@headlessui/react'

export default function Switch(props){
    const [enabled, setEnabled] = useState(false)


    useEffect(() => {
        setEnabled(props.checked)
    }, [props.checked])
    return (
        <S
            checked={enabled}
            onChange={() => {
                props.handle()
            }}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-500'
            } relative inline-flex items-center h-6 rounded-full w-11`}
        >
            <span className="sr-only">{props.text}</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
        </S>
    )
}
