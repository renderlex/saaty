const Saaty = {
    RI: [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49],

    geometricMeanWeights(matrix) {
        const n = matrix.length;
        const geoMeans = [];

        for (let i = 0; i < n; i++) {
            let product = 1;
            for (let j = 0; j < n; j++) {
                product *= matrix[i][j];
            }
            geoMeans.push(Math.pow(product, 1 / n));
        }

        const sum = geoMeans.reduce((a, b) => a + b, 0);
        return geoMeans.map(g => g / sum);
    },

    calculateLambdaMax(matrix, weights) {
        // λmax = (1/n) * sum_i ( (Aw)_i / w_i ), where A is the pairwise comparison matrix
        const n = matrix.length;
        const w = weights;
        const Aw = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                sum += matrix[i][j] * w[j];
            }
            Aw[i] = sum;
        }
        let lambdaMax = 0;
        for (let i = 0; i < n; i++) {
            lambdaMax += Aw[i] / w[i];
        }
        return lambdaMax / n;
    },

    calculateCI(lambdaMax, n) {
        return (lambdaMax - n) / (n - 1);
    },

    calculateCR(ci, n) {
        if (n <= 2) return 0;
        const ri = this.RI[n - 1] || 1.49;
        return ci / ri;
    },

    consistencyStatus(cr) {
        if (cr < 0.1) return 'good';
        if (cr < 0.2) return 'warning';
        return 'bad';
    },

    analyzeMatrix(matrix) {
        const n = matrix.length;
        const weights = this.geometricMeanWeights(matrix);
        const lambdaMax = this.calculateLambdaMax(matrix, weights);
        const ci = this.calculateCI(lambdaMax, n);
        const cr = this.calculateCR(ci, n);

        return {
            weights,
            lambdaMax,
            ci,
            cr,
            status: this.consistencyStatus(cr),
            matrix
        };
    },

    buildReciprocalMatrix(n, comparisons) {
        const matrix = Array.from({ length: n }, () => Array(n).fill(1));

        let idx = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const val = comparisons[idx] || 1;
                matrix[i][j] = val;
                matrix[j][i] = 1 / val;
                idx++;
            }
        }

        return matrix;
    },

    synthesizeResults(criteriaAnalysis, alternativesAnalyses) {
        const criteriaWeights = criteriaAnalysis.weights;
        const numAlternatives = alternativesAnalyses[0].weights.length;

        const globalPriorities = Array(numAlternatives).fill(0);

        for (let a = 0; a < numAlternatives; a++) {
            for (let c = 0; c < criteriaWeights.length; c++) {
                globalPriorities[a] += alternativesAnalyses[c].weights[a] * criteriaWeights[c];
            }
        }

        const ranked = globalPriorities
            .map((score, idx) => ({ idx, score }))
            .sort((a, b) => b.score - a.score);

        return {
            globalPriorities,
            ranked,
            winnerIdx: ranked[0].idx,
            winnerScore: ranked[0].score
        };
    }
};
