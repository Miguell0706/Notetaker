from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Note,Folder
from .forms import NoteForm
from django.utils import timezone
from datetime import datetime, time
import logging
from copy import deepcopy
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json

# Create your views here.
#Render the dashboard page here
@login_required(login_url='accounts:login')
def home(request):
    folders = request.user.folders.all()
    notes = request.user.notes.all()
    pinned_notes = request.user.notes.filter(pinned=True)
    context = {'folders':folders,'notes':notes,'pinned_notes':pinned_notes}
    if request.user.is_authenticated == False:
        return redirect('accounts:login')
    return render(request, 'firstapp/dashboard.html', context)

@login_required(login_url='accounts:login')

@login_required(login_url='accounts:login')
def folders(request):
    folders = request.user.folders.all()
    context = {'folders':folders}
    return render(request, 'firstapp/folders.html',context)

def convert_time_string(time_str):
    # Parse the time string into a datetime object
    time_obj = datetime.strptime(time_str, '%I:%M%p')
    
    # Convert the datetime object to a string in the format '00:00:00'
    formatted_time = time_obj.strftime('%H:%M:%S')

    return formatted_time
def get_note(request, note_id):
    try:
        note = Note.objects.get(pk=note_id)
        note_data = {
                "title":note.title,
                "text":note.text,
                "due_date":note.due_date,
                "due_time":note.due_time,  # Use the converted time
                "folder":note.folder.name if note.folder else None,
                "pinned":note.pinned,
                'id':note.id
            # Add other fields as needed
        }
        return JsonResponse(note_data)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'Note not found'}, status=404)
def update_note(request, pk):
    note = get_object_or_404(Note, pk=pk)

    if request.method == 'POST':
        post_data = json.loads(request.body)
        if post_data.get('due_time'):
            time_str = post_data['due_time']
            formatted_time = convert_time_string(time_str)
            post_data['due_time'] = formatted_time
        form = NoteForm(post_data, instance=note)
        folder_id = post_data.get('folder')
        folder = None
        if folder_id:
            folder = get_object_or_404(Folder, pk=folder_id)

        if form.is_valid():
            title = form.cleaned_data['title']
            text = form.cleaned_data['text']
            due_date = form.cleaned_data['due_date']
            due_time = form.cleaned_data['due_time'] 
            pinned = form.cleaned_data['pinned']
            folder = folder

            note.title = title
            note.text = text
            note.due_date = due_date
            note.due_time = due_time
            note.pinned = pinned
            note.folder = folder
            note.save()
def create_note(request):
    if request.method == 'POST':
        post_data = deepcopy(json.loads(request.body))
    # Preprocess due_time before passing it to the form
        if post_data['due_time']!='':
            time_str = post_data.get('due_time')
            formatted_time = convert_time_string(time_str)  # Implement your time conversion function
            post_data['due_time'] = formatted_time
        # Initialize the form with the updated request data
        form = NoteForm(post_data)
        folder_id = post_data.get('folder')
        folder = None
        if folder_id:
            folder = get_object_or_404(Folder, pk=folder_id)

        if form.is_valid():
            # Get the form data
            title = form.cleaned_data['title']
            text = form.cleaned_data['text']
            due_date = form.cleaned_data['due_date']
            due_time = form.cleaned_data['due_time'] 
            pinned = form.cleaned_data['pinned']
            folder = folder

            # Convert the time string to the desired format
            # Create and save the Note object
            note = Note.objects.create(
                title=title,
                text=text,
                due_date=due_date,
                due_time=due_time,  # Use the converted time
                created=timezone.now(),
                user=request.user,
                folder=folder,
                pinned=pinned,
            )
            note.save()
    else:
        form = NoteForm()