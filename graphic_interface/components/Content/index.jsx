import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(rfid, fullname, permission) {
    return { rfid, fullname, permission };
}

const rows = [
    createData(1, 'nassim', true),
    createData(2, 'yassine', true),
    createData(3, 'mohamed', false)
];

export default function DataTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>RFID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="right">Permission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.rfid}>
                            <TableCell component="th" scope="row">
                                {row.rfid}
                            </TableCell>
                            <TableCell align="center">{row.fullname}</TableCell>
                            <TableCell align="right">{row.permission}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
