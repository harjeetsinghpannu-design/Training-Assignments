const shape = document.querySelectorAll(".shapes-wrapper .shape");
const tick = document.querySelectorAll(".tick-mark");
const next = document.querySelector(".next-button");
const screen = document.querySelectorAll(".screen");
const calculate = document.querySelector(".calc-button");
const input = document.querySelector("input");
const startAgain = document.querySelector(".start-again");
const unitBox = document.querySelector(".unit");
const areaBox = document.querySelector(".area");
const perimeterBox = document.querySelector(".perimeter");
const chosenShapeName = document.querySelector(".chosen-shape-name");
const chosenShape = document.querySelector("#chosen-shape");
const screen2Title = document.querySelector(".screen2-title");

let activeTick = null;

const shapeProps = {
    Circle: {
        title: "Enter Radius",
        label: "RADIUS",
        symbol: "r",
        areaFormula: "πr²",
        perimeterFormula: "2πr",
        area: (r) => Math.PI * (r ** 2),
        perimeter: (r) => 2 * Math.PI * r
    },
    Triangle: {
        title: "Enter Side (Base & Height)",
        label: "SIDE",
        symbol: "s",
        areaFormula: "0.433 * s * s",
        perimeterFormula: "3 * s",
        area: (s) => 0.433 * (s ** 2),
        perimeter: (s) => 3 * s
    },
    Square: {
        title: "Enter Side",
        label: "SIDE",
        symbol: "s",
        areaFormula: "s * s",
        perimeterFormula: "4 * s",
        area: (s) => s ** 2,
        perimeter: (s) => 4 * s
    }
};

function showScreen(hideIndex, showIndex) {
    screen[hideIndex].style.opacity = "0";
    setTimeout(() => {
        screen[showIndex].style.display = "flex";
        screen[showIndex].style.opacity = "1";
        screen[hideIndex].style.display = "none";
    }, 300);
}

function updateRow(row, first, second, third) {
    row.children[0].textContent = first;
    row.children[1].textContent = second;
    row.children[2].textContent = third;
}

function final_dashboard() {
    const selectedShape = localStorage.getItem("selected_shape");
    const inputValue = Number(localStorage.getItem("input_value"));
    const area = shapeProps[selectedShape].area(inputValue);
    const perimeter = shapeProps[selectedShape].perimeter(inputValue);
    updateRow(unitBox, shapeProps[selectedShape].label, shapeProps[selectedShape].symbol, `${inputValue} cm`);
    updateRow(areaBox, "AREA", shapeProps[selectedShape].areaFormula, `${area.toFixed(2)} sq cm`);
    updateRow(perimeterBox, "PERIMETER", shapeProps[selectedShape].perimeterFormula, `${perimeter.toFixed(2)} cm`);
    const name = selectedShape === "Triangle" ? "Equilateral Triangle" : selectedShape;
    chosenShapeName.textContent = name;
    chosenShape.className = `${selectedShape}`;
}

shape.forEach((e, i) => {
    e.addEventListener("click", () => {
        const shapeName = e.classList[1];
        localStorage.setItem("selected_shape", shapeName);
        localStorage.setItem("current_screen", "1");
        if (activeTick) {
            activeTick.style.opacity = "0";
        }
        tick[i].style.opacity = "1";
        activeTick = tick[i];
        next.style.opacity = "1";
        next.style.visibility = "visible";
        next.style.cursor = "pointer";
    });
});

next.addEventListener("click", () => {
    showScreen(0, 1);
    const selectedShape = localStorage.getItem("selected_shape");
    localStorage.setItem("current_screen", "2");
    screen2Title.textContent =
        "2. " + shapeProps[selectedShape].title;
});

input.addEventListener("input", () => {
    localStorage.setItem("input_value", input.value);
});

calculate.addEventListener("click", () => {
    showScreen(1, 2);
    localStorage.setItem("current_screen", "3");
    final_dashboard();
});

startAgain.addEventListener("click", () => {
    if (activeTick) {
        activeTick.style.opacity = "0";
        activeTick = null;
    }
    next.style.opacity = "0";
    next.style.visibility = "hidden";
    next.style.cursor = "default";
    screen[2].style.opacity = "0";
    setTimeout(() => {
        screen[0].style.display = "block";
        screen[0].style.opacity = "1";
        screen[2].style.display = "none";
    }, 300);
    localStorage.clear();
    input.value = "";
});

const inputValue = localStorage.getItem("input_value");
const currentScreen = localStorage.getItem("current_screen");
const selectedShape = localStorage.getItem("selected_shape");

if (currentScreen === "1") {
    next.style.opacity = "1";
    next.style.visibility = "visible";
    next.style.cursor = "pointer";
    shape.forEach((e, i) => {
        if (e.classList[1] === selectedShape) {
            tick[i].style.opacity = "1";
            activeTick = tick[i];
        }
    });
}

if (currentScreen === "2") {
    screen[0].style.display = "none";
    screen[1].style.display = "flex";
    screen[1].style.opacity = "1";
    screen2Title.textContent = shapeProps[selectedShape].title;
    input.value = inputValue;
}

if (currentScreen === "3") {
    screen[0].style.display = "none";
    screen[2].style.display = "flex";
    screen[2].style.opacity = "1";
    final_dashboard();
}