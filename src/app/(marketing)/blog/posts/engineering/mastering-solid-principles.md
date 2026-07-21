---
title: 'Mastering the S.O.L.I.D Principles'
publishedAt: '2024-11-19'
summary: 'SOLID principles are the cornerstone of clean, scalable, and maintainable OOP. A walkthrough of each principle with Dart examples.'
topic: 'Engineering'
tags: ['SOLID', 'OOP', 'Dart', 'Architecture']
author: 'Pratik Nath Tiwari'
canonicalUrl: 'https://medium.com/@pratiknathtiwari/mastering-the-s-o-l-i-d-principles-c286c88fcb05'
---

SOLID principles are the cornerstone of clean, scalable, and maintainable code in object-oriented programming. These principles, introduced by Robert C. Martin, guide developers in creating software that is easier to understand, extend, and maintain. Let’s break down each principle with intuitive definitions and examples.

## S: Single Responsibility Principle (SRP)

**Statement:** “A class should have only one responsibility.”  
**Intuitive definition:** “For a class, there should be only one reason to change.”

A class should focus on a single, independent module (authentication, profile management, or payment handling) so all properties and methods stay tightly related to one feature.

Violating SRP:

```dart
class AuthProfileManagement {
  void authenticateUser() {
    // Authentication logic
  }

  void updateUserProfile() {
    // Profile update logic
  }
}
```

This class has two reasons to change. Better:

```dart
class UserAuthentication {
  void authenticateUser() {
    // Authentication logic
  }
}

class UserProfileManagement {
  void updateUserProfile() {
    // Profile update logic
  }
}
```

## O: Open/Closed Principle (OCP)

**Statement:** “Classes or entities should be open for extension but closed for modification.”

Design so new functionality can be added without altering existing code.

Violating OCP:

```dart
class Shape {
  final String type;
  Shape(this.type);
}

class CalculateArea {
  double calculate(Shape shape) {
    if (shape.type == 'circle') {
      // Calculate area of circle
    } else if (shape.type == 'rectangle') {
      // Calculate area of rectangle
    }
    return 0.0;
  }
}
```

Adding a shape requires modifying `CalculateArea`. Better:

```dart
abstract class Shape {
  double calculateArea();
}

class Circle implements Shape {
  final double radius;
  Circle(this.radius);

  @override
  double calculateArea() => 3.14 * radius * radius;
}

class Rectangle implements Shape {
  final double length, width;
  Rectangle(this.length, this.width);

  @override
  double calculateArea() => length * width;
}
```

## L: Liskov Substitution Principle (LSP)

**Statement:** “Objects of a subclass can replace objects of a superclass without altering the program’s correctness.”

In simple words: subclass objects should be usable wherever the superclass is expected, and should uphold the base behaviour.

```dart
abstract class Animal {
  void makeSound();
}

class Lion implements Animal {
  @override
  void makeSound() {
    print('Roar');
  }
}

class Cat implements Animal {
  @override
  void makeSound() {
    print('Meow');
  }
}
```

All derived classes uphold the behaviour of `Animal`, maintaining program correctness.

## I: Interface Segregation Principle (ISP)

**Statement:** “No code should be forced to depend on methods it does not use.”

Break large interfaces into smaller, specific ones.

Violating ISP:

```dart
abstract class Employee {
  void manageTasks();
  void writeCode();
}

class Manager implements Employee {
  @override
  void manageTasks() {
    // Manager-specific tasks
  }

  @override
  void writeCode() {
    // Empty or irrelevant
  }
}
```

Following ISP:

```dart
abstract class ManagerTasks {
  void manageTasks();
}

abstract class DeveloperTasks {
  void writeCode();
}

class Manager implements ManagerTasks {
  @override
  void manageTasks() {
    // Manager-specific tasks
  }
}

class Developer implements DeveloperTasks {
  @override
  void writeCode() {
    // Developer-specific code
  }
}
```

Rule of thumb: if a class implements an interface and has empty method blocks, ISP is being violated.

## D: Dependency Inversion Principle (DIP)

**Statement:** “High-level modules should not depend on low-level modules; both should depend on abstractions.”

Violating DIP:

```dart
class FirebaseAuthService {
  void authenticate() {
    // Firebase-specific authentication
  }
}

class AuthController {
  final FirebaseAuthService service = FirebaseAuthService();

  void login() {
    service.authenticate();
  }
}
```

Switching providers means rewriting `AuthController`. Better:

```dart
abstract class AuthService {
  void authenticate();
}

class FirebaseAuthService implements AuthService {
  @override
  void authenticate() {
    // Firebase-specific authentication
  }
}

class GoogleAuthService implements AuthService {
  @override
  void authenticate() {
    // Google-specific authentication
  }
}

class AuthController {
  final AuthService service;
  AuthController(this.service);

  void login() {
    service.authenticate();
  }
}
```

Switching providers only requires changing the implementation passed to `AuthController`.

---

By adhering to the SOLID principles, developers can create robust, flexible, and maintainable software, whether you’re building small apps or complex systems.
