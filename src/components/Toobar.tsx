import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import styles from './UserList.module.css';
import { Loader } from "../ui/Loader";
import Store from "../store/Store";

export const Toolbar = observer(() => {

    const handleSortChange = (e: SelectChangeEvent) => {
        Store.setSort(e.target.value);
    };

    const handleSortFieldChange = (e: SelectChangeEvent) => {
        Store.setSortField(e.target.value);
    };

    return (
        <>
            <FormControl className = {styles.select}>
                <InputLabel>Сортировка по колонке:</InputLabel>
                <Select
                        value={Store.sort_field}
                        onChange={handleSortFieldChange}>
                    <MenuItem value={"id"}>id</MenuItem>
                    <MenuItem value={"login"}>login</MenuItem>
                </Select>
            </FormControl>
            <FormControl className = {styles.select}>
                <InputLabel>Тип сортировки:</InputLabel>
                <Select
                        value={Store.sort}
                        onChange={handleSortChange}>
                    <MenuItem value={"ASC"}>По возрастанию</MenuItem>
                    <MenuItem value={"DESC"}>По убыванию</MenuItem>
                </Select>
            </FormControl>
            {Store.loading && <Loader />}
        </>
    )
});