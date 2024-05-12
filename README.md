# Anime Widget

![Anime Widget previw](https://i.imgur.com/gZiiTGy.png)

# Description
AnimeWidget is a comprehensive platform designed for anime enthusiasts. It provides a rich database of anime series, including detailed information about each series, such as title, genre, and rating. So the rating system is a key feature of AnimeWidget. It allows users to rate animes, and it calculates the average rating and the total number of ratings for each series. The rating system is carefully designed to ensure accuracy and fairness. Only ratings that are not null or zero are counted, ensuring that each rating contributes meaningfully to the overall score of an anime. On Each anime page , you guys can see all the data of the anime, the preview and some pictures of it, you guys can also comment and read other comment from another person. Another feature is forum,this feature allows users to create new discussion threads on a variety of topics, such as specific anime series, genres, characters, theories, and more. Each thread can be viewed by all users, fostering an open and inclusive environment for anime discussions. Finally, Anime Widget is just a website for me to show my skill in MERN stack, it is an amazing experience because first MERN full stack web application that I come up with ideas as soon as I finished learning Nodejs. So I hope you guys welcome it 🫶🫶🫶 and I will continue to develop it when i have time and fresh thoughts !!!  

# Build project on local devices

### Software and Technology used:
 * Visual Studio Code
 * MongoDB Compass(for checking or editing database)
 * Postman(for testing APIs)
 * Mailtrap(for getting tokenMail from forgotPassword to resetPassword)


Make sure to install all the Dependencies in package.json file in both backend and frontend folder .

### I. Set up backend

* Create a .env file to store your credentials. Example below:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/animewidget
JWT_SECRET=MySecretBlog
EMAIL_USERNAME=<usernamemailtrap>
EMAIL_PASSWORD=<passwordmailtrap>
EMAIL_HOST=sandbox.smtp.mailtrap.io
```

### II. Set up frontend
* Create a .env file to store your backendURL . Example below:
```
VITE_BACKEND_URL=http://192.168.191.189:3000
```

### III. Run the project

* Run the backend
```
cd backend
npm run start:dev
```

* Run the frontend
```
cd frontend
npm run dev
```

* When finish, open http://localhost:5173/ to view the website. You can also open on others computers connected network with your computer by wifi, Radmin VPN, Zerotier and remember to change the BACKEND_URL on frontend the same as backend to fetch data .

Happy coding!

  




