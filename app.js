const $btnsNavbar = document.querySelectorAll(".navbar li")
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

$categoriasGaleria.forEach((categoria) => {
  categoria.addEventListener('click', (e) => handleCategoriasGaleria(e))
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
    section.id == e.target.innerHTML.toLowerCase() ?
      section.classList.remove("hidden") :
      section.classList.add("hidden")
  })
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
}

function handleBigImg(e){
  if (e.target.tagName != "IMG") return

  $pantallaGrande.classList.remove("hidden")

  const espacioInsertable = $pantallaGrande.querySelector(".pantalla-grande--insertables")
  espacioInsertable.innerHTML +=  `<img src=${e.target.src}>`

  const arrInfo = e.target.alt.split(".")

  arrInfo.forEach((info)=> {
    const renglon = document.createElement("span")
    renglon.innerText = info
    espacioInsertable.appendChild(renglon)
  })

  $pantallaGrande.addEventListener('click', (e)=>{
    if (e.target.tagName == "DIV" || e.target.classList.contains("pantalla-grande--icono__cerrar") || e.target.parentElement.classList.contains("pantalla-grande--icono__cerrar")){
      $pantallaGrande.classList.add("hidden")
      espacioInsertable.innerHTML = ""
    }
    else  if (e.target.classList.contains("pantalla-grande--icono__derecha") || e.target.parentElement.classList.contains("pantalla-grande--icono__derecha")){
      console.log("derehca--")
    } else {
      console.log("izquierda")
    }
  })
}