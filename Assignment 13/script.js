let friend_list = document.querySelector(".friends-list-wrapper");

// let friend_name = document.querySelector(".friend-name");

// let friend_email = document.querySelector(".friend-email");

let add_btn=document.querySelector(".add-btn");

let create_btn=document.querySelector(".create-btn");

let close_btn=document.querySelector(".close-btn");

let dialog_box=document.querySelector(".dialog");

let name_input=document.querySelector(".friend-name-input");

let email_input=document.querySelector(".friend-email-input");

let image_input=document.querySelector(".friend-image-input");

let emailexp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function contact_card(name,email,image){
    let div=document.createElement("div");
    div.className="friend-card";
    friend_list.append(div);
    let html=`<div class="friend-image">
                    <img src="${image}" alt="">
                </div>
                <div class="friend-details">
                    <h2 class="friend-name">${name}</h2>
                    <p class="friend-email">${email}</p>
                </div>`
    div.innerHTML=html;
}

async function getData(){
    const response = await fetch("friends.json");
    
    const data = await response.json();
    return data;
}

let details=0;

async function main(){
    details = await getData();
    details.forEach(e => {
        let name=e.first_name+" "+e.last_name
        contact_card(name,e.email,e.img);
    });
}

main();

add_btn.addEventListener("click",()=>{
    dialog_box.style.display="flex";
})

create_btn.addEventListener("click",()=>{
    if(!emailexp.test(email_input.value)){
        alert("Enter a valid Email ID");
        return;
    }
    let all_friend_emails=document.querySelectorAll(".friend-email")
    let duplicate=false;
    for (const em of all_friend_emails) {
        if(em.textContent===email_input.value){
            duplicate=true;
            break;
        }
    }
    if(duplicate){
        alert("Email ID already exists");
        return;
    }
    contact_card(name_input.value, email_input.value, image_input.value);
})

close_btn.addEventListener("click",()=>{
    dialog_box.style.display="none";
})








