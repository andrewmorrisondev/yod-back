<h1>Yuck or Yum</h1>
<a href="https://github.com/andrewmorrisondev/yod-front">
frontend
</a>

# API Documentation

## Overview
The purpose of this api is to provide RESTful functionality for Yuck-or-Yum. The api is built using Node.js, Express, and PostgreSQL.

## Base URL

`http://localhost:3001/api/`

## Authentication

Yuck-or-Yum uses JWT for authentication. The JWT is passed in the request header as the value for the `Authorization` key.

## Error Handling

If there is an error creating, reading, updating, or deleting a resource, the server will respond with a status code of 500 (Internal Server Error) and the error object as the response body.

## Endpoints - MealCards

<br>

### Create

This will add a new meal card to the database.

#### Request Example

```
POST /mealCards

{
    "name": "Scary Burger",
    "photo": "https://upload.wikimedia.org/wikipedia/",
    "about": "Found this pic on the internet",
    "restaurantName": "Burger King",
    "restaurantAddress": "1234 Burger King Way",
}
```

<br>

### Read

This will index all meal cards in the database.

#### Request Example

```
GET /mealCards

Body:

<none>
```

<br>

### Update

This will update a meal card in the database.

#### Request Example

```
GET /mealCards/:id

Body:

{
    "photo": "https://upload.wikimedia.org/wikipedia/",
    "about": "Found this pic on the internet",
    "name": "Ugly Boyga",
    "restaurantName": "Burger Queen",
    "restaurantAddress": "1234 Burger Queen Way",
}
```

<br>

### Delete

This will delete a meal card in the database.

#### Request Example

```
DELETE /mealCards/:id

Body:

<none>
```

<br>

## Endpoints - Profiles

<br>

### Sign Up

This will sign up a new user.

#### Request Example

```
POST /auth/signup

Body:

{
    "name": "andy",
    "email": "andy@andy.andy",
    "password": "andy"
}
```

<br>

### Associate Liked Meals

#### Description

This will add a meal to a users liked meals.

#### Request Example

```
POST /profiles/:likerId/likedMeals/:mealId

Body:

<none>
```

<br>

### Associate Passed Meals

#### Description

This will add a meal to a users passed meals.

#### Request Example

```
POST /profiles/:passerId/passedMeals/:mealId

Body:

<none>
```