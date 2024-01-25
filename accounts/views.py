from django.contrib.auth import authenticate,login,logout
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .forms import RegistrationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required


# Create your views here.

def login_page(request):
    login_page=True
    if request.user.is_authenticated:
        return redirect('')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('')
        messages.info(request, 'username or password is incorrect')
        
    context = {'login_page':login_page}
    return render(request, 'accounts/login.html',context)
def register_page(request):
    errors = None
    login_page=False
    if request.user.is_authenticated:
        return redirect('')
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(request, username=username, password=password)
            login(request, user)
            return redirect('')
        errors = form.errors
        print(errors)
    form = RegistrationForm()
    context = {'login_page':login_page,'form': form,'errors':errors}
    return render(request, 'accounts/login.html',context)
def logout_page(request):
    logout(request)
    return redirect('accounts:login')