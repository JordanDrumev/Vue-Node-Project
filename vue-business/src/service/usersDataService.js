import http from "../http.common";

class UsersDataService {
    Login(data) {
        return http.post(`/users`, data);
    }
}

export default new UsersDataService();