# Rick and Morty Explorer — pruebas y cobertura

Aplicación React/Next.js para explorar personajes y episodios de *Rick and Morty*. Este README documenta la configuración de **Vitest**, el alcance de las pruebas y la evidencia que debe acompañar la entrega.

> **Estado declarado del proyecto**
>
> El estado de éxito indicado por la persona responsable del proyecto es que las pruebas funcionan correctamente y que **Statements, Branches, Functions y Lines superan el 80 %**. Esta afirmación se conserva como estado reportado; no ha sido ejecutada ni verificada de forma independiente en este entorno porque no se entregó el repositorio fuente completo.

## Requisitos de la asignación

- Configurar y ejecutar pruebas con **Vitest**.
- Cubrir componentes React, utilidades y lógica de negocio.
- Ejecutar la cobertura con el comando exacto:

  ```bash
  vitest run --coverage
  ```

- Mantener **más de 80 %** en todas las métricas exigidas:

  | Métrica | Requisito | Estado reportado |
  | --- | ---: | --- |
  | Statements | > 80 % | Cumple, según la afirmación del proyecto |
  | Branches | > 80 % | Cumple, según la afirmación del proyecto |
  | Functions | > 80 % | Cumple, según la afirmación del proyecto |
  | Lines | > 80 % | Cumple, según la afirmación del proyecto |

- Generar el informe HTML dentro de `coverage/`.
- Entregar evidencia de consola y del informe HTML.
- Publicar el trabajo desde un fork o repositorio fuente identificable.

## Requisitos previos

- Node.js compatible con la versión declarada por el proyecto.
- El gestor de paquetes utilizado por el repositorio (`pnpm`, `npm` o `yarn`). Los comandos de ejemplo usan `pnpm` porque es el flujo documentado actualmente.
- Acceso al fork o repositorio fuente del proyecto.

## Instalación y ejecución

Desde la raíz del repositorio:

```bash
pnpm install
pnpm dev
```

La aplicación debe iniciarse con el script definido en `package.json`. Si el proyecto usa otro gestor, sustituye `pnpm` por el equivalente, sin cambiar la configuración de Vitest.

## Docker 🐳

La aplicación incluye un `Dockerfile` multi-stage y un `.dockerignore` para generar una imagen de producción ligera, portable y reproducible.

### Requisitos previos

- Docker instalado y en ejecución (Docker Desktop en Windows/Mac, o el motor de Docker en Linux).

### Construir la imagen

Desde la raíz del proyecto:

```bash
docker build -t rick-and-morty-explorer .
```

El `Dockerfile` usa una build multi-stage: instala dependencias con `pnpm install --frozen-lockfile`, compila la aplicación con `next build` y produce una imagen final que solo contiene el build de producción.

### Ejecutar el contenedor

```bash
docker run -p 3000:3000 rick-and-morty-explorer
```

Esto expone la aplicación en el puerto `3000` y ejecuta `next start`.

### Verificar la aplicación

Abre [http://localhost:3000](http://localhost:3000) en el navegador. Deberías ver la aplicación Rick and Morty Explorer servida desde el contenedor.

### Archivos de contenerización

- `Dockerfile` — define la imagen multi-stage (dependencias → build → producción).
- `.dockerignore` — excluye `node_modules`, `.next`, `.env` y archivos temporales para que el contexto de construcción sea pequeño y seguro.

## Configuración de Vitest

La configuración debe estar versionada junto con el proyecto. Antes de entregar, comprueba qué archivo usa realmente el repositorio; los nombres habituales son:

- `vitest.config.ts` o `vitest.config.js`.
- `vite.config.ts` con la configuración de `test` integrada.
- `package.json`, sección `scripts` y, si corresponde, sección `vitest`.

La configuración debe contemplar, según la implementación del proyecto:

- Entorno de pruebas para componentes React, normalmente `jsdom`.
- Integración con Testing Library cuando se prueban componentes.
- Alias de imports utilizados por la aplicación (por ejemplo, `@/`).
- Proveedor de cobertura compatible con Vitest.
- Patrones de inclusión y exclusión coherentes con el código fuente.
- Generación del reporte HTML en `coverage/`.

No se deben afirmar opciones concretas que no estén presentes en el fork. La evidencia de entrega debe mostrar el archivo de configuración real y el `package.json` usado.

## Alcance de las pruebas

### Componentes React

Las pruebas de interfaz deben comprobar el comportamiento observable, no únicamente la implementación interna. Como mínimo, documenta casos como:

- Renderizado de datos de un personaje.
- Estados `Alive`, `Dead` y otros estados disponibles.
- Enlaces o navegación a episodios/personajes.
- Estados vacíos, carga y errores cuando estén implementados.
- Interacciones relevantes del componente.

### Utilidades

Las pruebas de utilidades deben cubrir entradas normales y límites, por ejemplo:

- Transformación o normalización de datos de la API.
- Formateo de nombres, episodios o fechas.
- Listas vacías y valores opcionales.
- Resultados esperados para entradas inválidas, si la utilidad los contempla.

### Lógica de negocio y API

Las pruebas de lógica de negocio deben aislar dependencias externas mediante mocks o stubs y cubrir tanto éxito como error. El material de trabajo incluye casos para funciones como `getCharacters`, `getCharacter` y `getEpisodes`, incluyendo páginas personalizadas, respuestas fallidas y listas de episodios vacías.

Ejecuta las pruebas sin depender de la API real: una prueba reproducible no debe requerir red ni modificar datos externos.

## Scripts y comandos

Los nombres de scripts dependen del `package.json` del fork. Como referencia, el flujo mínimo es:

```bash
# Ejecutar todas las pruebas una vez
pnpm exec vitest run

# Ejecutar cobertura: comando exigido por la asignación
pnpm exec vitest run --coverage
```

Si existe un script equivalente, también puede utilizarse:

```bash
pnpm test
pnpm test:coverage
```

En cualquier caso, la evidencia debe incluir explícitamente la invocación efectiva de:

```bash
vitest run --coverage
```

## Cobertura e informe HTML

La ejecución de cobertura debe producir, como mínimo:

```text
coverage/
└── index.html
```

Después de ejecutar el comando, abre `coverage/index.html` en un navegador y conserva una captura donde sean visibles las cuatro métricas: **Statements, Branches, Functions y Lines**. No sustituyas el reporte por una cifra escrita manualmente.

La carpeta `coverage/` suele ser un artefacto generado y puede estar excluida de Git. Si no se versiona, entrega la captura o el artefacto solicitado por la asignación; la configuración y los tests sí deben quedar en el repositorio.

## Evidencia de entrega

La entrega debe incluir evidencia legible y trazable:

1. **Consola:** captura del comando `vitest run --coverage`, el resultado exitoso de Vitest y la tabla de cobertura.
2. **Reporte HTML:** captura de `coverage/index.html` mostrando Statements, Branches, Functions y Lines.
3. **Repositorio:** URL del fork o repositorio fuente y rama o commit evaluado.
4. **Archivos de configuración:** `package.json`, configuración de Vitest/Vite y configuración de TypeScript si interviene en la ejecución.
5. **Pruebas:** ubicación de los archivos de test de componentes React, utilidades y lógica de negocio/API.

En este proyecto se han preparado referencias de evidencia con nombres como:

- `resultado-pruebas-rick-morty-app.jpg` — consola o ejecución de pruebas.
- `resultado-pruebas-rick-morty-html.jpg` — reporte HTML de cobertura.

Verifica que esos archivos correspondan al mismo commit que se entrega. Las imágenes por sí solas no reemplazan el código, la configuración ni la URL del repositorio.

## Fork y repositorio fuente

Completa estos datos con los valores reales del proyecto antes de publicar la entrega:

- **Repositorio/fork:** `<URL pública del fork o repositorio fuente>`
- **Rama evaluada:** `<nombre de rama>`
- **Commit evaluado:** `<hash del commit>`
- **Directorio del proyecto:** `<ruta si el proyecto no está en la raíz>`

Comandos útiles para documentar la procedencia:

```bash
git remote -v
git branch --show-current
git rev-parse HEAD
git status --short
```

## Lista de comprobación

- [ ] El fork o repositorio fuente está identificado con URL, rama y commit.
- [ ] `package.json` contiene los scripts y dependencias usados por Vitest.
- [ ] La configuración de Vitest/Vite está versionada.
- [ ] Hay pruebas de componentes React.
- [ ] Hay pruebas de utilidades.
- [ ] Hay pruebas de lógica de negocio/API con dependencias externas aisladas.
- [ ] `vitest run --coverage` termina correctamente.
- [ ] `coverage/index.html` se genera.
- [ ] Statements supera 80 %.
- [ ] Branches supera 80 %.
- [ ] Functions supera 80 %.
- [ ] Lines supera 80 %.
- [ ] Se adjuntan capturas de consola y del HTML correspondientes al mismo commit.
- [ ] El `Dockerfile` construye la imagen correctamente (`docker build`).
- [ ] El contenedor se ejecuta sin errores (`docker run`) y la app es accesible en el puerto 3000.

## Nota de verificación

Las métricas y el resultado perfecto de las pruebas indicados al inicio son un **estado confirmado por la persona responsable**, no una medición reproducida por este README. Para convertirlo en evidencia verificable, ejecuta el comando exigido desde el fork evaluado y conserva el reporte generado por Vitest.