from django.db import models

# Create your models here.
# modelはデータベースに格納されているデータを扱う。
# Djangoではデータベースを直接扱わなくても良いように、models.pyに記述されているクラスを操作することで、データベースを操作することが出来ます。
# modelを使うと、データベースの管理がとても楽に、コードを最小限にしながらWebアプリケーションを作ることが出来ます。

# シンプルにタイトルと作成日時だけをモデルに追加（テーブルのフィールド（カテゴリ）にタイトルと日時を追加）
# ToDoアプリを作成、DjangoとAngularを使用

# Todoという名前のテーブルを作成して、フィールドとしてtitleとcreated_atを追加する。イメージとしてはデータ表の作成
# __str__メソッドでは返り値がstrオブジェクト。作成したインスタンスにstrやprintを適用すると__str__メソッドが呼び出される。
    # この場合はtitleが返される
    # selfはインスタンス自身を示している
    # クラスでコンストラクタを使用する場合は "def __init__(self,strA, str,B,...):"　を使う
class Todo(models.Model):
    title = models.CharField(max_length=140, blank=False)
    # true: completed, false: not yet
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
