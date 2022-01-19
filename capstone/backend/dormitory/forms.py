from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import CustomUser
from .models import student_info


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', )
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = UserChangeForm.Meta.fields


# class StudentRegistration(forms.ModelForm):
#     class Meta:
#         model = student_info
#         fields =[ 'year_semester','student_id', 'RC','nationality','department', 'gender','living_name' ,'bed_count','living_floor',
#                   'room_number','bed_number','team_prof', 'tub_sub', 'date_of_enter', 'date_of_out', 'how_to_enter', 'enter_team', 'enter_name'
#         ] 