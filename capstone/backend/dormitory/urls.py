from django.urls import include, path
from dormitory import views



urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    # path('uploadExcel/', views.simple_upload, name="uploadExcel"),
    # path('SelectFloor/', views.FloorView.as_view(), name="FloorView"),
    # path('currentInfo/', views.CurrentInfoView),
    path('getStudentInfo/', views.StudentInfoView.as_view()),
    path('updateGenderInfo/', views.GenderInfoView.as_view()), 
    path('updateFloorInfo6/', views.updateFloor6),
    path('updateFloorInfo5/', views.updateFloor5),
    path('updateFloorInfo4/', views.partial_update),
    path('updateFloorInfo3/', views.updateFloor3),
    path('updateFloorInfo2/', views.updateFloor2),
    path('updateFloorInfo1A/', views.updateFloor1A),
    path('updateFloorInfo1B/', views.updateFloor1B),
    # path('teamInfo/', views.TeamInfoView.as_view()),
    path('updateRoom/', views.RoomInfoView.as_view()),
    path('updateRoommates/', views.UpdateRommateView),
    path('putStudentInfo/', views.putStudentInfo),
    path('exportExcel/', views.export_excel),
    path('getFloorInfo/', views.FloorInfoView.as_view())


]