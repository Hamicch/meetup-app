import Image from 'next/image';
import classes from './MeetupDetail.module.css';

export default function MeetupDetails(props) {
	return (
		<section className={classes.detail}>
			<Image
				src={props.image}
				alt={props.title}
				height={400}
				width={700}
			/>
			<h1>{props.title}</h1>
			<address>{props.address}</address>
			<p>{props.description}</p>
		</section>
	);
}
