const tab_buttons = $(".tab-btn");

const about_section = $(".about-section");
const solutions_section = $(".solutions-section");
const locations_section = $(".locations-section");

const solutions_headings = $(".solution-heading");
const solutions_content = $(".solution-content");
const heading_arrows = $(".heading-arrow");

const locations_list = $(".locations-list");

function clearTabs() {
    tab_buttons.removeClass("active-tab");
}

function clearSections() {
    about_section.removeClass("active-section");
    solutions_section.removeClass("active-section");
    locations_section.removeClass("active-section");
}

function showSection(section) {
    clearSections();
    section.addClass("active-section");
}

tab_buttons.click(function () {

    clearTabs();
    $(this).addClass("active-tab");

    const tab = $(this).data("tab");

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

solutions_headings.each(function (index) {

    $(this).click(function () {

        const content = solutions_content[index];

        $(heading_arrows[index]).toggleClass("arrow-rotate");

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        }
        else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

function NewElement(tag, className, attributes = {}) {
    const element = $("<" + tag + ">");
    
    element.addClass(className);

    for (const attr in attributes) {
        element.attr(attr, attributes[attr]);
    }

    return element;
}

function getFlag(country) {
    const flags = {
        "India": "in",
        "United States": "us",
        "Canada": "ca"
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
    state.text(location.state);

    const city = NewElement("div", "city");
    city.text(location.city);

    const contact = NewElement("div", "contact");
    contact.text(location.contact);

    card.append(flag, state, city, contact);

    return card;
}

function renderLocations(locations) {

    locations.forEach((location) => {
        locations_list.append(createLocationCard(location));
    });
}

async function getLocations() {

    const response = await fetch("locations.json");
    return await response.json();
}

async function main() {

    const locations = await getLocations();

    renderLocations(locations);

    // showSection(about_section);
}

main();