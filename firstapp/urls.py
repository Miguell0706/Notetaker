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
    path('delete_user', views.delete_user, name='delete_user'),
    path('logout', views.logout_page, name='logout'),
    path('change_password', views.change_password, name='change_password'),
    path('create_folder', views.create_folder, name='create_folder'),
    path('open_folder/<int:id>/', views.open_folder, name='open_folder'),
    path('delete_folder/<int:id>/', views.delete_folder, name='delete_folder'),
]
