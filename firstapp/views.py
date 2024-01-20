from django.shortcuts import render, redirect
# Create your views here.
def home(request):
    context = {}
    if request.user.is_authenticated== False:
        return redirect('accounts:login')
    return render(request, 'firstapp/home.html',context)
