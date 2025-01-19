import { TableCell, TableRow, Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import { useState } from "react";
import { User } from "../store/Store"

interface IUserListItemProps {
    data: User,
    onDelete: () => void,
    onEdit: (s: string) => void
};

export const UserListItem = ({data, onDelete, onEdit}: IUserListItemProps) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    return (
        <TableRow key={data.id}>
            <TableCell>
                <Avatar src = {data.avatar_url} alt = {data.login} />
            </TableCell>
            <TableCell>
                <Input
                    value = {edit ? value : data.login}
                    onChange={(e => {
                        e.preventDefault();
                        setValue(e.target.value);
                    })}
                    disabled = {!edit} />
            </TableCell>
            <TableCell>{data.id}</TableCell>
            <TableCell>
                <Stack direction="row" spacing={1}>
                    { edit ? (
                            <>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={() => {
                                        setEdit(!edit);
                                        onEdit(value);
                                    }}>
                                        Save
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setEdit(!edit);
                                    }}>
                                        Cancel
                                </Button>
                            </>
                        ): (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    setEdit(!edit);
                                    setValue(data.login);                        
                                }}>
                                    Edit
                            </Button>
                        )
                    }
                    <Button
                        size="small"
                        variant="contained"
                        disabled = {edit}
                        onClick = {onDelete}>
                            Delete
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    )
};