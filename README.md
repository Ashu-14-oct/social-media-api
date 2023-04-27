# Social Media API

This is a backend API for a social media platform built with Node.js, Express.js, and MongoDB. The API allows users to sign up, log in, create posts, like posts, follow and unfollow other users, and get a list of posts from users they are following. 

## Installation

1. Clone the repository: `https://github.com/Ashu-14-oct/social-media-api.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your secret key
4. Start the server: `npm start`

## Usage

The API has the following endpoints:

### Authentication

#### POST /sign-up

Sign up a new user with a name, email, and password. Returns a JWT token.

#### POST /sign-in

Log in an existing user with an email and password. Returns a JWT token.

### Posts

#### POST /create-post

Create a new post with a title and content.

#### GET /get-post/:id

Get a single post by ID.

### Follow

#### POST /follow/:id

Follow a user by ID.

#### POST unfollow/:id

Unfollow a user by ID.

### Users

#### GET /user/:id/posts

Get a list of posts by a user.

#### GET /user/:id/following

Get a list of users that a user is following.

#### GET /user/:id/followers

Get a list of users that follow a user.


### Example requests

#### Sign up

POST /sign-up
{
"name": "John Doe",
"email": "johndoe@example.com",
"password": "password"
}

#### Log in

POST /sign-in
{
"email": "johndoe@example.com",
"password": "password"
}

#### Create a post

POST /api/posts
{
"content": "Hello, world!"
}


#### Follow a user

POST /follow/607f1d38f7ed310fd432dbaf


#### Unfollow a user

POST /unfollow/607f1d38f7ed310fd432dbaf


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




