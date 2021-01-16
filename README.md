# **NEWS-EXPLORER API**
**PART OF YANDEX.PRAKTICUM DIPLOMA**
--------------

assembled and tuned by **Alex Kurkov**,
_Yandex.Practicum student_


REST API at:\
ssl-protected: https://api.kurkov-news.students.nomoreparties.xyz

http: http://api.kurkov-news.students.nomoreparties.xyz

see [Usage](#Usage) for REST API requests


### **Content**
  - [About](#About)
  - [Setting Up](#Setting-Up)
  - [Usage](#Usage)
  - [Technologies used](#Technologies-used)
---------------------

## About
- The backend SPA News-Explorer, implementing REST.API to provide frontend app with DATABASE storage of users and articles

## Setting Up
You may set Backend Server by cloning this git repository or downloading zipped archive and running these instruction on command line:
```bash
# clone repository
git clone https://github.com/alex-kurkov/news-explorer-api.git
# go inside and switch to branch level-1
cd news-explorer-api && git checkout level-1
# install dependencies
npm install
```
Then you can deploy the local server of **News-explorer API** with:
 ```bash
# you should be in frontend directiory
npm run start
```
or run server in development mode by:
 ```bash
npm run dev
```
Notice, that you should have *GIT*, *Node-JS* of version 14+ installed as well as *Mongo Database* local server active at standard Port. [How to install and run Mongo DB...](https://docs.mongodb.com/manual/installation/)


## Usage
After deployment **News-explorer API** is available to make requests at [http://localhost:3000/](http://localhost:3000/)

# REST API Routes:
  - POST:'/signup' *create new user*
  - POST:'/signin' *authorize user*
  - GET:'/users/me' *get authorized user info*
  - GET:'/articles' *get articles saved by authorized user*
  - POST:'/articles' *save new article by authorized user to DB*
  - DELETE:'/articles/{id}' *delete authorized user card of provided {id}*

The values of body object and parameters referring to database queries are validated by [Joi](https://joi.dev/) validation library and Mongo DB engine. Errors are handled by mongoose and responsed to user if occured.

## Technologies used
backend is built using [Express framework](https://expressjs.com/) and [Mongo Database](https://www.mongodb.com/) thru [mongoose library](https://mongoosejs.com/docs/)\
REST API server is deployed on [Yandex Cloud](https://cloud.yandex.ru/)

--------
[connect me via email](mailto:alexkourkov@yandex.ru "Email")