import {useEffect} from "react"
import {useParams} from "react-router-dom";

const useUrl = callback => {
    let params = useParams()
    useEffect(() => {
        if (params.note_id && params.folder_id) {
            callback(params.note_id, params.folder_id);
        }
    }, [params])

}

export default useUrl
