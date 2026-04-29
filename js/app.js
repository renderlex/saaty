const App = {
    state: {
        taskName: '',
        criteriaCount: 3,
        alternativesCount: 3,
        criteriaNames: [],
        alternativesNames: [],
        criteriaComparisons: [],
        alternativesComparisons: [],
        criteriaAnalysis: null,
        alternativesAnalyses: [],
        finalResults: null,
        currentTab: 'setup'
    },

    charts: {},

    init() {
        this.bindTabs();
        this.bindSetup();
        this.bindNavigation();
        this.loadState();
    },

    bindTabs() {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });
    },

    bindSetup() {
        document.getElementById('btnSetupNext').addEventListener('click', () => {
            this.state.taskName = document.getElementById('taskName').value || (t('task_name_ph'));
            this.state.criteriaCount = parseInt(document.getElementById('criteriaCount').value) || 3;
            this.state.alternativesCount = parseInt(document.getElementById('alternativesCount').value) || 3;

            this.state.criteriaCount = Math.max(2, Math.min(10, this.state.criteriaCount));
            this.state.alternativesCount = Math.max(2, Math.min(10, this.state.alternativesCount));

            this.initializeCriteriaNames();
            this.initializeCriteriaComparisons();
            this.switchTab('criteria');
            this.saveState();
        });
    },

    bindNavigation() {
        document.getElementById('btnCriteriaBack').addEventListener('click', () => this.switchTab('setup'));
        document.getElementById('btnCriteriaNext').addEventListener('click', () => {
            this.collectCriteriaComparisons();
            this.initializeAlternativesNames();
            this.initializeAlternativesComparisons();
            this.switchTab('alternatives');
            this.saveState();
        });

        document.getElementById('btnAlternativesBack').addEventListener('click', () => this.switchTab('criteria'));
        document.getElementById('btnAlternativesNext').addEventListener('click', () => {
            this.collectAlternativesComparisons();
            this.calculateResults();
            this.renderResults();
            this.switchTab('results');
            this.saveState();
        });
    },

    switchTab(tabName) {
        this.state.currentTab = tabName;
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
        document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('active', s.id === `tab-${tabName}`));
        this.saveState();
    },

    initializeCriteriaNames() {
        const container = document.getElementById('criteriaNamesContainer');
        container.innerHTML = '<div class="names-grid">' +
            Array.from({ length: this.state.criteriaCount }, (_, i) => `
                <div class="name-input-group">
                    <span class="number-badge">${i + 1}</span>
                    <input type="text" id="criteriaName${i}" value="${this.state.criteriaNames[i] || ''}"
                           placeholder="${t('alternative')} ${i + 1}" data-i18n-placeholder="alternative">
                </div>
            `).join('') + '</div>';
    },

    initializeCriteriaComparisons() {
        const n = this.state.criteriaCount;
        const numPairs = n * (n - 1) / 2;
        this.state.criteriaComparisons = this.state.criteriaComparisons.length === numPairs
            ? this.state.criteriaComparisons
            : new Array(numPairs).fill(1);

        this.renderComparisonSection('criteriaComparisonContainer', this.state.criteriaNames, this.state.criteriaComparisons, 'criteria');
    },

    initializeAlternativesNames() {
        const container = document.getElementById('alternativesNamesContainer');
        container.innerHTML = '<div class="names-grid">' +
            Array.from({ length: this.state.alternativesCount }, (_, i) => `
                <div class="name-input-group">
                    <span class="number-badge">${i + 1}</span>
                    <input type="text" id="alternativeName${i}" value="${this.state.alternativesNames[i] || ''}"
                           placeholder="${t('alternative')} ${i + 1}">
                </div>
            `).join('') + '</div>';
    },

    initializeAlternativesComparisons() {
        const numCriteria = this.state.criteriaCount;
        const n = this.state.alternativesCount;
        const numPairs = n * (n - 1) / 2;

        const container = document.getElementById('alternativesComparisonsContainer');
        container.innerHTML = '';

        for (let c = 0; c < numCriteria; c++) {
            const criterionName = this.getCriteriaNames()[c] || `Criterion ${c + 1}`;
            const groupDiv = document.createElement('div');
            groupDiv.className = 'comparison-group';
            groupDiv.innerHTML = `
                <h3>${t('alt_matrix_for')}: <span>${criterionName}</span></h3>
                <div id="altComparisonGroup${c}"></div>
                <div class="consistency-indicator" id="altConsistency${c}"></div>
            `;
            container.appendChild(groupDiv);

            const key = `alt_${c}`;
            if (!this.state.alternativesComparisons[key] || this.state.alternativesComparisons[key].length !== numPairs) {
                this.state.alternativesComparisons[key] = new Array(numPairs).fill(1);
            }

            this.renderComparisonSection(`altComparisonGroup${c}`, this.getAlternativesNames(), this.state.alternativesComparisons[key], key);
        }
    },

    renderComparisonSection(containerId, names, comparisons, prefix) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const n = names.length;
        let html = '';
        let pairIdx = 0;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const val = comparisons[pairIdx] || 1;
                const leftName = names[i] || `Item ${i + 1}`;
                const rightName = names[j] || `Item ${j + 1}`;

                html += `
                    <div class="comparison-pair">
                        <div class="comparison-pair-header">
                            <div class="comparison-labels">
                                <span class="label">${leftName}</span>
                                <span class="vs">${t('vs')}</span>
                                <span class="label">${rightName}</span>
                            </div>
                        </div>
                        <div class="scale-selector">
                            ${this.renderScaleBtns(pairIdx, val, prefix, leftName, rightName)}
                        </div>
                        <div class="comparison-value" id="compValue_${prefix}_${pairIdx}">
                            ${this.getComparisonText(val, leftName, rightName)}
                        </div>
                    </div>
                `;
                pairIdx++;
            }
        }

        container.innerHTML = html;
    },

    renderScaleBtns(pairIdx, currentVal, prefix, leftName, rightName) {
        let html = '<div class="scale-labels" style="width:100%"><span>' + leftName + '</span><span>' + rightName + '</span></div>';
        html += '<div style="display:flex;align-items:center;gap:2px;width:100%">';

        for (let v = 9; v >= 1; v--) {
            const isActive = val => val === v || (v > 1 && val === -v);
            const val = v;
            const absVal = Math.abs(currentVal);
            const active = absVal === val;
            let cls = 'scale-btn';
            if (active) cls += ' active';

            html += `<button class="${cls}" data-prefix="${prefix}" data-pair="${pairIdx}" data-value="${val}" onclick="App.setComparison('${prefix}', ${pairIdx}, ${val})">${val}</button>`;
        }

        html += '</div>';
        return html;
    },

    getComparisonText(val, leftName, rightName) {
        if (val === 1) return `${t('equal')}`;
        if (val > 1) return `${leftName} ${t('left_more')} (${val})`;
        return `${rightName} ${t('right_more')} (${Math.abs(val)})`;
    },

    setComparison(prefix, pairIdx, value) {
        if (prefix === 'criteria') {
            this.state.criteriaComparisons[pairIdx] = value;
            this.collectCriteriaComparisons();
            this.updateCriteriaConsistency();
        } else {
            const key = prefix;
            this.state.alternativesComparisons[key][pairIdx] = value;
            this.updateAltConsistency(parseInt(key.replace('alt_', '')));
        }

        document.querySelectorAll(`.scale-btn[data-prefix="${prefix}"][data-pair="${pairIdx}"]`).forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.value) === value);
        });

        const valEl = document.getElementById(`compValue_${prefix}_${pairIdx}`);
        if (valEl) {
            const names = prefix === 'criteria' ? this.getCriteriaNames() : this.getAlternativesNames();
            const n = names.length;
            let idx = 0, i = 0, j = 0;
            for (i = 0; i < n; i++) {
                for (j = i + 1; j < n; j++) {
                    if (idx === pairIdx) break;
                    idx++;
                }
                if (idx === pairIdx) break;
            }
            valEl.textContent = this.getComparisonText(value, names[i], names[j]);
        }

        this.saveState();
    },

    collectCriteriaNames() {
        this.state.criteriaNames = [];
        for (let i = 0; i < this.state.criteriaCount; i++) {
            const el = document.getElementById(`criteriaName${i}`);
            this.state.criteriaNames.push(el ? el.value : `Criterion ${i + 1}`);
        }
    },

    collectCriteriaComparisons() {
        this.collectCriteriaNames();
        const n = this.state.criteriaCount;
        const matrix = Saaty.buildReciprocalMatrix(n, this.state.criteriaComparisons);
        this.state.criteriaAnalysis = Saaty.analyzeMatrix(matrix);
        this.updateCriteriaConsistency();
    },

    collectAlternativesComparisons() {
        this.state.alternativesNames = [];
        for (let i = 0; i < this.state.alternativesCount; i++) {
            const el = document.getElementById(`alternativeName${i}`);
            this.state.alternativesNames.push(el ? el.value : `Alternative ${i + 1}`);
        }

        this.state.alternativesAnalyses = [];
        for (let c = 0; c < this.state.criteriaCount; c++) {
            const key = `alt_${c}`;
            const matrix = Saaty.buildReciprocalMatrix(this.state.alternativesCount, this.state.alternativesComparisons[key]);
            this.state.alternativesAnalyses.push(Saaty.analyzeMatrix(matrix));
        }
    },

    updateCriteriaConsistency() {
        const el = document.getElementById('criteriaConsistency');
        if (el && this.state.criteriaAnalysis) {
            this.renderConsistency(el, this.state.criteriaAnalysis);
        }
    },

    updateAltConsistency(criteriaIdx) {
        const el = document.getElementById(`altConsistency${criteriaIdx}`);
        if (el && this.state.alternativesAnalyses[criteriaIdx]) {
            this.renderConsistency(el, this.state.alternativesAnalyses[criteriaIdx]);
        }
    },

    renderConsistency(el, analysis) {
        const cr = analysis.cr;
        el.className = 'consistency-indicator ' + analysis.status;
        el.innerHTML = `${t('consistency')}: <strong>${cr.toFixed(4)}</strong> | ${t('lambda_max')}: ${analysis.lambdaMax.toFixed(4)} | ${analysis.status === 'good' ? t('consistency_good') : analysis.status === 'warning' ? t('consistency_warning') : t('consistency_bad')}`;
    },

    calculateResults() {
        this.collectCriteriaComparisons();
        this.collectAlternativesComparisons();
        this.state.finalResults = Saaty.synthesizeResults(this.state.criteriaAnalysis, this.state.alternativesAnalyses);
    },

    getCriteriaNames() {
        return this.state.criteriaNames.length ? this.state.criteriaNames : Array.from({ length: this.state.criteriaCount }, (_, i) => `Criterion ${i + 1}`);
    },

    getAlternativesNames() {
        return this.state.alternativesNames.length ? this.state.alternativesNames : Array.from({ length: this.state.alternativesCount }, (_, i) => `Alternative ${i + 1}`);
    },

    renderResults() {
        const emptyState = document.getElementById('emptyResults');
        const content = document.getElementById('resultsContent');

        if (!this.state.finalResults) {
            emptyState.style.display = 'block';
            content.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        content.style.display = 'block';

        const criteriaNames = this.getCriteriaNames();
        const alternativesNames = this.getAlternativesNames();
        const results = this.state.finalResults;
        const ca = this.state.criteriaAnalysis;

        let html = `
            <div class="card">
                <h2>${t('results_title')}</h2>
                <p><strong>${t('results_goal')}:</strong> ${this.state.taskName}</p>
            </div>

            <div class="card">
                <h2>${t('criteria_weights')}</h2>
                <div class="result-grid">
                    <div>
                        <div id="criteriaBars"></div>
                    </div>
                    <div class="chart-container">
                        <canvas id="criteriaChart"></canvas>
                    </div>
                </div>
                <div class="consistency-indicator ${ca.status}" style="margin-top:1rem">
                    ${t('criteria_consistency')}: CR = ${ca.cr.toFixed(4)} | ${t('lambda_max')} = ${ca.lambdaMax.toFixed(4)} | ${t('ci_value')} = ${ca.ci.toFixed(4)} — ${ca.status === 'good' ? t('consistency_good') : ca.status === 'warning' ? t('consistency_warning') : t('consistency_bad')}
                </div>
                <div class="criteria-matrix-preview">
                    <h3 style="margin-top:1rem">${t('criteria_matrix')}</h3>
                    ${this.renderMatrixTable(ca.matrix, criteriaNames)}
                </div>
            </div>
        `;

        for (let c = 0; c < this.state.criteriaCount; c++) {
            const aa = this.state.alternativesAnalyses[c];
            html += `
                <div class="card">
                    <h2>${t('alt_matrix_for')}: ${criteriaNames[c]}</h2>
                    <div class="result-grid">
                        <div>
                            <div id="altBars${c}"></div>
                        </div>
                        <div class="chart-container">
                            <canvas id="altChart${c}"></canvas>
                        </div>
                    </div>
                    <div class="consistency-indicator ${aa.status}" style="margin-top:1rem">
                        ${t('alternatives_consistency')}: CR = ${aa.cr.toFixed(4)} | ${t('lambda_max')} = ${aa.lambdaMax.toFixed(4)} | ${t('ci_value')} = ${aa.ci.toFixed(4)} — ${aa.status === 'good' ? t('consistency_good') : aa.status === 'warning' ? t('consistency_warning') : t('consistency_bad')}
                    </div>
                    <div class="criteria-matrix-preview">
                        ${this.renderMatrixTable(aa.matrix, alternativesNames)}
                    </div>
                </div>
            `;
        }

        html += `
            <div class="card">
                <h2>${t('final_ranking')}</h2>
                <div id="finalBars"></div>
                <div class="result-grid" style="margin-top:1.5rem">
                    <div class="chart-container">
                        <canvas id="finalChart"></canvas>
                    </div>
                    <div>
                        <table class="result-table">
                            <thead>
                                <tr>
                                    <th>${t('rank')}</th>
                                    <th>${t('alternative')}</th>
                                    <th>${t('global_priority')}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${results.ranked.map((r, rank) => `
                                    <tr>
                                        <td><strong>${rank + 1}</strong></td>
                                        <td>${alternativesNames[r.idx]}</td>
                                        <td><strong>${r.score.toFixed(4)}</strong></td>
                                        <td>${rank === 0 ? `<span class="winner-badge">${t('winner')}</span>` : ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        content.innerHTML = html;

        this.renderBarChart('criteriaBars', criteriaNames, ca.weights, '#2563eb');
        this.renderChart('criteriaChart', 'pie', criteriaNames, ca.weights);

        for (let c = 0; c < this.state.criteriaCount; c++) {
            const aa = this.state.alternativesAnalyses[c];
            this.renderBarChart(`altBars${c}`, alternativesNames, aa.weights, '#16a34a');
            this.renderChart(`altChart${c}`, 'doughnut', alternativesNames, aa.weights);
        }

        const colors = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];
        this.renderBarChart('finalBars', alternativesNames, results.globalPriorities, colors);
        this.renderChart('finalChart', 'bar', alternativesNames, results.globalPriorities);
    },

    renderMatrixTable(matrix, names) {
        let html = '<table class="matrix-table"><thead><tr><th></th>';
        names.forEach(n => html += `<th>${n}</th>`);
        html += '</tr></thead><tbody>';

        for (let i = 0; i < matrix.length; i++) {
            html += `<tr><th>${names[i]}</th>`;
            for (let j = 0; j < matrix.length; j++) {
                let cls = '';
                if (i === j) cls = ' class="diagonal"';
                else if (matrix[i][j] !== 1) cls = ' class="highlight"';
                html += `<td${cls}>${matrix[i][j] === Math.floor(matrix[i][j]) ? matrix[i][j] : matrix[i][j].toFixed(3)}</td>`;
            }
            html += '</tr>';
        }

        html += '</tbody></table>';
        return html;
    },

    renderBarChart(containerId, labels, values, colors) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const maxVal = Math.max(...values);
        const colorArr = Array.isArray(colors) ? colors : Array(labels.length).fill(colors);

        container.innerHTML = labels.map((label, i) => `
            <div class="bar-visual">
                <div class="bar-label">${label}</div>
                <div class="bar-track">
                    <div class="bar-fill" style="width:${(values[i] / maxVal * 100).toFixed(1)}%;background:${colorArr[i % colorArr.length]}">
                        ${(values[i] * 100).toFixed(1)}%
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderChart(canvasId, type, labels, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const colors = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];
        const bgColors = colors.slice(0, labels.length).map(c => c + 'cc');

        const config = {
            type,
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: type === 'bar' ? colors.slice(0, labels.length) : bgColors,
                    borderColor: type === 'bar' ? colors.slice(0, labels.length) : colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderRadius: type === 'bar' ? 8 : 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: type !== 'bar',
                        position: 'bottom'
                    }
                },
                scales: type === 'bar' ? {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                } : {}
            }
        };

        this.charts[canvasId] = new Chart(canvas, config);
    },

    saveState() {
        try {
            localStorage.setItem('ahp-state', JSON.stringify(this.state));
        } catch (e) { }
    },

    loadState() {
        try {
            const saved = localStorage.getItem('ahp-state');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(this.state, parsed);

                document.getElementById('taskName').value = this.state.taskName || '';
                document.getElementById('criteriaCount').value = this.state.criteriaCount || 3;
                document.getElementById('alternativesCount').value = this.state.alternativesCount || 3;

                if (this.state.currentTab && this.state.currentTab !== 'setup') {
                    if (this.state.criteriaNames.length > 0) {
                        this.initializeCriteriaNames();
                    }
                    if (this.state.criteriaComparisons.length > 0) {
                        this.initializeCriteriaComparisons();
                        this.updateCriteriaConsistency();
                    }
                    if (this.state.alternativesNames.length > 0) {
                        this.initializeAlternativesNames();
                    }
                    if (Object.keys(this.state.alternativesComparisons).length > 0) {
                        this.initializeAlternativesComparisons();
                    }
                    if (this.state.finalResults) {
                        this.renderResults();
                    }
                    this.switchTab(this.state.currentTab);
                }
            }
        } catch (e) { }
    }
};

window.rebuildCurrentUI = function () {
    const tab = App.state.currentTab;
    if (tab === 'criteria') {
        App.initializeCriteriaNames();
        App.initializeCriteriaComparisons();
        App.updateCriteriaConsistency();
    } else if (tab === 'alternatives') {
        App.initializeAlternativesNames();
        App.initializeAlternativesComparisons();
    } else if (tab === 'results' && App.state.finalResults) {
        App.renderResults();
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
