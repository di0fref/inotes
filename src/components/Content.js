import QuillEditor from "./QuillEditor";

function Content(props) {
    return (
        <div className={"content h-full text-gray-900 bg-white dark:text-gray-200 flex-grow"}>
            <div className={"flex flex-col"}>
                <div className={"p-3 flex items-center justify-between dark:bg-gray-700"}>
                    <div>Bread crumb</div>
                    <div>Note menu</div>
                </div>
            </div>

            <div className={"h-full flex justify-center"}>
                <div className={"w-full h-full lg:w-160 "}>
                    <QuillEditor note={props.currentNote}/>
                </div>
            </div>
        </div>
    )
}

export default Content
