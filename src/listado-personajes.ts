import { obtenerPersonajes } from "./listado-personajes-api";
import { Personaje } from "./listado-personajes.model";

let personajes: Personaje[] = [];
let personajesFiltrados: Personaje[] = [];

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");
  elementoPersonaje.innerHTML = `
  <img src="http://localhost:3000/${personaje.imagen}" alt="${
    personaje.nombre
  }">
  <div class="contenedor-info">
  <p><strong>Nombre</strong>: ${personaje.nombre}</p>
  <p><strong>Especialidad</strong>: ${personaje.especialidad}</p>
  <p><strong>Habilidades</strong>: ${personaje.habilidades.join(", ")}</p>
  </div>
  `;

  return elementoPersonaje;
};

const mostrarPersonajes = (personajes: Personaje[]): void => {
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

document.addEventListener("DOMContentLoaded", async () => {
  personajes = await obtenerPersonajes();
  mostrarPersonajes(personajes);
});

const filtrarPersonajes = (personajes: Personaje[]): void => {
  personajesFiltrados = [];
  borrarContenedoresPersonajes();
  let textoInput = "";
  const inputFiltrar = document.getElementById("filtrar");
  if (inputFiltrar && inputFiltrar instanceof HTMLInputElement) {
    textoInput = inputFiltrar.value;
  }
  personajesFiltrados = personajes.filter((personaje) =>
    personaje.nombre.toLocaleLowerCase().includes(textoInput)
  );
  mostrarPersonajes(personajesFiltrados);
};

const borrarContenedoresPersonajes = () => {
  const elementosPersonajes = document.querySelectorAll(
    ".personaje-contenedor"
  );
  elementosPersonajes.forEach((elemento) => elemento.remove());
};

const botonFiltrar = document.querySelector(".filtrar");

if (botonFiltrar && botonFiltrar instanceof HTMLButtonElement) {
  botonFiltrar.addEventListener("click", () => {
    filtrarPersonajes(personajes);
  });
}
