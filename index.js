const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { urlencoded } = require("body-parser");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");
const app = express();

// join path of view folder to run
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// use encode the listen url
app.use(urlencoded({ extended: true }));

app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "john_doe",
    content: {
      text: "Had a great day at the beach! 🌊☀️",
      image_url:
        "https://images.unsplash.com/photo-1717262972695-35a177097e1e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2glMjBkYXl8ZW58MHx8MHx8fDA%3D",
      likes: 120,
    },
  },
  {
    id: uuidv4(),
    username: "susan_ray",
    content: {
      text: "Just finished reading a fantastic book. 📚",
      image_url:
        "https://plus.unsplash.com/premium_photo-1663134288240-eb7222dc3f1b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZyUyMHBhcmt8ZW58MHx8MHx8fDA%3D",

      likes: 85,
    },
  },
  {
    id: uuidv4(),
    username: "michael_23",
    content: {
      text: "Exploring the city today. 🏙️",
      image_url:
        "https://plus.unsplash.com/premium_photo-1663036924240-fb7eab4890cc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXhwbG9yZSUyMGNpdHl8ZW58MHx8MHx8fDA%3D",
      likes: 200,
    },
  },
  {
    id: uuidv4(),
    username: "lisa_m",
    content: {
      text: "Cooked a new recipe for dinner. 🍽️",
      image_url:
        "https://plus.unsplash.com/premium_photo-1705409892694-39677f828078?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29va2VkJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      likes: 75,
    },
  },
  {
    id: uuidv4(),
    username: "andrew_07",
    content: {
      text: "Just finished a long run in the park. 🏃‍♂️",
      image_url:
        "https://plus.unsplash.com/premium_photo-1663134288240-eb7222dc3f1b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZyUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
      likes: 95,
    },
  },
];

// api to list posts
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// api to add new posts
app.get("/posts/new", (req, res) => {
  res.render("newPost");
});
app.post("/posts/new", (req, res) => {
  const { username, text, image_url } = req.body;
  const newPost = {
    id: uuidv4(),
    username: username,
    content: {
      text: text,
      image_url: image_url,
      likes: 0,
    },
  };
  posts.push(newPost);
  res.redirect("/posts");
});

// api to add delete posts
app.get("/posts/delete/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);
  res.redirect("/posts");
});

// api to list post based on id
app.get("/posts/:id", (req, res) => {
  const postID = req.params.id;
  const filteredPost = posts.find((post) => post.id === postID);
  if (filteredPost) {
    res.render("detail", { post: filteredPost });
  } else {
    res.send("Post not found");
  }
});

// api to patch posts
app.get("/posts/edit/:id", (req, res) => {
  const postID = req.params.id;
  const post = posts.find((post) => post.id === postID);

  res.render("editPost", { post });
});
app.patch("/posts/edit/:id", (req, res) => {
  const postID = req.params.id;
  const post = posts.find((post) => post.id === postID);
  const { text, image_url } = req.body;
  if (post) {
    post.content.text = text;
    post.content.image_url = image_url;
    res.redirect("/posts");
  } else {
    res.send("Post not found");
  }
});

app.listen(3000, () => {
  console.log("server running at 3000");
});
