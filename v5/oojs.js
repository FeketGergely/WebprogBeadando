class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `Szia, ${this.name} vagyok, ${this.age} éves.`;
    }
}

function createPerson() {
    const person = new Person("Anna", 25);
    const output = document.createElement("p");
    output.innerText = person.introduce();
    document.getElementById("personOutput").appendChild(output);
}
