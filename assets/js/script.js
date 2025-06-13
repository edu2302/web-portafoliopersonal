'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Modal Certificados variables and functions
document.addEventListener("DOMContentLoaded", function() {
  const certModal = document.getElementById("certModal");
  const certModalImg = document.getElementById("certModalImg");
  const certModalDesc = document.getElementById("certModalDesc");
  const certModalClose = document.getElementById("certModalClose");
  const certModalOverlay = document.getElementById("certModalOverlay");
  const prevImgBtn = document.getElementById("prevImg");
  const nextImgBtn = document.getElementById("nextImg");

  let currentImages = [];
  let currentIndex = 0;

  function openCertModal(images, description) {
    currentImages = images;
    currentIndex = 0;
    certModalImg.src = currentImages[currentIndex];
    certModalImg.alt = description;
    certModalDesc.textContent = description;
    certModal.classList.add("active");
    certModalOverlay.classList.add("active");
  }

  function closeCertModal() {
    certModal.classList.remove("active");
    certModalOverlay.classList.remove("active");
    certModalImg.src = "";
    certModalDesc.textContent = "";
    currentImages = [];
    currentIndex = 0;
  }

  function showImage(index) {
    if (index < 0) {
      currentIndex = currentImages.length - 1;
    } else if (index >= currentImages.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    certModalImg.src = currentImages[currentIndex];
  }

  // Navigation buttons listeners
  prevImgBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextImgBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  // Close modal listeners
  certModalClose.addEventListener("click", closeCertModal);
  certModalOverlay.addEventListener("click", closeCertModal);

  // Open modal on certificate click
  document.querySelectorAll(".blog-post-item > a").forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const blogItem = anchor.closest(".blog-post-item");
      const img1 = blogItem.getAttribute("data-img1");
      const img2 = blogItem.getAttribute("data-img2");
      const description = blogItem.querySelector(".blog-item-title").textContent.trim();
      openCertModal([img1, img2], description);
    });
  });
});

// Función para mostrar los detalles del proyecto
function showProjectDetails(projectId) {
  // Primero, ocultar todas las descripciones
  const allDescriptions = document.querySelectorAll('.project-description');
  allDescriptions.forEach(description => {
    description.classList.remove('active');
  });

  // Luego, mostrar la descripción del proyecto seleccionado
  const selectedProject = document.getElementById(`${projectId}-description`);
  if (selectedProject) {
    selectedProject.classList.add('active'); // Asegurarse de que se agrega correctamente la clase 'active'
  }

  // Ocultar la lista de proyectos mientras se muestra la descripción
  document.getElementById('projectList').classList.add('hidden');

  // Mostrar el contenedor de descripciones
  document.getElementById('project-description-container').style.display = 'block';
}

// Función para cerrar la descripción y mostrar nuevamente la lista de proyectos
function closeDescription() {
  const allDescriptions = document.querySelectorAll('.project-description');
  allDescriptions.forEach(description => {
    description.classList.remove('active');
  });

  // Mostrar la lista de proyectos nuevamente
  document.getElementById('projectList').classList.remove('hidden');

  // Ocultar el contenedor de descripciones
  document.getElementById('project-description-container').style.display = 'none';
}