import { makeAutoObservable } from "mobx";
import { fetchUsers } from "../api/api";

export type User = {
    id: string,
    login: string,
    avatar_url: string,
    html_url: string
};

type SORT_FIELDS = "id" | "login";
type SORT_TYPES = "ASC" | "DESC";

type ApplicationState = {
    users: Array<User>,
    loading: boolean,
    since: string,
    sort: SORT_TYPES,
    sort_field: SORT_FIELDS,
    fetchUsers: () => {},
    deleteItem: (id: string) => void,
    editItem: (id: string, newLogin: string) => void,
    setSort: (sort: SORT_TYPES) => void,
    setSortField: (sort_field: SORT_FIELDS) => void
};

const initialState: ApplicationState = {
    users: [],
    loading: false,
    since: "0",
    sort: "ASC",
    sort_field: "id",

    async fetchUsers() {
        this.loading = true;
        try {
          const users: Array<User> = await fetchUsers(this.since);
          this.users = [...this.users, ...users];
          const usersCount: number = this.users.length
          this.since = usersCount ? this.users[usersCount - 1].id: "0";
        } catch (error) {
            console.error("Error while fetching:", error);
        } finally {
            this.loading = false;
        }
    },

    deleteItem(id: string): void {
        this.users = this.users.filter(user => user.id !== id);
    },

    editItem(id: string, newLogin: string) {
        this.users = this.users.map(user => {
            return {
                ...user,
                login: user.id === id ? newLogin: user.login
            }
        })
    },

    setSort(sort: SORT_TYPES) {
        this.sort = sort;
    },

    setSortField(sort_field: SORT_FIELDS) {
        this.sort_field = sort_field;
    }

};

export default makeAutoObservable(initialState);