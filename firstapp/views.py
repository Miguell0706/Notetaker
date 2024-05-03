from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, authenticate, update_session_auth_hash
from .models import Note,Folder
from .forms import NoteForm
from django.utils import timezone
from datetime import datetime, time,timedelta
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
    current_date = timezone.now().date()
    future_date = current_date + timedelta(days=2)
    urgent_notes = request.user.notes.filter(due_date__range=[current_date, future_date]).order_by('due_date')
    pinned_notes = request.user.notes.filter(pinned=True)
    recent_notes = request.user.notes.order_by('-created')
    context = {'folders':folders,'urgent_notes':urgent_notes,'pinned_notes':pinned_notes,'recent_notes':recent_notes}
    if request.user.is_authenticated == False:
        return redirect('accounts:login')
    return render(request, 'firstapp/dashboard.html', context)


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
@login_required(login_url='accounts:login')
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
@login_required(login_url='accounts:login')
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

            note_data = {
                'title': note.title,
                'created': note.created,
                'id':note.id,
            }
            return JsonResponse(note_data)  # Return note data as JSON response
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@login_required(login_url='accounts:login')
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
########################################################################################################CODE FOR MODAL AJAX REQUEST GOES HERE#############################
@login_required(login_url='accounts:login')
def delete_note(request, pk):
    note = get_object_or_404(Note, pk=pk)
    note_data = {
        'id': note.pk,
    }
    if request.method == 'POST':
        note.delete()
        return JsonResponse(note_data)  # Return note data as JSON response
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@login_required(login_url='accounts:login')
def logout_page(request):
    logout(request)
    request.session.flush()
    return redirect('accounts:login')
@login_required(login_url='accounts:login')
def delete_user(request):
    if request.method == 'POST':
        try:
            post_data = json.loads(request.body)
            password = post_data.get('password', '')
            print('here2s')
            user = authenticate(request, username=request.user.username, password=password)
            if user is not None:
                logout(request)
                request.session.flush()
                user.delete()
                redirect('accounts:login')  # Redirect to login page after successful deletion
                return JsonResponse({'success': True})
            else:
                # Return JsonResponse indicating authentication failure
                return JsonResponse({'error': 'Authentication failed'}, satus=401)
        except json.JSONDecodeError:
            # Return JsonResponse for invalid JSON data
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        # Return JsonResponse for unsupported request method
        return JsonResponse({'error': 'Method Not Allowed'}, status=405)
    
@login_required(login_url='accounts:login')
def change_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Assuming you have a form with fields old_password, new_password, confirm_new_password
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')
        confirm_new_password = data.get('confirmPassword')
        # Check if the new passwords match
        if new_password != confirm_new_password:
            return JsonResponse({'error': 'New passwords do not match'}, status=400)
        
        # Check if the old password is correct
        if not request.user.check_password(old_password):
            return JsonResponse({'error': 'Incorrect old password'}, status=400)
        
        # Update the user's password
        request.user.set_password(new_password)
        request.user.save()
        
        # Update the session to reflect the new password
        update_session_auth_hash(request, request.user)
        
        # Return a success response
        return JsonResponse({'success': True})
    
    # If the request method is not POST, return an error response
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
