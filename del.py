import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('path/to/your/firebase-credentials.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://your-project-id.firebaseio.com'
})