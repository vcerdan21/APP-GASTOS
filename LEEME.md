# Mis Gastos — app

App de control de gastos (PWA instalable). Todos los datos viven **en el dispositivo**, sin nube ni cuentas.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La app entera (dashboard, comparativas, alta de gastos) |
| `manifest.webmanifest` | Datos de instalación (nombre, icono, pantalla completa) |
| `sw.js` | Service worker: hace que funcione sin internet |
| `icon-192/512/512m.png` | Iconos de la app |

## Probarla en el PC (ahora mismo)

Doble clic en `index.html`. Funciona todo menos la instalación.

## Publicarla protegida con PIN

`publicar.html` coge el `index.html` con tus datos y genera una copia con los gastos **cifrados (AES-256-GCM)** con un PIN que eliges tú. Esa copia es la que se sube a internet: quien abra la URL sin el PIN solo ve una pantalla de bloqueo.

1. Doble clic en `publicar.html`.
2. Elige el `index.html` de esta carpeta, pon tu PIN dos veces y pulsa Generar.
3. Se descarga un `index.html` cifrado → ese es el que se sube.

**Apunta el PIN.** No hay recuperación: sin él los datos publicados son irrecuperables. Los datos del vault siguen en claro en tu PC, así que nunca los pierdes.

## Instalarla en el móvil

Necesita estar servida por HTTPS (requisito de Android para instalar apps web).

1. Sube la carpeta `App` a un hosting gratuito: [app.netlify.com/drop](https://app.netlify.com/drop) (arrastrar y soltar) o GitHub Pages.
2. Abre la URL en Chrome en el móvil.
3. Menú ⋮ → **Instalar aplicación** / *Añadir a pantalla de inicio*.
4. Queda como una app más: icono, pantalla completa, sin barra del navegador, funciona offline.

Si quieres un `.apk` de verdad, pega esa misma URL en [pwabuilder.com](https://www.pwabuilder.com) → *Package for stores* → Android. Genera el APK firmado.

## Qué hace

- **Inicio** — lo gastado este mes y cómo va frente al mes anterior (acumulado día a día), balance total o por año, reparto por categoría, gasto mes a mes, límites y los 10 últimos movimientos. Al tocar una categoría se abre su gasto de cada día del mes, con sus subcategorías y movimientos de ese mes.
- **Comparar** — gastos frente a ingresos, las cinco categorías con más gasto, ahorro y sobrante, ahorro acumulado y la tabla categoría × mes (cada fila en el color de su categoría; toca una fila para ver su histórico). Con más de un año de datos aparece un selector Todo / año.
- **+** — tres modos:
  - **Gasto** — todo en una pantalla, sin deslizar: importe con teclado propio, categorías en rejilla (primero las que más usas), subcategoría, fecha y nota. Arriba salen tus gastos habituales de esa categoría para repetirlos de un toque. En ordenador el importe se escribe con el teclado y se guarda con Intro. Las categorías y subcategorías nuevas se crean con «＋ Nueva».
  - **Varios** — pegas o escribes varias líneas de golpe (`tabaco 6,25`, `gasolina 50 repostaje`, `14/07 comida fuera 12,50 kebab`), pulsas *Previsualizar* y las guarda todas. El último número de la línea es el importe, la fecha inicial es opcional y la categoría se detecta por el nombre.
  - **Fijos** — gastos que se apuntan solos cada mes. Se crean desde «Nuevo gasto fijo» y se pueden cancelar o reactivar.
- **Meses** — elige mes y ves lo gastado, el reparto por categoría, el calendario (en azules: más intenso, más gasto), las categorías y todos los movimientos, que se despliegan con la flecha. Toca un movimiento para editarlo.
- **Ajustes** — ingresos por mes, editor de categorías, límites, metas de ahorro, sincronización, exportar copia JSON, exportar CSV para Excel e importar copia.
- **Buscar** (lupa) — busca en todos los movimientos por texto, categoría, fechas e importe.

## Navegación y botón atrás

Las cinco pestañas se **deslizan de lado a lado con el dedo**, en el orden de la barra de abajo. En ordenador hay barra lateral y se cambia también con las flechas ← →.

El **botón atrás del móvil** cierra el panel que esté abierto o vuelve a Inicio; desde Inicio sale de la app.

## Gráficos

Se dibujan al ancho real de la pantalla (móvil u ordenador). La fila de encima de cada gráfico muestra el total; al **tocar un punto** (o pasar el ratón) muestra los valores de ese punto, sin tapar el dibujo. Manteniendo pulsado un instante y arrastrando se recorre el gráfico. Deslizar sobre un gráfico cambia de pestaña como en cualquier otro sitio.

En el gráfico de las cinco categorías, si una es al menos 3 veces mayor que el resto se mide en un **segundo eje a la derecha** (lleva la etiqueta «eje dcho.») para que las demás no queden aplastadas.

## Datos

Histórico cargado: **Enero–Julio 2026, 141 gastos** (ene–jun extraídos de los `.xlsx` del vault, julio del parte manual). Totales verificados contra Excel:

| Mes | Gasto | Ahorro |
|---|---:|---:|
| Enero | 1.199,00 € | 100,00 € |
| Febrero | 616,07 € | 200,00 € |
| Marzo | 716,03 € | 200,00 € |
| Abril | 568,90 € | 0,00 € |
| Mayo | 1.517,21 € | 0,00 € |
| Junio | 1.660,80 € | 1.000,00 € |
| Julio | 1.069,99 € | 1.200,00 € |

## La categoría Ahorro no es gasto

Los movimientos de **Ahorro** se registran igual que cualquier otro (para tenerlos controlados y verlos en la lista del mes), pero **no suman en los totales de gasto**: cuentan como dinero ahorrado. Se ven aparte en el KPI "Ahorrado" de Inicio y Meses, y en la tarjeta "Ahorro por mes" de Comparar. La matriz categoría × mes solo muestra gasto real.

Los datos se guardan en el `localStorage` del navegador donde la instales. **Exporta una copia de vez en cuando** (Ajustes → Exportar copia). Si borras los datos del navegador, se pierden.

Para volver a llevar los gastos al vault: Ajustes → *Exportar CSV para Excel*.
