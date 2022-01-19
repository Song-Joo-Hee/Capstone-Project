import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import { FormControlLabel, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import { blue, pink, grey, green, orange } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import FaceIcon from '@material-ui/icons/Face';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const drawerWidth = 290

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(5),
      },
    floor: {
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(130),
        height: theme.spacing(14),
      }
    },
    wing: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(2),
          width: theme.spacing(59),
          height: theme.spacing(14),
        }
      },
    radio: {
        display: 'inline-flex',
        flexDirection: 'column',
        flexWrap: 'no wrap',
        marginTop: 35,
    },
    sign: {
        display: 'inline-flex',
        flexDirection: 'row',
        width: 108,
        height: 108,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(2)
    },
    root: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
    },
    bluePaper: {
        backgroundColor: blue[300],
    },
    pinkPaper: {
        backgroundColor: pink[200],
    },
    greyPaper: {
        backgroundColor: grey[300],
    },
    submit: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        margin: 20
    },
    space: {
        height: 112,
        backgroundColor: grey[300],
    },
    team: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 112,
        width: 346.5,
        backgroundColor: grey[100]
    },
    room: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: blue[100]
    },
    room2: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: blue[400]
    },
    room3: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: blue[700]
    },
    room4: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: green[200]
    },
    room5: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: green[300]
    },
    room6: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: green[500]
    },
    room7: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: pink[100]
    },
    room8: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: pink[300]
    },
    room9: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: pink[400]
    },
    room10: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: orange[200]
    },
    room11: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: orange[300]
    },
    room12: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        width: 86.5,
        backgroundColor: orange[500]
    },
}));

export default function SelectTeam() {

    const [team_info, setTeamInfo] = useState([])

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    const [sixthGender, setGender6] = useState('')
    const [fifthGender, setGender5] = useState('')
    const [fourthGender, setGender4] = useState('')
    const [thirdGender, setGender3] = useState('')
    const [secondGender, setGender2] = useState('')
    const [firstGender_left, setGender_left] = useState('')
    const [firstGender_right, setGender_right] = useState('')

    const getTeamInfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/dormitory/teamInfo/')
        console.log('>>>>>>>>>>>>>>response.data',response.data)
        setTeamInfo(response.data)
      }
  
    //   useEffect(()=>{
    //     getTeamInfo();
    //   }, [])
    

    return (
        <Container maxWidth='xl'>
        <Grid container>
            <Grid item>

            {/* 6층 */}
            <div className={classes.floor}>
                <Paper className={classes.sign}>
                    <Typography variant='h5'>6F</Typography>
                </Paper>
                <Paper className={sixthGender ? (sixthGender === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3}>            
                    <div className={classes.space}>
                        <div className={classes.team}>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>                        
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>                        
                        </div>
                    </div>
                </Paper>
            </div>
            </Grid>
            <Grid item> 

            {/* 5층 */}
            <div className={classes.floor}>
                <Paper className={classes.sign}>
                    <Typography variant='h5'>5F</Typography>
                </Paper>
                <Paper className={fifthGender ? (fifthGender === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3}>
                <div className={classes.space}>
                        <div className={classes.team}>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                            <div className={classes.room4}>
                            </div>
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room5}>
                            </div>                        
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room5}>
                            </div>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room6}>
                            </div>
                            <div className={classes.room6}>
                            </div>                        
                        </div>
                    </div>
                </Paper>            
            </div>
            </Grid>
            <Grid item>
            
            {/* 4층 */}
            <div className={classes.floor}>
                <Paper className={classes.sign}>
                    <Typography variant='h5'>4F</Typography>
                </Paper>
                <Paper className={fourthGender ? (fourthGender === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3}>
                <div className={classes.space}>
                        <div className={classes.team}>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room7}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>
                            <div className={classes.room8}>
                            </div>                        
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>
                            <div className={classes.room9}>
                            </div>                        
                        </div>
                    </div>
                </Paper>            
            </div>

            </Grid>
            <Grid item>
            
            {/* 3층 */}
            <div className={classes.floor}>
                <Paper className={classes.sign}>
                    <Typography variant='h5'>3F</Typography>
                </Paper>
                <Paper className={thirdGender ? (thirdGender === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3}>
                <div className={classes.space}>
                        <div className={classes.team}>
                            <div className={classes.room10}>
                            </div>
                            <div className={classes.room10}>
                            </div>
                            <div className={classes.room10}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room10}>
                            </div>
                            <div className={classes.room10}>
                            </div>
                            <div className={classes.room10}>
                            </div>
                            <div className={classes.room10}>
                            </div>
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room11}>
                            </div>
                            <div className={classes.room12}>
                            </div>                        
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>
                            <div className={classes.room12}>
                            </div>                        
                        </div>
                    </div>
                </Paper>            
            </div>

            </Grid>
            <Grid item>
            
            {/* 2층 */}
            <div className={classes.floor}>
                <Paper className={classes.sign}>
                    <Typography variant='h5'>2F</Typography>
                </Paper>
                <Paper className={secondGender ? (secondGender === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3}>
                <div className={classes.space}>
                        <div className={classes.team}>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                            <div className={classes.room2}>
                            </div>
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>
                            <div className={classes.room}>
                            </div>                        
                        </div>
                        <div className={classes.team}>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>
                            <div className={classes.room3}>
                            </div>                        
                        </div>
                    </div>
                </Paper>
            </div>

            </Grid>
            <Grid item>
            <div className={classes.wing}>
                <Paper className={classes.sign}>
                    <Typography variant='h5'>1F</Typography>
                </Paper>
                <Paper className={firstGender_left ? (firstGender_left === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <Grid item>
            <div className={classes.wing}>
            <Paper className={firstGender_right ? (firstGender_right === 'male' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>

            </Grid>
  
        </Grid>
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="right"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        로뎀관 Lothem                        
                    </Typography>
                </div>

                {/* list / links */}
                 <List>
                    <Typography variant="h6" className={classes.title}>
                        STEP 2: <br/>팀 배정하기
                    </Typography>
                    <Typography  className={classes.title}>
                        ☛ 자동배정된 팀 영역을 확인해주세요.
                    </Typography>
                    <Typography  className={classes.title}>
                        ☛ 수정하고 싶은 팀을 클릭 후 모양이 동일한 팀과 위치를 변경해주세요.
                    </Typography>
                    <Typography  className={classes.title}>
                        ☛ 확인 및 수정이 완료되었다면, 다음 단계 버튼을 통해 다음으로 이동해주세요.
                    </Typography>
                    <br/>
                    <Divider/>
                    <br/>
                    <Button 
                            size="small" 
                            variant="contained" 
                            color="primary"
                            onClick={()=>getTeamInfo()}
                        >
                        update
                    </Button>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            팀교수님 명단
                            </ListSubheader>
                        }
                        className={classes.list}
                        >
                        {/* <ListItem button>
                            <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                            <ListItemText primary="한다성 교수님팀" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                            <ListItemText primary="양희태 교수님팀" />
                        </ListItem> */}
                        
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                            {
                    team_info.map((team_info, index) => (
                            <ListItemText primary={team_info.team_prof} />
                    ))}
                            {open ? <ExpandLess /> : <ExpandMore />}
                            {/* <Pagination count={10} size="small"/> */}
                        </ListItem>
                    

                        
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
{/*                                 <ListItemIcon>
                                </ListItemIcon> */}
                                <ListItemText secondary="남 - 2인실: 1개 / 4인실: 4개" />
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <ListItemText secondary="여 - 2인실: 1개 / 4인실: 4개"/>
                            </ListItem>
                            </List>
                        </Collapse>
                        </List>
                    <br/>
                        <Link to="/SelectRoom5">
                        <Button 
                            type="submit"
                            fullWidth
                            size="large" 
                            variant="contained" 
                            color="primary"
                            className={classes.submit}
                        >
                        <Typography variant="h5">다음 단계</Typography>
                        </Button>
                        </Link>
                </List>
            </Drawer>
        </div>
    </Container>

    )
}