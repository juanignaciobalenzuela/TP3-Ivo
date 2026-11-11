let personajes = []

const container = document.getElementById('personajesContainer')
const IMG_BASE = 'https://cdn.thesimpsonsapi.com/500'

fetch('https://thesimpsonsapi.com/api/characters')
  .then(response => response.json())
  .then(data => {
    console.log('Personajes cargados')
    console.log(data)
    personajes = data.results     
    mostrarPersonajesConForEach(personajes)
  })
  .catch(error => {
    console.error('Error al leer la API:', error)
  })

function mostrarPersonajesConForEach(lista) {
  container.innerHTML = ""

  lista.forEach(personaje => {
    const edad = personaje.age !== null ? `Age: ${personaje.age}` : 'Age: ?'
    const claseEstado = personaje.status === 'Alive' ? 'alive' : 'dead'
    const frase = personaje.phrases.length > 0
      ? `<p class="frase">"${personaje.phrases[0]}"</p>`
      : ""

    container.innerHTML += `
      <article class="card">
        <img src="${IMG_BASE}${personaje.portrait_path}" alt="${personaje.name}" loading="lazy">
        <h2>${personaje.name}</h2>
        <p class="trabajo">${personaje.occupation}</p>
        <div class="badges">
          <span class="badge">${edad}</span>
          <span class="badge ${claseEstado}">${personaje.status}</span>
        </div>
        ${frase}
      </article>`
  })
}