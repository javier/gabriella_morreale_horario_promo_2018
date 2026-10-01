# gabriella_morreale_horario_promo_2018

Horarios escolares semanales de la clase, una página por curso escolar, con extraescolares opcionales.
Sitio estático: HTML, CSS y JSON sin más, sin paso de compilación. Listo para GitHub Pages.

Versión publicada: https://javier.github.io/gabriella_morreale_horario_promo_2018/

> **Si solo quieres consultar el horario, basta con leer la sección [Uso](#uso).**
> El resto del documento es para quien mantiene los datos o el código del sitio.

## Uso

- `index.html` muestra todos los cursos. Haz clic en uno para abrir su horario.
- Por defecto, el horario muestra solo el horario lectivo.
- "Seleccionar extraescolares" muestra las actividades del nivel de esa clase. Las actividades que
  se solapan con otra ya elegida aparecen desactivadas e indican con cuál coinciden.
- La selección se guarda en la URL (`?acts=...`), así que el enlace se puede guardar en marcadores o compartir.
  "Copiar enlace" lo copia.
- "Imprimir o guardar PDF" imprime una sola página A4 en horizontal.

## Datos

```
data/years.json                 cursos que aparecen en el índice, del más reciente al más antiguo
data/subjects.json              color de cada asignatura (común a todos los cursos)
data/<year>/timetable.json      clase, nivel, filas, almuerzos del recreo
data/<year>/teachers.json       asignatura -> profesor
data/<year>/pickup.json         cómo y dónde se recoge a los niños
data/<year>/activities.json     extraescolares disponibles ese curso
```

### Cambiar un profesor

Edita `data/<year>/teachers.json` y haz push. Las páginas cargan los datos sin caché, así que el cambio
se ve en cuanto GitHub Pages vuelve a desplegar (normalmente en uno o dos minutos).

```json
{ "LENGUA": "Laura", "MATEMÁTICAS": "Laura" }
```

Las claves deben coincidir con los nombres de asignatura usados en `timetable.json` (las anotaciones como
`(desdoble)` se ignoran al buscar el profesor y el color).

### Recogida

`pickup.json` contiene una entrada por periodo. Todos los campos salvo `title` son opcionales:

```json
{ "periods": [
  { "title": "Recogidas sin extraescolar (octubre a mayo)", "turno": "2.º turno", "comedor": "15:50-16:00",
    "salida": "C/ Viena", "lluvia": "puertas del hall de C/ Viena",
    "calor": "en clase, salida por C/ Viena", "ampliado": "..." }
] }
```

El primer periodo también rellena las celdas de COMEDOR / PATIO (`comedor` y `salida`). Cada periodo
se convierte en una nota debajo del horario.

### Actividades

```json
{ "id": "judo", "name": "JUDO", "days": ["L", "X"], "start": "16:00", "end": "17:15",
  "address": "C/ Viena", "category": "EDUCACIÓN FÍSICA", "school": true, "cursos": [1, 2, 3] }
```

- `days`: cualquiera de `L M X J V`.
- `category`: una asignatura de `subjects.json`; la actividad toma ese color.
- `school: true` muestra la dirección como "Salida C/ ..."; `false` muestra la dirección tal cual está escrita.
- `cursos` (opcional): niveles que pueden elegirla, de `1` a `6` o `"INF"`. Si se omite, está disponible para todos.
- `id` es lo que va en la URL, así que no cambies ids que ya estén en enlaces compartidos.

### Nuevo curso escolar

Copia la carpeta del curso anterior, actualiza sus archivos y añade el curso al principio de
`data/years.json`.

## Pruebas en local

Las páginas cargan el JSON con `fetch`, que los navegadores bloquean en `file://`. En su lugar, arranca un servidor local:

```
python3 -m http.server
```

y abre `http://localhost:8000`.
