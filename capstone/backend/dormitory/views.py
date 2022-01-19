from inspect import Traceback
from django.db.backends.utils import logger
from django.http.response import HttpResponse, HttpResponseBadRequest
from django.views.generic import View
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .models import student_info
import datetime as dt
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.views.generic import TemplateView
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, generics
import openpyxl
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from django.contrib import messages
from tablib import Dataset
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
import logging as log
from django.db import connection
from django.db.models import Count
from rest_framework import filters
import datetime
import xlwt
from django import forms

class indexView(TemplateView):
    template_name = "index.html"

@api_view(['PUT'])
def putStudentInfo(request):
        req_data = request.data
            # 업데이트작업
        for i in req_data:
                student_info.objects.create(year_semester=i['학년도/학기'], student_id=i['학번'], name=i['성명'], gender=i['성별'],
                                            RC=i['소속RC'], living_name=i['배정호관'],bed_count=i['배정인실'],room_number=i['호실'],
                                            bed_number=i['침상번호'],phone_number=i['연락처'], team_prof=i['팀교수명'], tub_sub=i['결핵증명서'],
                                            leader_yn=i['임원'],  department=i['학과'], grade=i['학년'], semester=i['이수학기'], care_yn=i['관심돌봄'],
                                            pre_living_name=i['호관(이전학기)'], pre_room_number=i['호실(이전학기)'], nationality=i['국적'],
                                            student_type=i['학생구분'],now_status=i['학적'],record_change_date=i['학적변동일자'],date_of_out=i['퇴거일'],
                                            same_room=i['같은방신청']
                                            # ,group_code=i['그룹코드'],payment_status=i['납부상태'],date_of_payment=i['납부일'],change_date_of_payment=i['납부수정일'],cancle_yn=i['취소여부']
                                            )
              
        return HttpResponse({
                    'response_success' : True,
                    'message' : '성공적으로 수정되었습니다.'
                    }
                )
            # else:
            #     return HttpResponse({
            #         'response_success' : False,
            #         'message' : '수정 실패하였습니다.'
            #         }
            #     )
        # except Exception:
        #     return HttpResponse({
        #         'response_success' : False,
        #         'message' : '서버에러'
        #         }
        #     )

# class StudentView(View): 
#     def post(self, request): 
#         excelFile = request.FILES['file'] 
        
#         excel = openpyxl.load_workbook(excelFile, data_only=True) 
#         work_sheet = excel.worksheets[0] 
#         all_values = [] 
#         for row in work_sheet.rows: 
#             row_value = [] 
#             for cell in row: row_value.append(cell.value) 
#             all_values.append(row_value)
        
#         for row in all_values:
#             sample_model = student_info(year_semester=row[0],student_id=row[1], RC=row[2],
#                                     nationality=row[3], department=row[4], gender=row[5], 
#                                     living_name=row[6], bed_count=row[7], living_floor=row[8], room_number=row[9], 
#                                     bed_number=row[10], team_prof=row[11],
#                                     tub_sub=row[12], date_of_enter=row[13], date_of_out=row[14], how_to_enter=row[15],
#                                     enter_team=row[16], enter_name=row[17])
#             sample_model.save()

#         response = {'status': 1, 'message': '엑셀파일이 정상적으로 업로드 됐습니다.'} 
#         return HttpResponse(json.dumps(response), content_type='application/json')

   
# @api_view
# @authentication_classes((
#     JWTAuthentication,
#     SessionAuthentication
# ))

 
# def uploadExcel(request):            
#     try:
#         if request.method == 'POST' and request.FILES['myfile']:
          
#             myfile = request.FILES['myfile']        
#             fs = FileSystemStorage()
#             filename = fs.save(myfile.name, myfile)
#             uploaded_file_url = fs.url(filename)
#             excel_file = uploaded_file_url
#             print(excel_file) 
#             empexceldata = pd.read_csv("."+excel_file,encoding='utf-8')
#             print(type(empexceldata))
#             dbframe = empexceldata
#             for dbframe in dbframe.itertuples():
                 
#                 fromdate_time_obj = dt.datetime.strptime(dbframe.date_of_enter, '%d-%m-%Y')
#                 fromdate_time_obj2 = dt.datetime.strptime(dbframe.date_of_out, '%d-%m-%Y')
#                 obj = student_info.objects.create(year_semester=dbframe.year_semester,student_id=dbframe.student_id, name=dbframe.name,
#                                                 RC=dbframe.RC, nationality=dbframe.nationality, department=dbframe.department, living_name=dbframe.living_name, 
#                                                 bed_count=dbframe.bed_count, living_floor=dbframe.living_floor, room_number=dbframe.room_number,
#                                                 bed_number=dbframe.bed_number,team_prof=dbframe.team_prof,tub_sub=dbframe.tub_sub,
#                                                 date_of_enter=fromdate_time_obj,date_of_out=fromdate_time_obj2, how_to_enter=dbframe.how_to_enter)
#                 print(type(obj))
#                 obj.save()
 
#             return render(request, 'index.html', {
#                 'uploaded_file_url': uploaded_file_url
#             })    
#     except Exception as identifier:            
#         print(identifier)
     
#     return render(request, 'index.html',{})

class RC_infoView(viewsets.ModelViewSet) :
    queryset = RC_info.objects.all()
    serializer_class = RC_infoSerializer


class FloorInfoView(generics.ListAPIView) :
    
        model = floor_info

        def list(self, request):
          try:
            queryset = floor_info.objects.values('floor', 'gender')
            serializer = FloorSerializer(queryset, many=True)
            return Response(serializer.data)
          except Exception as e :
             print('this is error')

@api_view(['PUT'])
def updateFloor6(requset):
        floor_gender = floor_info.objects.get(floor='6', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=requset.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

@api_view(['PUT'])
def updateFloor5(requset):
        floor_gender = floor_info.objects.get(floor='5', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=requset.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

@api_view(['PUT'])
def updateFloor4(requset):
        floor_gender = floor_info.objects.all()
        serializer = FloorSerializer(instance= floor_gender, many=True)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)



@api_view(['PUT'])
def partial_update(request):
        req_data = request.data
        try:
            read_count = 0
            write_count = 0
            # 업데이트작업
            for floor in req_data:
                read_count += 1
                print('>>>>>>>>read_count',read_count)
                print('>>>>>>floor',floor)
                update_list = floor_info.objects.filter(name="로뎀관", floor=floor)
                print('>>>>>>req_data.get(floor)',req_data.get(floor))
                print('>>>>>>>>>update_list.update(gender=req_data.get(floor))',update_list.update(gender=req_data.get(floor)))
                if update_list.update(gender=req_data.get(floor)) == 1:
                    write_count+=1
                    print('>>>>>>>write_count',write_count)
                    print('------------------------------------------------------')

            # 가져온데이터 개수 = 업데이트 개수   
            if write_count == read_count:
                return HttpResponse({
                    'response_success' : True,
                    'message' : '성공적으로 수정되었습니다.'
                    }
                )
            else:
                return HttpResponse({
                    'response_success' : False,
                    'message' : '수정 실패하였습니다.'
                    }
                )
        except Exception:
            return HttpResponse({
                'response_success' : False,
                'message' : '서버에러'
                }
            )

@api_view(['PUT'])
def UpdateRommateView(request):
        req_data = request.data
        print('data', req_data)
        try:
            read_count = 0
            write_count = 0
            # 업데이트작업
            for i in req_data:
                read_count += 1
                update_list = student_info.objects.filter(student_id=i['student_id'])
                if update_list.update(room_number=i['room_number']) == 1 and update_list.update(bed_number=i['bed_number']) ==1 :
                    write_count+=1

            # 가져온데이터 개수 = 업데이트 개수   
            if write_count == read_count:
                return HttpResponse({
                    'response_success' : True,
                    'message' : '성공적으로 수정되었습니다.'
                    }
                )
            else:
                return HttpResponse({
                    'response_success' : False,
                    'message' : '수정 실패하였습니다.'
                    }
                )
        except Exception:
            return HttpResponse({
                'response_success' : False,
                'message' : '서버에러'
                }
            )



class UpdateFloorView(viewsets.ModelViewSet):
    serializer_class = FloorSerializer

    @api_view(['PUT'])
    def partial_update(self, request, *args, **kwargs):
        print('>>>>>>>>>Request', request)
        if kwargs.pop("id", None):
            serializer = self.get_serializer(instance=self.get_object(), data=request.data, **kwargs)
        else :
            kwargs["many"] = isinstance(request.data, list)
            serializer = self.get_serializer(self.get_queryset(), data=request.data, **kwargs)
            serializer.is_valid(raise_exception=True)

@api_view(['PUT'])
def updateFloor3(requset):
        floor_gender = floor_info.objects.get(floor='3', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=requset.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

@api_view(['PUT'])
def updateFloor2(requset):
        floor_gender = floor_info.objects.get(floor='2', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=requset.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

@api_view(['PUT'])
def updateFloor1A(requset):
        floor_gender = floor_info.objects.get(floor='1-A', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=requset.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)
@api_view(['PUT'])
def updateFloor1B(requset):
        floor_gender = floor_info.objects.get(floor='1-B', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=requset.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

@api_view(['PUT'])
def updateFloor6(request):
        floor_gender = floor_info.objects.get(floor='6', name='로뎀관')
        serializer = FloorSerializer(instance= floor_gender, data=request.data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

# @api_view(['GET'])
# def CurrentInfoView(request) :
#     queryset = student_info.objects.filter(gender='남자',bed_count='4인실').annotate(quad_room=Count('student_id'))

#     print('>>>>>>>>>>>>>>queryset', queryset.count())

#     serializer = StudentSerializer({'count':queryset.count()}, many=True)

#     return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
class CurrentInfoView(generics.ListAPIView):
    model = student_info
    filter_backends = [filters.SearchFilter]
    search_fields = ['student_id', 'gender', 'bed_count']
    serializer_class = StudentCurrentSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        description_counts = queryset.filter(gender='남자', bed_count='4인실').annotate(count=Count('student_id'))
        serializer = self.get_serializer(description_counts, many=True)
        return Response(serializer.data)
    


class GenderInfoView(generics.ListAPIView) :
    
        model = RC_info

        def list(self, request):
            queryset = RC_info.objects.raw('UPDATE dormitory_rc_info SET \
                                       female_count = (SELECT COUNT(*)\
                                       FROM dormitory_student_info dsi\
                                       WHERE gender = "여자"),\
                                       male_count = (select count(*)\
                                       from dormitory_student_info dsi\
                                       WHERE gender = "남자")\
                                       WHERE dormitory_rc_info.name = "로뎀관" ')
            print('>>>>>>>>>>>>>>>>>>>', queryset.query)
            serializer = GenderSerializer(queryset, many=True)
            return Response(serializer.data)

        # 첫번째 방법                                  
        # queryset = RC_info.objects.raw('UPDATE dormitory_rc_info SET \
        #                                female_count = (SELECT COUNT(*)\
        #                                FROM dormitory_student_info dsi\
        #                                WHERE gender = "여자"),\
        #                                male_count = (select count(*)\
        #                                from dormitory_student_info dsi\
        #                                WHERE gender = "남자")\
        #                             WHERE dormitory_rc_info.name = "로뎀관" ')
        
        # with connection.cursor() as cursor:
        #     queryset = "UPDATE dormitory_rc_info SET \
        #             female_count = (SELECT COUNT(*)\
        #             FROM dormitory_student_info dsi\
        #             WHERE gender = '여자'),\
        #             male_count = (select count(*)\
        #             from dormitory_student_info dsi\
        #             WHERE gender = '남자')\
        #             WHERE dormitory_rc_info.name = '로뎀관'"
        #     cursor.execute(queryset)
        #     row = cursor.fetchone()    
        # logger.warning('>>>>>>>>>> : {}'.format(row))

        # 두번째 방법
        # try:
        #     serializer_class = GenderSerializer
        # except Exception as e:
        #     Traceback.print_exc()

        # def get_queryset(self):
        #         query = ("""
        #            UPDATE dormitory_rc_info SET \
        #            female_count = (SELECT COUNT(*)\
        #            FROM dormitory_student_info dsi\
        #            WHERE gender = '여자'),\
        #            male_count = (select count(*)\
        #            from dormitory_student_info dsi\
        #            WHERE gender = '남자')\
        #            WHERE dormitory_rc_info.name = '로뎀관'
        #         """ )
        #         return raw_sql_select(query, "default")
            

        #serializer_class = GenderSerializer

        # 세번째 방법
        # def list(self, request):
        #     queryset = self.get_queryset()
        #     serializer_class = self.get_serializer_class()
        #     serializer = serializer_class(queryset)

        #     page = self.paginate_queryset(queryset)
        #     if page is not None:
        #         serializer = self.get_serializer(page, many=True)
        #         return self.get_paginated_response(serializer.data)

        #     return Response(serializer.data)
class RoomInfoView(generics.ListAPIView) :
    
        model = student_info

        def list(self, request):
          try:
            queryset = student_info.objects.raw(
               ''' SELECT room_number, student_id, name, team_prof, leader_yn
                    FROM student_data.dormitory_student_info
                    ORDER BY room_number
                ''')

            serializer = StudentRoomSerializer(queryset, many=True)
            return Response(serializer.data)
          except Exception as e :
             print('this is error')

class StudentInfoView(generics.ListAPIView) :
    
        model = student_info

        def list(self, request):
          try:
            queryset = student_info.objects.raw(
               ''' SELECT student_id, name, gender, RC, bed_count, team_prof, leader_yn
                    FROM student_data.dormitory_student_info
                    ORDER BY team_prof
                ''')
            serializer = StudentSerializer(queryset, many=True)
            return Response(serializer.data)
          except Exception as e :
             print('this is error')

def export_excel(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename=student_data' + str(datetime.datetime.now())+'.xlsx'
    wb= xlwt.Workbook(encoding='utf-8')
    ws=wb.add_sheet('학생정보')
    row_num = 0
    font_style=xlwt.XFStyle()
    font_style.font.bold = True
    
    columns = ['학년도/학기','학번','성명','성별','소속RC','배정호관','배정인실','호실','침상번호','연락처','팀교수명',
    '결핵증명서','임원', '학과', '학년','이수학기',	'관심돌봄',	'호관(이전학기)','호실(이전학기)','국적','학생구분','학적','학적변동일자',	
    '단체명','입주일','퇴거일','같은방신청','그룹코드',	'납부상태',	'납부일','납부수정일','취소여부']

    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)
    
    font_style = xlwt.XFStyle()

    rows=student_info.objects.values_list('year_semester','student_id','name','gender','RC','living_name','bed_count',
    'room_number','bed_number','phone_number','team_prof','tub_sub','leader_yn','department','grade',
    'semester','care_yn','pre_living_name','pre_room_number','nationality','student_type','now_status',
    'record_change_date','enter_team','date_of_enter','date_of_out','same_room','group_code','payment_status',
    'date_of_payment','change_date_of_payment','cancle_yn')
    print('>>>>>>>>rows',rows)

    for row in rows:
        row_num+=1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, str(row[col_num]), font_style)
    wb.save(response)
    

    return response

