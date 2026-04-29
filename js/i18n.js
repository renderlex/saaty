const translations = {
    uk: {
        site_title: "Метод Аналізу Ієрархій Сааті",
        tab_setup: "Налаштування",
        tab_criteria: "Критерії",
        tab_alternatives: "Альтернативи",
        tab_results: "Результати",
        tab_manual: "Мануал",
        setup_title: "Налаштування аналізу",
        setup_desc: "Введіть назву задачі та визначте кількість критеріїв і альтернатив",
        task_name: "Назва задачі / Ціль",
        task_name_ph: "Наприклад: Вибір найкращого кандидата",
        criteria_count: "Кількість критеріїв",
        criteria_count_hint: "від 2 до 10",
        alternatives_count: "Кількість альтернатив",
        alternatives_count_hint: "від 2 до 10",
        btn_next: "Далі →",
        btn_back: "← Назад",
        btn_calculate: "Розрахувати результати",
        criteria_names_title: "Назви критеріїв",
        criteria_names_desc: "Введіть назви для кожного критерію порівняння",
        criteria_comparison_title: "Попарне порівняння критеріїв",
        criteria_comparison_desc: "Оцініть відносну важливість кожної пари критеріїв за шкалою Сааті",
        alternatives_names_title: "Назви альтернатив",
        alternatives_names_desc: "Введіть назви для кожної альтернативи",
        vs: "проти",
        select_importance: "Наскільки важливіший лівий фактор?",
        left_more: "Лівий важливіший",
        right_more: "Правий важливіший",
        equal: "Рівна важливість",
        consistency: "Відношення узгодженості (CR)",
        consistency_good: "Узгодженість прийнятна",
        consistency_warning: "Узгодженість погранична",
        consistency_bad: "Узгодженість неприйнятна — перегляньте порівняння",
        empty_results_title: "Результати ще не розраховані",
        empty_results_desc: "Заповніть дані та натисніть \"Розрахувати результати\"",
        results_title: "Результати аналізу",
        results_goal: "Ціль",
        criteria_weights: "Ваги критеріїв",
        criteria_matrix: "Матриця попарних порівнянь критеріїв",
        alternatives_comparison: "Порівняння альтернатив",
        alt_matrix_for: "Матриця для критерію",
        final_ranking: "Фінальний рейтинг альтернатив",
        winner: "ПЕРЕМОЖЕЦЬ",
        alternative: "Альтернатива",
        global_priority: "Глобальний пріоритет",
        rank: "Ранг",
        criteria_consistency: "Узгодженість критеріїв",
        alternatives_consistency: "Узгодженість альтернатив",
        consistency_status: "Статус",
        cr_value: "Значення CR",
        lambda_max: "λmax",
        ci_value: "CI",
        manual_title: "Що таке Метод Аналізу Ієрархій (AHP)?",
        manual_intro: "Метод Аналізу Ієрархій (AHP) — це структурована техніка для організації та аналізу складних рішень, розроблена Томасом Сааті у 1970-х роках. Вона поєднує математику та психологію для прийняття обґрунтованих рішень.",
        manual_scale_title: "Шкала Сааті (1-9)",
        scale_value: "Значення",
        scale_meaning: "Значення шкали",
        scale_desc: "Опис",
        scale_1_meaning: "Рівна важливість",
        scale_1_desc: "Два фактори однаково важливі",
        scale_2_meaning: "Проміжне значення",
        scale_2_desc: "Між рівною та помірною перевагою",
        scale_3_meaning: "Помірна перевага",
        scale_3_desc: "Досвід та інтуїція помірно підтримують один фактор",
        scale_4_meaning: "Проміжне значення",
        scale_4_desc: "Між помірною та сильною перевагою",
        scale_5_meaning: "Сильна перевага",
        scale_5_desc: "Досвід та інтуїція сильно підтримують один фактор",
        scale_6_meaning: "Проміжне значення",
        scale_6_desc: "Між сильною та дуже сильною перевагою",
        scale_7_meaning: "Дуже сильна перевага",
        scale_7_desc: "Фактор сильно переважає, це підтверджується на практиці",
        scale_8_meaning: "Проміжне значення",
        scale_8_desc: "Між дуже сильною та абсолютною перевагою",
        scale_9_meaning: "Абсолютна перевага",
        scale_9_desc: "Найвищий рівень підтвердження переваги одного фактора",
        manual_steps_title: "Як користуватися",
        step1_title: "Налаштування",
        step1_desc: "Введіть назву задачі (наприклад, \"Вибір автомобіля\"), вкажіть кількість критеріїв порівняння та кількість альтернатив для оцінки.",
        step2_title: "Визначення критеріїв",
        step2_desc: "Назвіть кожен критерій (наприклад: Ціна, Якість, Швидкість). Потім проведіть попарне порівняння — для кожної пари критеріїв оберіть, наскільки один важливіший за інший за шкалою 1-9.",
        step3_title: "Оцінка альтернатив",
        step3_desc: "Назвіть альтернативи (наприклад: Варіант A, Варіант B). Для кожного критерію порівняйте альтернативи попарно — яка краща за цим критерієм.",
        step4_title: "Результати",
        step4_desc: "Система автоматично розрахує ваги критеріїв, оцінки альтернатив, перевірить узгодженість ваших відповідей (CR < 0.1) та покаже фінальний рейтинг найкращої альтернативи.",
        manual_consistency_title: "Індекс узгодженості (CR)",
        manual_consistency_desc: "Метод Сааті включає перевірку логічної узгодженості ваших відповідей. Відношення узгодженості (Consistency Ratio, CR) показує, наскільки ваші попарні порівняння є логічними.",
        manual_cr_good: "CR < 0.1 (10%) — прийнятна узгодженість, результати надійні",
        manual_cr_bad: "CR ≥ 0.1 (10%) — рекомендується переглянути порівняння",
        manual_cr_note: "Якщо CR занадто високий, це означає, що ваші відповіді суперечливі (наприклад, A > B, B > C, але C > A). Перегляньте свої оцінки.",
        manual_formula_title: "Математична основа",
        manual_formula_desc: "Розрахунки включають:",
        manual_formula_1: "Побудова матриці попарних порівнянь",
        manual_formula_2: "Обчислення нормалізованих ваг (середнє геометричне)",
        manual_formula_3: "Розрахунок максимального власного значення λmax",
        manual_formula_4: "Індекс узгодженості: CI = (λmax - n) / (n - 1)",
        manual_formula_5: "Відношення узгодженості: CR = CI / RI (де RI — випадковий індекс)",
        manual_formula_6: "Синтез глобальних пріоритетів альтернатив",
        manual_formula_note: "Випадкові індекси (RI) для різних розмірів матриці:",
        footer_text: "Метод Аналізу Ієрархій Т. Сааті © 2024"
    },
    en: {
        site_title: "Saaty's Analytic Hierarchy Process",
        tab_setup: "Setup",
        tab_criteria: "Criteria",
        tab_alternatives: "Alternatives",
        tab_results: "Results",
        tab_manual: "Manual",
        setup_title: "Analysis Setup",
        setup_desc: "Enter the task name and specify the number of criteria and alternatives",
        task_name: "Task Name / Goal",
        task_name_ph: "e.g., Choosing the best candidate",
        criteria_count: "Number of Criteria",
        criteria_count_hint: "from 2 to 10",
        alternatives_count: "Number of Alternatives",
        alternatives_count_hint: "from 2 to 10",
        btn_next: "Next →",
        btn_back: "← Back",
        btn_calculate: "Calculate Results",
        criteria_names_title: "Criteria Names",
        criteria_names_desc: "Enter names for each comparison criterion",
        criteria_comparison_title: "Pairwise Comparison of Criteria",
        criteria_comparison_desc: "Assess the relative importance of each pair of criteria using the Saaty scale",
        alternatives_names_title: "Alternative Names",
        alternatives_names_desc: "Enter names for each alternative",
        vs: "vs",
        select_importance: "How much more important is the left factor?",
        left_more: "Left is more important",
        right_more: "Right is more important",
        equal: "Equal importance",
        consistency: "Consistency Ratio (CR)",
        consistency_good: "Consistency is acceptable",
        consistency_warning: "Consistency is borderline",
        consistency_bad: "Consistency is unacceptable — review your comparisons",
        empty_results_title: "Results not yet calculated",
        empty_results_desc: "Fill in the data and click \"Calculate Results\"",
        results_title: "Analysis Results",
        results_goal: "Goal",
        criteria_weights: "Criteria Weights",
        criteria_matrix: "Pairwise Comparison Matrix — Criteria",
        alternatives_comparison: "Alternatives Comparison",
        alt_matrix_for: "Matrix for criterion",
        final_ranking: "Final Alternative Ranking",
        winner: "WINNER",
        alternative: "Alternative",
        global_priority: "Global Priority",
        rank: "Rank",
        criteria_consistency: "Criteria Consistency",
        alternatives_consistency: "Alternatives Consistency",
        consistency_status: "Status",
        cr_value: "CR Value",
        lambda_max: "λmax",
        ci_value: "CI",
        manual_title: "What is the Analytic Hierarchy Process (AHP)?",
        manual_intro: "The Analytic Hierarchy Process (AHP) is a structured technique for organizing and analyzing complex decisions, developed by Thomas Saaty in the 1970s. It combines mathematics and psychology to make well-informed decisions.",
        manual_scale_title: "Saaty Scale (1-9)",
        scale_value: "Value",
        scale_meaning: "Scale Meaning",
        scale_desc: "Description",
        scale_1_meaning: "Equal importance",
        scale_1_desc: "Two factors are equally important",
        scale_2_meaning: "Intermediate value",
        scale_2_desc: "Between equal and moderate preference",
        scale_3_meaning: "Moderate preference",
        scale_3_desc: "Experience and judgment moderately favor one factor",
        scale_4_meaning: "Intermediate value",
        scale_4_desc: "Between moderate and strong preference",
        scale_5_meaning: "Strong preference",
        scale_5_desc: "Experience and judgment strongly favor one factor",
        scale_6_meaning: "Intermediate value",
        scale_6_desc: "Between strong and very strong preference",
        scale_7_meaning: "Very strong preference",
        scale_7_desc: "A factor is strongly favored, and its dominance is demonstrated in practice",
        scale_8_meaning: "Intermediate value",
        scale_8_desc: "Between very strong and absolute preference",
        scale_9_meaning: "Absolute preference",
        scale_9_desc: "The highest possible level of affirmation",
        manual_steps_title: "How to Use",
        step1_title: "Setup",
        step1_desc: "Enter the task name (e.g., \"Choosing a car\"), specify the number of comparison criteria and the number of alternatives to evaluate.",
        step2_title: "Define Criteria",
        step2_desc: "Name each criterion (e.g., Price, Quality, Speed). Then perform pairwise comparisons — for each pair of criteria, choose how much more important one is over the other on a 1-9 scale.",
        step3_title: "Evaluate Alternatives",
        step3_desc: "Name the alternatives (e.g., Option A, Option B). For each criterion, compare the alternatives pairwise — which one is better by this criterion.",
        step4_title: "Results",
        step4_desc: "The system will automatically calculate criteria weights, alternative scores, check the consistency of your responses (CR < 0.1), and show the final ranking of the best alternative.",
        manual_consistency_title: "Consistency Index (CR)",
        manual_consistency_desc: "The Saaty method includes a logical consistency check of your responses. The Consistency Ratio (CR) shows how logical your pairwise comparisons are.",
        manual_cr_good: "CR < 0.1 (10%) — acceptable consistency, results are reliable",
        manual_cr_bad: "CR ≥ 0.1 (10%) — it is recommended to review comparisons",
        manual_cr_note: "If CR is too high, it means your answers are contradictory (e.g., A > B, B > C, but C > A). Review your assessments.",
        manual_formula_title: "Mathematical Foundation",
        manual_formula_desc: "Calculations include:",
        manual_formula_1: "Building a pairwise comparison matrix",
        manual_formula_2: "Computing normalized weights (geometric mean)",
        manual_formula_3: "Calculating the maximum eigenvalue λmax",
        manual_formula_4: "Consistency Index: CI = (λmax - n) / (n - 1)",
        manual_formula_5: "Consistency Ratio: CR = CI / RI (where RI is the random index)",
        manual_formula_6: "Synthesizing global priorities of alternatives",
        manual_formula_note: "Random Indices (RI) for different matrix sizes:",
        footer_text: "Analytic Hierarchy Process by T. Saaty © 2024"
    }
};

let currentLang = 'uk';

function t(key) {
    return translations[currentLang][key] || translations['uk'][key] || key;
}

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    localStorage.setItem('ahp-lang', lang);
    if (window.rebuildCurrentUI) {
        window.rebuildCurrentUI();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('ahp-lang');
    if (saved) applyLanguage(saved);

    document.getElementById('langToggle').addEventListener('click', () => {
        const newLang = currentLang === 'uk' ? 'en' : 'uk';
        applyLanguage(newLang);
    });
});
