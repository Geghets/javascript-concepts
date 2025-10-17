// OOP Contacts Example
// Demonstrates Encapsulation, Inheritance, Polymorphism, and Abstraction in JavaScript.
// Run: node oop-contacts-example.js

class Contact {
    #phoneNumber;
    #email;

    constructor(phoneNumber, name, email) {
        this.validatePhoneNumber(phoneNumber);
        this.validateEmail(email);

        this.#phoneNumber = phoneNumber;
        this.#email = email;
        this.name = name;
    }

    getFullContact() {
        return `name: ${this.name}, phone: ${this.#phoneNumber}, email: ${this.#email}`;
    }

    call() {
        return `calling ${this.#phoneNumber} ${this.name}`;
    }

    get phone() {
        return this.#phoneNumber;
    }

    set phone(phoneNumber) {
        this.validatePhoneNumber(phoneNumber);
        this.#phoneNumber = phoneNumber;
    }

    validatePhoneNumber(phoneNumber) {
        if (!/^\d{8,15}$/.test(phoneNumber)) {
            throw new Error('Invalid phone number');
        }
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        this.validateEmail(email);
        this.#email = email;
    }

    validateEmail(email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email');
        }
    }
}


class BusinessContact extends Contact {
    #company;

    constructor(phoneNumber, name, email, company) {
        super(phoneNumber, name, email);
        this.#company = company;
    }

    getFullContact() {
        return super.getFullContact() + ` company: ${this.#company}`;
    }
}

class EmergencyContact extends Contact {
    #relation;

    constructor(phoneNumber, name, email, relation) {
        super(phoneNumber, name, email);
        this.#relation = relation;
    }

    call() {
        return `Dialing emergency contact ${this.name} ${this.#relation} at ${this.phone}`
    }
}

let john = new Contact('12345678', 'John', 'john@gmail.com');
let alice = new BusinessContact('87654321', 'Alice', 'alice@corp.com', 'TechCorp');
let mike = new EmergencyContact('99887766', 'Mike', 'mike@gmail.com', 'Brother');

let contacts = [john, alice, mike];

for (let c of contacts) {
    console.log(c.getFullContact());
    console.log(c.call());
}
