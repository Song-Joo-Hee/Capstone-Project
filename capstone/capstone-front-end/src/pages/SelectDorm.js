import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {useLocation} from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,

  },
  paper: {
    padding: theme.spacing(3),
    margin: 20,
    width: 300,
    height: 315,
    display: 'block', 
    flexDirection: 'row',
    background: 'white'
  },
  container: {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  image: {
    width: 300,
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  slider: {
      marginLeft: 30,
      width: 240
  }
}));

const marks = [
    {
        value: 1,
        label: 'STEP 1'
    },
    {
        value: 2,
        label: 'STEP 2',
    },
    {
        value: 3,
        label: 'STEP 3',
    },    
];

function valuetext(value) {
    return 'STEP ${value}';
}

const SelectDorm = () => {
  const [RCInfo, setRCInfo] = useState([])
  const [studentInfo, setStudentInfo] = useState([])

  const getRCinfo = async () => {
    const response = await axios.get('http://127.0.0.1:8000/SelectDorm/')
    setRCInfo(response.data)
    console.log('<<<<<<<<<<<reponse.data', response.data)
  }

  // const getGenderinfo = async () => {
  //   const response = await axios.get('http://127.0.0.1:8000/dormitory/updateGenderInfo/')
  //   setStudentInfo(response.data)
  //   console.log('>>>>>>>response.data',response.data)
  // }


  useEffect(()=>{
    getRCinfo();
    // getGenderinfo();
  }, [])



  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* 로뎀관 */}
      {
        RCInfo.map((RC_info, index) => (
      <Paper className={classes.paper}>
        <Grid className={classes.container} container spacing={2}>
          <Grid item>
            <Link to="/ExcelUpload">
            {/* <ButtonBase className={classes.image} key={RC_info.id}>
              <img className={classes.img} alt="complex" src={RC_info.image} />
            </ButtonBase> */}
            </Link>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                {/* <Typography gutterBottom variant="h6" color="Primary" key={RC_info.id}>
                {RC_info.name}
                </Typography> */}
                <Typography gutterBottom variant="subtitle2">
                  신청현황{" "}
              </Typography>
              {/* {studentInfo.map(student_info =>
                <Typography variant="body2" gutterBottom>
                  · 남 {student_info.male_count} / 300 <br/>
                  · 여 {student_info.female_count} / 300
                </Typography>
              )} */}
               <Typography variant="body2" gutterBottom>
                  · 남  0 / 300 <br/>
                  · 여  0 / 300
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  진행상황
                </Typography>
                <Slider className={classes.slider}
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={1}
                    max={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
  )
  )
}
</div>
    
    
  );
};

export default SelectDorm;
