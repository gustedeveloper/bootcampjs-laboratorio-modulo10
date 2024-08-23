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
