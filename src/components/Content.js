import QuillEditor from "./QuillEditor";

function Content(props) {
    return (
        <div className={"content h-full flex-grow "}>
            <div className={"flex flex-col bg-gray-200 dark:bg-gray-700"}>
                <div className={"p-3 flex items-center justify-between"}>
                    <div>Bread crumb</div>
                    <div>Note menu</div>
                </div>
            </div>

            <div className={"h-full flex justify-center editor overflow-y-auto bg-gray-200 dark:bg-gray-700"}>
                <div className={"w-full h-full lg:w-160 dark:text-gray-300/90"}>
                    <QuillEditor note={props.currentNote}/>
                </div>
            </div>
        </div>
    )
}

export default Content
