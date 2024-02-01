from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


# Create your views here.
#Render the dashboard page here
@login_required(login_url='accounts:login')
def home(request):
    folders = request.user.folders.all()
    notes = request.user.notes.all()
    context = {'folders':folders,'notes':notes}
    if request.user.is_authenticated== False:
        return redirect('accounts:login')
    return render(request, 'firstapp/dashboard.html',context)
