import { obtenerPersonajes } from "./listado-personajes-api";
import { Personaje } from "./listado-personajes.model";

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");

  elementoPersonaje.innerHTML = `
  <img src="http://localhost:3000/${personaje.imagen}" alt="${personaje.nombre}">
  <div class="contenedor-info">
  <p><strong>Nombre</strong>: ${personaje.nombre}</p>
  <p><strong>Especialidad</strong>: ${personaje.especialidad}</p>
  <p><strong>Habilidades</strong>: ${personaje.habilidades[0]}, ${personaje.habilidades[1]}, ${personaje.habilidades[2]}</p>
  </div>
  `;

  return elementoPersonaje;
};

const mostrarPersonajes = async (): Promise<void> => {
  const personajes = await obtenerPersonajes();
  const listado = document.querySelector("#listado-personajes");
  if (listado && listado instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

document.addEventListener("DOMContentLoaded", mostrarPersonajes);

const filtrarPersonajes = async (): Promise<void> => {
  const personajes: Personaje[] = await obtenerPersonajes();
  const listado = document.querySelector("#listado-personajes");
  let textoInput = "";
  const inputFiltrar = document.getElementById("filtrar");
  if (inputFiltrar && inputFiltrar instanceof HTMLInputElement) {
    textoInput = inputFiltrar.value;
  }

  for (const personaje of personajes) {
    if (personaje.nombre.toLowerCase().includes(textoInput)) {
      if (listado && listado instanceof HTMLDivElement) {
        const contenedorPersonaje = crearContenedorPersonaje(personaje);
        listado.appendChild(contenedorPersonaje);
        console.log(personaje);
        break;
      }
    } else {
      console.log("No encontrado");
    }
  }
};

const botonFiltrar = document.querySelector(".filtrar");

if (botonFiltrar && botonFiltrar instanceof HTMLButtonElement) {
  botonFiltrar.addEventListener("click", filtrarPersonajes);
}
