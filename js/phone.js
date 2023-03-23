const loadApi = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    if (inputValue === '') {
        inputField.value = "Can't search empty value";
        inputField.addEventListener('click', function () {
            inputField.value = '';
        })
    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhone(data))
    }
}
const displayPhone = phones => {
    console.log(phones.data[0])
    let PhoneStatus = phones.status;
    let numberOfPhones = phones.data;
    const displayDiv = document.getElementById('display-div');
    displayDiv.textContent = '';
    // console.log(PhoneStatus);
    if (PhoneStatus === true) {
        console.log(numberOfPhones);
        if (numberOfPhones.length > 20) {
            numberOfPhones = numberOfPhones.slice(0, 20);
        }
        numberOfPhones.forEach(phone => {
            // const displayDiv = document.getElementById('display-div');
            const div = document.createElement('div');
            div.classList.add('mx-auto')
            div.innerHTML = `
            <div onclick="phoneDetails('${phone.slug}')" class="card p-3" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title p-2">${phone.brand}</h5>
                    <a href="#" class="btn btn-primary p-2">Details</a>
                </div>
            </div>
            `;
            displayDiv.appendChild(div)
        })
    }
    else {
        displayDiv.style.display = 'flex'
        displayDiv.style.alignItems = 'center'
        displayDiv.style.justifyContent = 'center'
        displayDiv.innerHTML = `
            <div class="card" style="width: 18rem;">                
                <div class="card-body">
                    <h5 class="card-title text-danger text-center fs-1">Phone Not Found</h5>
                </div>
            </div>`;
    }
}
const phoneDetails = details => {
    console.log(details)
}