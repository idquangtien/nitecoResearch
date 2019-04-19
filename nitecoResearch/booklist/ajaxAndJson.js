document.getElementById('button1').addEventListener('click', loadCustomer);
document.getElementById('button2').addEventListener('click', loadCustomers);


// load customer
function loadCustomer(e){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'customer.json');

    xhr.onload = function(){
        if(this.status === 200) {
            // console.log(this.responseText);
            const customer = JSON.parse(this.responseText);

            const output = `
                <ul>
                    <li>id: ${customer.id}</li>
                    <li>name: ${customer.name}</li>
                    <li>company: ${customer.company}</li>
                    <li>phone: ${customer.phone}</li>
                </ul>
            `;

            document.getElementById('customer').innerHTML = output;
        }
    }
    xhr.send();
}

// load customers
function loadCustomers(e){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'customers.json');

    xhr.onload = function(){
        if(this.status === 200) {
            const customers = JSON.parse(this.responseText);

            let output = '';

            customers.forEach(function(customer){
                output += `
                    <ul>
                        <li>id: ${customer.id}</li>
                        <li>name: ${customer.name}</li>
                        <li>company: ${customer.company}</li>
                        <li>phone: ${customer.phone}</li>
                    </ul>
                `;
            });

            

            document.getElementById('customers').innerHTML = output;
        }
    }
    xhr.send();
}