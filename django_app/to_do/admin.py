from django.contrib import admin

# クラスのインポート
from .models import Todo

# adminサイトのセットアップ
# Djangoのドキュメントを読むことを推奨
# passは何もしない命令

@admin.register(Todo)
class Todo(admin.ModelAdmin):
    pass
