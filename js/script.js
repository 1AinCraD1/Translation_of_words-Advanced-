const elementaryWords = [
    { english: "train", ukrainian: "потяг" },
    { english: "airplane", ukrainian: "літак" },
	{ english: "frog", ukrainian: "лягушка" },
	{ english: "woman", ukrainian: "жінка" },
	{ english: "friend", ukrainian: "друг" },
	{ english: "car", ukrainian: "машина" },
	{ english: "name", ukrainian: "ім'я" },
	{ english: "face", ukrainian: "обличчя" },
	{ english: "week", ukrainian: "тиждень" },
	{ english: "tree", ukrainian: "дерево" },
];

const intermediateWords = [
    { english: "behavior", ukrainian: "поведінка" },
    { english: "cook", ukrainian: "готувати" },
	{ english: "addiction", ukrainian: "залежність" },
	{ english: "ground", ukrainian: "земля" },
	{ english: "space", ukrainian: "космос" },
	{ english: "land", ukrainian: "суша" },
	{ english: "ride a bike", ukrainian: "кататись на велосипеді" },
	{ english: "responsible", ukrainian: "відповідальний" },
	{ english: "foreign", ukrainian: "іноземний" },
	{ english: "victory", ukrainian: "перемога" },
];

const advancedWords = [
    { english: "drought", ukrainian: "посуха" },
	{ english: "extant", ukrainian: "збережений" },
	{ english: "abjure", ukrainian: "відмовлятися" },
	{ english: "cumbersome", ukrainian: "громіздкий" },
	{ english: "enormous", ukrainian: "величезний" },
	{ english: "dearth", ukrainian: "дефіцит" },
	{ english: "dispatch", ukrainian: "відправлення" },
	{ english: "volatile", ukrainian: "непостійний" },
	{ english: "visionary", ukrainian: "мрійливий" },
	{ english: "provident", ukrainian: "передбачливий" },
];

let currentWords = elementaryWords;
let currentStep = 1;
let correctCount = 0;
let incorrectCount = 0;
let usedWords = [];

function changeLevel(level) {
    if (level === 'elementary') {
        currentWords = elementaryWords;
    } else if (level === 'intermediate') {
        currentWords = intermediateWords;
    } else if (level === 'advanced') {
        currentWords = advancedWords;
    }

    usedWords.length = 0;
    currentStep = 1;
    correctCount = 0;
    incorrectCount = 0;

	updateCounters();

    displayWord();
}

function getRandomWord() {
    const availableWords = currentWords.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
        usedWords.length = 0;
        return currentWords[Math.floor(Math.random() * currentWords.length)];
    }
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.push(selectedWord);
    return selectedWord;
}

function displayWord() {
    const word = getRandomWord();
    $("#word").text(word.english);
    $("#translation").val("");
    $("#progress").text(`${currentStep}/${currentWords.length}`);
}

function checkTranslation() {
    if (currentStep > currentWords.length) {
        return;
    }
    const word = $("#word").text();
    const userTranslation = $("#translation").val().trim().toLowerCase();
    const correctTranslation = currentWords.find(w => w.english === word).ukrainian.toLowerCase();

    if (userTranslation === correctTranslation) {
        correctCount++;
        $("#correctCount").text(`Вірно: ${correctCount}`);
    } else {
        incorrectCount++;
        $("#incorrectCount").text(`Невірно: ${incorrectCount}`);
    }

    currentStep++;

    if (currentStep <= currentWords.length) {
        displayWord();
    } else {
        setTimeout(showResult, 0);
    }
}

function showResult() {
    const accuracy = (correctCount / currentWords.length) * 100;
    const resultMessage = `Вірно: ${correctCount}, Невірно: ${incorrectCount}, Точність: ${accuracy.toFixed(2)}%`;
    $("#result").text(resultMessage);
    alert(resultMessage);

    updateCounters();

    correctCount = 0;
    incorrectCount = 0;

    currentStep = 1;

    displayWord();
}

function updateCounters() {
    $("#correctCount").text(`Вірно: 0`);
    $("#incorrectCount").text(`Невірно: 0`);
}

function navigate(step) {
    currentStep += step;
    if (currentStep < 1) {
        currentStep = 1;
    } else if (currentStep > currentWords.length) {
        currentStep = currentWords.length;
    }
    displayWord();
}

$(document).ready(function () {
	$('input[name="language"]:first').prop('checked', true);
	changeLevel($('input[name="language"]:checked').val());

	$('input[name="language"]').change(function () {
		changeLevel($(this).val());
	});
	
    displayWord();

    $("#card").on("click", function () {
        checkTranslation();
    });
});

function navigate(step) {
    const minStep = 1;
    const maxStep = currentWords.length;

    if ((step === -1 && currentStep > minStep) || (step === 1 && currentStep < maxStep)) {
        currentStep += step;
        displayWord();
    }
}
