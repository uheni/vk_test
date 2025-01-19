import { useState, useEffect } from "react";
import styles from './Loader.module.css';

const BASE_LOAD_TEXT: string = "Загрузка";

export const Loader  = () => {

	const [count, setCount] = useState(0);
	const PointText = count === 0 ? "" : (new Array(count)).fill().map(() => ".").join("");
	const DynamicLoadText = `${BASE_LOAD_TEXT}${PointText}`;

	useEffect(() => {
		const CountInterval = setInterval(() => {
			const newCount = count === 3 ? 0 : count + 1;
			setCount(newCount);
		}, 1000);

		return () => {
			clearInterval(CountInterval);
		}
	});

	return (
		<p className = {styles.loader}>{DynamicLoadText}</p>
	)
};