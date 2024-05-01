#write the code to display the home page
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('folders',views.folders, name='folders'),
    path('get_note/<int:note_id>/', views.get_note, name='get_note'),
    path('update_note/<int:pk>/', views.update_note, name='update_note'),
    path('create_note', views.create_note, name='create_note'),
    path('delete_note/<int:pk>/', views.delete_note, name='delete_note'),
]
