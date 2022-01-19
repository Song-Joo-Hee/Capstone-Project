import {useState} from 'react';
import XLSX from 'xlsx'
import { Button } from '@material-ui/core';


export const ExcelReader = ( {setData}) => {
    const [file, setFile] = useState({})
  
    const handleChange = async event => {
      const files = event.target.files
      if (files && files [0]) {
        await setFile(files[0])
        await document.getElementById('jsonSettingButton').click()
      }
    }

    const handleFile = () => {
      const reader = new FileReader()
      const rABS = !!reader.readAsBinaryString

      reader.onload = e =>{
        const bstr = e.target.result
        const wb = XLSX.read(bstr, {type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD'})

        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]

        const jsonData = XLSX.utils.sheet_to_json(ws)

        make_cols(ws['!ref'])
        setData(jsonData)
      }

      if(rABS) {
        reader.readAsBinaryString(file)
      } else {
        reader.readAsBinaryString(file)
      }
    }

    const handleFileInputButton = () => {
      document.getElementById('file').click()
    }

    const SheetJSFT = [
      'xlsx',
      'xlsb',
      'xlxm',
      'xls',
      'xml',
      'csv'
    ].map(x => {
      return `.${x}`
    })
    .join(',')

    const make_cols = refstr => {
      const o = []
      const C = XLSX.utils.decode_range(refstr).e.c + 1
      for (let i = 0; i < C; ++i) o[i] = {name: XLSX.utils.encode_col(i), key: i}
      return o
    }
   
    return (
      <div>
        <Button
          variant='contained'
          color = 'primary'
          size = 'medium'
          style={{float : 'right', marginRight: 30}}
          onClick={() => {
            handleFileInputButton()
          }}
          >
            엑셀 업로드
          </Button>
          <input type = 'file' id='file' accept={SheetJSFT} onChange={handleChange} style={{display: 'none'}}/>
          <Button
          id='jsonSettingButton'
          variant='outlined'
          color = 'primary'
          size = 'medium'
          style={{display: 'none'}}
          onClick={() => {
            handleFile()
          }}
          >
           버튼
          </Button>
      </div>
    )
  }

  export default ExcelReader