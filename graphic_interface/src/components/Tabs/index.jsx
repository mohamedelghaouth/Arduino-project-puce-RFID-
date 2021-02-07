import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },table: {
        minWidth: 650,
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [history, setHistory] = React.useState([]);
    const [list, setList] = React.useState([]);
    const [firstTime, setFirstTime] = React.useState(true);
    const [color, setColor] = React.useState("secondary");

    const historyData =async ()=> {
        let response =
            await fetch(`http://192.168.78.113/archives`);
        const json = await response.json();
        const data = json._embedded.archives;
        // eslint-disable-next-line no-unused-expressions
        let fetchedData= data.map( (q) =>  {return {"firstName":q.persons.firstName,
            "lastName":q.persons.lastName, "time":q.time}});
        setHistory(fetchedData);
    };

    const listData =async ()=> {
        let response =
            await fetch(`http://192.168.78.113/persons`);
        const json = await response.json();
        const data = json._embedded.persons;
        // eslint-disable-next-line no-unused-expressions
        let fetchedData= data.map( (q) =>  {

            let href = q._links.person.href;
            let i = href.lastIndexOf('/');
            let rfid= href.substring(i+1,href.length);
            console.log("href :", href);
            console.log("rfid :", rfid);
            return {"rfid":rfid,"firstName":q.firstName,"lastName":q.lastName, "hasAccess":q.hasAccess,"href":href}});
        setList(fetchedData);
        setFirstTime(false);
    };

    if(firstTime) listData();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue == 1) {
            historyData();
        }else {
            listData();
        }
    };

    const changeColor = (_rfid) => {
        let temp = list.map( q => {if(q.rfid==_rfid){
            q.hasAccess= !q.hasAccess;
            return q;
        }});
        console.log("temp :", temp);
        let lien = temp[0].href;
        console.log("lien :", lien);
        delete temp.href;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp[0])
            //list.persons._links.person.href
        };
        fetch(lien, requestOptions)
            .then(response => response.json()).then(response => console.log(response));

        listData();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Permissions Table" {...a11yProps(0)} />
                    <Tab label="History Table" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>RFID</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="right">Permission</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map(row => (
                                <TableRow key={row.firstName}>
                                    <TableCell component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="right"><Button variant="contained" color={row.hasAccess ? "primary" : "secondary"} onClick={() => { changeColor(row.rfid) }}>Access</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map(row => (
                                <TableRow key={row.firstName}>
                                    <TableCell component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </div>
    );
}
