from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
# from core.models import student_info

class CustomUser(AbstractUser):
    # Any extra fields would go here
    def __str__(self):
        return self.email

class student_info(models.Model):   
    year_semester =models.CharField(max_length=100,null=True) #학년도/학기
    student_id = models.CharField (max_length=100, db_column='student_id', null = False, primary_key=True) #학번
    name = models.CharField (max_length=100, default = '', null=False) #이름
    gender =models.CharField (max_length=100, null=False, default = '') #성별
    RC = models.CharField(max_length=100,null=False)    #RC
    living_name =models.CharField (max_length=100, null=False, default = '') #호관
    bed_count =models.CharField (max_length=100, null=True) #인실 
    room_number =models.CharField (max_length=100,null=True)   #호실
    bed_number = models.CharField (max_length=100,null=True)   #침상
    phone_number =models.CharField (max_length=100,null=True) #연락처
    team_prof = models.CharField (max_length=100, null=False)   #팀교수명
    tub_sub = models.CharField (max_length=100, null=True ) #결핵증명서제출여부
    leader_yn = models.CharField (max_length=100, null=True ) #임원
    department = models.CharField (max_length=100, null=True) #학부
    grade = models.CharField (max_length=3, null=True) #학년
    semester = models.CharField (max_length=10, null=True) #이수학기
    care_yn = models.CharField (max_length=10, null=True) #관심돌봄
    pre_living_name = models.CharField(max_length=100, null=True) #이전호관
    pre_room_number = models.CharField (max_length=100, null=True) #이전호실
    nationality = models.CharField (max_length=100, null=True) #국적
    student_type = models.CharField (max_length=100, null=True) #학생구분
    now_status = models.CharField (max_length=100, null=True) #학적
    record_change_date= models.DateField(null=True) #학적변동일자
    enter_team = models.CharField (max_length=100, null=True) #입주단체명 
    date_of_enter = models.DateField(null=True) #입주일
    date_of_out = models.DateField(null=True) #퇴거일
    same_room = models.CharField (max_length=100, null=True) #같은방신청
    group_code = models.CharField (max_length=100, null=True) #그룹코드
    payment_status = models.CharField (max_length=100, null=True) #납부상태
    date_of_payment = models.DateField(null=True) #납부일 
    change_date_of_payment = models.DateField(null=True) #납부수정일 
    cancle_yn = models.CharField (max_length=100, null=True) #취소여부
   

    def __str__(self):
        return self.student_id

    # def get_new_student_info(edit_upload_list = None):
    #     # try:
    #         StudentInfo = models.get_table('student_info')
    #         if len(edit_upload_list) > 0 :
    #             data_list = []
    #             read_count = 0
    #             for info in edit_upload_list:
    #                 read_count += 1
    #                 student_info_result = StudentInfo.objects.filter(StudentInfo.student_id == info['student_id']).first()

    #                 student_info = StudentInfo()
    #                 student_info.year_semester = info['year_semester']
    #                 student_info.student_id = info['student_id']
    #                 student_info.RC = info['RC']
    #                 student_info.nationality = info['nationality']
    #                 student_info.department = info['department']
    #                 student_info.gender = info['gender']
    #                 student_info.living_name = info['living_name']
    #                 student_info.bed_count = info['bed_count']
    #                 student_info.living_floor = info['living_floor']
    #                 student_info.room_number = info['room_number']
    #                 student_info.bed_number = info['bed_number']
    #                 student_info.year_semester = info['year_semester']
    #                 student_info.team_prof = info['team_prof']
    #                 student_info.tub_sub = info['tub_sub']
    #                 student_info.date_of_enter = info['date_of_enter']
    #                 student_info.date_of_out = info['date_of_out']
    #                 student_info.how_to_enter = info['how_to_enter']
    #                 student_info.enter_team = info['enter_team']
    #                 student_info.enter_name = info['enter_name']
    #                 student_info.enter_status = info['enter_status']
    #                 data_list.append(student_info)

    #             student_info.objects.create(data_list)
    #             student_info.save()
    #             # student_info.objects.bulk_create(data_list)
           


    
    
# 생활관 선택 화면
class RC_info(models.Model): 
    image = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    name = models.CharField(max_length=105, null = False, blank=False)
    male_count = models.IntegerField(null=True,default=0)
    female_count = models.IntegerField(null=True,default=0)

    def __str__(self):
        return self.name 

# 층 선택 화면(각 층 수용정보)
class floor_info(models.Model):
    name = models.CharField(max_length=105, null=True) #호관
    floor = models.CharField(max_length=105, null=True) #층
    personnel = models.IntegerField(null=True) #인원
    room_count = models.IntegerField(null=True) #방 개수 
    gender = models.CharField(max_length=105, null=True) #성별

    def __str__(self):
        return self.floor 

# 현재 현황
class current_info(models.Model):
     name = models.CharField(max_length=105, null=True) #호관
     gender = models.CharField(max_length=105, null=True) #성별
     single_room = models.IntegerField(null=True) #1인실 개수
     double_room = models.IntegerField(null=True) #2인실 개수
     quad_room = models.IntegerField(null=True) #4인실 개수

class team_info(models.Model):
    team_prof = models.CharField(max_length=100, null= False, default='')
    name = models.CharField(max_length=105, null=True)
    gender = models.CharField(max_length=105, null=True)
    team_double_room = models.IntegerField(null=True) #팀 당 2인실 개수
    team_quad_room = models.IntegerField(null=True) #팀 당 4인실 개수
    team_single_room = models.IntegerField(null=True) #팀 당 1인실 개수

