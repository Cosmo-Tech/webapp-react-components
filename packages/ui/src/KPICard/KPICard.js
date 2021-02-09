import React from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	withStyles,
} from "@material-ui/core";

import useStyles from "./muiStyles";

const KPICard = ({classes, value, title}) => (
	<Card className={classes.card}>
		<CardContent className={classes.content}>
			<Typography className={classes.title} color="textSecondary">
				{title}
			</Typography>
			<Box className={classes.numerics}>
				<Typography className={classes.value}>{value}</Typography>
			</Box>
		</CardContent>
	</Card>
);

export default withStyles(useStyles)(KPICard);
