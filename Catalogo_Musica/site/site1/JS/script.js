// Clase Entity1
class Artista {
    constructor(nombre, nacionalidad, edad) {
        if (!nombre) throw new Error("El nombre del artista no puede estar vacío.");//validacion
        this._nombre = nombre;
        this._nacionalidad = nacionalidad;
        this._edad = edad;
        this._discografia = [];// Inicialización correcta de la discografía
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nuevoNombre) {
        if (!nuevoNombre) throw new Error("El nombre del artista no puede estar vacío.");//validacion
        this._nombre = nuevoNombre;
    }

    get nacionalidad() {
        return this._nacionalidad;
    }

    get edad() {
        return this._edad;
    }

    get discografia() {
        return this._discografia;
    }

    agregarAlbum(album) {
        this._discografia.push(album);
    }
}

// Clase Entity2
class Album {
    constructor(titulo, añoLanzamiento, genero, artista) {
        if (!titulo) throw new Error("El título del álbum no puede estar vacío.");//validacion
        this._titulo = titulo;
        this._añoLanzamiento = añoLanzamiento;
        this._genero = genero;
        this._artista = artista;
        this._canciones = [];
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(nuevoTitulo) {
        if (!nuevoTitulo) throw new Error("El título del álbum no puede estar vacío.");//validacion
        this._titulo = nuevoTitulo;
    }

    get añoLanzamiento() {
        return this._añoLanzamiento;
    }

    get genero() {
        return this._genero;
    }

    get artista() {
        return this._artista;
    }

    get canciones() {
        return this._canciones;
    }

    agregarCancion(cancion) {
        this._canciones.push(cancion);
    }
}

// Clase Entity3
class Cancion {
    constructor(titulo, duracion, album) {
        if (!titulo) throw new Error("El título de la canción no puede estar vacío.");//validacion
        this._titulo = titulo;
        this._duracion = duracion;
        this._album = album;// Relación con la clase Album
        this._artista = album.artista;// Relación indirecta con la clase Artista
        album.agregarCancion(this);// Agregar la canción al álbum
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(nuevoTitulo) {
        if (!nuevoTitulo) throw new Error("El título de la canción no puede estar vacío.");//validacion
        this._titulo = nuevoTitulo;
    }

    get duracion() {
        return this._duracion;
    }

    get album() {
        return this._album;
    }

    get artista() {
        return this._artista;
    }
}

//Programa Principal
// Listas internas para manejar los objetos**
let artistas = [];
let albums = [];
let canciones = [];

// Funciones que crean objetos y los almacenan en listas
// Función para agregar un Artista
function addArtista() {
    let nombre = document.getElementById("p-nom").value;
    let nacionalidad = document.getElementById("p-nac").value;
    let edad = document.getElementById("p-edad").value;

    try {
        let artista = new Artista(nombre, nacionalidad, edad);
        artistas.push(artista);
        alert("Artista agregado correctamente.");
        console.log(artistas);
    } catch (error) {
        alert(error.message);
    }
}

// Función para agregar un Album
function addAlbum() {
    let titulo = document.getElementById("a-titulo").value;
    let añoLanzamiento = document.getElementById("a-añoLan").value;
    let genero = document.getElementById("a-gen").value;
    let nombreArtista = document.getElementById("a-art").value;

    let artista = artistas.find(a => a.nombre === nombreArtista);
    if (artista) {
        try {
            let album = new Album(titulo, añoLanzamiento, genero, artista);
            artista.agregarAlbum(album);
            albums.push(album);
            alert("Álbum agregado correctamente.");
            console.log(albums);
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("Artista no encontrado.");
    }
}

// Función para agregar una Cancion
function addCancion() {
    let titulo = document.getElementById("c-titulo").value;
    let duracion = document.getElementById("c-dur").value;
    let tituloAlbum = document.getElementById("c-alb").value;

    let album = albums.find(a => a.titulo === tituloAlbum);
    if (album) {
        try {
            let cancion = new Cancion(titulo, duracion, album);
            canciones.push(cancion);
            alert("Canción agregada correctamente.");
            console.log(canciones);
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("Álbum no encontrado.");
    }
}

// Función para buscar un Artista
function findArtista() {
    let nombre = document.getElementById("b-nom").value;
    let artista = artistas.find(a => a.nombre === nombre);

    if (artista) {
        alert("Artista encontrado");
        document.getElementById("r-nom").innerText = `Nombre: ${artista.nombre}`;
        document.getElementById("r-nac").innerText = `Nacionalidad: ${artista.nacionalidad}`;
        document.getElementById("r-edad").innerText = `Edad: ${artista.edad}`;

        let discografiaHTML = '<table class="table"><thead><tr><th>Álbum</th><th>Año de Lanzamiento</th><th>Canciones</th></tr></thead><tbody>';
        artista.discografia.forEach(album => {
            let cancionesHTML = album.canciones.map(cancion => `${cancion.titulo} (${cancion.duracion})`).join(', ');
            discografiaHTML += `<tr><td>${album.titulo}</td><td>${album.añoLanzamiento}</td><td>${cancionesHTML}</td></tr>`;
        });
        discografiaHTML += '</tbody></table>';

        document.getElementById("r-disc").innerHTML = discografiaHTML;
    } else {
        document.getElementById("r-nom").innerText = "Artista no encontrado";
        document.getElementById("r-nac").innerText = "";
        document.getElementById("r-edad").innerText = "";
        document.getElementById("r-disc").innerText = "";

        alert("Artista no encontrado");
    }
}

// Función para buscar un Album
function findAlbum() {
    let r = document.getElementById("b-album").value;
    let a = albums.find(album => album.titulo === r);
    if (a) {
        alert("Álbum encontrado");
        document.getElementById("r-titulo-album").innerHTML = "<b>Título: </b>" + a.titulo;
        document.getElementById("r-ano-album").innerHTML = "<b>Año de Lanzamiento: </b>" + a.añoLanzamiento;
        document.getElementById("r-genero-album").innerHTML = "<b>Género: </b>" + a.genero;
        document.getElementById("r-artista-album").innerHTML = "<b>Artista: </b>" + a.artista.nombre;
        document.getElementById("r-canciones-album").innerHTML = "<b>Canciones: </b>" + a.canciones.map(cancion => cancion.titulo).join(', ');
    } else {
        alert("Álbum no encontrado");
    }
}

// Función para buscar una Cancion
function findCancion() {
    let r = document.getElementById("b-cancion").value;
    let c = canciones.find(cancion => cancion.titulo === r);
    if (c) {
        alert("Canción encontrada");
        document.getElementById("r-titulo-cancion").innerHTML = "<b>Título: </b>" + c.titulo;
        document.getElementById("r-duracion-cancion").innerHTML = "<b>Duración: </b>" + c.duracion;
        document.getElementById("r-artista-cancion").innerHTML = "<b>Artista: </b>" + c.artista.nombre;
        document.getElementById("r-album-cancion").innerHTML = "<b>Álbum: </b>" + c.album.titulo;
    } else {
        alert("Canción no encontrada");
    }
}

// Función para actualizar un artista
function updateArtista(nombre, nuevoNombre, nuevaNacionalidad, nuevaEdad) {
    let artista = artistas.find(a => a.nombre === nombre);
    if (artista) {
        try {
            artista.nombre = nuevoNombre;
            artista._nacionalidad = nuevaNacionalidad;
            artista._edad = nuevaEdad;
            alert("Artista actualizado correctamente.");
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("Artista no encontrado.");
    }
}

// Función para eliminar un artista
function deleteArtista(nombre) {
    let index = artistas.findIndex(a => a.nombre === nombre);
    if (index !== -1) {
        artistas.splice(index, 1);
        alert("Artista eliminado correctamente.");
    } else {
        alert("Artista no encontrado.");
    }
}

// Función para actualizar un álbum
function updateAlbum(titulo, nuevoTitulo, nuevoAñoLanzamiento, nuevoGenero) {
    let album = albums.find(a => a.titulo === titulo);
    if (album) {
        try {
            album.titulo = nuevoTitulo;
            album._añoLanzamiento = nuevoAñoLanzamiento;
            album._genero = nuevoGenero;
            alert("Álbum actualizado correctamente.");
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("Álbum no encontrado.");
    }
}

// Función para eliminar un álbum
function deleteAlbum(titulo) {
    let index = albums.findIndex(a => a.titulo === titulo);
    if (index !== -1) {
        albums.splice(index, 1);
        alert("Álbum eliminado correctamente.");
    } else {
        alert("Álbum no encontrado.");
    }
}

// Función para actualizar una canción
function updateCancion(titulo, nuevoTitulo, nuevaDuracion) {
    let cancion = canciones.find(c => c.titulo === titulo);
    if (cancion) {
        try {
            cancion.titulo = nuevoTitulo;
            cancion._duracion = nuevaDuracion;
            alert("Canción actualizada correctamente.");
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("Canción no encontrada.");
    }
}

// Función para eliminar una canción
function deleteCancion(titulo) {
    let index = canciones.findIndex(c => c.titulo === titulo);
    if (index !== -1) {
        canciones.splice(index, 1);
        alert("Canción eliminada correctamente.");
    } else {
        alert("Canción no encontrada.");
    }
}
