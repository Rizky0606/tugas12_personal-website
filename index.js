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
  const {
    inputName,
    dateStart,
    dateEnd,
    techNode,
    techGolang,
    techReact,
    techJavascript,
    inputDescription,
  } = req.body;
  const dateNow = new Date();
  const data = {
    title: inputName,
    startDate: dateStart,
    endDate: dateEnd,
    duration: duration(dateStart, dateEnd),
    content: inputDescription,
    inputNode: techNode,
    inputGolang: techGolang,
    inputReact: techReact,
    inputJavascript: techJavascript,
    fullTime: getFullTime(dateNow),
    author: "Rizky Fauzi Ardiansyah",
    image:
      "https://www.howtopython.org/wp-content/uploads/2020/04/laptops_python-1170x780.jpg",
    author: "",
    postAt: new Date(),
  };

  dataBlog.push(data);

  res.redirect("/");
};

const detailBlog = (req, res) => {
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
  const projectIndex = dataBlog.findIndex((project) => project.id === id);
  const {
    inputName,
    inputStartDate,
    inputEndDate,
    techNode,
    techGolang,
    techReact,
    techJavascript,
    inputDescription,
  } = req.body;
  const dateNow = new Date();
  const data = {
    title: inputName,
    startDate: inputStartDate,
    endDate: inputEndDate,
    duration: duration(inputStartDate, inputEndDate),
    content: inputDescription,
    inputNode: techNode,
    inputGolang: techGolang,
    inputReact: techReact,
    inputJavascript: techJavascript,
    fullTime: getFullTime(dateNow),
    author: "Rizky Fauzi Ardiansyah",
    postAt: new Date(),
    image:
      "https://cms.dailysocial.id/wp-content/uploads/2022/10/arpad-czapp-H424WdcQN4Y-unsplash-scaled.jpg",
  };
  dataBlog.push(data);
  res.redirect("/");
  // delete data
  dataBlog.splice(projectIndex, 1);
};

//
const getFullTime = (time) => {
  let date = time.getDate();

  let monthIndex = time.getMonth();

  let year = time.getFullYear();

  let hours = time.getHours();

  let minutes = time.getMinutes();

  let month;
  switch (monthIndex) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
  }

  if (hours <= 9) {
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${month} ${year} ${hours}:${minutes} WIB`;
};

const getDistance = (time) => {
  let timeNow = new Date();
  let timePost = time;

  let distance = timeNow - timePost;

  let milisecond = 1000;
  let secondInHours = 3600;
  let hoursInDays = 24;

  let distanceDay = Math.floor(
    distance / (milisecond * secondInHours * hoursInDays)
  );
  let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
  let distanceMinutes = Math.floor(distance / (milisecond * 60));
  let distanceSecond = Math.floor(distance / milisecond);

  if (distanceDay > 0) {
    return `${distanceDay} days ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} hours ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} minutes ago`;
  } else {
    return `${distanceSecond} seconds ago`;
  }
};

const duration = (startDate, endDate) => {
  let start = new Date(startDate);
  let end = new Date(endDate);

  let times = end.getTime() - start.getTime();
  let milisecond = 1000;
  let secondInHours = 3600;
  let hoursInDays = 24;
  let days = times / (milisecond * secondInHours * hoursInDays);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} Tahun`;
  } else if (months > 0) {
    return `${months} Bulan`;
  } else if (weeks > 0) {
    return `${weeks} Minggu`;
  } else {
    return `${days} Hari`;
  }
};

// rounting
// get
app.get("/", home);
app.get("/blog", blog);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/blogDetail/:id", detailBlog);
app.get("/deleteBlog/:id", deleteBlog);
app.get("/editBlog/:id", editBlog);

// post
app.post("/blog", addBlog);
app.post("/editBlog", updateBlog);

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
