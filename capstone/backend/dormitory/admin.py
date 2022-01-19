from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import *
from import_export.admin import ImportExportModelAdmin


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email']


admin.site.register(RC_info)
admin.site.register(floor_info)
admin.site.register(current_info)
admin.site.register(team_info)

# @admin.register(student_info)
# class StudentAdmin(ImportExportModelAdmin):
#     list_display = ('year_semester','student_id', 'RC','nationality','department', 'gender','living_name' ,'bed_count','living_floor',
#                   'room_number','bed_number','team_prof', 'tub_sub', 'date_of_enter', 'date_of_out', 'how_to_enter', 'enter_team', 'enter_name', 'enter_status')