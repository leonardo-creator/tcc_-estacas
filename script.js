document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addRow').addEventListener('click', addRowToTable);
    document.getElementById('tipoEstaca').addEventListener('change', recalculateAll);
    document.getElementById('diametro').addEventListener('input', recalculateAll);
    document.getElementById('coefSeguranca').addEventListener('input', recalculateAll);
});

const coeficientesA = {
    "Escavada com lama bentonítica": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.85,
        "Argila arenosa": 0.85,
        "Argila areno-siltosa": 0.85,
        "Argila silto-arenosa": 0.85,
        "Argila siltosa": 0.85,
        "Silte": 0.60,
        "Silte areno-argiloso": 0.60,
        "Silte arenoso": 0.60,
        "Silte argilo-arenoso": 0.60,
        "Silte argiloso": 0.60
    },
    "Escavada grande diâmetro": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.85,
        "Argila arenosa": 0.85,
        "Argila areno-siltosa": 0.85,
        "Argila silto-arenosa": 0.85,
        "Argila siltosa": 0.85,
        "Silte": 0.60,
        "Silte areno-argiloso": 0.60,
        "Silte arenoso": 0.60,
        "Silte argilo-arenoso": 0.60,
        "Silte argiloso": 0.60
    },
    "Escavada pequeno diâmetro": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.85,
        "Argila arenosa": 0.85,
        "Argila areno-siltosa": 0.85,
        "Argila silto-arenosa": 0.85,
        "Argila siltosa": 0.85,
        "Silte": 0.60,
        "Silte areno-argiloso": 0.60,
        "Silte arenoso": 0.60,
        "Silte argilo-arenoso": 0.60,
        "Silte argiloso": 0.60
    },
    "Franki - fuste apiloado": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Franki - fuste vibrado": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Hélice contínua": {
        "Areia": 0.30,
        "Areia argilosa": 0.30,
        "Areia argilo-siltosa": 0.30,
        "Areia silto-argilosa": 0.30,
        "Areia siltosa": 0.30,
        "Argila": 0.30,
        "Argila arenosa": 0.30,
        "Argila areno-siltosa": 0.30,
        "Argila silto-arenosa": 0.30,
        "Argila siltosa": 0.30,
        "Silte": 0.30,
        "Silte areno-argiloso": 0.30,
        "Silte arenoso": 0.30,
        "Silte argilo-arenoso": 0.30,
        "Silte argiloso": 0.30
    },
    "Metálica": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Pré-moldada cravada": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Pré-moldada prensada": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Raiz": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.85,
        "Argila arenosa": 0.85,
        "Argila areno-siltosa": 0.85,
        "Argila silto-arenosa": 0.85,
        "Argila siltosa": 0.85,
        "Silte": 0.60,
        "Silte areno-argiloso": 0.60,
        "Silte arenoso": 0.60,
        "Silte argilo-arenoso": 0.60,
        "Silte argiloso": 0.60
    },
    "Strauss": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.85,
        "Argila arenosa": 0.85,
        "Argila areno-siltosa": 0.85,
        "Argila silto-arenosa": 0.85,
        "Argila siltosa": 0.85,
        "Silte": 0.60,
        "Silte areno-argiloso": 0.60,
        "Silte arenoso": 0.60,
        "Silte argilo-arenoso": 0.60,
        "Silte argiloso": 0.60
    }
};

const coeficientesB = {
    "Escavada com lama bentonítica": {
        "Areia": 0.60,
        "Areia argilosa": 0.60,
        "Areia argilo-siltosa": 0.60,
        "Areia silto-argilosa": 0.60,
        "Areia siltosa": 0.60,
        "Argila": 0.90,
        "Argila arenosa": 0.90,
        "Argila areno-siltosa": 0.90,
        "Argila silto-arenosa": 0.90,
        "Argila siltosa": 0.90,
        "Silte": 0.75,
        "Silte areno-argiloso": 0.75,
        "Silte arenoso": 0.75,
        "Silte argilo-arenoso": 0.75,
        "Silte argiloso": 0.75
    },
    "Escavada grande diâmetro": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.80,
        "Argila arenosa": 0.80,
        "Argila areno-siltosa": 0.80,
        "Argila silto-arenosa": 0.80,
        "Argila siltosa": 0.80,
        "Silte": 0.65,
        "Silte areno-argiloso": 0.65,
        "Silte arenoso": 0.65,
        "Silte argilo-arenoso": 0.65,
        "Silte argiloso": 0.65
    },
    "Escavada pequeno diâmetro": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.80,
        "Argila arenosa": 0.80,
        "Argila areno-siltosa": 0.80,
        "Argila silto-arenosa": 0.80,
        "Argila siltosa": 0.80,
        "Silte": 0.65,
        "Silte areno-argiloso": 0.65,
        "Silte arenoso": 0.65,
        "Silte argilo-arenoso": 0.65,
        "Silte argiloso": 0.65
    },
    "Franki - fuste apiloado": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Franki - fuste vibrado": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Hélice contínua": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Metálica": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Pré-moldada cravada": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Pré-moldada prensada": {
        "Areia": 1.00,
        "Areia argilosa": 1.00,
        "Areia argilo-siltosa": 1.00,
        "Areia silto-argilosa": 1.00,
        "Areia siltosa": 1.00,
        "Argila": 1.00,
        "Argila arenosa": 1.00,
        "Argila areno-siltosa": 1.00,
        "Argila silto-arenosa": 1.00,
        "Argila siltosa": 1.00,
        "Silte": 1.00,
        "Silte areno-argiloso": 1.00,
        "Silte arenoso": 1.00,
        "Silte argilo-arenoso": 1.00,
        "Silte argiloso": 1.00
    },
    "Raiz": {
        "Areia": 1.50,
        "Areia argilosa": 1.50,
        "Areia argilo-siltosa": 1.50,
        "Areia silto-argilosa": 1.50,
        "Areia siltosa": 1.50,
        "Argila": 1.50,
        "Argila arenosa": 1.50,
        "Argila areno-siltosa": 1.50,
        "Argila silto-arenosa": 1.50,
        "Argila siltosa": 1.50,
        "Silte": 1.50,
        "Silte areno-argiloso": 1.50,
        "Silte arenoso": 1.50,
        "Silte argilo-arenoso": 1.50,
        "Silte argiloso": 1.50
    },
    "Strauss": {
        "Areia": 0.50,
        "Areia argilosa": 0.50,
        "Areia argilo-siltosa": 0.50,
        "Areia silto-argilosa": 0.50,
        "Areia siltosa": 0.50,
        "Argila": 0.85,
        "Argila arenosa": 0.85,
        "Argila areno-siltosa": 0.85,
        "Argila silto-arenosa": 0.85,
        "Argila siltosa": 0.85,
        "Silte": 0.60,
        "Silte areno-argiloso": 0.60,
        "Silte arenoso": 0.60,
        "Silte argilo-arenoso": 0.60,
        "Silte argiloso": 0.60
    }
};

function getKavValue(solo) {
    const tabelaKav = {
        "Areia": 1000,
        "Areia argilosa": 600,
        "Areia argilo-siltosa": 500,
        "Areia silto-argilosa": 700,
        "Areia siltosa": 800,
        "Argila": 200,
        "Argila arenosa": 350,
        "Argila areno-siltosa": 300,
        "Argila silto-arenosa": 330,
        "Argila siltosa": 220,
        "Silte": 400,
        "Silte areno-argiloso": 450,
        "Silte arenoso": 550,
        "Silte argilo-arenoso": 250,
        "Silte argiloso": 230
    };
    return tabelaKav[solo] || 0;
}

function getAlphaValue(solo) {
    const tabelaAlpha = {
        "Areia": 1.4,
        "Areia argilosa": 3.0,
        "Areia argilo-siltosa": 2.8,
        "Areia silto-argilosa": 2.4,
        "Areia siltosa": 2.0,
        "Argila": 6.0,
        "Argila arenosa": 2.4,
        "Argila areno-siltosa": 2.8,
        "Argila silto-arenosa": 3.0,
        "Argila siltosa": 4.0,
        "Silte": 3.0,
        "Silte areno-argiloso": 2.8,
        "Silte arenoso": 2.2,
        "Silte argilo-arenoso": 3.0,
        "Silte argiloso": 3.4
    };
    return tabelaAlpha[solo] || 0;
}

function getF1Value(tipoEstaca) {
    const tabelaF1 = {
        "Escavada com lama bentonítica": 3.5,
        "Escavada grande diâmetro": 3.5,
        "Escavada pequeno diâmetro": 3.0,
        "Franki - fuste apiloado": 2.3,
        "Franki - fuste vibrado": 2.3,
        "Hélice contínua": 3.0,
        "Metálica": 1.8,
        "Pré-moldada cravada": 2.5,
        "Pré-moldada prensada": 1.2,
        "Raiz": 2.2,
        "Strauss": 4.2
    };
    return tabelaF1[tipoEstaca] || 0;
}

function getF2Value(tipoEstaca) {
    const tabelaF2 = {
        "Escavada com lama bentonítica": 4.5,
        "Escavada grande diâmetro": 7.0,
        "Escavada pequeno diâmetro": 6.0,
        "Franki - fuste apiloado": 3.0,
        "Franki - fuste vibrado": 3.2,
        "Hélice contínua": 3.8,
        "Metálica": 3.5,
        "Pré-moldada cravada": 3.5,
        "Pré-moldada prensada": 2.3,
        "Raiz": 2.4,
        "Strauss": 3.9
    };
    return tabelaF2[tipoEstaca] || 0;
}

function calculateQpAoki(Kav, spt, diametro, F1) {
    return Kav * spt * ((diametro / 200) ** 2) * Math.PI / F1;
}

function calculateQaAoki(Kav, alpha, spt, diametro, F2, index, rows) {
    const qpAokiAnterior = index > 0 ? parseFloat(rows[index - 1].querySelector('.qa-value-aoki').textContent) || 0 : 0;
    return (Kav * alpha * spt * (diametro / 10000) * Math.PI / F2) + qpAokiAnterior;
}

// Mapeamento de valores para K baseado no tipo de solo
const valoresK = {
    "Areia": 400,
    "Areia argilosa": 400,
    "Areia argilo-siltosa": 400,
    "Areia silto-argilosa": 400,
    "Areia siltosa": 400,
    "Argila": 120,
    "Argila arenosa": 120,
    "Argila areno-siltosa": 120,
    "Argila silto-arenosa": 120,
    "Argila siltosa": 120,
    "Silte": 200,
    "Silte areno-argiloso": 250,
    "Silte arenoso": 250,
    "Silte argilo-arenoso": 200,
    "Silte argiloso": 200
};

function addRowToTable() {
    const tableContainer = document.getElementById('table-container');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    const index = tableContainer.querySelectorAll('.row').length;

    newRow.innerHTML = `
        <div class="cell">${index}</div>
        <div class="cell"><input type="number" class="spt" oninput="recalculateAll()"></div>
        <div class="cell">
            <select class="solo" onchange="recalculateAll()">
                <option value="Areia">Areia</option>
                <option value="Areia argilosa">Areia argilosa</option>
                <option value="Areia argilo-siltosa">Areia argilo-siltosa</option>
                <option value="Areia silto-argilosa">Areia silto-argilosa</option>
                <option value="Areia siltosa">Areia siltosa</option>
                <option value="Argila">Argila</option>
                <option value="Argila arenosa">Argila arenosa</option>
                <option value="Argila areno-siltosa">Argila areno-siltosa</option>
                <option value="Argila silto-arenosa">Argila silto-arenosa</option>
                <option value="Argila siltosa">Argila siltosa</option>
                <option value="Silte">Silte</option>
                <option value="Silte areno-argiloso">Silte areno-argiloso</option>
                <option value="Silte arenoso">Silte arenoso</option>
                <option value="Silte argilo-arenoso">Silte argilo-arenoso</option>
                <option value="Silte argiloso">Silte argiloso</option>
            </select>
        </div>
        <div class="cell k-value"></div>
        <div class="cell qp-value"></div>
        <div class="cell Qp-value"></div>
        <div class="cell qs-value"></div>
        <div class="cell Qs-value"></div>
        <div class="cell Qtotal-value"></div>
        <div class="cell QCS-value"></div>

        <div class="cell k-value-aoki"></div>
        <div class="cell alpha-value-aoki"></div>
        <div class="cell qp-value-aoki"></div>
        <div class="cell qa-value-aoki"></div>
        <div class="cell Qtotal-value-aoki"></div>
        <div class="cell QCS-value-aoki"></div>
    `;
    tableContainer.appendChild(newRow);

    recalculateAll();
}

function recalculateAll() {
    const tipoEstaca = document.getElementById('tipoEstaca').value;
    const diametro = parseFloat(document.getElementById('diametro').value) || 0;
    const coefSeguranca = parseFloat(document.getElementById('coefSeguranca').value) || 1;

    const rows = document.querySelectorAll('.row:not(.header)');
    rows.forEach((row, index) => {
        const spt = parseInt(row.querySelector('.spt').value) || 0;
        const solo = row.querySelector('.solo').value;

        // Cálculo de K baseado no tipo de solo
        const k = valoresK[solo] || 0;
        row.querySelector('.k-value').textContent = k;

        // Cálculo de qp (kN/m2)
        const qp = k * spt;
        row.querySelector('.qp-value').textContent = qp;

        // Cálculo de Qp (kN)
        const Qp = qp * Math.pow(diametro / 200, 2) * Math.PI;
        row.querySelector('.Qp-value').textContent = Qp.toFixed(2);

        // Cálculo de qs (kN/m2)
        const qs = 10 * (spt / 3 + 1);
        row.querySelector('.qs-value').textContent = qs.toFixed(2);

        // Cálculo de Qs (kN)
        let previousQs = 0;
        if (index > 0) {
            const previousQsCell = rows[index - 1].querySelector('.Qs-value');
            previousQs = parseFloat(previousQsCell.textContent) || 0;
        }
        const Qs = Math.PI * (diametro / 100) * qs + previousQs;
        row.querySelector('.Qs-value').textContent = Qs.toFixed(2);

        // Coeficientes A e B baseados no tipo de estaca e solo
        const coefA = (coeficientesA[tipoEstaca] && coeficientesA[tipoEstaca][solo]) || 0;
        const coefB = (coeficientesB[tipoEstaca] && coeficientesB[tipoEstaca][solo]) || 0;

        // Cálculo de Qtotal (kN)
        const Qtotal = coefA * Qp + coefB * Qs;
        row.querySelector('.Qtotal-value').textContent = Qtotal.toFixed(2);

        // Cálculo de Q/CS (kN)
        const QCS = Qtotal / coefSeguranca;
        row.querySelector('.QCS-value').textContent = QCS.toFixed(2);

        const Kav = getKavValue(solo);
        row.querySelector('.k-value-aoki').textContent = Kav;

        const alpha = getAlphaValue(solo);
        row.querySelector('.alpha-value-aoki').textContent = alpha;

        const F1 = getF1Value(tipoEstaca);
        const F2 = getF2Value(tipoEstaca);
        
        const qpAoki = calculateQpAoki(Kav, spt, diametro, F1);
        row.querySelector('.qp-value-aoki').textContent = qpAoki.toFixed(2);

        const qaAoki = calculateQaAoki(Kav, alpha, spt, diametro, F2, index, rows);
        row.querySelector('.qa-value-aoki').textContent = qaAoki.toFixed(2);

        const QtotalAoki = qpAoki + qaAoki;
        row.querySelector('.Qtotal-value-aoki').textContent = QtotalAoki.toFixed(2);

        const QCSAoki = QtotalAoki / coefSeguranca;
        row.querySelector('.QCS-value-aoki').textContent = QCSAoki.toFixed(2);
    });
}

