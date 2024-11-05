const quizQuestions = [
    {
        question: "Хто є головним героєм 'Давньої казки'?",
        options: ["Поет", "Король", "Лицар", "Селянин"],
        correctAnswer: 0
    },
    {
        question: "Яку роль відіграє поет у творі?",
        options: ["Він є антагоністом", "Він є оповідачем", "Він є другорядним персонажем", "Він є головним героєм"],
        correctAnswer: 3
    },
    {
        question: "Яка основна тема 'Давньої казки'?",
        options: ["Кохання", "Війна", "Свобода і творчість", "Природа"],
        correctAnswer: 2
    },
    {
        question: "Що символізує арфа у творі?",
        options: ["Багатство", "Владу", "Мистецтво і творчість", "Кохання"],
        correctAnswer: 2
    },
    {
        question: "Як закінчується 'Давня казка'?",
        options: ["Поет стає королем", "Поет гине", "Поет одружується", "Поет перемагає ворогів"],
        correctAnswer: 1
    },
    {
        question: "Який жанр 'Давньої казки'?",
        options: ["Лірична поема", "Епічна поема", "Балада", "Сонет"],
        correctAnswer: 1
    },
    {
        question: "Яку роль відіграє принцеса у творі?",
        options: ["Вона є головною героїнею", "Вона є антагоністом", "Вона є каталізатором подій", "Вона є другорядним персонажем"],
        correctAnswer: 2
    },
    {
        question: "Яке значення має назва 'Давня казка'?",
        options: ["Це просто стара історія", "Це алегорія на сучасне суспільство", "Це легенда про минуле", "Це казка для дітей"],
        correctAnswer: 1
    }
];

function renderQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <div class="options">
                ${q.options.map((option, i) => `
                    <div class="option" data-question="${index}" data-option="${i}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionElement);
    });

    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });
}

function selectOption(e) {
    const questionIndex = e.target.dataset.question;
    const optionIndex = e.target.dataset.option;
    
    // Remove 'selected' class from all options in this question
    document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add 'selected' class to clicked option
    e.target.classList.add('selected');
}

function submitQuiz() {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`.option[data-question="${index}"].selected`);
        if (selectedOption && parseInt(selectedOption.dataset.option) === q.correctAnswer) {
            score += 1.5;
        }
    });

    const resultsElement = document.getElementById('quiz-results');
    resultsElement.innerHTML = `<h3>Ваш результат: ${score} з 12 балів</h3>`;

    // Display correct answers
    quizQuestions.forEach((q, index) => {
        const questionElement = document.querySelector(`.question:nth-child(${index + 1})`);
        const selectedOption = questionElement.querySelector('.option.selected');
        const correctOption = questionElement.querySelector(`.option[data-option="${q.correctAnswer}"]`);

        if (selectedOption) {
            if (parseInt(selectedOption.dataset.option) === q.correctAnswer) {
                selectedOption.style.backgroundColor = '#4CAF50';
                selectedOption.style.color = 'white';
            } else {
                selectedOption.style.backgroundColor = '#F44336';
                selectedOption.style.color = 'white';
                correctOption.style.backgroundColor = '#4CAF50';
                correctOption.style.color = 'white';
            }
        } else {
            correctOption.style.backgroundColor = '#4CAF50';
            correctOption.style.color = 'white';
        }
    });

    // Disable further selections
    document.querySelectorAll('.option').forEach(option => {
        option.removeEventListener('click', selectOption);
        option.style.cursor = 'default';
    });

    // Hide submit button
    document.getElementById('submit-quiz').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
});