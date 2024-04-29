#write the code to display the home page
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('folders',views.folders, name='folders'),
    path('get_note/<int:note_id>/', views.get_note, name='get_note'),
]
