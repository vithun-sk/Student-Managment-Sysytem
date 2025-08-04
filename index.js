//Default student Details
let students = [
  {
    id: "S11",
    name: "Vithun",
    age: 18,
    course: "Computer Science Engineering",
    email: "vithun@gmail.com",
    mobile: "9432288654",
    gender: "Male",
    address: "45,abc street ,chennai",
    status: "Active",
  },
  {
    id: "S12",
    name: "Karthi",
    age: 19,
    course: "Medical",
    email: "karthi@gmail.com",
    mobile: "7689288654",
    gender: "Male",
    address: "45,efg street ,chennai",
    status: "Inactive",
  },
  {
    id: "S13",
    name: "Renu",
    age: 18,
    course: "Computer Science Engineering",
    email: "renu@gmail.com",
    mobile: "9439988654",
    gender: "Female",
    address: "45,abc street ,chennai",
    status: "Active",
  },
];
let editMode = false;
let currentEditID = null;

const totalstudents = document.querySelector(".total_no");
const activestudents = document.querySelector(".active_no");
const inactivestudents = document.querySelector(".inactive_no");
const input = document.querySelector(".input_informations");
const table_body = document.querySelector(".table_body");
const searchInput = document.getElementById("searchInput");
const empty_state = document.querySelector(".empty_state");

// While entering into the site or refreshing
window.onload = () => {
  renderTable();
  updateStatistics();
};

// To add the details on the table
function renderTable() {
  if (students.length === 0) {
    empty_state.style.display = "block";
    table_body.innerHTML = "";
  } else {
    empty_state.style.display = "none";
    table_body.innerHTML = "";
    for (let i = 0; i < students.length; i++) {
      const row = document.createElement("tr");
      const statusClass =
        students[i].status.toLowerCase() === "active"
          ? "status-active"
          : "status-inactive";
      row.innerHTML = `<td>${students[i].id}</td>
    <td>${students[i].name}</td>
    <td>${students[i].age}</td>
    <td>${students[i].course}</td>
     <td><span class="status-pill ${statusClass}">${students[i].status}</span></td>
    <td class="action_sec">
      <button class="edit_btn" onclick="edit('${students[i].id}')"><i class="fas fa-edit"></i></button>
      <button class="delete_btn" onclick="delete_student('${students[i].id}')"><i class="fas fa-trash-alt"></i></button>
    </td>
    `;

      table_body.appendChild(row);
    }
    updateStatistics();
  }
}

//To save the input informations
function save(e) {
  e.preventDefault();
  const student = {
    id: document.querySelector(".input_id").value.trim(),
    name: document.querySelector(".input_name").value.trim(),
    age: document.querySelector(".input_age").value.trim(),
    course: document.querySelector(".input_course").value.trim(),
    email: document.querySelector(".input_email").value.trim(),
    mobile: document.querySelector(".input_mobilenumber").value.trim(),
    gender: document.querySelector(".input_gender").value.trim(),
    address: document.querySelector(".input_address").value.trim(),
    status: document.querySelector(".input_status").value.trim(),
  };
  if (
    !student.id ||
    !student.name ||
    !student.age ||
    !student.course ||
    !student.email ||
    !student.mobile ||
    !student.gender ||
    !student.address ||
    !student.status
  ) {
    alert("Fill the details");
    return;
  } else {
    let exists = false;
    if (editMode) {
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === currentEditID) {
          students[i] = student;
          break;
        }
      }
      editMode = false;
      currentEditID = null;
      document.querySelector(".save_btn").textContent = "Save Student";
    } else {
      for (let i = 0; i < students.length; i++) {
        if (student.id === students[i].id) {
          exists = true;
          break;
        }
      }
      if (exists === true) {
        alert("You have already used this id");
        return;
      }
      students.push(student);
    }

    renderTable();
    updateStatistics();
    input.reset();
  }
}

//To Reset the input Informations
function reset() {
  input.reset();
}

//To search the details
function search_details() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  // Filter students array
  const filteredStudents = students.filter((student) => {
    return (
      student.id.toLowerCase().includes(searchTerm) ||
      student.name.toLowerCase().includes(searchTerm) ||
      student.age.toString().includes(searchTerm) ||
      student.course.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.mobile.includes(searchTerm) ||
      student.gender.toLowerCase().includes(searchTerm) ||
      student.address.toLowerCase().includes(searchTerm) ||
      student.status.toLowerCase().includes(searchTerm)
    );
  });

  // Show "No records" if no match
  if (filteredStudents.length === 0) {
    empty_state.style.display = "block";
    table_body.innerHTML = "";
    return;
  }

  // Otherwise, render filtered students
  empty_state.style.display = "none";
  table_body.innerHTML = ""; // Clear current table

  for (let i = 0; i < filteredStudents.length; i++) {
    const student = filteredStudents[i];
    const row = document.createElement("tr");
    const statusClass =
      student.status.toLowerCase() === "active"
        ? "status-active"
        : "status-inactive";
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
       <td><span class="status-pill ${statusClass}">${student.status}</span></td>
      <td class="action_sec">
        <button class="edit_btn" onclick="edit('${student.id}')"><i class="fas fa-edit"></i></button>
        <button class="delete_btn" onclick="delete_student('${student.id}')"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    table_body.appendChild(row);
  }
}

//To Edit the student
function edit(studentID) {
  let edit_student = students.find((s) => s.id === studentID);

  document.querySelector(".input_name").value = edit_student.name;
  document.querySelector(".input_age").value = edit_student.age;
  document.querySelector(".input_id").value = edit_student.id;
  document.querySelector(".input_email").value = edit_student.email;
  document.querySelector(".input_mobilenumber").value = edit_student.mobile;
  document.querySelector(".input_gender").value = edit_student.gender;
  document.querySelector(".input_course").value = edit_student.course;
  document.querySelector(".input_address").value = edit_student.address;
  document.querySelector(".input_status").value = edit_student.status;
  editMode = true;
  currentEditID = studentID;
  document.querySelector(".save_btn").textContent = "Update Student";
  window.scrollTo({ behavior: "smooth" });
  renderTable();
}

// To Delete the student
function delete_student(studentID) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === studentID) {
      if (confirm("Are you sure you want to delete this student?")) {
        students.splice(i, 1);
      }
    }
  }
  renderTable();
  updateStatistics();
  search_details();
}

//Update the Statistics
function updateStatistics() {
  totalstudents.textContent = students.length;
  activestudents.textContent = students.filter(
    (s) => s.status === "Active"
  ).length;
  inactivestudents.textContent = students.filter(
    (s) => s.status === "Inactive"
  ).length;
}
