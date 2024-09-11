# Blog-App
A simple web blogging app where you can post blogs, edit/delete your blogs, see other user's blogs and leave a heart react if you liked a blog. This has a Json Web Token (JWT) authentication to ensure a secure blogging experience.

## To run the Frontend
../frontend > npm start

## To run the backend / API
../backend > python manage.py runserver

## Features
- Uses JWT Authentication
- Automatic logout when session/token expires (1 day)
- CRUD functions for Blogs per user
- Restriction of accessing blogs/data when not Logged in
