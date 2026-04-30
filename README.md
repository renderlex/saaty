📊 Saaty Method (AHP) Decision Tool

This project implements the Analytic Hierarchy Process (AHP), a structured technique for organizing and analyzing complex decisions, based on mathematics and psychology. Developed by Thomas L. Saaty, it is the gold standard for multi-criteria decision-making.

🇬🇧 English Description
🌟 Overview
Choosing the best option is often difficult when multiple factors are involved. This tool allows you to decompose your problem into a hierarchy, evaluate importance levels, and receive a mathematically backed recommendation.

🛠 Method Features
Pairwise Comparisons: Uses the fundamental Saaty scale (1–9).

Consistency Control: Automatically calculates the Consistency Ratio (CR).

ℹ️ A result is considered reliable if CR < 0.1. If higher, the system suggests re-evaluating your judgments.

Dynamic Scaling: Supports from 2 to 10 criteria and alternatives.

📋 How It Works
Goal Setting: Define your problem and the number of factors.

Hierarchy Construction:

Фрагмент коду

graph TD
  Goal[Goal] --> C1[Criterion 1]
  Goal --> C2[Criterion 2]
  C1 --> A1[Alternative A]
  C1 --> A2[Alternative B]
  C2 --> A1
  C2 --> A2
Judgment: Compare criteria against each other, then compare alternatives under each criterion.

Synthesis: The system calculates local and global weights to produce a final ranking.

🇺🇦 Український опис
📊 Інструмент прийняття рішень за методом Сааті (AHP)
Цей проєкт реалізує Метод аналізу ієрархій (МАІ) — системну процедуру для ієрархічного представлення елементів, що визначають суть проблеми. Розроблений Томасом Сааті, цей метод поєднує математичну точність із психологічними аспектами вибору.

🌟 Огляд
Вибір найкращого варіанту стає складним, коли на нього впливає багато факторів. Цей інструмент дозволяє розкласти вашу проблему на ієрархію, оцінити рівні важливості кожного елемента та отримати математично обґрунтовану рекомендацію.

🛠 Особливості методу
Попарні порівняння: Використання фундаментальної шкали Сааті (від 1 до 9).

Контроль логіки: Автоматичний розрахунок Відношення узгодженості (CR).

ℹ️ Результат вважається надійним, якщо CR < 0.1. Якщо показник вищий, система рекомендує переглянути ваші оцінки.

Гнучкість: Підтримка від 2 до 10 критеріїв та альтернатив.

📋 Алгоритм роботи
Постановка мети: Визначте назву проблеми та кількість факторів.

Побудова ієрархії:

Фрагмент коду

graph TD
  Goal[Мета] --> C1[Критерій 1]
  Goal --> C2[Критерій 2]
  C1 --> A1[Варіант А]
  C1 --> A2[Варіант Б]
  C2 --> A1
  C2 --> A2
Експертна оцінка: Порівняйте критерії між собою, а потім — альтернативи за кожним критерієм.

Синтез пріоритетів: Система розраховує вагові коефіцієнти та виводить фінальний рейтинг найкращих рішень.

💻 Tech Stack / Технології
Logic: Analytic Hierarchy Process / Метод аналізу ієрархій

Mathematics: Matrix Eigenvectors / Власні вектори матриць

Visualization: Mermaid.js graphs

Developed to simplify complex choices through mathematical clarity.
