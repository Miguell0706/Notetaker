#write the code to display the home page
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
]
