import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { FormControlLabel, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import { blue, pink, grey } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import { isFriday } from 'date-fns';


const drawerWidth = 290

const useStyles = makeStyles((theme) => ({
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
        margin: theme.spacing(0, 0, 0),
    },
}));

const SelectFloor = () => {

   const { id } = useParams();

   const [gender, setGender] = useState(null)
   const [currentInfo, setCurrentInfo] = useState([])
   const [floorInfo, setFloorInfo] = useState([])
   const labels = ['4인실','2인실','1인실']
   const data = {
        labels: labels,
        datasets: [
        {
            label: '남자',
            backgroundColor: blue[300],
            hoverBackgroundColor: blue[200],
            data: [104,78,0]
        },
        {
            label: '여자',
            backgroundColor: pink[200],
            hoverBackgroundColor: pink[100],
            data: [123,64,9]
        },
        ]
    };

    const getCurrentInfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/dormitory/currentInfo/')
        setCurrentInfo(response.data)
      }

    const getFloorinfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/dormitory/getFloorInfo/')
        for (var i = 0; i<response.data.length; i++){
            if(response.data[i].floor=='1-A'){
                setGender_left(response.data[i].gender)
            }else if(response.data[i].floor=='1-B'){
                setGender_right(response.data[i].gender)
            }else if(response.data[i].floor=='2'){
                setGender2(response.data[i].gender)
            }else if(response.data[i].floor=='3'){
                setGender3(response.data[i].gender)
            }else if(response.data[i].floor=='4'){
                setGender4(response.data[i].gender)
            }else if(response.data[i].floor=='5'){
                setGender5(response.data[i].gender)
            }else if(response.data[i].floor=='6'){
                setGender6(response.data[i].gender)
            }
        }

      }
  


    useEffect(()=>{
      getFloorinfo();
    }, [])
    

    const putGenderInfo = async () => {
    if (valueCheck4()) {

    // let formField = new FormData()

    const data = {
        '6' : sixthGender,
        '5' : fifthGender,
        '4' : fourthGender,
        '3' : thirdGender,
        '2' : secondGender,
        '1-A' : firstGender_left,
        '1-B' : firstGender_right
    }
    
    await axios({
     method: 'PUT',
     url: `http://127.0.0.1:8000/dormitory/updateFloorInfo4/`,
     data: data,
 }).then(response => {
     const resData = response.data
     if(resData){
 
    } else {
         alert(resData.message)
     }
     alert('성별 선택이 완료되었습니다.')
     console.log(data);
    //  window.location.href = "/SelectTeam"
 })
}
}


    // useEffect(()=>{
    //     getCurrentInfo();
    // }, [])
  
   
  
    const valueCheck4 = () => {
        if (sixthGender===''){
            alert('6층 성별이 선택되지 않았습니다.')
            return false
        }
        if (fifthGender===''){
            alert('5층 성별이 선택되지 않았습니다.')
            return false
        }
        if (fourthGender===''){
            alert('4층 성별이 선택되지 않았습니다.')
            return false
        }
        if (thirdGender===''){
            alert('3층 성별이 선택되지 않았습니다.')
            return false
        }
        if (secondGender===''){
            alert('2층 성별이 선택되지 않았습니다.')
            return false
        }
        if (firstGender_left===''){
            alert('1-A층 성별이 선택되지 않았습니다.')
            return false
        }
        if (firstGender_right===''){
            alert('1-B층 성별이 선택되지 않았습니다.')
            return false
        }
        return true
    }    

    
    const classes = useStyles();
    const [sixthGender, setGender6] = useState('')
    const [fifthGender, setGender5] = useState('')
    const [fourthGender, setGender4] = useState('')
    const [thirdGender, setGender3] = useState('')
    const [secondGender, setGender2] = useState('')
    const [firstGender_left, setGender_left] = useState('')
    const [firstGender_right, setGender_right] = useState('')

    return (
        <Container maxWidth='xl'>
        <Grid container>
            <Grid item> 
            <div className={classes.floor}>
            
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='6'>6F</Typography>
                </Paper>
                <Paper className={sixthGender ? (sixthGender  === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={sixthGender} onChange={(e) => (setGender6(e.target.value))}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />
                </RadioGroup>
                <Grid item> 
            <div className={classes.floor}>
            
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='5'>5F</Typography>
                </Paper>
                <Paper className={fifthGender ? (fifthGender === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={fifthGender} onChange={(e) => setGender5(e.target.value)}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />
                </RadioGroup>
                <Grid item> 
            <div className={classes.floor}>
            
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='4'>4F</Typography>
                </Paper>
                <Paper className={fourthGender ? (fourthGender === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={fourthGender} onChange={(e) => setGender4(e.target.value)}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />
            </RadioGroup>
                <Grid item> 
            <div className={classes.floor}>
            
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='3'>3F</Typography>
                </Paper>
                <Paper className={thirdGender ? (thirdGender === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={thirdGender} onChange={(e) => setGender3(e.target.value)}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />         
            </RadioGroup>
                <Grid item> 
            <div className={classes.floor}>
            
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='6'>2F</Typography>
                </Paper>
                <Paper className={secondGender ? (secondGender === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={secondGender} onChange={(e) => setGender2(e.target.value)}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />        
            </RadioGroup>
            <Grid item> 
            <div className={classes.wing}>      
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='1-A'>1-AF</Typography>
                </Paper>
                <Paper className={firstGender_left ? (firstGender_left === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} />            
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={firstGender_left} onChange={(e) => setGender_left(e.target.value)}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />      
            </RadioGroup>
            <Grid item> 
            <div className={classes.wing}>      
                <Paper className={firstGender_right ? (firstGender_right === '남자' ? classes.bluePaper : classes.pinkPaper) : classes.greyPaper} elevation={3} /> 
                <Paper className={classes.sign}>
                    <Typography variant='h5' name='floor' value='1-B'>1-BF</Typography>
                </Paper>          
            </div>
            </Grid>
            <RadioGroup className={classes.radio} value ={firstGender_right} onChange={(e) => setGender_right(e.target.value)}>
                    <FormControlLabel name="gender" value="남자" control={<Radio />} label="M" />
                    <FormControlLabel name="gender" value="여자" control={<Radio />} label="F" />      
            </RadioGroup>
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
                        STEP 3: <br/>남녀층 분류하기
                    </Typography>
                    <Typography  className={classes.title}>
                        1. 각 층의 수용인원에 따라 성별을 선택해주세요.<br/><br/>
                        2. 선택을 완료한 후, 업데이트 버튼을 눌러주세요.<br/><br/>
                        3. 다음단계 버튼을 눌러주세요.
                    </Typography>
                    <br/>
                    <Divider/>
                    <br/>
                    <Typography variant="h6" className={classes.title}>
                        로뎀관 입주신청 현황
                    </Typography>
                    <div className={classes.root}>
                        <Bar
                        data={data}
                        width={255}
                        height={250}
                        options={{
                            maintainAspectRatio: true
                        }}
                        />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {}
                        <Button 
                            type="submit"
                            fullWidth
                            size="large" 
                            variant="contained" 
                            color="primary"
                            className={classes.submit}
                            onClick={()=>putGenderInfo()}

                        >
                        <Typography variant="h5">업데이트</Typography>
                        </Button>
                        <br/>
                        <br/>
                        <Link to="/SelectRooms">
                        <Button 
                            type="submit"
                            fullWidth
                            size="large" 
                            variant="contained" 
                            color="primary"

                        >
                        <Typography variant="h5">다음단계</Typography>
                        </Button>
                        </Link>
                </List>
            </Drawer>
        
        </div>
        </Container>
  

    );
};


export default SelectFloor;