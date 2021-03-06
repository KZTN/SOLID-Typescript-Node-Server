# SOLID-Typescript-Node-Server
Initial configuration of node backend using eslint, prettier, and tsconfig pre configured using SOLID principles

# Technologies used:
- [Express](https://github.com/expressjs/express): HTTP API RESTFULL SERVER
- [TypeORM](https://typeorm.io/#/): Database ORM to manipulate model data
- [Jest](https://jestjs.io/): TDD platform
- [Typescript](https://www.typescriptlang.org/): Program language
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/): Design code patterns
- [JWT](https://www.npmjs.com/package/jsonwebtoken): Service secutiry authentication
### Installing the project🚀
Cloning the project:

```
git clone https://github.com/KZTN/SOLID-Typescript-Node-Server.git
```

Go to the project folder:

```
cd SOLID-Typescript-Node-Server
```

Getting project dependencies:

```bash
yarn install
```

Run the project:

```bash
yarn start
```

Visit http://localhost:3333 with your browser to see the result. 🎉

## About SOLID:
SOLID Principles is a coding standard that all developers should have a clear concept for developing software in a proper way to avoid a bad design. It was promoted by Robert C Martin and is used across the object-oriented design spectrum. When applied properly it makes your code more extendable, logical and easier to read.

When the developer builds a software follow the bad design, the code can become inflexible and more brittle, small changes in the software can result in bugs. For these reasons, we should follow SOLID Principles.

It takes some time to understand, but if you write code following the principles it will improve code quality and will help to understand the most well-designed software.

To understand SOLID principles, you have to know the use of the interface clearly. If your concept is not clear about interface then you can read this [doc](https://medium.com/better-programming/understanding-use-of-interface-and-abstract-class-9a82f5f15837).

<p align="center"><b>S</b>OLID</p>

### Single Responsibility Principle :
>A class should have one, and only one, reason to change.

<p align="center">S<b>O</b>LID</p>

### Open-closed Principle :
>Entities should be open for extension, but closed for modification.

<p align="center">SO<b>L</b>ID</p>

### Liskov Substitution Principle :
The Liskov Substitution principle was introduced by Barbara Liskov in her conference 
keynote "Data abstraction" in 1987.Barbara Liskov and Jeannette Wing formulated 
the principle succinctly in a 1994 paper as follows:
>Let φ(x) be a property provable about objects x of type T. Then φ(y) should be true for objects y of type S where S is a subtype of T.

<p align="center">SOL<b>I</b>D</p>

### Interface Segregation Principle :

>A Client should not be forced to implement an interface that it doesn't use.

<p align="center">SOLI<b>D</b></p>

### Dependency Inversion Principle :

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

> Abstractions should not depend on details. Details should depend on abstractions.
