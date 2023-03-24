const inputFieldValue = () => {
    const inputField = document.getElementById('input-field');
    inputField.addEventListener('click', function () {
        inputField.value = '';
    })
}
//loading api
const loadApi = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    //handeling empty input error
    if (inputValue === '') {
        inputField.value = "Can't search empty value";
        //cleaning the input field after clicking
        inputFieldValue();
    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhone(data))
    }
}
//displaying the product
const displayPhone = phones => {
    // console.log(phones.data[0])
    let PhoneStatus = phones.status;
    let numberOfPhones = phones.data;
    const displayDiv = document.getElementById('display-div');
    displayDiv.textContent = '';
    const seeMoreBtn = document.getElementById('see-more-button');
    //displaying the phones after checking the phone status
    if (PhoneStatus === true) {
        // condition for not displaying over 20 phones onpage / UI
        if (numberOfPhones.length > 20) {
            const productDetails = document.getElementById('product-details-div');

            numberOfPhones = numberOfPhones.slice(0, 20);
            seeMoreBtn.style.display = 'block';
            document.getElementById('search-button').addEventListener('click', function () {
                productDetails.textContent = '';
                if (numberOfPhones.length > 20) {
                    seeMoreBtn.style.display = 'block';
                }
                else {
                    seeMoreBtn.style.display = 'none';

                }
            })

        }
        numberOfPhones.forEach(phone => {
            inputFieldValue();
            // console.log(phone)
            // const displayDiv = document.getElementById('display-div');
            const div = document.createElement('div');
            div.classList.add('mx-auto')
            div.innerHTML = `
            <div class="card p-3" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title p-2">${phone.brand}</h5>
                    <p>${phone.phone_name}</p>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary p-2">Details</button>
                </div>
            </div>
            `;
            displayDiv.appendChild(div);
        });
    }
    else {
        inputFieldValue()
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('mx-auto')
        errorDiv.innerHTML = `
            <div class="card" style="width: 18rem;">                
                <div class="card-body">
                    <h5 class="card-title text-danger text-center fs-1 ">Phone Not Found</h5>
                </div>
            </div>
            `;
        displayDiv.appendChild(errorDiv);
    }
}
//see more button
const seeMore = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayRestPhones(data.data))
}
const displayRestPhones = (restPhones) => {
    // console.log(restPhones)
    const displayDiv = document.getElementById('display-div');

    for (let i = 20; i < restPhones.length; i++) {
        const phones = restPhones[i]
        // console.log(phones.phone_name)
        const div = document.createElement('div');
        div.classList.add('mx-auto')
        div.innerHTML = `
            <div class="card p-3" style="width: 18rem;">
                <img src="${phones.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title p-2">${phones.brand}</h5>
                    <p>${phones.phone_name}</p>
                    <button onclick="phoneDetails('${phones.slug}')" class="btn btn-primary p-2">Details</button>
                </div>
            </div>
            `;
        displayDiv.appendChild(div);

    }
}
//displaying the details of single phone
const phoneDetails = details => {
    // console.log(details)
    const productDetails = document.getElementById('product-details-div');
    productDetails.textContent = '';
    // document.getElementById('search-button').addEventListener('click', function () {
    //     productDetails.textContent = '';
    // })
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === true) {
                // console.log(data.data)
                const detailsDiv = document.createElement('div');
                detailsDiv.style.display = 'flex';
                detailsDiv.style.alignItems = 'center';
                detailsDiv.style.justifyContent = 'center';
                // detailsDiv.classList.add('mx-auto')
                detailsDiv.innerHTML = `
                <div class="card p-3" style="width: 25%;">
                    <h5 class="card-title p-2">${data.data.name}</h5>
                    <img src="${data.data.image}" class="card-img-top image">
                        <div class="card-body">
                        
                            <p>${data.data.releaseDate}</p>
                            <p>${data.data.mainFeatures.chipSet}</p>
                            <p>${data.data.mainFeatures.displaySize}</p>
                            <p>${data.data.mainFeatures.memory}</p>
                            <p>${data.data.mainFeatures.sensors[0]} ${data.data.mainFeatures.sensors[1]},${data.data.mainFeatures.sensors[2]},${data.data.mainFeatures.sensors[3]},${data.data.mainFeatures.sensors[4]},${data.data.mainFeatures.sensors[5]}</p>
                            <p>('${data.data.others.Bluetooth}')</p>
                            <p>${data.data.others.GPS}</p>
                        </div>
                </div>
                `;
                productDetails.appendChild(detailsDiv);

            }
            else {
                productDetails.innerText = 'Phone not found'
            }
        })
}