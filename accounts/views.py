from django.contrib.auth import authenticate,login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# Create your views here.
def login_page(request):
    login_page=True
    context = {'login_page':login_page}
    return render(request, 'accounts/login.html',context)
def register_page(request):
    errors = None
    login_page=False
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(request, username=username, password=password)
            login(request, user)
            return redirect('home')
        errors = form.errors
        print(errors)
    form = UserCreationForm()
    context = {'login_page':login_page,'form': form,'errors':errors}
    return render(request, 'accounts/login.html',context)