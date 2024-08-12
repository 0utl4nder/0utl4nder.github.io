class User {
  constructor(firstName, lastName, phone, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.appointments = new AppointmentList();
    this.next = null;
  }
}

class UserList {
  constructor() {
    this.head = null;
  }

  add(firstName, lastName, phone, address) {
    const newUser = new User(firstName, lastName, phone, address);
    if (!this.head) {
      this.head = newUser;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newUser;
    }
    return newUser;
  }

  addAppointment(user, date, time, doctor, specialty) {
    if (user) {
      user.appointments.add(date, time, doctor, specialty);
    }
  }

  getList() {
    const list = [];
    let current = this.head;
    while (current) {
      list.push(current);
      current = current.next;
    }
    return list;
  }

  getAppointments(user) {
    return user ? user.appointments.getList() : [];
  }

  removeUser(index) {
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    let prev = null;
    let currentIndex = 0;
    while (current && currentIndex < index) {
      prev = current;
      current = current.next;
      currentIndex++;
    }
    if (current) {
      prev.next = current.next;
    }
  }
}

class Appointment {
  constructor(date, time, doctor, specialty) {
    this.date = date;
    this.time = time;
    this.doctor = doctor;
    this.specialty = specialty;
    this.next = null;
  }
}

class AppointmentList {
  constructor() {
    this.head = null;
  }

  add(date, time, doctor, specialty) {
    const newAppointment = new Appointment(date, time, doctor, specialty);
    if (!this.head) {
      this.head = newAppointment;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newAppointment;
    }
  }

  getList() {
    const list = [];
    let current = this.head;
    while (current) {
      list.push(current);
      current = current.next;
    }
    return list;
  }

  removeAppointment(index) {
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    let prev = null;
    let currentIndex = 0;
    while (current && currentIndex < index) {
      prev = current;
      current = current.next;
      currentIndex++;
    }
    if (current) {
      prev.next = current.next;
    }
  }
}

const specialties = [
  "Medicina General",
  "Cardiologia",
  "Dermatologia",
  "Neurologia",
  "Pediatria",
  "Psiquiatria",
];

function textValidator(value) {
  const element = document.getElementById(value);
  if (element) {
    if (element.value === "") {
      const content = document.getElementById(`${value}Info`).textContent;
      document.getElementById(
        `${value}Info`
      ).innerHTML = `${content} <span class="error">Campo requerido.</span>`;
    } else {
      return element.value;
    }
  }
  return "Not Valid";
}

function phoneValidator(value) {
  const element = document.getElementById(value);
  if (element) {
    if (element.value === "") {
      const content = document.getElementById(`${value}Info`).textContent;
      document.getElementById(
        `${value}Info`
      ).innerHTML = `${content} <span class="error">Campo requerido.</span>`;
    } else if (isNaN(element.value) || element.value.length !== 10) {
      const content = document.getElementById(`${value}Info`).textContent;
      document.getElementById(
        `${value}Info`
      ).innerHTML = `${content} <span class="error">El telefono debe ser valido.</span>`;
    } else {
      return element.value;
    }
  }
  return "Not Valid";
}

function clearInfo() {
  document.getElementById("firstNameInfo").innerHTML = "Nombre(s): ";
  document.getElementById("lastNameInfo").innerHTML = "Apellido(s): ";
  document.getElementById("phoneInfo").innerHTML = "Telefono (+57): ";
  document.getElementById("addressInfo").innerHTML = "Direccion: ";

  document.getElementById("editFirstNameInfo").innerHTML = "Nombre(s): ";
  document.getElementById("editLastNameInfo").innerHTML = "Apellido(s): ";
  document.getElementById("editPhoneInfo").innerHTML = "Telefono (+57): ";
  document.getElementById("editAddressInfo").innerHTML = "Direccion: ";

  document.getElementById("dateInfo").innerHTML = "Fecha: ";
  document.getElementById("timeInfo").innerHTML = "Hora: ";
  document.getElementById("doctorInfo").innerHTML = "Doctor: ";
  document.getElementById("specialtyInfo").innerHTML = "Especialidad: ";
}

function populateSpecialties() {
  const specialtySelect = document.getElementById("specialty");
  specialtySelect.innerHTML = "";
  specialties.forEach((specialty) => {
    const option = document.createElement("option");
    option.value = specialty;
    option.textContent = specialty;
    specialtySelect.appendChild(option);
  });
}

const userList = new UserList();
let currentUser = null;

function addUser() {
  clearInfo();
  const firstName = textValidator("firstName");
  const lastName = textValidator("lastName");
  const phone = phoneValidator("phone");
  const address = textValidator("address");

  if (
    firstName === "Not Valid" ||
    lastName === "Not Valid" ||
    phone === "Not Valid" ||
    address === "Not Valid"
  ) {
    return;
  }

  clearInfo();
  userList.add(firstName, lastName, phone, address);
  updateUserList();
  document.getElementById("userForm").reset();
}

function openAppointmentModal(user) {
  currentUser = user;
  document.getElementById("appointmentModal").style.display = "block";
  populateSpecialties();
}

function closeAppointmentModal() {
  document.getElementById("appointmentModal").style.display = "none";
  document.getElementById("appointmentForm").reset();
  const addButton = document.querySelector("#appointmentForm button");
  addButton.textContent = "Agregar Cita";
  addButton.onclick = submitAppointment;
}

function openUserEditModal(user) {
  currentUser = user;
  document.getElementById("editFirstName").value = user.firstName;
  document.getElementById("editLastName").value = user.lastName;
  document.getElementById("editPhone").value = user.phone;
  document.getElementById("editAddress").value = user.address;
  document.getElementById("userEditModal").style.display = "block";
}

function closeUserEditModal() {
  document.getElementById("userEditModal").style.display = "none";
  document.getElementById("userEditForm").reset();
}

function submitAppointment() {
  clearInfo();
  const date = textValidator("date");
  const time = textValidator("time");
  const doctor = textValidator("doctor");
  const specialty = document.getElementById("specialty").value;

  if (
    date === "Not Valid" ||
    time === "Not Valid" ||
    doctor === "Not Valid" ||
    !specialty
  ) {
    return;
  }

  userList.addAppointment(currentUser, date, time, doctor, specialty);
  updateUserList();
  closeAppointmentModal();
}

function updateUserList() {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = "";

  const users = userList.getList();
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span> <b>Nombre:</b> ${user.firstName} ${user.lastName}, <b>Telefono:</b> ${user.phone}, <b>Direccion:</b> ${user.address}</span>
      <button class="editBtn" onclick="openUserEditModal(userList.getList()[${index}])">Editar</button>
      <button class="deleteBtn" onclick="deleteUser(${index})">Eliminar</button>
      <button class="addBtn" onclick="openAppointmentModal(userList.getList()[${index}])">Agregar Cita</button>
    `;

    const appointmentList = document.createElement("ul");
    const appointments = userList.getAppointments(user);
    appointments.forEach((appointment, appIndex) => {
      const appointmentLi = document.createElement("li");
      appointmentLi.innerHTML = `
        <span><b>Cita:</b> ${appointment.date} ${appointment.time}, <b>Doctor:</b> ${appointment.doctor}, <b>Especialidad:</b> ${appointment.specialty}</span>
        <button class="editBtn" onclick="editAppointment(${index}, ${appIndex})">Editar</button>
        <button class="deleteBtn" onclick="deleteAppointment(${index}, ${appIndex})">Eliminar</button>
      `;
      appointmentList.appendChild(appointmentLi);
    });
    li.appendChild(appointmentList);

    userListElement.appendChild(li);
  });
}

function updateUser() {
  clearInfo();
  const firstName = textValidator("editFirstName");
  const lastName = textValidator("editLastName");
  const phone = phoneValidator("editPhone");
  const address = textValidator("editAddress");

  if (
    firstName === "Not Valid" ||
    lastName === "Not Valid" ||
    phone === "Not Valid" ||
    address === "Not Valid"
  ) {
    return;
  }

  currentUser.firstName = firstName;
  currentUser.lastName = lastName;
  currentUser.phone = phone;
  currentUser.address = address;

  updateUserList();
  closeUserEditModal();
}

function deleteUser(index) {
  userList.removeUser(index);
  updateUserList();
}

function editAppointment(userIndex, appointmentIndex) {
  const user = userList.getList()[userIndex];
  const appointment = userList.getAppointments(user)[appointmentIndex];
  document.getElementById("date").value = appointment.date;
  document.getElementById("time").value = appointment.time;
  document.getElementById("doctor").value = appointment.doctor;
  document.getElementById("specialty").value = appointment.specialty;

  openAppointmentModal(user);
  const addButton = document.querySelector("#appointmentForm button");
  addButton.textContent = "Actualizar Cita";
  addButton.onclick = function () {
    updateAppointment(userIndex, appointmentIndex);
  };
}

function updateAppointment(userIndex, appointmentIndex) {
  clearInfo();
  const date = textValidator("date");
  const time = textValidator("time");
  const doctor = textValidator("doctor");
  const specialty = document.getElementById("specialty").value;

  if (
    date === "Not Valid" ||
    time === "Not Valid" ||
    doctor === "Not Valid" ||
    !specialty
  ) {
    return;
  }

  const user = userList.getList()[userIndex];
  const appointment = userList.getAppointments(user)[appointmentIndex];
  appointment.date = date;
  appointment.time = time;
  appointment.doctor = doctor;
  appointment.specialty = specialty;

  updateUserList();
  closeAppointmentModal();
}

function deleteAppointment(userIndex, appointmentIndex) {
  const user = userList.getList()[userIndex];
  user.appointments.removeAppointment(appointmentIndex);
  updateUserList();
}
window.onload = function () {
  updateUserList();
  populateSpecialties();
};