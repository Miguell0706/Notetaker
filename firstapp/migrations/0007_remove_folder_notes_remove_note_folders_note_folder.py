# Generated by Django 4.2.7 on 2024-04-26 03:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0006_alter_note_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='folder',
            name='notes',
        ),
        migrations.RemoveField(
            model_name='note',
            name='folders',
        ),
        migrations.AddField(
            model_name='note',
            name='folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='firstapp.folder'),
        ),
    ]
