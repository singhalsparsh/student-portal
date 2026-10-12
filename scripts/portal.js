// Load student data from XML
fetch("xml/students.xml")
  .then(function (response) {
    return response.text();
  })
  .then(function (xmlText) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlText, "text/xml");
    var students = xmlDoc.getElementsByTagName("student");

    var topName = "";
    var topMarks = -1;
    var table = document.getElementById("studentTable");

    for (var i = 0; i < students.length; i++) {
      var name = students[i].getElementsByTagName("name")[0].textContent;
      var course = students[i].getElementsByTagName("course")[0].textContent;
      var semester = students[i].getElementsByTagName("semester")[0].textContent;
      var marks = parseInt(students[i].getElementsByTagName("marks")[0].textContent);

      // Build a new row for each student
      var row = document.createElement("tr");

      var cell1 = document.createElement("td");
      cell1.textContent = name;
      row.appendChild(cell1);

      var cell2 = document.createElement("td");
      cell2.textContent = course;
      row.appendChild(cell2);

      var cell3 = document.createElement("td");
      cell3.textContent = semester;
      row.appendChild(cell3);

      var cell4 = document.createElement("td");
      cell4.textContent = marks;
      row.appendChild(cell4);

      table.appendChild(row);

      // Find the student with the highest marks
      if (marks > topMarks) {
        topMarks = marks;
        topName = name;
      }
    }

    document.getElementById("topStudentName").textContent = "Name: " + topName;
    document.getElementById("topStudentMarks").textContent = "Marks: " + topMarks;
  })
    .catch(function (error) {
      document.getElementById("topStudentName").textContent = "Could not load student data.";
    });

// Hide / Show table
var hideBtn = document.getElementById("hideBtn");
var tableSection = document.getElementById("studentTable");
var tableVisible = true;

hideBtn.addEventListener("click", function () {
  tableVisible = !tableVisible;
  if (tableVisible) {
    tableSection.style.display = "table";
    hideBtn.textContent = "Hide Table";
  } else {
    tableSection.style.display = "none";
    hideBtn.textContent = "Show Table";
  }
});

// Change page title
var titleBtn = document.getElementById("titleBtn");
var pageTitle = document.getElementById("pageTitle");
var titleChanged = false;

titleBtn.addEventListener("click", function () {
  titleChanged = !titleChanged;
  if (titleChanged) {
    pageTitle.innerHTML = "My Student Dashboard";
  } else {
    pageTitle.innerHTML = "Student Portal Dashboard";
  }
});

// Toggle dark mode
var themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
