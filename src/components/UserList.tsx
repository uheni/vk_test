import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { UserListItem } from "./UserListItem";
import Store from "../store/Store";
import styles from './UserList.module.css';

export const UserList = observer(() => {
    useEffect(() => {
        Store.fetchUsers();
    }, []);

    const sort_field = Store.sort_field;
    const sort = Store.sort;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (!Store.loading && scrollHeight <= scrollTop + clientHeight + 100) {
            Store.fetchUsers();
        }
    };

    const sortedUsers = Store.users.map(a => a).sort((a, b) => {
        const aSortValue = a[sort_field];
        const bSortValue = b[sort_field];
    
        if (aSortValue < bSortValue) {
            return sort === "ASC" ? -1 : 1;
        }
        if (aSortValue > bSortValue) {
            return sort === "ASC" ? 1 : -1;
        }
        return 0;
    });

    return (
        <TableContainer className = {styles.list} onScroll = {handleScroll}>
            <Table stickyHeader>
                <TableHead>  
                    <TableRow>
                        <TableCell>Aватар</TableCell>
                        <TableCell>Имя пользователя</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sortedUsers.map(user => 
                            <UserListItem
                                data = {user}
                                onDelete={() => Store.deleteItem(user.id)} 
                                onEdit={(newLogin: string) => {
                                    Store.editItem(user.id, newLogin);
                                }} />
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
});