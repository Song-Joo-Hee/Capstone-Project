import {useState, useEffect} from 'react';
import XLSX from 'xlsx'
import MaterialTable from 'material-table'
import { Button } from '@material-ui/core';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper
} from "@material-ui/core";
import {Link } from 'react-router-dom';


  const ExcelUpload = () => {
    const [file, setFile] = useState({})
    const [colDefs, setColDefs] = useState()
    const [data, setData] = useState()
    const EXTENSIONS = ['xlsx', 'xls', 'csv']
    const [upload_list, set_upload_list] = useState([])
    const [studentInfo, setStudentInfo] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const getStudentInfo = async () => {
      const response = await axios.get('http://127.0.0.1:8000/dormitory/getStudentInfo/')
      setStudentInfo(response.data)
      console.log(response.data)
    }
  

    useEffect(()=>{
      getStudentInfo();
    }, [])
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChange = async event => {
      const files = event.target.files
      if (files && files [0]) {
        await setFile(files[0])
        await document.getElementById('jsonSettingButton').click()
      }
    //   console.log.info("files:" , files)
    }
    const getExention = (file) => {
        const parts = file.name.split('.')
        const extension = parts[parts.length - 1]
        return EXTENSIONS.includes(extension) // return boolean
      }
    
      const convertToJson = (headers, data) => {
        const rows = []
        data.forEach(row => {
          let rowData = {}
          row.forEach((element, index) => {
            rowData[headers[index]] = element
          })
          rows.push(rowData)
    
        });
        return rows
      }
    const ExcelUpload = (event) => {

        const reader = new FileReader()
        reader.onload = (event) => {
          //parse data
    
          const bstr = event.target.result
          const workBook = XLSX.read(bstr, { type: "binary" })
    
          //get first sheet
          const workSheetName = workBook.SheetNames[0]
          const workSheet = workBook.Sheets[workSheetName]
          //convert to array
          const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
          console.log('>>>>>>>>>>fileData'+fileData)
          const headers = fileData[0]
          const heads = headers.map(head => ({ title: head, field: head }))
          setColDefs(heads)
    
          //removing header
          fileData.splice(0, 1)
    
    
          setData(convertToJson(headers, fileData))

          console.log('>>>>>>>>>>>>>data', data)


          const URL = "http://127.0.0.1:8000/dormitory/putStudentInfo/"

          axios({
           method: "PUT",
           url : URL,
           data : data,
          // headers:{
          //   "Content-Type": "multipart/form-data",
          // }
         }).then(function(response){
          console.log(response)
        })
    }
        if (file) {
          if (getExention(file)) {
            reader.readAsBinaryString(file)
          }
          else {
            alert("파일형식이 맞지 않습니다.")
          }
        } else {
          setData([])
          setColDefs([])
        }
      }

      const handleFileInputButton = () => {
        document.getElementById('file').click()
      }
    
      const SheetJSFT = [
        'xlsx',
        'xlsb',
        'xlsm',
        'xls',
        'xml',
        'csv',
        'txt',
        'html',
        'htm',
      ] 
      .map(x => {
        return `.${x}`
      })
      .join(',')
    
    //   const make_cols = refstr => {
    //     const o = []
    //     const C = XLSX.utils.decode_range(refstr).e.c + 1
    //     for(let i = 0; i < C; ++i) o[i] = {name: XLSX.utils.encode_col(i), key: i}
    //     return 0 
    //   }

  
  return (
    <div className="App">
      {/* <h1 align="center">입주자명단 업로드</h1> */}
      <Button
                  type="primary"
                  variant="contained"
                  style={{ marginBottom: 10, marginLeft:10}}
                  onClick={() => { 
                    handleFileInputButton()
                  }}
      >
       엑셀 업로드
      </Button>
      <input type="file" id='file' accept={SheetJSFT} onChange={handleChange} style={{display: 'none' }}/>
      <Button
                  id='jsonSettingButton'
                  type="primary"
                  variant="outlined"
                  size='medium'
                  style={{ marginBottom: 10, marginLeft:10}}
                  onClick={() => { 
                    ExcelUpload()
                  }}
      >
        저장
      </Button>
      <Link to="/SelectFloor">
      <Button
                  color="primary"
                  variant="contained"
                  size='medium'
                  style={{ marginBottom: 10, marginLeft:1400}}
               

      >
        다음단계
      </Button>
      </Link>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>학번</TableCell>
            <TableCell align="right">이름</TableCell>
            <TableCell align="right">성별</TableCell>
            <TableCell align="right">소속RC</TableCell>
            <TableCell align="right">배정인실</TableCell>
            <TableCell align="right">팀교수님</TableCell>
            <TableCell align="right">임원</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentInfo
          .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
          .map((student_info) => (
            <TableRow
              key={student_info.student_id}
            >
              <TableCell component="th" scope="row">
                {student_info.student_id}
              </TableCell>
              <TableCell align="right">{student_info.name}</TableCell>
              <TableCell align="right">{student_info.gender}</TableCell>
              <TableCell align="right">{student_info.RC}</TableCell>
              <TableCell align="right">{student_info.bed_count}</TableCell>
              <TableCell align="right">{student_info.team_prof}</TableCell>
              <TableCell align="right">{student_info.leader_yn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={studentInfo.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  )
 }

export default ExcelUpload