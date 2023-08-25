const express = require("express");
const dataBlog = require("./fake-data");
const app = express();
const PORT = 5000;
const path = require("path");

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("./src"));

app.use(express.urlencoded({ extended: false }));

const home = (req, res) => {
  res.render("index", { dataBlog });
};

const blog = (req, res) => {
  res.render("blog");
};

const contact = (req, res) => {
  res.render("contact");
};

const testimonial = (req, res) => {
  res.render("testimonial");
};

const addBlog = (req, res) => {
  const { inputName, inputDescription } = req.body;

  const data = {
    title: inputName,
    content: inputDescription,
    image:
      "https://www.howtopython.org/wp-content/uploads/2020/04/laptops_python-1170x780.jpg",
    author: "",
    postAt: new Date(),
  };

  dataBlog.push(data);

  res.redirect("/");
};

const blogDetail = (req, res) => {
  const { id } = req.params;

  res.render("project-detail", { data: dataBlog[id] });
};

const deleteBlog = (req, res) => {
  const { id } = req.params;
  dataBlog.splice(id, 1);
  res.redirect("/");
};

const editBlog = (req, res) => {
  const { id } = req.params;
  res.render("editBlog", { data: dataBlog[id] });
};

const updateBlog = (req, res) => {
  const { id } = req.params;
  const { inputName, inputStartDate, inputEndDate, inputDescription } =
    req.body;
  const data = {
    title: inputName,
    startDate: inputStartDate,
    endDate: inputEndDate,
    content: inputDescription,
    author: "Jhin Dae",
    postAt: new Date(),
    image:
      "https://cms.dailysocial.id/wp-content/uploads/2022/10/arpad-czapp-H424WdcQN4Y-unsplash-scaled.jpg",
  };

  // add new data
  dataBlog.push(data);
  // delete data
  dataBlog.splice(data, 1);
  res.redirect("/");
};

// rounting
// get
app.get("/", home);
app.get("/blog", blog);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/blogDetail/:id", blogDetail);
app.get("/deleteBlog/:id", deleteBlog);
app.get("/editBlog/:id", editBlog);

// post
app.post("/blog", addBlog);
app.post("/editBlog", updateBlog);

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
