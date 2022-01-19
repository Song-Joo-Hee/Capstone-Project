import React, { useState, useCallback} from 'react'
import {observable} from 'mobx'
import { inject, observer} from 'mobx-react'
import {Button, Col, Row, Space, Table, message} from 'antd'
import axios from "axios"
import ExcelReader from "../components/ExcelReader"

const ExcelUpload2 = inject(
  
)
(
    observer(props => {
        // const {permission} = props.authStore
        // const { location } = props.location

        const [data, setData] = useState(
            observable({
                loading: true,
                si: {
                    search_values: {
                        year_semester : '' ,
                        student_id : '0',
                        RC : '0',
                        nationality : '',
                        department : '',
                        gender : '0' ,
                        living_name : '0',
                        bed_count : '',
                        living_floor : '',
                        room_number : '',
                        bed_number :'',
                        team_prof : '0' ,
                        tub_sub : '',
                        date_of_enter : '',
                        date_of_out : '',
                        how_to_enter : '',
                        enter_team : '',
                        enter_name : '',
                        enter_status : '',
                    }
                },
                rows: [],
            }),
        )

   
        const [upload_list, set_upload_list] = useState([])

        const upload_list_columns = [
            {
                title: '학기',
                dataIndex: '학기',
                align: 'center',
            },
            {
                title: '학번',
                dataIndex: '학번',
                align: 'center',
            },
            {
                title: 'RC',
                dataIndex: 'RC',
                align: 'center',
            },
            {
                title: '국적',
                dataIndex: '국적',
                align: 'center',
            },
            {
                title: '학생',
                dataIndex: '학생',
                align: 'center',
            },
            {
                title: '성별',
                dataIndex: '성별',
                align: 'center',
            },
            {
                title: '호관',
                dataIndex: '호관',
                align: 'center',
            },
            {
                title: '인실',
                dataIndex: '인실',
                align: 'center',
            },
            {
                title: '층',
                dataIndex: '층',
                align: 'center',
            },
            {
                title: '호실',
                dataIndex: '호실',
                align: 'center',
            },
            {
                title: '침상',
                dataIndex: '침상',
                align: 'center',
            },
            {
                title: '팀교수명',
                dataIndex: '팀교수명',
                align: 'center',
            },
            {
                title: '결핵증명서',
                dataIndex: '결핵증명서',
                align: 'center',
            },
            {
                title: '입주일',
                dataIndex: '입주일',
                align: 'center',
            },
            {
                title: '퇴거일',
                dataIndex: '퇴거일',
                align: 'center',
            },
            {
                title: '입주방법',
                dataIndex: '입주방법',
                align: 'center',
            },
            {
                title: '입주단체명',
                dataIndex: '입주단체명',
                align: 'center',
            },
            {
                title: '입주자',
                dataIndex: '입주자',
                align: 'center',
            },
            {
                title: '입주상태',
                dataIndex: '입주상태',
                align: 'center',
            },
            
        ] // columns
    const new_student_info = useCallback(async () => {
        const edit_upload_list = []
        let insert_flag = true
        if (upload_list.length > 0){
            let index=0
            upload_list.forEach(element => {
                index +=1
                let edit_year_semester = element.학기
                let edit_student_id = element.학번
                let edit_RC = element.RC
                let edit_nationality = element.국적
                let edit_department = element.학생
                let edit_gender = element.성별
                let edit_living_name = element.호관
                let edit_bed_count = element.인실
                let edit_living_floor = element.층
                let edit_room_number = element.호실
                let edit_bed_number = element.침상
                let edit_team_prof = element.팀교수명
                let edit_tub_sub = element.결핵증명서
                let edit_date_of_enter = element.입주일
                let edit_date_of_out = element.퇴거일
                let edit_how_to_enter = element.입주방법
                let edit_enter_team = element.입주단체명
                let edit_enter_name = element.입주자
                let edit_enter_status = element.입주상태

                edit_upload_list.push({
                    year_semester : `${edit_year_semester}`,
                    student_id : `${edit_student_id}`,
                    RC : `${edit_RC}`,
                    nationality : `${edit_nationality}`,
                    department : `${edit_department}`,
                    gender : `${edit_gender}`,
                    living_name : `${edit_living_name}`,
                    bed_count : `${edit_bed_count}`,
                    living_floor : `${edit_living_floor}`,
                    room_number : `${edit_room_number}`,
                    bed_number : `${edit_bed_number}`,
                    team_prof : `${edit_team_prof}`,
                    tub_sub : `${edit_tub_sub}`,
                    date_of_enter : `${edit_date_of_enter}`,
                    date_of_out : `${edit_date_of_out}`,
                    how_to_enter : `${edit_how_to_enter}`,
                    enter_team : `${edit_enter_team}`,
                    enter_name : `${edit_enter_name}`,
                    enter_status : `${edit_enter_status}`,
                })
            })
        }
            if (insert_flag){
                try {
                    data.loading = true
                    const formData = new FormData();
                    formData.append('file', JSON.stringify(edit_upload_list))

                    const URL = "http://127.0.0.1:8000/dormitory/uploadExcel/"
                    const response = axios({
                        method: "post",
                        url : URL,
                        data : formData,
                        headers:{
                          "Content-Type": "multipart/form-data",
                        }
                      })
                    .catch(error => {
                        console.log('api error', error)
                        if (error.response?.status === 403){
                            const errData = error.response?.data?.detail || null
                            props.authStore.logout(errData)
                        }
                    })

                    if (response&& response.data) {
                        const resData = response.data
                        data.si.rows = resData.new_student_info
                        if (resData.success == 'Y'){
                            message.info(resData.message)
                            data.hi.rows = resData.new_student_info
                        } else {
                            message.warn(resData.message)
                        }
                    }
                } catch (error) {
                    console.log('error', error)
                } finally {
                    data.loading = true
                    setData(data)
                }
            }
        
        }, [data, upload_list, props.authStore])

        
    return (
        <div>
            <Row gutter= {[16,16]}>
             <Col flex='auto' style={{padding: 8}}>
                 <ExcelReader setData={set_upload_list}/>
                 <Table
                    columns={upload_list_columns}
                    dataSource={upload_list}
                    size='small'
                    rowKey={record => record.학번}
                    scroll={{ x: '100%'}}
                    bordered
                />
                <Button style={{float: 'right'}} onClick={()=> new_student_info()}>
                    저장
                </Button>
             </Col>
            </Row>
        </div>
     )
    }),
)
export default ExcelUpload2