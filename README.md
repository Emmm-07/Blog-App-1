# Blog-App
A simple web blogging app where you can post blogs, edit/delete your blogs, see other user's blogs and leave a heart react if you liked a blog. This has a Json Web Token (JWT) authentication to ensure a secure blogging experience.
## Link
[https://my-blog-app-bay.vercel.app/](https://my-blog-app-bay.vercel.app/)

## Demo accounts
- Username: jc Password: jc123
- Username: marc Password: marc123
- Username: melv Password: melv123
  
## To run the Frontend in localhost
../frontend > npm start

## To run the backend / API in localhost
../backend > python manage.py runserver

## Features
- Forgot Password function
- Heart React and Comments
- Uses JWT Authentication
- Automatic logout when session/token expires (1 day)
- CRUD functions for Blogs per user
- Restriction of accessing blogs/data when not Logged in

