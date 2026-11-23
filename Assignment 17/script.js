const tab_buttons = document.querySelectorAll(".tab-btn");
const about_section = document.querySelector(".about-section");
const solutions_section = document.querySelector(".solutions-section");
const solutions_headings = document.querySelectorAll(".solution-heading");
const solutions_content = document.querySelectorAll(".solution-content");
const heading_arrows = document.querySelectorAll(".heading-arrow");
const locations_section = document.querySelector(".locations-section");
const locations_list = document.querySelector(".locations-list");

function clearTabs() {
    tab_buttons.forEach((button) => {
        button.classList.remove("active-tab");
    });
}

function clearSections() {
    about_section.classList.remove("active-section");
    solutions_section.classList.remove("active-section");
    locations_section.classList.remove("active-section");
}

function showSection(section) {
    clearSections();
    section.classList.add("active-section");
}

tab_buttons.forEach((button) => {
    button.addEventListener("click", () => {
        clearTabs();
        button.classList.add("active-tab");
        const tab = button.dataset.tab;
        if (tab === "about") {
            showSection(about_section);
        }
        else if (tab === "solutions") {
            showSection(solutions_section);
        }
        else {
            showSection(locations_section);
        }
    });
});

solutions_headings.forEach((heading, index) => {
    heading.addEventListener("click", () => {
        const content = solutions_content[index]
        heading_arrows[index].classList.toggle("arrow-rotate");
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

function NewElement(tag, className, attributes = {}) {
    const element = document.createElement(tag);
    element.className = className;
    for (attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    return element;
}

function getFlag(country) {
    const flags = {
        "India": "in",
        "United States": "us",
        "Canada":"ca"
    };

    return `https://flagcdn.com/${flags[country]}.svg`;
}

function createLocationCard(location) {
    const card = NewElement("div", "location-card");
    const flag = NewElement("img", "flag", {
        src: getFlag(location.country),
        alt: location.country
    });
    const state = NewElement("div", "state");
    state.textContent = location.state;
    const city = NewElement("div", "city");
    city.textContent = location.city;
    const contact = NewElement("div", "contact");
    contact.textContent = location.contact;
    card.append(flag, state, city, contact);
    return card;
}

function renderLocations(locations) {
    const fragment = document.createDocumentFragment();
    locations.forEach((location) => {
        fragment.append(createLocationCard(location));
    });
    locations_list.append(fragment);
}

async function getLocations() {
    const response = await fetch("locations.json");
    return await response.json();
}

async function main() {
    const locations = await getLocations();
    renderLocations(locations);
    showSection(about_section);
}

main();