import React, { useState, useEffect, useMemo} from 'react'
import Container from '@material-ui/core/Container';
import { ButtonBase, FormControlLabel, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
// import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {red, yellow, green, blue, brown, teal, purple, orange, cyan, pink, blueGrey, indigo, lime, deepPurple, grey, deepOrange, amber } from '@material-ui/core/colors';
import { borderColor } from '@mui/system';


const drawerWidth = 290

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10
  
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
    floorNav: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
        marginLeft: '150px'
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
    mainBoard: {
        display: 'inline-flex',
        flexDirection: 'row',
        width: 660,
        height: 200,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    floor:{
        display: 'flex', justifyContent: 'center', height: '100%', flexWrap: 'wrap', backgroundColor: grey[100], paddingTop: '20px', marginBottom: '50px'
    },
    fab: {
        margin: theme.spacing(1),
        marginLeft: -150,
    },
    submit: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        margin: 20
    },
    column: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'
    },
    team_one:  {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 159,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue[200]
    },
    team_two:  {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 159,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue[600]
    },
    team_three:  {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 159,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue[800]
    },
    room_title: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue[400],
        flexGrow: 1,
        margin: 2

    },
    bed: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue[50],
        margin: 2
    },
    emptybed: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 110,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        backgroundColor: 'transparent',
        elevation: '0'
    },
    teamColor: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 15,
    },
}))


export default function SelectRoom() {
    
    // const ColumnsFromBackend = {
    //     [uuid()] : {
    //         name:'asd',
    //         items: [{id: '123', name:'name'}, {id: '123', name:'name'}]
    //     }
    // }
   

  

    const [columns, setColumns] = useState([]);
    const [colors, setColors] = useState([]);
    const classes = useStyles();

    

    // const getRoomInfo = async () => {
    //     await axios.get('http://127.0.0.1:8000/dormitory/updateRoom/')
    //     .then((response => {         
    //         const room = response.data            
    //         const room_info = response.data.filter(room => (room.room_number).substr(0,1)=="5")
    //         const getColor = () => { room_info.map(room_info =>{ 
    //             if (room_info.team == "?????????")
    //                 return blue[200];
    //             }
    //         )

    //         }
        
    // }
    // }

    const getRoomInfo = async () => {
        await axios.get('http://127.0.0.1:8000/dormitory/updateRoom/')
        .then((response => {         
            const room = response.data            
            const room_info = response.data.filter(room => (room.room_number).substr(0,1)=="5")
            const non_ol_set = new Set(room_info.map(room_info => room_info.room_number))
            const non_ol_set_prof = new Set(room_info.map(room_info => room_info.team_prof))
            const prof_array = Array.from(non_ol_set_prof)
            console.log('>>>>>>>>prof_array', prof_array)
            setColors(prof_array)
            const room_correct_list = {}
            // const getColor = () => { room_info.map(room_info =>{ 
            //     if (room_info.team_prof == "?????????")
            //         setColors(blue[200]);
            //     }
            // )

            // }
            non_ol_set.forEach(function(value) {
                room_correct_list[[value]] = {
                    name: `${value}???`,
                    items: 
                    room_info.filter(student_info => student_info.room_number === value).map(student_info => 
                        {if(student_info.room_number === value)
                        {
                            return {id: student_info.student_id, name: student_info.name, 
                                team: student_info.team_prof, leader: student_info.leader_yn}
                        }                       
                        }                           
                        )
                }              
              });
              console.log('>>>>>room_correc_list',room_correct_list)
              setColumns(room_correct_list)
              console.log('>>>>columns', columns)
        }))
        .catch((response) => console.log('Error!'))

    }

    useEffect(()=>{
        getRoomInfo();
    }, [])

    const getColor_leader = (student) => {
        switch(student.leader){
            case 'RC':
                return 'red';
            case '??????':
                return 'blue';
            case '?????????':
                return 'green';
        }
    };

        
    const getColor = (student) => {
        console.log('>>>>>student[id]', student.id);
        console.log('>>>>>student[1]', student);
        console.log('>>>>>>colors', colors[0])
        switch(student.team){
            case colors[0]:
                return red[500];
            case colors[1]:
                return deepPurple[500];
            case colors[2]:
                return amber[500];
            case colors[3]:
                return green[500];
            case colors[4]:
                return blue[500];
            case colors[5]:
                return brown[500];
            case colors[6]:
                return orange[500];
            case colors[7]:
                return purple[500];
            case colors[8]:
                return teal[500];
            case colors[9]:
                return deepOrange[500];
            case colors[10]:
                return cyan[500];
            case colors[11]:
                return pink[500];
            case colors[12]:
                return blueGrey[500];
            case colors[13]:
                return indigo[500];
            default:
                return lime[500];
        }
    };

    const getColor_prof = (prof) => {
            switch(prof){
                case colors[0]:
                    return red[500];
                case colors[1]:
                    return deepPurple[500];
                case colors[2]:
                    return yellow[500];
                case colors[3]:
                    return green[500];
                case colors[4]:
                    return blue[500];
                case colors[5]:
                    return brown[500];
                case colors[6]:
                    return orange[500];
                case colors[7]:
                    return purple[500];
                case colors[8]:
                    return teal[500];
                case colors[9]:
                    return deepOrange[500];
                case colors[10]:
                    return cyan[500];
                case colors[11]:
                    return pink[500];
                case colors[12]:
                    return blueGrey[500];
                case colors[13]:
                    return indigo[500];
                default:
                    return lime[500];
        }
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const {source, destination} = result; // ?????? ?????? ???????????? ????????? ???????????? ????????? 
        console.log('result', result)
        if(source.droppableId != destination.droppableId) {
            const sourceColumn = columns[source.droppableId]; // droppableId : ??? ?????? 
            const destColumn = columns[destination.droppableId];
            console.log('>>>>>>>>?????? ??? ??????', destination.droppableId)
            console.log('>>>>>>>>?????? ??? ??????', source.droppableId)
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            })
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items] // items??? ??? ?????? ?????? ????????? 
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };    

    const putUpdateRoommate = async () => {
        const real_columns = Object.entries(columns)
        // console.log('>>>>>>>>>>>real_columns',real_columns.length)
        // console.log('>>>>>>>>>>item', real_columns[0][0])
        // console.log('>>>>>>>>>>item ??????', real_columns[0][1].items.length)
      
        const data = new Object();
        const data_arr = new Array();
        const data_new = new Array();
        var bed_number = "";

        for (var i = 0; i < real_columns.length; i++){
            const data2 = new Set();
            console.log('>>>>>>>room-number',real_columns[i][0])
            for (var j = 0 ; j<real_columns[i][1].items.length; j++){
            // data2.push(real_columns[i][1].items[j].id)
            console.log('>>>>>student_id',real_columns[i][1].items[j].id)
            switch (j) {
                case 0:
                    bed_number = "A";
                    break;
                case 1:
                    bed_number = "B";
                    break;
                case 2:
                    bed_number = "C";
                    break;
                case 3:
                    bed_number = "D";
                    break;
            }
            // data_new[real_columns[i][1].items[j].id] = {
            //     "room_number" : real_columns[i][0],
            //     "bed_number" : bed_number
            // }
            data_new.push({
                "student_id" : real_columns[i][1].items[j].id,
                "room_number" : real_columns[i][0],
                "bed_number" : bed_number
            })


            data[real_columns[i][1].items[j].id] = real_columns[i][0]
            console.log('>>>>>>>j',j)
        
            data2.add(real_columns[i][1].items[j].id)
            data_arr[real_columns[i][0]] = data2
            }
        }
        console.log('>>>>>>data_arr', data_arr)
        console.log('>>>>>>>>data', data)
        console.log('>>>>>>>>Data_new', data_new)
        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/dormitory/updateRoommates/`,
            data: data_new,
        }).then(response => {
            const resData = response.data
            if(resData){
       
           } else {
                alert(resData.message)
            }
            console.log(response.data);
            alert('???????????? ????????? ?????????????????????.')
        })
     }
 

    return (
        <Container maxWidth='lg'>
        <Link to ="/SelectRooms">
            <Fab color="primary" aria-label="add" className={classes.fab}>
                <ZoomOutIcon fontSize="large" />
            </Fab>
        </Link>
        <Typography variant="h6" 
            style={{
               marginLeft: 600
            }}>
        ?????? ??????
        </Typography>
                    <Grid>
                        <Grid item className={classes.teamColor}  
                        style={{marginLeft: 600 }}>
                            <Card 
                                style ={{
                                    width: '80px',
                                    height: '30px',
                                    marginRight: 10,
                                    backgroundColor: 'transparent',
                                    borderColor:'red',
                                    borderStyle: 'solid'

                            }}>
                            </Card>
                            
                            <Typography>: RC</Typography>
                        </Grid>
                        <Grid item className={classes.teamColor}>
                            <Card 
                                style ={{
                                    width: '80px',
                                    height: '30px',
                                    marginRight: 10,
                                    backgroundColor: 'transparent',
                                    borderColor:'blue',
                                    borderStyle: 'solid'

                            }}>
                            </Card>          
                            <Typography>: ??????</Typography>
                        </Grid>
                        <Grid item className={classes.teamColor}>
                            <Card 
                                style ={{
                                    width: '80px',
                                    height: '30px',
                                    marginRight: 10,
                                    backgroundColor: 'transparent',
                                    borderColor:'green',
                                    borderStyle: 'solid'

                            }}>
                            </Card>          
                            <Typography>: ?????????</Typography>
                        </Grid>
                    </Grid>
                    
        <Grid container style={{ marginLeft: '-120px'}}>
            <Grid item >
                <Paper className={classes.floor}>
                    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                        {Object.entries(columns).map(([id, column]) => {
                            return (
                                <div className={classes.column}>
                                    <Typography variant="body1" color="primary" style ={{ fontFamily: 'NanumSquareRound', fontWeight: 'bolder', textDecoration:'underline', textUnderlinePosition: 'under'}}>{column.name}</Typography>
                                    <div style={{ margin: 4 }}>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <Paper
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? grey[400] : grey[300],
                                                        padding: 4,
                                                        width: 100,
                                                        height: 215
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
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
                                                                                padding: '17px 20px 22px 28px',
                                                                                margin: '0 0 6px 0',
                                                                                height: '5.5px',
                                                                                fontWeight: 'bolder',
                                                                                backgroundColor: snapshot.isDragging ? grey[700] : getColor(item),
                                                                                color: 'white',
                                                                                flexWrap: 'wrap',
                                                                                fontFamily: 'NanumSquareRound',
                                                                                                     
                                                                                borderStyle: item.leader !== '' ? 'solid' : null,
                                                                                borderWidth: item.leader !== '' ? '4px' : '0px',
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
            </Grid>
            <Grid item> 
            <div className={classes.floorNav}>
                <Link to="/SelectRoom1">
                <ButtonBase>
                    <Paper className={classes.sign}>
                        <Typography variant='h5'>1F</Typography>
                    </Paper>
                </ButtonBase>
                </Link>
                <Link to="/SelectRoom2">
                <ButtonBase>
                    <Paper className={classes.sign}>
                        <Typography variant='h5'>2F</Typography>
                    </Paper>
                </ButtonBase>
                </Link>
                <Link to="/SelectRoom3">
                <ButtonBase>
                    <Paper className={classes.sign}>
                        <Typography variant='h5'>3F</Typography>
                    </Paper>
                </ButtonBase>
                </Link>
                <Link to="/SelectRoom4">
                <ButtonBase>
                    <Paper className={classes.sign}>
                        <Typography variant='h5'>4F</Typography>
                    </Paper>
                </ButtonBase>
                </Link>
                <Link to="/SelectRoom5">
                <ButtonBase>
                    <Paper className={classes.sign}>
                        <Typography variant='h5'>5F</Typography>
                    </Paper>
                </ButtonBase>
                </Link>
                <Link to="/SelectRoom6">
                <ButtonBase>
                    <Paper className={classes.sign}>
                        <Typography variant='h5'>6F</Typography>
                    </Paper>
                </ButtonBase>
                </Link>
            </div>
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
                        ????????? Lothem                        
                    </Typography>
                </div>

                {/* list / links */}
                 <List>
                    <Typography variant="h6" className={classes.title}>
                        STEP 4: <br/>???????????????
                    </Typography>
                    <Typography  className={classes.title}>
                        ??? ??????????????? ???????????? ??? ?????? ???????????? ?????? ?????? ??? ??????????????????.
                    </Typography>
                    <Typography  className={classes.title}>
                        ??? ???????????? ?????? ????????? ?????? ????????? ??? ????????????.
                    </Typography>
                    <Typography  className={classes.title}>
                        ??? ????????? ????????? ?????? ????????? ???????????? ??? ??? ????????????.
                    </Typography>
                    <Typography  className={classes.title}>
                        ??? ????????? ??? ??? ????????? ?????? ?????? ????????? ????????? ??? ????????????. 
                    </Typography>
                    <Divider/>
                    <Typography variant="h6" className={classes.title}>
                        ??? ?????? ??????
                    </Typography>
                    {colors.map((colors, index) => (
                    <Grid>
                        <Grid item className={classes.teamColor}>
                            <Card 
                                style ={{
                                    width: '80px',
                                    height: '30px',
                                    marginRight: 10,
                                    backgroundColor: getColor_prof(colors)
                            }}>
                            </Card>
                            
                            <Typography>: {colors} ????????????</Typography>
                        </Grid>
                    </Grid>
                    ))
                    }

                    <br/>
                   
                        <Button 
                            type="submit"
                            fullWidth
                            // size="large" 
                            variant="contained" 
                            color="primary"
                            className={classes.submit}
                            onClick={()=>putUpdateRoommate()}

                        >
                        <Typography variant="h5">???????????? ??????</Typography>
                        </Button>
                </List>
            </Drawer>
        </div>
        </Container>
    )

    }  

 