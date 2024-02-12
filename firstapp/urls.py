#write the code to display the home page
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('note_detail/<int:note_id>/',views.note_detail, name='note_detail'),
    path('folders',views.folders, name='folders')
]
