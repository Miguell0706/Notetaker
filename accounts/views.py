from django.shortcuts import render

# Create your views here.
def login_page(request):
    login=True
    context = {'login':login}
    return render(request, 'accounts/login.html',context)
def register_page(request):
    login=False
    context = {'login':login}
    return render(request, 'acounts/login.html',context)