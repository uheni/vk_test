import { ReactNode } from "react";
import styles from './Layout.module.css';

interface ILayoutProps {
    children?: ReactNode[]
}

export const Layout = ({children}: ILayoutProps) => {
    return (
            <div className={styles.container}>
                {children}
            </div>
    )
}