import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import { ButtonBase, FormControlLabel, makeStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {red, yellow, green, blue, brown, teal, purple, orange, cyan, pink, blueGrey, indigo, lime, deepPurple, grey, deepOrange, amber } from '@material-ui/core/colors';

const drawerWidth = 290

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
  
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth
    },
    title: {
        padding: theme.spacing(2)
    },
    sign: {
        display: 'inline-flex',
        flexDirection: 'row',
        width: 108,
        height: 74,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    board: {
        display: 'inline-flex',
        flexDirection: 'row',
        width: 700,
        height: 230,
        marginLeft: 80,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grey[200]
    },
    floor:{
        display: 'flex', justifyContent: 'center', height: '16%', flexWrap: 'wrap', backgroundColor: grey[100], paddingTop: '10px', marginTop: '-20px', marginBottom: '5px'
    },
    fab: {
        margin: theme.spacing(2),
        marginLeft: -30,
        marginBottom: -10
    },
    submit: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        margin: 20
    },
    bed: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue[50],
        margin: 2
    },

    sign: {
        display: 'inline-flex',
        flexDirection: 'row',
        width: 108,
        height: 108,
        marginTop: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    column: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'black',
      },
}))

export default function SelectRoom() {
    const classes = useStyles();
    const [columns1, setColumns1] = useState([]);
    const [columns2, setColumns2] = useState([]);
    const [columns3, setColumns3] = useState([]);
    const [columns4, setColumns4] = useState([]);
    const [columns5, setColumns5] = useState([]);
    const [columns6, setColumns6] = useState([]);

    const [colors1, setColors1] = useState([]);
    const [colors2, setColors2] = useState([]);
    const [colors3, setColors3] = useState([]);
    const [colors4, setColors4] = useState([]);
    const [colors5, setColors5] = useState([]);
    const [colors6, setColors6] = useState([]);

    const [post,setPost]=useState(null)

    const exportExcel = async () => {
        await axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/dormitory/exportExcel/`,                 
            responseType: 'blob'
        })    
        .then(response =>{        
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '입주자명단.xls');
            document.body.appendChild(link);
            link.click();
        })   
     }

    const getRoomInfo = async () => {
        await axios.get('http://127.0.0.1:8000/dormitory/updateRoom/')
        .then((response => {         
            const room = response.data            
            const room_info_1 = response.data.filter(room => (room.room_number).substr(0,1)=="1")
            const non_ol_set_1 = new Set(room_info_1.map(room_info => room_info.room_number))
            const non_ol_set_prof_1 = new Set(room_info_1.map(room_info => room_info.team_prof))
            const prof_array_1 = Array.from(non_ol_set_prof_1)
            setColors1(prof_array_1)
            const room_correct_list_1 = {}
            non_ol_set_1.forEach(function(value) {
                room_correct_list_1[[value]] = {
                    name: `${value}호`,
                    items: 
                    room_info_1.filter(student_info => student_info.room_number === value).map(student_info => 
                        {if(student_info.room_number === value)
                        {
                            return {id: student_info.student_id, name: student_info.name, 
                                team: student_info.team_prof, leader: student_info.leader_yn}
                        }                       
                        }                           
                        )
                }              
              });
            setColumns1(room_correct_list_1)

            const room_info_2 = response.data.filter(room => (room.room_number).substr(0,1)=="2")
            const non_ol_set_2 = new Set(room_info_2.map(room_info => room_info.room_number))
            const non_ol_set_prof_2 = new Set(room_info_2.map(room_info => room_info.team_prof))
            const prof_array_2 = Array.from(non_ol_set_prof_2)
            setColors2(prof_array_2)
            const room_correct_list_2 = {}
            non_ol_set_2.forEach(function(value) {
                room_correct_list_2[[value]] = {
                    name: `${value}호`,
                    items: 
                    room_info_2.filter(student_info => student_info.room_number === value).map(student_info => 
                        {if(student_info.room_number === value)
                        {
                            return {id: student_info.student_id, name: student_info.name, 
                                team: student_info.team_prof, leader: student_info.leader_yn}
                        }                       
                        }                           
                        )
                }              
              });
              setColumns2(room_correct_list_2)

              const room_info_3 = response.data.filter(room => (room.room_number).substr(0,1)=="3")
              const non_ol_set_3 = new Set(room_info_3.map(room_info => room_info.room_number))
              const non_ol_set_prof_3 = new Set(room_info_3.map(room_info => room_info.team_prof))
              const prof_array_3 = Array.from(non_ol_set_prof_3)
              setColors3(prof_array_3)
              const room_correct_list_3 = {}
              non_ol_set_3.forEach(function(value) {
                  room_correct_list_3[[value]] = {
                      name: `${value}호`,
                      items: 
                      room_info_3.filter(student_info => student_info.room_number === value).map(student_info => 
                          {if(student_info.room_number === value)
                          {
                              return {id: student_info.student_id, name: student_info.name, 
                                  team: student_info.team_prof, leader: student_info.leader_yn}
                          }                       
                          }                           
                          )
                  }              
                });
                setColumns3(room_correct_list_3)
            
                const room_info_4 = response.data.filter(room => (room.room_number).substr(0,1)=="4")
                const non_ol_set_4 = new Set(room_info_4.map(room_info => room_info.room_number))
                const non_ol_set_prof_4 = new Set(room_info_4.map(room_info => room_info.team_prof))
                const prof_array_4 = Array.from(non_ol_set_prof_4)
                setColors4(prof_array_4)
                const room_correct_list_4 = {}
                non_ol_set_4.forEach(function(value) {
                    room_correct_list_4[[value]] = {
                        name: `${value}호`,
                        items: 
                        room_info_4.filter(student_info => student_info.room_number === value).map(student_info => 
                            {if(student_info.room_number === value)
                            {
                                return {id: student_info.student_id, name: student_info.name, 
                                    team: student_info.team_prof, leader: student_info.leader_yn}
                            }                       
                            }                           
                            )
                    }              
                });
                setColumns4(room_correct_list_4)
                console.log('>>>>>>>>>>>4층 데이터', room_correct_list_4)

                const room_info_5 = response.data.filter(room => (room.room_number).substr(0,1)=="5")
                const non_ol_set_5 = new Set(room_info_5.map(room_info => room_info.room_number))
                const non_ol_set_prof_5 = new Set(room_info_5.map(room_info => room_info.team_prof))
                const prof_array_5 = Array.from(non_ol_set_prof_5)
                setColors5(prof_array_5)
                const room_correct_list_5 = {}
                non_ol_set_5.forEach(function(value) {
                    room_correct_list_5[[value]] = {
                        name: `${value}호`,
                        items: 
                        room_info_5.filter(student_info => student_info.room_number === value).map(student_info => 
                            {if(student_info.room_number === value)
                            {
                                return {id: student_info.student_id, name: student_info.name, 
                                    team: student_info.team_prof, leader: student_info.leader_yn}
                            }                       
                            }                           
                            )
                    }              
                });
                setColumns5(room_correct_list_5)

                const room_info_6 = response.data.filter(room => (room.room_number).substr(0,1)=="6")
                const non_ol_set_6 = new Set(room_info_6.map(room_info => room_info.room_number))
                const non_ol_set_prof_6 = new Set(room_info_6.map(room_info => room_info.team_prof))
                const prof_array_6 = Array.from(non_ol_set_prof_6)
                setColors6(prof_array_6)
                const room_correct_list_6 = {}
                non_ol_set_6.forEach(function(value) {
                    room_correct_list_6[[value]] = {
                        name: `${value}호`,
                        items: 
                        room_info_6.filter(student_info => student_info.room_number === value).map(student_info => 
                            {if(student_info.room_number === value)
                            {
                                return {id: student_info.student_id, name: student_info.name, 
                                    team: student_info.team_prof, leader: student_info.leader_yn}
                            }                       
                            }                           
                            )
                    }              
                    });
                    setColumns6(room_correct_list_6)
        }))
        .catch((response) => console.log('Error!'))

    }

    // useEffect(()=>{
    //     fetch("https://jsonplaceholder.typicode.com/posts/1")
    //     .then(response=>response.json())
    //     .then(response=>{
    //         const {body}=response
    //         setPost(body)
    //     })
    //     getRoomInfo();
    // }, [])

    
    useEffect(()=>{
        getRoomInfo();
    }, [])
  

    const getColor_leader = (student) => {
        switch(student.leader){
            case 'RC':
                return 'red';
            case '새섬':
                return 'blue';
            case '자치회':
                return 'green';
        }
    };

    const getColor1 = (student) => {
        switch(student.team){
            case colors1[0]  :
                return red[100];
            case colors1[1]:
                return deepPurple[100];
            case colors1[2]:
                return amber[100];
            case colors1[3]:
                return green[100];
            case colors1[4]:
                return blue[100];
            case colors1[5]:
                return brown[100];
            case colors1[6]:
                return orange[100];
            case colors1[7]:
                return purple[100];
            case colors1[8]:
                return teal[100];
            case colors1[9]:
                return deepOrange[100];
            case colors1[10]:
                return cyan[100];
            case colors1[11]:
                return pink[100];
            case colors1[12]:
                return blueGrey[100];
            case colors1[13]:
                return indigo[100];
            default:
                return lime[100];
        }
    };

    
    const getColor2 = (student) => {
        switch(student.team){
            case colors2[0]  :
                return red[200];
            case colors2[1]:
                return deepPurple[200];
            case colors2[2]:
                return amber[200];
            case colors2[3]:
                return green[200];
            case colors2[4]:
                return blue[200];
            case colors2[5]:
                return brown[200];
            case colors2[6]:
                return orange[200];
            case colors2[7]:
                return purple[200];
            case colors2[8]:
                return teal[200];
            case colors2[9]:
                return deepOrange[200];
            case colors2[10]:
                return cyan[200];
            case colors2[11]:
                return pink[200];
            case colors2[12]:
                return blueGrey[200];
            case colors2[13]:
                return indigo[200];
            default:
                return lime[200];
        }
    };

    
    const getColor3 = (student) => {
        switch(student.team){
            case colors3[0]  :
                return red[300];
            case colors3[1]:
                return deepPurple[300];
            case colors3[2]:
                return amber[300];
            case colors3[3]:
                return green[300];
            case colors3[4]:
                return blue[300];
            case colors3[5]:
                return brown[300];
            case colors3[6]:
                return orange[300];
            case colors3[7]:
                return purple[300];
            case colors3[8]:
                return teal[300];
            case colors3[9]:
                return deepOrange[300];
            case colors3[10]:
                return cyan[300];
            case colors3[11]:
                return pink[300];
            case colors3[12]:
                return blueGrey[300];
            case colors3[13]:
                return indigo[300];
            default:
                return lime[300];
        }
    };

    
    const getColor4 = (student) => {
        switch(student.team){
            case colors4[0]  :
                return red[400];
            case colors4[1]:
                return deepPurple[400];
            case colors4[2]:
                return amber[400];
            case colors4[3]:
                return green[400];
            case colors4[4]:
                return blue[400];
            case colors4[5]:
                return brown[400];
            case colors4[6]:
                return orange[400];
            case colors4[7]:
                return purple[400];
            case colors4[8]:
                return teal[400];
            case colors4[9]:
                return deepOrange[400];
            case colors4[10]:
                return cyan[400];
            case colors4[11]:
                return pink[400];
            case colors4[12]:
                return blueGrey[400];
            case colors4[13]:
                return indigo[400];
            default:
                return lime[400];
        }
    };

    
    const getColor5 = (student) => {
        switch(student.team){
            case colors5[0]  :
                return red[500];
            case colors5[1]:
                return deepPurple[500];
            case colors5[2]:
                return amber[500];
            case colors5[3]:
                return green[500];
            case colors5[4]:
                return blue[500];
            case colors5[5]:
                return brown[500];
            case colors5[6]:
                return orange[500];
            case colors5[7]:
                return purple[500];
            case colors5[8]:
                return teal[500];
            case colors5[9]:
                return deepOrange[500];
            case colors5[10]:
                return cyan[500];
            case colors5[11]:
                return pink[500];
            case colors5[12]:
                return blueGrey[500];
            case colors5[13]:
                return indigo[500];
            default:
                return lime[500];
        }
    };

    
    const getColor6 = (student) => {
        switch(student.team){
            case colors6[0]  :
                return red[600];
            case colors6[1]:
                return deepPurple[600];
            case colors6[2]:
                return amber[600];
            case colors6[3]:
                return green[600];
            case colors6[4]:
                return blue[600];
            case colors6[5]:
                return brown[600];
            case colors6[6]:
                return orange[600];
            case colors6[7]:
                return purple[600];
            case colors6[8]:
                return teal[600];
            case colors6[9]:
                return deepOrange[600];
            case colors6[10]:
                return cyan[600];
            case colors6[11]:
                return pink[600];
            case colors6[12]:
                return blueGrey[600];
            case colors6[13]:
                return indigo[600];
            default:
                return lime[600];
        }
    };
    
    return (
        
        <Container maxWidth='lg'>
         {/* {post? null :<Backdrop className={classes.backdrop} open>
            <CircularProgress color="inherit" />
        </Backdrop>} */}
            {/* 6층 */}
 
            <Grid container style={{ marginLeft: '-120px'}}>
                <Link to ="/SelectRoom6">
                    <Fab size="medium" color="primary" aria-label="add" className={classes.fab}>
                        <ZoomInIcon fontSize="medium" />
                    </Fab>
                </Link>
            <Grid item >
                <Paper className={classes.floor}>
                    <DragDropContext >
                        {Object.entries(columns6).map(([id, column6]) => {
                            return (
                                <div className={classes.column}>
                                    <Typography variant="body1" color="primary" style ={{ marginLeft: 22, fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column6.name}</Typography>
                                    <div>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 75,
                                                        height: 120
                                                    }}
                                                >
                                                    {column6.items.map((item, index) => {
                                                        return (
                                                            <Draggable key ={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <Paper 
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: '4px 12px 18px 23px',
                                                                                margin: '0 0 4px 0',
                                                                                height: '0px',
                                                                                fontSize: 'small',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor6(item),
                                                                                
                                                                                color: 'white',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '2.5px' : '0px',
                                                                                borderColor: getColor_leader(item),
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                            </Paper>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </Paper>
                                            )
                                        }}
                                    </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </Paper>

                {/* 5층 */}
                <Link to ="/SelectRoom5">
                    <Fab size="medium" color="primary" aria-label="add" className={classes.fab}>
                        <ZoomInIcon fontSize="medium" />
                    </Fab>
                </Link>
                 <Paper className={classes.floor}>
                    <DragDropContext >
                        {Object.entries(columns5).map(([id, column5]) => {
                            return (
                                <div className={classes.column}>
                                        
                                    <Typography variant="body1" color="primary" style ={{ fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column5.name}</Typography>
                                    <div>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 70,
                                                        height: 120
                                                    }}
                                                >
                                                    {column5.items.map((item, index) => {
                                                        return (
                                                            <Draggable key ={item.id} draggableId={item.id} index={index}> 
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <Paper 
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: '4px 12px 18px 23px',
                                                                                margin: '0 0 4px 0',
                                                                                height: '0px',
                                                                                fontSize: 'small',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor5(item),
                                                                                
                                                                                color: 'white',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '2.5px' : '0px',
                                                                                borderColor: getColor_leader(item),
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                            </Paper>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                </Paper>
                                            )
                                        }}
                                    </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </Paper>

                {/* 4층 */}
                <Link to ="/SelectRoom4">
                    <Fab size="medium" color="primary" aria-label="add" className={classes.fab}>
                        <ZoomInIcon fontSize="medium" />
                    </Fab>
                </Link>
                 <Paper className={classes.floor}>
                    <DragDropContext >
                        {Object.entries(columns4).map(([id, column4]) => {
                            return (
                                <div className={classes.column}>
                                        
                                    <Typography variant="body1" color="primary" style ={{ fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column4.name}</Typography>
                                    <div>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 70,
                                                        height: 120
                                                    }}
                                                >
                                                    {column4.items.map((item, index) => {
                                                        return (
                                                            <Draggable key ={item.id} draggableId={item.id} index={index}> 
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <Paper 
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: '4px 12px 18px 23px',
                                                                                margin: '0 0 4px 0',
                                                                                height: '0px',
                                                                                fontSize: 'small',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor4(item),
                                                                                
                                                                                color: 'white',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '2.5px' : '0px',
                                                                                borderColor: getColor_leader(item),
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                            </Paper>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                </Paper>
                                            )
                                        }}
                                    </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </Paper>

                {/* 3층 */}
                <Link to ="/SelectRoom3">
                    <Fab size="medium" color="primary" aria-label="add" className={classes.fab}>
                        <ZoomInIcon fontSize="medium" />
                    </Fab>
                </Link>
                <Paper className={classes.floor}>
                    <DragDropContext >
                        {Object.entries(columns3).map(([id, column3]) => {
                            return (
                                <div className={classes.column}>
                                    
                                        
                                    <Typography variant="body1" color="primary" style ={{ fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column3.name}</Typography>
                                    <div>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 70,
                                                        height: 120
                                                    }}
                                                >
                                                    {column3.items.map((item, index) => {
                                                        return (
                                                            <Draggable key ={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <Paper 
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: '4px 12px 18px 23px',
                                                                                margin: '0 0 4px 0',
                                                                                height: '0px',
                                                                                fontSize: 'small',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor3(item),
                                                                                
                                                                                color: 'black',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '2.5px' : '0px',
                                                                                borderColor: getColor_leader(item),
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                            </Paper>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                </Paper>
                                            )
                                        }}
                                    </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </Paper>
                
                {/* 2층 */}
                <Link to ="/SelectRoom2">
                    <Fab size="medium" color="primary" aria-label="add" className={classes.fab}>
                        <ZoomInIcon fontSize="medium" />
                    </Fab>
                </Link>
                <Paper className={classes.floor}>
                    <DragDropContext >
                        {Object.entries(columns2).map(([id, column2]) => {
                            return (
                                <div className={classes.column}>
                                        
                                    <Typography variant="body1" color="primary" style ={{ fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column2.name}</Typography>
                                    <div>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 70,
                                                        height: 120
                                                    }}
                                                >
                                                    {column2.items.map((item, index) => {
                                                        return (
                                                            <Draggable key ={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <Paper 
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: '4px 12px 18px 23px',
                                                                                margin: '0 0 4px 0',
                                                                                height: '0px',
                                                                                fontSize: 'small',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor2(item),
                                                                                
                                                                                color: 'black',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '2.5px' : '0px',
                                                                                borderColor: getColor_leader(item),
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                            </Paper>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                </Paper>
                                            )
                                        }}
                                    </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </Paper>
                
                {/* 1층 */}
                <Link to ="/SelectRoom1">
                    <Fab size="medium" color="primary" aria-label="add" className={classes.fab}>
                        <ZoomInIcon fontSize="medium" />
                    </Fab>
                </Link>
                <Paper className={classes.floor}>
                    <DragDropContext >
                        {Object.entries(columns1).map(([id, column1]) => {
                            return (
                                <div className={classes.column}>
                                        
                                        
                                    <Typography variant="body1" color="primary" style ={{ fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column1.name}</Typography>
                                    <div >
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 70,
                                                        height: 120
                                                    }}
                                                >
                                                    {column1.items.map((item, index) => {
                                                        return (
                                                            <Draggable key ={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <Paper 
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: '4px 12px 18px 23px',
                                                                                margin: '0 0 4px 0',
                                                                                height: '0px',
                                                                                fontSize: 'small',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor1(item),
                                                                                
                                                                                color: 'black',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '2.5px' : '0px',
                                                                                borderColor: getColor_leader(item),
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                            </Paper>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                </Paper>
                                            )
                                        }}
                                    </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </Paper>
            </Grid>
        </Grid>
        
        {/* Side bar */}
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
                        STEP 4: <br/>방배정하기
                    </Typography>
                    <Typography  className={classes.title}>
                        ☛ 자동배정된 팀영역에 각 팀의 학생들의 방을 확인해주세요.
                    </Typography>

                    <Typography  className={classes.title}>
                        ☛  + 돋보기 버튼을 통해 확대된 화면으로 볼 수 있습니다.
                    </Typography>

                    <Typography  className={classes.title}>
                        ☛  모든 층의 룸메이트 배정이 완료되었다면 엑셀파일로 다운로드해주세요.
                    </Typography>
                    


                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Button 
                            type="submit"
                            fullWidth
                            // size="large" 
                            variant="contained" 
                            color="primary"
                            className={classes.submit}
                            onClick={()=>exportExcel()}

                        >
                        <Typography variant="h5">엑셀로 다운받기</Typography>
                        </Button>
                        {/* <Link to="/SelectTeam">
                        <Button 
                            type="submit"
                            fullWidth
                            size="large" 
                            variant="contained" 
                            color="primary"
                            className={classes.submit}

                        >
                        <Typography variant="h5">출력 및 변환</Typography>
                        </Button>
                        </Link> */}
                </List>
            </Drawer>
        </div>
        </Container>
    )
}