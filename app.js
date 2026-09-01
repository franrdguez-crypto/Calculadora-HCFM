// app.js

// === MATRICES DE DATOS OFICIALES (ICONA 1993) ===

// TABLA A.1: Humedad Básica del Combustible Fino Muerto (Día: 8:00 a 20:00 solar)
// Columnas (Humedad Relativa): 0-4%, 5-9%, 10-14%, 15-19%, 20-24%, 25-29%, 30-34%, 35-39%, 40-44%, 45-49%, 50-54%, 55-59%, 60-64%, 65-69%, 70-74%, 75-79%, 80-84%, 85-89%, 90-94%, 95-99%, 100% (Indices 0 a 20)
// Filas (Temperatura):
// 0: <0 ºC
// 1: 0-9 ºC
// 2: 10-20 ºC
// 3: 21-31 ºC
// 4: 32-42 ºC
// 5: >42 ºC
const TABLA_A1 = [
    [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 8, 8, 9, 9, 10, 11, 12, 12, 13, 13, 14], // <0 ºC
    [1, 2, 2, 3, 4, 5, 5, 6, 7, 7, 7, 8, 9, 9, 10, 10, 11, 12, 13, 13, 13], // 0-9 ºC
    [1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 12, 12, 12, 13], // 10-20 ºC
    [1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 7, 8, 8, 8, 9, 10, 10, 11, 12, 12, 13], // 21-31 ºC
    [1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 7, 8, 8, 8, 9, 10, 10, 11, 12, 12, 13], // 32-42 ºC
    [1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 7, 8, 8, 8, 9, 10, 10, 11, 12, 12, 12]  // >42 ºC
];

// TABLA A.5: Humedad Básica del Combustible Fino Muerto (Noche: 20:00 a 8:00 solar)
// Columnas: Mismos tramos de HR (0 a 20)
// Filas (Temperatura):
// 0: 0-9 ºC
// 1: 10-20 ºC
// 2: 21-31 ºC
// 3: 32-42 ºC
// 4: >42 ºC
const TABLA_A5 = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 11, 11, 12, 13, 14, 16, 18, 21, 24, 25, 25], // 0-9 ºC
    [1, 2, 3, 4, 5, 6, 6, 8, 8, 9, 10, 11, 11, 12, 14, 16, 17, 20, 23, 25, 25], // 10-20 ºC
    [1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 15, 17, 20, 23, 25, 25], // 21-31 ºC
    [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 9, 10, 10, 11, 13, 14, 16, 19, 22, 25, 25], // 32-42 ºC
    [1, 2, 3, 3, 4, 5, 6, 6, 9, 9, 9, 9, 10, 11, 12, 14, 16, 19, 21, 24, 25]   // >42 ºC
];

// TABLAS DE CORRECCIÓN ESTACIONAL (Día: de 8 a 20 solar)
// Columnas (Tramos de hora solar):
// 0: 8:00 a 9:59
// 1: 10:00 a 11:59
// 2: 12:00 a 13:59
// 3: 14:00 a 15:59
// 4: 16:00 a 17:59
// 5: 18:00 a 19:59

// TABLA A.2: Febrero, Marzo, Abril, Agosto, Septiembre, Octubre
const CORRECTIONS_A2 = {
    exposed: {
        N: { flat_gentle: [4, 2, 1, 1, 2, 4], steep: [4, 3, 3, 3, 3, 4] },
        E: { flat_gentle: [4, 2, 1, 1, 2, 4], steep: [3, 1, 1, 2, 4, 5] },
        S: { flat_gentle: [4, 2, 1, 1, 2, 4], steep: [4, 2, 1, 1, 2, 4] },
        O: { flat_gentle: [4, 2, 1, 1, 2, 4], steep: [5, 4, 2, 1, 1, 3] }
    },
    shaded: {
        N: [5, 5, 4, 4, 5, 5],
        E: [5, 4, 4, 4, 5, 5],
        S: [5, 4, 4, 4, 4, 5],
        O: [5, 5, 4, 4, 4, 5]
    }
};

// TABLA A.3: Mayo, Junio, Julio
const CORRECTIONS_A3 = {
    exposed: {
        N: { flat_gentle: [3, 1, 0, 0, 1, 3], steep: [4, 2, 1, 1, 2, 4] },
        E: { flat_gentle: [2, 1, 0, 0, 1, 4], steep: [2, 0, 0, 1, 3, 5] },
        S: { flat_gentle: [3, 1, 0, 0, 1, 3], steep: [3, 1, 1, 1, 1, 3] },
        O: { flat_gentle: [3, 1, 0, 0, 1, 3], steep: [5, 3, 1, 0, 0, 2] }
    },
    shaded: {
        N: [5, 4, 3, 3, 4, 5],
        E: [4, 4, 3, 4, 4, 5],
        S: [4, 4, 3, 3, 4, 5],
        O: [5, 4, 3, 3, 4, 4]
    }
};

// TABLA A.4: Noviembre, Diciembre, Enero
const CORRECTIONS_A4 = {
    exposed: {
        N: { flat_gentle: [5, 4, 3, 3, 4, 5], steep: [5, 5, 5, 5, 5, 5] },
        E: { flat_gentle: [5, 4, 3, 3, 4, 5], steep: [5, 4, 3, 2, 5, 5] },
        S: { flat_gentle: [5, 4, 3, 2, 4, 5], steep: [5, 3, 1, 1, 3, 5] },
        O: { flat_gentle: [5, 4, 3, 3, 4, 5], steep: [5, 5, 4, 2, 3, 5] }
    },
    shaded: {
        N: [5, 5, 5, 5, 5, 5],
        E: [5, 5, 5, 5, 5, 5],
        S: [5, 5, 5, 5, 5, 5],
        O: [5, 5, 5, 5, 5, 5]
    }
};

// TABLA A.6: Probabilidad de Ignición (%)
// Columnas (HCFM%): 2%, 3%, 4%, 5%, 6%, 7%, 8%, 9%, 10%, 11%, 12%, 13%, 14%, 15%, 16%, 17% (Indices 0 a 15)
// Filas agrupadas por Sombreado y Temperatura:
const TABLA_A6 = {
    group_0_10: {
        row_40_plus: [100, 100, 90, 80, 70, 60, 50, 40, 40, 30, 30, 30, 20, 20, 20, 10],
        row_35_40:   [100, 90, 80, 70, 60, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10],
        row_30_35:   [100, 90, 80, 70, 60, 50, 50, 40, 30, 30, 30, 20, 20, 20, 10, 10],
        row_25_30:   [100, 90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 20, 10, 10],
        row_20_25:   [100, 80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10],
        row_15_20:   [90, 80, 70, 60, 50, 50, 40, 30, 30, 30, 20, 20, 20, 10, 10, 10],
        row_10_15:   [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_5_10:    [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_0_5:     [90, 70, 60, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10]
    },
    group_10_50: {
        row_40_plus: [100, 100, 80, 70, 60, 60, 50, 40, 40, 30, 30, 30, 20, 20, 20, 10],
        row_35_40:   [100, 90, 80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10],
        row_30_35:   [100, 90, 80, 70, 60, 50, 40, 40, 30, 30, 30, 20, 20, 20, 10, 10],
        row_25_30:   [100, 90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10],
        row_20_25:   [100, 80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10],
        row_15_20:   [90, 80, 70, 60, 50, 50, 40, 30, 30, 20, 20, 20, 20, 10, 10, 10],
        row_10_15:   [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_5_10:    [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_0_5:     [80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10]
    },
    group_50_90: {
        row_40_plus: [100, 90, 80, 70, 60, 50, 50, 40, 40, 30, 30, 30, 20, 20, 20, 10],
        row_35_40:   [100, 90, 80, 70, 60, 50, 50, 40, 30, 30, 30, 20, 20, 20, 10, 10],
        row_30_35:   [100, 90, 80, 70, 60, 50, 40, 40, 30, 30, 30, 20, 20, 10, 10, 10],
        row_25_30:   [100, 80, 70, 60, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10],
        row_20_25:   [90, 80, 70, 60, 50, 50, 40, 30, 30, 30, 20, 20, 20, 10, 10, 10],
        row_15_20:   [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_10_15:   [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_5_10:    [90, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_0_5:     [80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10]
    },
    group_90_100: {
        row_40_plus: [100, 90, 80, 70, 60, 50, 50, 40, 30, 30, 30, 20, 20, 20, 10, 10],
        row_35_40:   [100, 90, 80, 70, 60, 50, 40, 40, 30, 30, 30, 20, 20, 20, 10, 10],
        row_30_35:   [100, 80, 70, 60, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10],
        row_25_30:   [90, 80, 70, 60, 50, 50, 40, 30, 30, 30, 20, 20, 20, 10, 10, 10],
        row_20_25:   [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 20, 10, 10, 10],
        row_15_20:   [90, 80, 70, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_10_15:   [90, 70, 60, 60, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_5_10:    [80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10],
        row_0_5:     [80, 70, 60, 50, 50, 40, 40, 30, 30, 20, 20, 20, 10, 10, 10, 10]
    }
};

// TABLA A.7: Interpretación del Índice de Peligro
const TABLA_A7_NORMAL = [
    ["Prealerta", "Prealerta", "Prealerta", "Alerta"],          // 10 <= PIG <= 20
    ["Prealerta", "Alerta",     "Alerta",     "Alerta"],          // 20 < PIG <= 50
    ["Alarma",     "Alarma",     "Alarma",     "Alarma"],          // 50 < PIG < 70
    ["Alarma",     "Alarma",     "Alarma",     "Alarma extrema"]   // PIG >= 70
];

const TABLA_A7_TERRAL = [
    ["Prealerta", "Alerta",         "Alerta",         "Alarma extrema"], // 10 <= PIG <= 20
    ["Alerta",     "Alarma",         "Alarma",         "Alarma extrema"], // 20 < PIG <= 50
    ["Alarma",     "Alarma",         "Alarma",         "Alarma extrema"], // 50 < PIG < 70
    ["Alarma",     "Alarma extrema", "Alarma extrema", "Alarma extrema"]  // PIG >= 70
];

// Medidas y advertencias de peligro
const DANGER_INFO = {
    "Prealerta": {
        color: "var(--color-prealerta)",
        class: "risk-prealerta",
        text: "Peligro bajo o moderado. Sin precauciones especiales."
    },
    "Alerta": {
        color: "var(--color-alerta)",
        class: "risk-alerta",
        text: "Peligro moderado. Los medios de extinción y brigadas forestales estarán listos para ser movilizados."
    },
    "Alarma": {
        color: "var(--color-alarma)",
        class: "risk-alarma",
        text: "Peligro alto. La vigilancia preventiva será intensificada. El paso a las zonas boscosas podrá ser limitado. Los medios de lucha estarán preparados al máximo. Se informará a la población a través de los medios de comunicación."
    },
    "Alarma extrema": {
        color: "var(--color-alarma-extrema)",
        class: "risk-alarma-extrema",
        text: "Peligro extremo. Altísima probabilidad de múltiples y grandes incendios forestales. Formación de focos secundarios causados por pavesas. No debe ser permitido ningún punto de fuego en las cercanías del monte (hogueras, quemas agrícolas). Se limitará al máximo el paso al monte y las pistas forestales se cortarán."
    }
};

// === FUNCIONES DE APOYO Y CÁLCULO ===

// Comprobación de horario de verano europeo (DST)
// Comienza el último domingo de marzo y finaliza el último domingo de octubre
function checkIfEuropeDST(date) {
    const year = date.getFullYear();
    
    // Último domingo de marzo
    const lastSundayMarch = new Date(year, 2, 31);
    const dayMarch = lastSundayMarch.getDay();
    lastSundayMarch.setDate(31 - dayMarch);
    lastSundayMarch.setHours(1, 0, 0, 0); // 01:00 UTC
    
    // Último domingo de octubre
    const lastSundayOctober = new Date(year, 9, 31);
    const dayOct = lastSundayOctober.getDay();
    lastSundayOctober.setDate(31 - dayOct);
    lastSundayOctober.setHours(1, 0, 0, 0); // 01:00 UTC
    
    return date >= lastSundayMarch && date < lastSundayOctober;
}

// Convertir Hora Local a Hora Solar
function getSolarTime(dateStr, timeStr) {
    const parts = dateStr.split('-');
    const timeParts = timeStr.split(':');
    
    // Crear objeto fecha
    const dateObj = new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2]),
        parseInt(timeParts[0]),
        parseInt(timeParts[1]),
        0
    );
    
    const isSummerTime = checkIfEuropeDST(dateObj);
    let solarHour = dateObj.getHours();
    let solarMin = dateObj.getMinutes();
    
    // Si es invierno (NO es verano), restamos una hora oficial para adaptarlo a la hora solar
    if (!isSummerTime) {
        solarHour = solarHour - 1;
        if (solarHour < 0) {
            solarHour = 23;
        }
    }
    
    return {
        hour: solarHour,
        minute: solarMin,
        isDST: isSummerTime,
        formatted: `${solarHour.toString().padStart(2, '0')}:${solarMin.toString().padStart(2, '0')}`
    };
}

// Clasificación de fila de Temperatura (Tablas A.1 y A.5)
function getTempIndex(temp, isDay) {
    if (isDay) {
        if (temp < 0) return 0;
        if (temp <= 9) return 1;
        if (temp <= 20) return 2;
        if (temp <= 31) return 3;
        if (temp <= 42) return 4;
        return 5; // >42
    } else {
        if (temp <= 9) return 0;
        if (temp <= 20) return 1;
        if (temp <= 31) return 2;
        if (temp <= 42) return 3;
        return 4; // >42
    }
}

// Clasificación de columna de Humedad Relativa (0 a 20)
function getRHIndex(rh) {
    return Math.max(0, Math.min(20, Math.floor(rh / 5)));
}

// Tratar fila de Temperatura para Tabla A.6 (Ignición)
function getTempRowKeyA6(temp) {
    if (temp >= 40) return "row_40_plus";
    if (temp >= 35) return "row_35_40";
    if (temp >= 30) return "row_30_35";
    if (temp >= 25) return "row_25_30";
    if (temp >= 20) return "row_20_25";
    if (temp >= 15) return "row_15_20";
    if (temp >= 10) return "row_10_15";
    if (temp >= 5)  return "row_5_10";
    return "row_0_5";
}

// Tratar columna de HCFM para Tabla A.6 (Ignición)
function getHCFMColIndexA6(hcfm) {
    const rounded = Math.round(hcfm);
    const clamped = Math.max(2, Math.min(17, rounded));
    return {
        clampedValue: clamped,
        colIndex: clamped - 2
    };
}

// Tratar fila de Probabilidad de Ignición para Tabla A.7 (Peligro)
function getPIGRowIndexA7(pig) {
    if (pig <= 20) return 0;
    if (pig <= 50) return 1;
    if (pig < 70)  return 2;
    return 3;
}

// Tratar columna de Viento para Tabla A.7 (Peligro)
function getWindColIndexA7(wind) {
    if (wind <= 9) return 0;
    if (wind <= 19) return 1;
    if (wind <= 39) return 2;
    return 3;
}

// === FUNCIÓN DE EJECUCIÓN PRINCIPAL ===
function calculate() {
    const dateStr = document.getElementById('input-date').value;
    const timeStr = document.getElementById('input-time').value;
    const temp = parseFloat(document.getElementById('input-temp').value);
    const rh = parseInt(document.getElementById('input-rh').value);
    const aspect = document.getElementById('input-aspect').value;
    const slope = document.getElementById('input-slope').value;
    const shading = parseInt(document.getElementById('input-shading').value);
    const wind = parseInt(document.getElementById('input-wind').value);
    const windType = document.getElementById('input-wind-type').value;

    if (!dateStr || !timeStr || isNaN(temp) || isNaN(rh)) {
        return;
    }

    const traces = [];

    // 1. Hora Solar
    const solarInfo = getSolarTime(dateStr, timeStr);
    traces.push(`<strong>Conversión Horaria:</strong> Hora Local <strong>${timeStr}</strong> convertida a <strong>Hora Solar: ${solarInfo.formatted}</strong> (${solarInfo.isDST ? 'Horario de verano activo, sin corrección' : 'Horario de invierno activo, se resta 1 hora'}).`);

    // 2. Día / Noche
    const isDay = solarInfo.hour >= 8 && solarInfo.hour < 20;
    traces.push(`<strong>Franja Horaria:</strong> Al ser las ${solarInfo.hour}:00 solar, aplica la franja de <strong>${isDay ? 'Día (8:00 a 20:00)' : 'Noche (20:00 a 8:00)'}</strong>.`);

    let basicHCFM = 0;
    let correction = 0;
    let finalHCFM = 0;
    let monthName = "";
    let correctionTableCode = "";
    
    // Obtener mes
    const month = parseInt(dateStr.split('-')[1]);
    const monthsSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    monthName = monthsSpanish[month - 1];

    if (isDay) {
        // TABLA A.1
        const tempIdx = getTempIndex(temp, true);
        const rhIdx = getRHIndex(rh);
        basicHCFM = TABLA_A1[tempIdx][rhIdx];
        
        const tempRanges = ["<0 ºC", "0-9 ºC", "10-20 ºC", "21-31 ºC", "32-42 ºC", ">42 ºC"];
        const rhColRangeText = `${rhIdx * 5}-${rhIdx * 5 + 4}%`;
        traces.push(`<strong>Humedad Básica (Día):</strong> Se lee de la <strong>Tabla A.1</strong> para Temp <strong>${tempRanges[tempIdx]}</strong> y HR <strong>${rhColRangeText}</strong>, dando una humedad básica del <strong>${basicHCFM}%</strong>.`);

        // CORRECCIÓN
        const isShaded = shading > 50;
        let seasonalTable;
        let tableTitle = "";

        if (month === 5 || month === 6 || month === 7) { // Mayo, Junio, Julio
            seasonalTable = CORRECTIONS_A3;
            tableTitle = "Tabla A.3 (Mayo-Junio-Julio)";
            correctionTableCode = "A.3";
        } else if (month === 11 || month === 12 || month === 1) { // Noviembre, Diciembre, Enero
            seasonalTable = CORRECTIONS_A4;
            tableTitle = "Tabla A.4 (Noviembre-Diciembre-Enero)";
            correctionTableCode = "A.4";
        } else { // Feb, Mar, Apr, Aug, Sep, Oct
            seasonalTable = CORRECTIONS_A2;
            tableTitle = "Tabla A.2 (Febrero-Abril, Agosto-Octubre)";
            correctionTableCode = "A.2";
        }

        // Obtener tramo horario columna
        // 8:00-9:59 (0), 10:00-11:59 (1), 12:00-13:59 (2), 14:00-15:59 (3), 16:00-17:59 (4), 18:00-19:59 (5)
        const hourCol = Math.floor((solarInfo.hour - 8) / 2);
        const hourLabels = ["08:00-09:59", "10:00-11:59", "12:00-13:59", "14:00-15:59", "16:00-17:59", "18:00-19:59"];

        if (isShaded) {
            correction = seasonalTable.shaded[aspect][hourCol];
            traces.push(`<strong>Sumando Corrector:</strong> Se lee de la <strong>${tableTitle} (Sombreado &gt;50%)</strong> para Exposición <strong>${aspect}</strong> y Hora Solar <strong>${hourLabels[hourCol]}</strong>, resultando en un ajuste de <strong>+${correction}%</strong>.`);
        } else {
            correction = seasonalTable.exposed[aspect][slope][hourCol];
            const slopeText = slope === "flat_gentle" ? "0-30%" : ">30%";
            traces.push(`<strong>Sumando Corrector:</strong> Se lee de la <strong>${tableTitle} (Expuesto &le;50%)</strong> para Exposición <strong>${aspect}</strong>, Pendiente <strong>${slopeText}</strong> y Hora Solar <strong>${hourLabels[hourCol]}</strong>, resultando en un ajuste de <strong>+${correction}%</strong>.`);
        }

        finalHCFM = basicHCFM + correction;
        traces.push(`<strong>Humedad Combustible Final:</strong> Básica (${basicHCFM}%) + Corrección (+${correction}%) = <strong>${finalHCFM}%</strong>.`);

    } else {
        // TABLA A.5 (Noche)
        const tempIdx = getTempIndex(temp, false);
        const rhIdx = getRHIndex(rh);
        basicHCFM = TABLA_A5[tempIdx][rhIdx];
        finalHCFM = basicHCFM;
        
        const tempRanges = ["0-9 ºC", "10-20 ºC", "21-31 ºC", "32-42 ºC", ">42 ºC"];
        const rhColRangeText = `${rhIdx * 5}-${rhIdx * 5 + 4}%`;
        
        traces.push(`<strong>Humedad Básica (Noche):</strong> Se lee directamente de la <strong>Tabla A.5</strong> para Temp <strong>${tempRanges[tempIdx]}</strong> y HR <strong>${rhColRangeText}</strong>, dando una humedad final del <strong>${finalHCFM}%</strong>.`);
        traces.push(`<strong>Sumando Corrector:</strong> Durante la noche (20:00 a 08:00 solar) <strong>no se precisa aplicar corrección</strong> topográfica.`);
    }

    // Cargar visualización HCFM
    document.getElementById('val-hcfm').innerText = `${finalHCFM}%`;
    const lblHcfm = document.getElementById('lbl-hcfm');
    if (finalHCFM <= 4) {
        lblHcfm.innerHTML = `⚠️ <strong style="color:var(--color-alarma-extrema)">Crítico</strong>: Combustible extremadamente seco.`;
    } else if (finalHCFM <= 7) {
        lblHcfm.innerHTML = `🔥 <strong style="color:var(--color-alarma)">Muy Bajo</strong>: Disponibilidad de fuego muy alta.`;
    } else if (finalHCFM <= 11) {
        lblHcfm.innerHTML = `⚡ <strong style="color:var(--color-alerta)">Bajo</strong>: Ignición y propagación rápida.`;
    } else if (finalHCFM <= 15) {
        lblHcfm.innerHTML = `✔️ <strong style="color:#f1c40f">Moderado</strong>: Combustión controlable.`;
    } else {
        lblHcfm.innerHTML = `💧 <strong style="color:var(--color-prealerta)">Alto / Seguro</strong>: Ignición dificultosa.`;
    }

    // 3. Probabilidad de Ignición (Tabla A.6)
    // Sombreado tramos
    let shadingGroupKey = "";
    let shadingText = "";
    if (shading <= 10) {
        shadingGroupKey = "group_0_10";
        shadingText = "0-10% (Solana total)";
    } else if (shading <= 50) {
        shadingGroupKey = "group_10_50";
        shadingText = "10-50% (Exposición parcial)";
    } else if (shading <= 90) {
        shadingGroupKey = "group_50_90";
        shadingText = "50-90% (Sombra media)";
    } else {
        shadingGroupKey = "group_90_100";
        shadingText = "90-100% (Umbría total)";
    }

    const tempRowKey = getTempRowKeyA6(temp);
    const hcfmColInfo = getHCFMColIndexA6(finalHCFM);
    
    // Obtener PIG de Tabla A.6
    const pig = TABLA_A6[shadingGroupKey][tempRowKey][hcfmColInfo.colIndex];
    
    const tempA6Text = tempRowKey === "row_40_plus" ? "40+ ºC" : tempRowKey.replace("row_", "").replace("_", "-") + " ºC";
    traces.push(`<strong>Probabilidad de Ignición:</strong> Se lee de la <strong>Tabla A.6</strong> en el grupo de sombreado <strong>${shadingText}</strong>, cruzando la fila de Temp <strong>${tempA6Text}</strong> y la columna de HCFM redondeada a <strong>${hcfmColInfo.clampedValue}%</strong>, dando una probabilidad del <strong>${pig}%</strong>.`);

    document.getElementById('val-pig').innerText = `${pig}%`;
    const lblPig = document.getElementById('lbl-pig');
    if (pig >= 70) {
        lblPig.innerHTML = `⚠️ <strong style="color:var(--color-alarma)">Muy Alta</strong>: Ignición casi garantizada.`;
    } else if (pig >= 50) {
        lblPig.innerHTML = `⚡ <strong style="color:var(--color-alerta)">Alta</strong>: Facilidad de encendido elevada.`;
    } else if (pig >= 20) {
        lblPig.innerHTML = `✔️ <strong style="color:#f1c40f">Media</strong>: Requiere fuente de calor sostenida.`;
    } else {
        lblPig.innerHTML = `💧 <strong style="color:var(--color-prealerta)">Baja</strong>: Muy baja probabilidad de arder.`;
    }

    // 4. Índice de Peligro (Tabla A.7)
    const pigRow = getPIGRowIndexA7(pig);
    const windCol = getWindColIndexA7(wind);
    
    let dangerLevel = "";
    let windText = "";
    if (wind <= 9) windText = "0-9 km/h";
    else if (wind <= 19) windText = "10-19 km/h";
    else if (wind <= 39) windText = "20-39 km/h";
    else windText = "&ge;40 km/h";

    if (windType === 'terral') {
        dangerLevel = TABLA_A7_TERRAL[pigRow][windCol];
        traces.push(`<strong>Índice de Peligro (Terral):</strong> Cruzando PIG de <strong>${pig}%</strong> con velocidad del viento de <strong>${wind} km/h (${windText})</strong> en la tabla de <strong>vientos terrales</strong>, el resultado es <strong>${dangerLevel}</strong>.`);
    } else {
        dangerLevel = TABLA_A7_NORMAL[pigRow][windCol];
        traces.push(`<strong>Índice de Peligro (No terral):</strong> Cruzando PIG de <strong>${pig}%</strong> con velocidad del viento de <strong>${wind} km/h (${windText})</strong> en la tabla de <strong>vientos no terrales</strong>, el resultado es <strong>${dangerLevel}</strong>.`);
    }

    // Cargar visualización Peligro
    const dangerCard = document.getElementById('card-danger');
    const valDanger = document.getElementById('val-danger');
    const lblDanger = document.getElementById('lbl-danger');

    // Limpiar clases previas de riesgo
    dangerCard.classList.remove('risk-prealerta', 'risk-alerta', 'risk-alarma', 'risk-alarma-extrema');
    
    const dInfo = DANGER_INFO[dangerLevel];
    dangerCard.classList.add(dInfo.class);
    valDanger.innerText = dangerLevel.toUpperCase();
    lblDanger.innerHTML = `<strong>Acciones Operativas:</strong> ${dInfo.text}`;

    // Cargar trazabilidad en HTML
    const traceContainer = document.getElementById('trace-container');
    traceContainer.innerHTML = traces.map(t => `<li>${t}</li>`).join('');

    // Actualizar campos ocultos de impresión
    document.getElementById('print-date').innerText = dateStr;
    document.getElementById('print-time').innerText = timeStr;
    document.getElementById('print-solar-time').innerText = solarInfo.formatted;
    document.getElementById('print-dst-status').innerText = solarInfo.isDST ? "Horario de Verano (DST)" : "Horario de Invierno (Estándar)";
    document.getElementById('print-temp').innerText = temp;
    document.getElementById('print-rh').innerText = rh;
    document.getElementById('print-shading').innerText = `${shading}% (${shading <= 50 ? 'Expuesto / Solana' : 'Sombreado / Umbría'})`;
    document.getElementById('print-wind').innerText = `${wind} km/h`;
    document.getElementById('print-wind-type').innerText = windType === 'terral' ? 'Viento Terral' : 'Vientos no terrales';

    const slopeLabel = slope === "flat_gentle" ? "Suave 0-30%" : "Pronunciada >30%";
    document.getElementById('print-terrain').innerText = `Exp. ${aspect} / Pendiente ${slopeLabel}`;
}

// === SISTEMA DE HISTORIAL (LOCALSTORAGE) ===
const HISTORY_KEY = "hcfm_calculations_history";

function getHistory() {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveToHistory(record) {
    const history = getHistory();
    history.unshift(record); // Insertar al inicio
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

function deleteHistoryItem(index) {
    const history = getHistory();
    history.splice(index, 1);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

function clearAllHistory() {
    if (confirm("¿Está seguro de que desea eliminar todos los cálculos guardados?")) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
    }
}

function renderHistory() {
    const history = getHistory();
    const tbody = document.getElementById('history-tbody');
    
    if (history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center">No hay registros guardados en este navegador.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = history.map((rec, index) => {
        let badgeClass = "hbadge-prealerta";
        if (rec.danger === "Alerta") badgeClass = "hbadge-alerta";
        else if (rec.danger === "Alarma") badgeClass = "hbadge-alarma";
        else if (rec.danger === "Alarma extrema") badgeClass = "hbadge-alarma-extrema";

        return `
            <tr>
                <td><strong>${rec.date}</strong><br><small>${rec.time}</small></td>
                <td>${rec.solarTime}</td>
                <td>${rec.temp} ºC / ${rec.rh} %</td>
                <td>Exp. ${rec.aspect}<br><small>${rec.slope === 'flat_gentle' ? '0-30%' : '>30%'}</small></td>
                <td>${rec.shading}%</td>
                <td><strong>${rec.hcfm}%</strong></td>
                <td>${rec.pig}%</td>
                <td>
                    <span class="history-badge ${badgeClass}">${rec.danger}</span><br>
                    <small>${rec.wind} km/h (${rec.windType === 'terral' ? 'Terral' : 'Interior'})</small>
                </td>
                <td>
                    <button type="button" class="action-delete" onclick="deleteHistoryItem(${index})" title="Eliminar registro">❌</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Exportar historial a CSV
function exportToCSV() {
    const history = getHistory();
    if (history.length === 0) {
        alert("El historial está vacío. No hay datos que exportar.");
        return;
    }

    const headers = [
        "Fecha", "Hora Local", "Hora Solar", "Temperatura (C)", "Humedad Relativa (%)", 
        "Exposicion", "Pendiente", "Sombreado (%)", "HCFM (%)", "Probabilidad Ignicion (%)", 
        "Velocidad Viento (km/h)", "Tipo Viento", "Indice Peligro"
    ];

    const rows = history.map(rec => [
        rec.date, rec.time, rec.solarTime, rec.temp, rec.rh,
        rec.aspect, rec.slope === 'flat_gentle' ? '0-30%' : '>30%', rec.shading, rec.hcfm, rec.pig,
        rec.wind, rec.windType, rec.danger
    ]);

    // Unir encabezados y filas
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
        + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `historial_calculos_hcfm_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// === EVENTOS E INICIALIZACIÓN ===

document.addEventListener('DOMContentLoaded', () => {
    // 1. Establecer fecha y hora actual por defecto
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);
    
    document.getElementById('input-date').value = todayStr;
    document.getElementById('input-time').value = timeStr;

    // 2. Vincular inputs de Humedad Relativa (número y slider)
    const rhInput = document.getElementById('input-rh');
    const rhSlider = document.getElementById('input-rh-slider');

    rhInput.addEventListener('input', () => {
        rhSlider.value = rhInput.value;
        calculate();
    });

    rhSlider.addEventListener('input', () => {
        rhInput.value = rhSlider.value;
        calculate();
    });

    // 3. Vincular sombreado
    const shadingInput = document.getElementById('input-shading');
    const shadingValueText = document.getElementById('shading-value');
    const shadingCategoryBadge = document.getElementById('shading-category-badge');

    shadingInput.addEventListener('input', () => {
        const val = shadingInput.value;
        shadingValueText.innerText = `${val}% Sombra`;
        
        if (val <= 50) {
            shadingCategoryBadge.innerText = "Expuesto (≤50%)";
            shadingCategoryBadge.className = "badge badge-exposed";
        } else {
            shadingCategoryBadge.innerText = "Sombreado (>50%)";
            shadingCategoryBadge.className = "badge badge-shaded";
        }
        calculate();
    });

    // 4. Vincular todos los demás inputs para actualización automática
    const autoCalcInputs = [
        'input-date', 'input-time', 'input-temp', 
        'input-aspect', 'input-slope', 'input-wind', 'input-wind-type'
    ];

    autoCalcInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculate);
        document.getElementById(id).addEventListener('change', calculate);
    });

    // 5. Botones de acción
    document.getElementById('btn-save').addEventListener('click', () => {
        const dateStr = document.getElementById('input-date').value;
        const timeStr = document.getElementById('input-time').value;
        const temp = parseFloat(document.getElementById('input-temp').value);
        const rh = parseInt(document.getElementById('input-rh').value);
        const aspect = document.getElementById('input-aspect').value;
        const slope = document.getElementById('input-slope').value;
        const shading = parseInt(document.getElementById('input-shading').value);
        const wind = parseInt(document.getElementById('input-wind').value);
        const windType = document.getElementById('input-wind-type').value;

        // Forzar recálculo previo
        calculate();

        const hcfmText = document.getElementById('val-hcfm').innerText.replace('%', '');
        const pigText = document.getElementById('val-pig').innerText.replace('%', '');
        const danger = document.getElementById('val-danger').innerText;

        if (!hcfmText || hcfmText === '--') {
            alert("No hay ningún cálculo válido para guardar.");
            return;
        }

        const solarInfo = getSolarTime(dateStr, timeStr);

        const record = {
            date: dateStr,
            time: timeStr,
            solarTime: solarInfo.formatted,
            temp: temp,
            rh: rh,
            aspect: aspect,
            slope: slope,
            shading: shading,
            hcfm: parseInt(hcfmText),
            pig: parseInt(pigText),
            wind: wind,
            windType: windType,
            danger: danger.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') // Capitalizar
        };

        saveToHistory(record);
        alert("¡Cálculo guardado con éxito en el historial del navegador!");
    });

    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });

    document.getElementById('btn-clear-history').addEventListener('click', clearAllHistory);
    document.getElementById('btn-export-csv').addEventListener('click', exportToCSV);

    // Hacer accesibles las funciones de borrar del historial de forma global para los onclick
    window.deleteHistoryItem = deleteHistoryItem;

    // Ejecutar cálculo inicial
    calculate();
    renderHistory();
});
