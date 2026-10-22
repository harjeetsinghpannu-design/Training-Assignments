let shape = document.querySelectorAll(".shapes-wrapper .shape");
let tick = document.querySelectorAll(".tick-mark");
let next = document.querySelector(".next-button");
let screen = document.querySelectorAll(".screen");
let calculate = document.querySelector(".calc-button");
let input = document.querySelector("input");
let start_again = document.querySelector(".start-again");

let shape_prop = { "circle": { title: "Enter Radius", label: "RADIUS", symbol: "r", area: (r) => (Math.PI * (r ** 2)), perimeter: (r) => 2 * Math.PI * r }, "triangle": { title: "Enter Side (Base & Height)", label: "SIDE", symbol: "s", area: (s) => 0.433 * (s ** 2), perimeter: (s) => 3 * s }, "square": { title: "Enter Side", label: "SIDE", symbol: "s", area: (s) => (s ** 2), perimeter: (s) => 4 * s } }


shape.forEach((e, i) => {
    e.addEventListener("click", () => {
        let shape_name = e.classList[1];
        localStorage.setItem("selected_shape", shape_name)
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
    selected_shape = localStorage.getItem("selected_shape");
    document.querySelector(".screen2-title").textContent = shape_prop[selected_shape].title;
})

calculate.addEventListener("click", () => {
    screen[1].style.opacity = "0";
    setTimeout(() => {
        screen[2].style.display = "inline-block";
        screen[2].style.opacity = "1";
        screen[1].style.display = "none";
    }, 300);
    selected_shape = localStorage.getItem("selected_shape");
    localStorage.setItem(shape_prop[selected_shape].label, input.value);
    let area = shape_prop[selected_shape].area(input.value);
    let perimeter = shape_prop[selected_shape].perimeter(input.value);
    screen[2].children[1].children[0].textContent = shape_prop[selected_shape].label;
    screen[2].children[1].children[1].textContent = shape_prop[selected_shape].symbol;
    screen[2].children[1].children[2].textContent = `${input.value} cm`;
    screen[2].children[2].children[1].textContent = `${area.toFixed(2)} sq cm`;
    screen[2].children[2].children[2].textContent = `${area.toFixed(2)} sq cm`;
    screen[2].children[3].children[1].textContent = `${area.toFixed(2)} sq cm`;
    screen[2].children[3].children[2].textContent = `${perimeter.toFixed(2)} cm`;
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



