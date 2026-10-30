let shape = document.querySelectorAll(".shapes-wrapper .shape");
let tick = document.querySelectorAll(".tick-mark");
let next = document.querySelector(".next-button");
let screen = document.querySelectorAll(".screen");
let calculate = document.querySelector(".calc-button");
let input = document.querySelector("input");
let start_again = document.querySelector(".start-again");
let unit_box = document.querySelector(".unit");
let area_box = document.querySelector(".area");
let perimeter_box = document.querySelector(".perimeter");
let chosen_shape_name =document.querySelector(".chosen-shape-name");
let chosen_shape = document.querySelector("#chosen-shape");
let screen2_title = document.querySelector(".screen2-title");

let shape_prop = { "Circle": { title: "Enter Radius", label: "RADIUS", symbol: "r", areaFormula: "πr²", perimeterFormula: "2πr", area: (r) => (Math.PI * (r ** 2)), perimeter: (r) => 2 * Math.PI * r }, "Triangle": { title: "Enter Side (Base & Height)", label: "SIDE", symbol: "s", areaFormula: "0.433 * s * s", perimeterFormula: "3 * s", area: (s) => 0.433 * (s ** 2), perimeter: (s) => 3 * s }, "Square": { title: "Enter Side", label: "SIDE", symbol: "s", areaFormula: "s * s", perimeterFormula: "4 * s", area: (s) => (s ** 2), perimeter: (s) => 4 * s } }

function final_dashboard() {
    let selected_shape = localStorage.getItem("selected_shape");
    let input_value = localStorage.getItem("input_value");
    let area = shape_prop[selected_shape].area(input_value);
    let perimeter = shape_prop[selected_shape].perimeter(input_value);
    unit_box.children[0].textContent = shape_prop[selected_shape].label;
    unit_box.children[1].textContent = shape_prop[selected_shape].symbol;
    unit_box.children[2].textContent = `${input_value} cm`;
    area_box.children[1].textContent = `${shape_prop[selected_shape].areaFormula}`;
    area_box.children[2].textContent = `${area.toFixed(2)} sq cm`;
    perimeter_box.children[1].textContent = `${shape_prop[selected_shape].perimeterFormula}`;
    perimeter_box.children[2].textContent = `${perimeter.toFixed(2)} cm`;
    let name = (selected_shape === "Triangle") ? "Equilateral Triangle" : selected_shape;
    chosen_shape_name.textContent = name;
    chosen_shape.className=`${selected_shape}`;
}

shape.forEach((e, i) => {
    e.addEventListener("click", () => {
        let shape_name = e.classList[1];
        localStorage.setItem("selected_shape", shape_name);
        localStorage.setItem("current_screen", "1");
        tick.forEach(t => {
            t.style.opacity = "0";
        });
        tick[i].style.opacity = "1";
        next.style.opacity = "1";
        next.style.visibility = "visible";
        next.style.cursor = "pointer";
    })
});

next.addEventListener("click", () => {
    screen[0].style.opacity = "0";
    setTimeout(() => {
        screen[1].style.display = "flex";
        screen[1].style.opacity = "1";
        screen[0].style.display = "none";
    }, 300);
    let selected_shape = localStorage.getItem("selected_shape");
    localStorage.setItem("current_screen", "2");
    screen2_title.textContent = shape_prop[selected_shape].title;
})

input.addEventListener("input", () => {
    localStorage.setItem("input_value", input.value);
})

calculate.addEventListener("click", () => {
    screen[1].style.opacity = "0";
    setTimeout(() => {
        screen[2].style.display = "flex";
        screen[2].style.opacity = "1";
        screen[1].style.display = "none";
    }, 300);
    localStorage.setItem("current_screen", "3");
    final_dashboard();
})


start_again.addEventListener("click", () => {
    tick.forEach(t => {
        t.style.opacity = "0";
    });
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

})

let input_value = localStorage.getItem("input_value");
let current_screen = localStorage.getItem("current_screen");
let selected_shape = localStorage.getItem("selected_shape");

if (current_screen === "1") {
    next.style.opacity = "1";
    next.style.visibility = "visible";
    next.style.cursor = "pointer";
    shape.forEach((e, i) => {
        if (e.classList[1] === selected_shape) {
            tick[i].style.opacity = "1";
        }
    });
}

if (current_screen === "2") {
    screen[0].style.display = "none";
    screen[1].style.display = "flex";
    screen[1].style.opacity = "1";
    screen2_title.textContent = shape_prop[selected_shape].title;
    input.value = input_value;
}

if (current_screen === "3") {
    screen[0].style.display = "none";
    screen[2].style.display = "flex";
    screen[2].style.opacity = "1";
    final_dashboard();
}
