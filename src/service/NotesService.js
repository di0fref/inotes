import http from "./http-common";

class NotesService {
    getAll() {
        return http.get("/notes");
    }

    get(id) {
        return http.get(`/notes/${id}`);
    }

    getNotesByCategory(id) {
        return http.get(`/notes/folder/${id}`);
    }

    count() {
        return http.get(`/notes/count`);
    }

    create(data) {
        return http.post("/notes", data);
    }

    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/notes/${id}`);
    }

    getBookMarks() {
        return http.get(`/notes/bookmarks`);
    }

    search(data) {
        return http.post(`/search`, data)
    }

    addRecent(data) {
        return http.post(`/recents`, data);
    }

    getRecent() {
        return http.get(`/recents`);
    }

    trash(id) {
        return http.put(`/notes/trash/${id}`);
    }

    getTrash() {
        return http.get(`/notes/trash`);
    }

    login(data) {
        return http.post(`/users/login`, data);
    }

    validateUser(data){
        return http.post(`/users/validate`, data);
    }
}

export default new NotesService();
