from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Note

# Create your views here.
#Render the dashboard page here
@login_required(login_url='accounts:login')
def home(request):
    folders = request.user.folders.all()
    notes = request.user.notes.all()
    pinned_notes = request.user.notes.filter(pinned=True)
    context = {'folders':folders,'notes':notes,'pinned_notes':pinned_notes}
    if request.user.is_authenticated== False:
        return redirect('accounts:login')
    return render(request, 'firstapp/dashboard.html',context)

@login_required(login_url='accounts:login')
def note_detail(request,note_id):
    note = Note.objects.get(pk=note_id)
    context = {'note':note}
    return render(request, 'firstapp/note_detail.html',context)

@login_required(login_url='accounts:login')
def folders(request):
    folders = request.user.folders.all()
    context = {'folders':folders}
    return render(request, 'firstapp/folders.html',context)