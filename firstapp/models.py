from django.db import models
from django.contrib.auth.models import User

class Folder(models.Model):
    user = models.ForeignKey(User, related_name='folders', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Note(models.Model):
    user = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    folder = models.ForeignKey(Folder, related_name='notes', on_delete=models.SET_NULL, null=True, blank=True)
    pinned = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    due_time = models.TimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title
