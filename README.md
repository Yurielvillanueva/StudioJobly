﻿# SwipeCareer

A simple interactive learning website for understanding Java loops through a swipe-based interface.

SwipeCareer was created as my **first school project**. The project combines basic web development with Java programming concepts to make learning loops more interactive and easier to understand.

## About the Project

SwipeCareer presents different types of Java loops as interactive cards.

Users can:

* Swipe right to mark a concept as learned
* Swipe left to skip a concept
* Click the information button to view a full explanation
* View Java code examples
* View sample console output
* Review concepts through an interactive interface

The project focuses on three basic Java loops:

1. For Loop
2. While Loop
3. Do-While Loop

## Features

* Interactive swipeable cards
* Java loop examples
* Code display
* Console output examples
* Beginner-friendly explanations
* Confidence percentage for each concept
* Responsive layout
* Mobile-friendly interface
* Full explanation popup
* Learning confirmation screen
* Reduced-motion support

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Java

### Frontend

The website uses:

* HTML for the page structure
* CSS for styling and responsive design
* JavaScript for the interactive card system and swipe functionality

### Java

The project includes Java examples for:

* `for` loops
* `while` loops
* `do-while` loops

## Project Structure

```text
SwipeCareer/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── img/
│   ├── Forloop2.png
│   ├── whileloop.png
│   └── dowhileloop.png
│
└── loopsjavas/
    ├── forloop.java
    ├── whileloop.java
    └── dowhileloop-java
```

## How to Run

No special installation is required.

### 1. Download or clone the project

```bash
git clone https://github.com/Yurielvillanueva/SwipeCareer.git
```

### 2. Open the project folder

```text
SwipeCareer/
```

### 3. Open `index.html`

You can open `index.html` directly in your browser.

For a better development experience, you can also use the **Live Server** extension in Visual Studio Code.

## How to Use

### Swipe Right

Marks the current concept as learned and displays a confirmation screen.

### Swipe Left

Skips the current concept and moves to the next one.

### Information Button

Opens the full explanation for the current loop.

### Review the Code

After marking a concept as learned, you can review its code and explanation.

## Java Examples

### For Loop

The `for` loop repeats code while a condition stays true.

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

Output:

```text
0
1
2
3
4
```

### While Loop

The `while` loop checks a condition before running the code inside the loop.

```java
String response = "no";

while (response.equalsIgnoreCase("no")) {
    System.out.println("Here is a new offer! Do you accept? (yes/no):");
    response = scanner.nextLine();
}
```

### Do-While Loop

The `do-while` loop runs the code first, then checks the condition.

```java
int i = 0;

do {
    System.out.println(i);
    i++;
} while (i < 5);
```

Output:

```text
0
1
2
3
4
```

## Learning Objectives

Through this project, I practiced:

* Creating a website using HTML
* Styling a website using CSS
* Writing JavaScript interactions
* Working with arrays and objects
* Handling user interactions
* Creating swipe gestures
* Displaying dynamic content
* Understanding Java loop structures
* Organizing project files
* Using Git and GitHub

## Project Status

This project was created as a **school project and learning exercise**.

The current version focuses on Java loops. Future versions could include additional programming concepts such as:

* Conditional statements
* Arrays
* Methods
* Functions
* Classes and objects
* More programming languages
* Progress tracking
* Additional learning cards

## Author

**Ralph Yuriel Villanueva**

BSIT Student

GitHub: [@Yurielvillanueva](https://github.com/Yurielvillanueva)

## Note

This is my first school project. The goal was to apply the programming concepts I learned while experimenting with an interactive web interface.
