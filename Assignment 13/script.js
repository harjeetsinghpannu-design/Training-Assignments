const friend_list=document.querySelector(".friends-list-wrapper");
const add_btn=document.querySelector(".add-btn");
const create_btn=document.querySelector(".create-btn");
const close_btn=document.querySelector(".close-btn");
const dialog_box=document.querySelector(".dialog");
const first_name_input=document.querySelector(".friend-first-name-input");
const last_name_input=document.querySelector(".friend-last-name-input");
const email_input=document.querySelector(".friend-email-input");
const image_input=document.querySelector(".friend-image-input");

const emailexp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let details=[];

function createElementWithClass(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;
}

function isValidEmail(email){
    return emailexp.test(email);
}

function showDialog(){
    dialog_box.style.display="flex";
}

function hideDialog(){
    dialog_box.style.display="none";
}

function emailExists(email){
    return details.some(
        friend=>friend.email===email
    );
}

function contact_card(name,email,image){
    const card=createElementWithClass("div","friend-card");
    const friendImage=createElementWithClass("div","friend-image");
    const img=document.createElement("img");
    img.src=image;
    img.alt="";
    const friendDetails=createElementWithClass("div","friend-details");
    const friendName=createElementWithClass("h2","friend-name");
    friendName.textContent=name;
    const friendEmail=createElementWithClass("p","friend-email");
    friendEmail.textContent=email;
    friendImage.append(img);
    friendDetails.append(friendName,friendEmail);
    card.append(friendImage,friendDetails);
    return card;
}

function renderFriends(friends){
    const fragment=document.createDocumentFragment();
    friends.forEach(friend=>{
        const card=contact_card(friend.first_name+" "+friend.last_name,friend.email,friend.img);
        fragment.append(card);
    });
    friend_list.append(fragment);
}

function addFriend(){
    if(!isValidEmail(email_input.value)){
        alert("Enter a valid Email ID");
        return;
    }
    if(emailExists(email_input.value)){
        alert("Email ID already exists");
        return;
    }
    const fullName=first_name_input.value+" "+last_name_input.value;
    const card=contact_card(fullName, email_input.value, image_input.value);
    friend_list.append(card);
    details.push({
        first_name:first_name_input.value,
        last_name:last_name_input.value,
        email:email_input.value,
        img:image_input.value
    });
    hideDialog();
}

async function getData(){
    const response=await fetch("friends.json");
    const data=await response.json();
    return data;
}

async function main(){
    details=await getData();
    renderFriends(details);
}

main();

add_btn.addEventListener("click",showDialog);
create_btn.addEventListener("click",addFriend);
close_btn.addEventListener("click",hideDialog);