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

- **Inicio** — balance del año, gasto del mes, donut por categoría, evolución mensual, últimos movimientos.
- **Comparar** — gastos vs ingresos, top categorías en el tiempo, matriz categoría × mes (toca una fila para el detalle) y variación mes a mes.
- **Meses** — elige mes, ves KPIs, reparto por categoría y todos los movimientos agrupados por día. Toca un movimiento para borrarlo.
- **+** — tres modos:
  - **⚡ Rápido** — importe, botones +1/+5/+10/+20/+50 y categoría/subcategoría en botones grandes (ya no hay desplegables). También "repetir un gasto reciente".
  - **✍️ Manual** — escribes la categoría y la subcategoría a mano, con autocompletado. Si no existen, se crean solas al guardar.
  - **📝 Varios** — pegas o escribes varias líneas de golpe (`tabaco 6,25`, `gasolina 50 repostaje`, `14/07 comida fuera 12,50 kebab`), pulsas *Previsualizar* y las guarda todas. El último número de la línea es el importe, la fecha inicial es opcional y la categoría se detecta por el nombre.
- **Ajustes** — ingresos por mes, editor de categorías (renombrar, cambiar icono, añadir/quitar subcategorías, eliminar), exportar copia JSON, exportar CSV para Excel, importar copia y restaurar el histórico original.

## Navegación y botón atrás

El **botón atrás del móvil navega dentro de la app**: cierra la ficha de detalle de una categoría o vuelve a la pestaña anterior, en lugar de salirse de la web. Solo sale de la app si pulsas atrás estando en Inicio. Las fichas de detalle llevan además un botón **← Volver**.

Los diálogos del navegador (`prompt`/`confirm`) se han sustituido por paneles propios: crear categoría, crear subcategoría, añadir mes y confirmar borrados.

## Gráficos

Todos los gráficos llevan leyenda: nombre de la serie, su color y el total acumulado. Las líneas tienen eje vertical en € (`k` = miles) y los meses rotulados debajo; tocando un punto sale su valor exacto. Las barras de evolución mensual muestran la cifra encima de cada barra.

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
