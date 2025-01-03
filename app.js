const $btnsNavbar = document.querySelectorAll(".navbar li")
const $btnMenuMovil = document.querySelector(".btn-menu-movil")
const $btnMenuMovilCerrar = document.querySelector(".btn-menu-movil--cerrar")
const $menuMovil = document.querySelector(".menu-movil--contenedor")
const $categoriasGaleria = document.querySelectorAll("#categorias-galeria li")
const $galeriasGrid = document.querySelectorAll(".galeria-grid")
const $pantallaGrande = document.querySelector("#pantalla-grande")

const $home = document.querySelector("#home")
const $comisiones = document.querySelector("#comisiones")
const $contacto = document.querySelector("#contacto")
const $galeria = document.querySelector("#galería")


const sections = [$home, $galeria, $comisiones, $contacto]

$btnsNavbar.forEach((btn) => {
  btn.addEventListener('click', (e) => handleBtnNav(e))
})

$btnMenuMovil.addEventListener("click", (e) => handleBtnMenuMovil(e))
$btnMenuMovilCerrar.addEventListener("click", (e) => handleBtnMenuMovilCerrar(e))

$categoriasGaleria.forEach((categoria) => {
  categoria.addEventListener('click', (e) =>
  {
    handleCategoriasGaleria(e)
  })
})

$galeriasGrid.forEach((galeria) => {
  galeria.addEventListener("click", (e) =>
    handleBigImg(e)
  )
})


function handleBtnNav(e) {
  $btnsNavbar.forEach((btn) => {
    if (!btn.classList.contains("selected") && e.target.innerText == btn.innerText) {
      btn.classList.add("selected")
    } else if (btn.classList.contains("selected") && e.target.innerText == btn.innerText) {
      return
    }
    else {
      btn.classList.remove("selected")
    }
  })

  sections.forEach((section) => {
    if (section.id == e.target.innerHTML.toLowerCase()) {
      section.classList.remove("hidden")
      $menuMovil.classList.add("hidden")
    }
    else {
      section.classList.add("hidden")
    }
  })
}

function handleBtnMenuMovil(e) {
  $menuMovil.classList.remove("slide-out")
  $menuMovil.classList.remove("hidden")
  $menuMovil.classList.add("slide-in")
}

function handleBtnMenuMovilCerrar(e) {
  $menuMovil.classList.remove("slide-in")
  $menuMovil.classList.add("slide-out")
  $menuMovil.addEventListener("animationend", ()=>{
    $menuMovil.classList.add("hidden")
  }, {once: true})
}

function handleCategoriasGaleria(e) {
  const nombreCategoria = e.currentTarget.querySelector("span").innerText

  $categoriasGaleria.forEach((categoria) => {
    if (nombreCategoria == categoria.innerText) {
      categoria.classList.toggle("selected")
      $galeriasGrid.forEach((galeria) => {
        if (galeria.id == `galeria-${nombreCategoria.toLowerCase()}`) {
          galeria.classList.toggle("hidden")
        } else {
          galeria.classList.add("hidden")
        }
      })
    } else {
      categoria.classList.remove("selected")
    }
  })

document.querySelector("#categorias-galeria li.selected") ? document.querySelector(".jump").scrollIntoView({behavior:"smooth"}) : ""
}

function scrollToSection(){
  document.querySelector(".galeria-grid:not(.hidden)").scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function handleBigImg(e) {
  if (e.target.tagName != "IMG") return

  $pantallaGrande.classList.remove("hidden")

  const espacioInsertable = $pantallaGrande.querySelector(".pantalla-grande--insertables")
  espacioInsertable.innerHTML += `<img src=${e.target.src}>`

  const arrInfo = e.target.alt.split(".")

  const contenedorRenglon = document.createElement("div")
  contenedorRenglon.classList.add("hidden", "pantalla-grande--insertables__texto")
  arrInfo.forEach((info) => {
    if (info == "") return
    const renglon = document.createElement("span")
    renglon.innerText = info
    contenedorRenglon.appendChild(renglon)
  })

  if (contenedorRenglon.innerHTML != "") espacioInsertable.appendChild(contenedorRenglon)

  $pantallaGrande.addEventListener('click', (e) => {
    if (e.target.tagName == "DIV" || e.target.classList.contains("pantalla-grande--icono__cerrar") || e.target.parentElement.classList.contains("pantalla-grande--icono__cerrar")) {
      $pantallaGrande.classList.add("hidden")
      espacioInsertable.innerHTML = ""
    }
  })
  $pantallaGrande.addEventListener('mouseover', (e) => {
    if (e.target.tagName == "IMG") {
      contenedorRenglon.classList.remove("hidden")
    } else if (e.target.classList.contains("pantalla-grande--fondo")) {
      contenedorRenglon.classList.add("hidden")
    }
  })
}