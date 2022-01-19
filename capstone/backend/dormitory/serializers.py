from rest_framework import serializers
import inspect
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import NotFound
from .models import *


class BulkListSerializer(serializers.ListSerializer):
    def update(self, queryset, validated_data):
        id_attr = getattr(self.child.Meta, 'update_lookup_field')
        update_data = {i.get(id_attr): i for i in validated_data}

        if not all((bool(i) and not inspect.isclass(i) for i in update_data.keys())):
            raise NotFound(_('업데이트 할 데이터가 없습니다.'))

        objects = queryset.filter(**{'{}__in'.format(id_attr): update_data.keys()})

        if len(update_data) != objects.count():
            raise NotFound(_('업데이트 할 데이터가 없습니다.'))
        
        ret = []
        for id, data in update_data.items():
            for obj in objects:
                if str(getattr(obj, id_attr)) == str(id):
                    ret.append(self.child.update(obj, data))
        
        return ret 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email',  'last_login', 'date_joined', 'is_staff')

class RC_infoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RC_info
        fields = '__all__'

class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = RC_info
        fields = ('male_count', 'female_count')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_info
        fields = ('student_id', 'name', 'gender', 'RC', 'bed_count', 'team_prof', 'leader_yn')

class StudentRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_info
        fields = ('student_id', 'room_number', 'name', 'team_prof', 'leader_yn')

class StudentCurrentSerializer(serializers.ModelSerializer):
   class Meta:
       model = student_info
       fields = ('student_id', 'gender', 'bed_count')


class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = floor_info
        fields = '__all__'
        update_lookup_field = 'student_id'
        list_serializer_class = BulkListSerializer

class CurrentSerializer(serializers.ModelSerializer):
    class Meta:
        model = current_info
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = team_info
        fields = '__all__'


