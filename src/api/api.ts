import { User } from "../store/Store";

const BASE_URL: string = 'https://api.github.com/users';
const PER_PAGE: number = 20;

export const fetchUsers = async (since: string): Promise<Array<User>> => {
    const response = await fetch(`${BASE_URL}?per_page=${PER_PAGE}&since=${since}`, {});
    return response.json();
}