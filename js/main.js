const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = []; //Se almacenarán los elementos de la lista de usuario

getData(); //Para que aparezcan desde el comienzo datos (tan pronto como se carga la página.)

filter.addEventListener("input", (event) => filterData(event.target.value)); // Se añade "addEventListener" al campo de texto para que cuando el usuario escriba algo, se llame a la función filterData con el valor actual del campo de texto

async function getData() {
  try {
    const res = await fetch("https://6674179975872d0e0a950e53.mockapi.io/user");

    if (!res.ok) {
      throw new Error(`Se ha presentado un error: ${res.statusText}`);
    }

    const users = await res.json();

    
    result.innerHTML = ""; // Se limpia cualquier contenido anterior en el elemento result.

    users.forEach((user) => {
      const li = document.createElement("li");

      listItems.push(li); //añade cada nuevo elemento de lista (<li>) al arreglo listItems

       // Rellenar el elemento con la información del usuario (imagen, nombre y descripción)
      li.innerHTML = `
        <img src="${user.avatar}" alt="${user.name_full}">
        <div class="user-info">
            <h4>${user.name_full}</h4>
            <p>${user.description}</p>
        </div>
      `;

       // Añadir el elemento al result en el HTML
      result.appendChild(li);
    });


  } catch (error) {
    console.error("No logramos obtener los datos: ", error);
    result.innerHTML = "<p>No logramos obtener los datos. Por favor, intentelo nuevamente.</p>";
  }
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    //Se verifica si el texto del elemento contiene el término de búsqueda (Se convierte lo ingresado por el usuario en minúsculas).
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
        // Si el elemento coincide con el término de búsqueda, se asegura de que no tenga la clase "hide" (es decir, se muestra)
        item.classList.remove("hide");
    } else {
        item.classList.add("hide")
        // Si el elemento no coincide, añade la clase "hide" para ocultarlo;
    }
  });
}