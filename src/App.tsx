import { Layout } from "./layouts/Layout";
import { UserList } from "./components/UserList";
import { Toolbar } from "./components/Toobar";

export const App = () => {
    return (
            <Layout>
                <UserList />
                <Toolbar />
            </Layout>
    )
}