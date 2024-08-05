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

  addAppointment(user, date, time, doctor, reason) {
    if (user) {
      user.appointments.add(date, time, doctor, reason);
    }
  }

  getList() {
    let list = [];
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
}

class Appointment {
  constructor(date, time, doctor, reason) {
    this.date = date;
    this.time = time;
    this.doctor = doctor;
    this.reason = reason;
    this.next = null;
  }
}

class AppointmentList {
  constructor() {
    this.head = null;
  }

  add(date, time, doctor, reason) {
    const newAppointment = new Appointment(date, time, doctor, reason);
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
    let list = [];
    let current = this.head;
    while (current) {
      list.push(current);
      current = current.next;
    }
    return list;
  }
}

const userList = new UserList();

function textValidator(value) {
  element = document.getElementById(value);
  if (element) {
    if (element.value === "") {
      content = document.getElementById(`${value}Info`).textContent;
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
  element = document.getElementById(value);
  if (element) {
    if (element.value == "") {
      content = document.getElementById(`${value}Info`).textContent;
      document.getElementById(
        `${value}Info`
      ).innerHTML = `${content} <span class="error">Campo requerido.</span>`;
    } else if (isNaN(element.value) || element.value.length != 10) {
      content = document.getElementById(`${value}Info`).textContent;
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

  document.getElementById("dateInfo").innerHTML = "Fecha: ";
  document.getElementById("timeInfo").innerHTML = "Hora: ";
  document.getElementById("doctorInfo").innerHTML = "Doctor: ";
  document.getElementById("reasonInfo").innerHTML = "Razon: ";
}

function addUser() {
  clearInfo();
  firstName = textValidator("firstName");
  lastName = textValidator("lastName");
  phone = phoneValidator("phone");
  address = textValidator("address");

  if (
    firstName == "Not Valid" ||
    lastName == "Not Valid" ||
    phone == "Not Valid" ||
    address == "Not Valid"
  ) {
    return;
  }

  userList.add(firstName, lastName, phone, address);
  updateUserList();
  document.getElementById("userForm").reset();
}

let currentUser = null;

function openModal(user) {
  currentUser = user;
  document.getElementById("appointmentModal").style.display = "block";
}

function closeModal() {
  document.getElementById("appointmentModal").style.display = "none";
}

function submitAppointment() {
  clearInfo();
  const date = textValidator("date");
  const time = textValidator("time");
  const doctor = textValidator("doctor");
  const reason = textValidator("reason");

  if (
    date == "Not Valid" ||
    time == "Not Valid" ||
    doctor == "Not Valid" ||
    reason == "Not Valid"
  ) {
    return;
  }

  userList.addAppointment(currentUser, date, time, doctor, reason);
  updateUserList();
  closeModal();
}

function updateUserList() {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = "";

  const users = userList.getList();
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `Nombre: ${user.firstName} ${user.lastName}, Telefono: ${user.phone}, Direccion: ${user.address}`;

    const addAppointmentButton = document.createElement("button");
    addAppointmentButton.textContent = "Agregar Cita";
    addAppointmentButton.onclick = () => openModal(user);
    li.appendChild(addAppointmentButton);

    const appointmentList = document.createElement("ul");
    const appointments = userList.getAppointments(user);
    appointments.forEach((appointment) => {
      const appointmentLi = document.createElement("li");
      appointmentLi.textContent = `Cita: ${appointment.date} ${appointment.time}, Doctor: ${appointment.doctor}, Razon: ${appointment.reason}`;
      appointmentList.appendChild(appointmentLi);
    });
    li.appendChild(appointmentList);

    userListElement.appendChild(li);
  });
}