from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from dormitory import views
from django.conf.urls.static import static
from django.conf import settings

from dormitory.views import RC_infoView


# router = routers.DefaultRouter()
# router.register('Product', views.ProductView, 'Product')

route = routers.DefaultRouter()
route.register("", RC_infoView, basename='RC_infoview')

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    # re_path('.*', TemplateView.as_view(template_name='index.html')),
    path('dormitory/', include('dormitory.urls')),
    # path('',TemplateView.as_view(template_name="index.html")),
    path('SelectDorm/', include(route.urls)), 
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)