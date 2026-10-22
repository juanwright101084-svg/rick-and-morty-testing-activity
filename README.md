<<<<<<< HEAD
# Rick and Morty Explorer

Aplicación web de exploración de personajes de **Rick and Morty**. Este README documenta un flujo reproducible para crear y publicar un fork en GitHub, ejecutar la validación local, conservar el reporte HTML de cobertura y adjuntar evidencia.

> **Estado de esta entrega:** las capturas disponibles muestran 100 % en Statements, Branches, Functions y Lines. También se reportan 30 pruebas exitosas en la evidencia disponible; el conteo debe volver a ejecutarse en el entorno local antes de considerarlo verificado.

## Requisitos

- Windows con PowerShell.
- Git instalado y configurado con la identidad de la cuenta que publicará el fork.
- Node.js y pnpm instalados.
- Acceso a GitHub para crear el fork y publicar cambios.

No se incluyen credenciales, tokens ni una URL de repositorio porque no fueron proporcionados.

## 1. Crear y clonar un fork en GitHub

1. Abre en el navegador la página del repositorio original.
2. Selecciona **Fork** y elige tu cuenta u organización de destino.
3. Conserva el nombre del repositorio o elige uno identificable, según las reglas del proyecto.
4. No marques ni desmarques opciones de visibilidad sin confirmar la política del repositorio.
5. Copia la URL HTTPS o SSH que GitHub muestre para **tu fork**.
6. En PowerShell, reemplaza los valores entre `<...>` por datos reales:

```powershell
Set-Location C:\xampp\htdocs

git clone <URL_DE_TU_FORK>
Set-Location .\<NOMBRE_DEL_REPOSITORIO>

git remote -v
```

Comprueba que `origin` apunta a tu fork. Si necesitas conservar el repositorio original como referencia, agrega un remoto `upstream` usando la URL que GitHub muestre para el original:

```powershell
git remote add upstream <URL_DEL_REPOSITORIO_ORIGINAL>
git remote -v
```

### Crear una rama de trabajo y publicar cambios

```powershell
git switch -c docs/readme-cobertura
# Realiza los cambios y revisa los archivos modificados
git status --short

git add README.md evidencia\resultado-pruebas-rick-morty-app.jpg evidencia\resultado-pruebas-rick-morty-html.jpg
git commit -m "docs: documentar fork, cobertura y evidencia"
git push --set-upstream origin docs/readme-cobertura
```

Después, abre el fork en GitHub y crea un Pull Request si el flujo del proyecto lo requiere. No se afirma aquí que el fork ni el Pull Request ya existan: deben verificarse en la cuenta correspondiente.

## 2. Instalar y ejecutar el proyecto

Desde la raíz del repositorio:

```powershell
pnpm install
pnpm dev
```

Abre la dirección local que muestre Next.js en la consola, normalmente `http://localhost:3000`. Si el proyecto usa otra configuración, utiliza la URL que indique la salida del comando.

## 3. Ejecutar las pruebas y verificar el conteo

Ejecuta primero la suite normal:

```powershell
pnpm test
```

Registra el resultado de la consola. La evidencia aportada **reporta 30 tests pasaron**, pero este README no lo marca como verificado porque no se ejecutó la suite dentro de este entorno. Para comprobarlo de forma explícita, guarda la salida y revisa el resumen que imprima Vitest:

```powershell
pnpm test 2>&1 | Tee-Object -FilePath .\test-output.txt
Get-Content .\test-output.txt | Select-Object -Last 30
```

Si el proyecto no tiene un script `test`, consulta los scripts disponibles y usa el comando definido por el repositorio:

```powershell
(Get-Content .\package.json -Raw | ConvertFrom-Json).scripts
```

## 4. Generar y revisar el reporte HTML de cobertura

Ejecuta el script de cobertura configurado por el proyecto:

```powershell
pnpm test:coverage
```

Si ese script no existe, revisa `package.json` antes de sustituirlo por el comando equivalente del proyecto. No se debe asumir el nombre del script sin comprobarlo.

Busca el archivo de entrada generado:

```powershell
Test-Path .\coverage\index.html
Get-ChildItem .\coverage -Recurse -File | Select-Object FullName
```

Abre el reporte HTML localmente:

```powershell
Start-Process .\coverage\index.html
```

También puede servirse desde un servidor local. Por ejemplo, si el proyecto copia explícitamente la carpeta a `public`, comprueba primero que exista:

```powershell
Test-Path .\public\coverage\index.html
```

La ruta `http://localhost:3000/coverage/index.html` solo es válida si `coverage` está dentro de un directorio público servido por la aplicación. No se debe publicar el reporte en esa ruta sin verificarlo.

### Qué comprobar en el HTML

- **Statements:** 100 %.
- **Branches:** 100 %.
- **Functions:** 100 %.
- **Lines:** 100 %.
- Que el resumen corresponda a la ejecución actual y no a un reporte antiguo.
- Que las rutas y nombres de archivos del reporte coincidan con la versión publicada.

## 5. Subir el reporte HTML de cobertura

Elige una estrategia coherente con las reglas del repositorio:

### Opción A: publicar el reporte como artefacto de CI

1. Ejecuta `pnpm test:coverage` en GitHub Actions.
2. Configura el workflow para conservar la carpeta `coverage` como artefacto.
3. Descarga el artefacto desde la ejecución del workflow para inspeccionarlo.
4. Documenta en el Pull Request el enlace que GitHub genere para esa ejecución.

El enlace exacto depende del repositorio y de la ejecución; no se inventa en este documento.

### Opción B: versionar el HTML en una rama o carpeta pública

Solo si la política del proyecto lo permite:

```powershell
git status --short
# Revisa qué generó la herramienta antes de agregarlo
git add coverage\
git commit -m "test: actualizar reporte HTML de cobertura"
git push
```

Si `coverage` está excluido por `.gitignore`, no fuerces su inclusión sin confirmar que está permitido. Para revisar las reglas aplicables:

```powershell
Get-Content .\.gitignore
 git check-ignore -v .\coverage\index.html
```

> El reporte HTML puede contener muchos archivos auxiliares. Para que los enlaces internos funcionen, sube la carpeta completa, no solo `index.html`.

## 6. Evidencia incluida

Las dos capturas aportadas están incluidas en este entregable y se referencian con rutas relativas:

### Resultado de pruebas y ejecución local

![Resultado de pruebas de Rick and Morty Explorer](evidencia/resultado-pruebas-rick-morty-app.jpg)

La captura muestra el resumen de cobertura en la aplicación y la salida de desarrollo local. Su contenido sirve como evidencia aportada, pero no sustituye una ejecución reproducible.

### Reporte HTML de cobertura

![Reporte HTML de cobertura](evidencia/resultado-pruebas-rick-morty-html.jpg)

La captura muestra el reporte HTML con 100 % en Statements, Branches, Functions y Lines.

## 7. Criterios de cumplimiento

Marca cada criterio únicamente después de comprobarlo:

- [ ] El fork existe en la cuenta correcta de GitHub.
- [ ] `origin` apunta al fork y no a un repositorio ajeno.
- [ ] Los cambios se publicaron en una rama y commit identificables.
- [ ] `pnpm install` termina correctamente.
- [ ] La aplicación inicia con `pnpm dev`.
- [ ] `pnpm test` termina correctamente.
- [ ] La consola confirma el número de pruebas esperado: **30 pasaron**, si ese es el resultado de la ejecución actual.
- [ ] `pnpm test:coverage` genera `coverage/index.html` o la ruta equivalente configurada.
- [ ] El HTML actual muestra 100 % en Statements, Branches, Functions y Lines.
- [ ] El reporte se conserva como artefacto de CI o se versiona según la política del proyecto.
- [ ] La evidencia tiene rutas relativas válidas y los archivos están incluidos.
- [ ] No se suben credenciales, tokens, secretos ni archivos locales innecesarios.

## Estado actual de esta entrega

- **Capturas:** incluidas en `evidencia/`.
- **Cobertura visible en las capturas:** 100 % Statements, 100 % Branches, 100 % Functions y 100 % Lines.
- **Suite:** se reportan 30 pruebas pasadas en el material disponible; **pendiente de verificación ejecutando `pnpm test`**.
- **Fork, URL y publicación en GitHub:** no verificados en este entorno; no se inventa ningún enlace.
- **Reporte HTML completo:** no se recibió como carpeta o archivo HTML; se incluyó la captura del reporte. Debe generarse y subirse desde el repositorio siguiendo la sección 5.

## Comprobación final antes de publicar

```powershell
# Estado y remotos
git status --short
git remote -v

# Validar archivos de evidencia
Test-Path .\evidencia\resultado-pruebas-rick-morty-app.jpg
Test-Path .\evidencia\resultado-pruebas-rick-morty-html.jpg

# Ejecutar validación
pnpm test
pnpm test:coverage
Test-Path .\coverage\index.html

# Revisar cambios antes de commit
git diff --check
git status --short
```

Si todas las comprobaciones aplicables son satisfactorias, publica el commit en el fork y adjunta en el Pull Request el resultado de pruebas, el método usado para conservar el reporte HTML y las capturas de evidencia.
=======
# Rick and Morty Explorer 🧪

Una aplicación web moderna para explorar el universo de Rick and Morty, construida con Next.js 15, React 19 y Tailwind CSS v4.

## 🚀 Características

- **Exploración de Personajes**: Navega a través de todos los personajes de la serie con una interfaz de cuadrícula responsive.
- **Detalle de Personaje**: Información detallada de cada personaje, incluyendo origen, ubicación y episodios.
- **Paginación**: Navegación fluida entre páginas de resultados.
- **Diseño Responsive**: Optimizado para móviles, tablets y escritorio.
- **Modo Oscuro**: Interfaz oscura por defecto con estética acorde a la serie.
- **Server-Side Rendering (SSR)**: Carga rápida y SEO optimizado gracias a Next.js App Router.

## 🛠️ Tecnologías

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Biblioteca UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API**: [The Rick and Morty API](https://rickandmortyapi.com/)
- **Tipado**: TypeScript

## 📦 Instalación y Ejecución Local

1.  **Clonar el repositorio** (o descargar el código):
    ```bash
    git clone <tu-repositorio>
    cd my-app
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    pnpm install
    # o
    yarn install
    ```

3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    # o
    pnpm dev
    # o
    yarn dev
    ```

4.  Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Despliegue

La forma más sencilla de desplegar esta aplicación es utilizando [Vercel](https://vercel.com/new).

1.  Sube tu código a un repositorio de GitHub, GitLab o Bitbucket.
2.  Importa el proyecto en Vercel.
3.  Vercel detectará automáticamente que es un proyecto Next.js.
4.  Haz clic en **Deploy**.

## 📂 Estructura del Proyecto

- `src/app`: Rutas de la aplicación (App Router).
  - `page.tsx`: Página principal (lista de personajes).
  - `character/[id]/page.tsx`: Página de detalle de personaje.
  - `loading.tsx` / `error.tsx`: Estados de carga y error.
  - `layout.tsx`: Layout principal con Header y Footer.
- `src/components`: Componentes reutilizables (`CharacterCard`, `Pagination`).
- `src/lib`: Lógica de cliente API (`api.ts`).
- `src/types`: Definiciones de tipos TypeScript (`rickandmorty.ts`).

## ✅ Requisitos Cumplidos

- [x] Consumo de API de Personajes.
- [x] Vista de cuadrícula con imagen, nombre, estado y especie.
- [x] Paginación.
- [x] Vista de detalle con información completa.
- [x] Lista de episodios en la vista de detalle.
- [x] Enrutamiento cliente-servidor (Next.js).
- [x] Diseño Responsive.
- [x] Loading states y manejo de errores.
>>>>>>> e9f4d1a8ed0afc7e0d25100640608ed62ebf1ef0
