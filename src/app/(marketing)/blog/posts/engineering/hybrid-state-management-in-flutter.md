---
title: 'Hybrid State Management in Flutter: Why I Mix Patterns (And When You Shouldn’t)'
publishedAt: '2026-02-22'
summary: 'One state management solution across the entire app sounds clean. In practice, it often isn’t. Here’s how I match tools to the shape of the problem.'
topic: 'Engineering'
tags: ['Flutter', 'State Management', 'Architecture']
author: 'Pratik Nath Tiwari'
canonicalUrl: 'https://medium.com/@pratiknathtiwari/hybrid-state-management-in-flutter-why-i-mix-patterns-and-when-you-shouldnt-909adc1c2b08'
---

One state management solution across the entire app sounds clean. In practice, it often isn’t.

For a long time, I believed in picking one approach: BLoC, Riverpod, Provider, GetX, and using it everywhere. It felt consistent and safe.

After a few real-world projects, I changed my mind.

Not all states behave the same way. And forcing one tool to solve every kind of problem creates friction you don’t notice until the codebase grows.

This is how I approach state management now: why I mix patterns, what each one is responsible for, and when sticking to a single pattern still makes sense.

## State is not uniform

In a real Flutter app, you don’t deal with just “state”. You deal with very different problems that happen to involve state.

For example:

- **User flows with multiple steps:** sign-up, checkout, or creating a post. Clear progression, API calls, loading, failures, retries.
- **Small UI-driven values:** theme mode, selected tab, sort order. Frequent changes that only affect a small part of the UI.
- **Forms that touch multiple systems:** registration or order forms with validation, syncing fields, multi-page submission.
- **Cross-cutting app services:** authentication, API clients, logging. Shared across features.

These problems don’t have the same shape. Treating them all with one pattern usually leads to friction:

- If everything uses BLoC, even simple UI state needs events and state classes.
- If everything is lightweight, complex flows turn into scattered logic across widgets.

That’s why I don’t force a single solution everywhere. I match the tool to the kind of problem I’m solving.

## 1. BLoC for multi-step flows

I use BLoC when a feature behaves like a flow: clear transitions, async work, and meaningful side effects.

Think about creating a social media post: Draft → Uploading → Published → Failed. Those aren’t just values changing. They’re states in a process.

```dart
class PostCreationBloc extends Bloc<PostCreationEvent, PostCreationState> {
  PostCreationBloc(...) : super(PostCreationState.draft()) {
    on<AddMedia>(_onAddMedia);
    on<UploadPost>(_onUploadPost);
  }

  Future<void> _onUploadPost(
    UploadPost event,
    Emitter<PostCreationState> emit,
  ) async {
    emit(state.copyWith(status: PostStatus.uploading));
    try {
      final uploadResults = await uploadService.upload(
        state.mediaFiles,
        onProgress: (p) => emit(state.copyWith(uploadProgress: p)),
      );
      final post = await postRepo.create(
        caption: state.caption,
        mediaUrls: uploadResults,
      );
      emit(state.copyWith(
        status: PostStatus.published,
        postId: post.id,
      ));
    } catch (e) {
      emit(state.copyWith(
        status: PostStatus.failed,
        error: e.toString(),
      ));
    }
  }
}
```

Use BLoC when the complexity is in the flow.

## 2. ValueNotifier for simple reactive state

Not everything is a flow. Sometimes you just need a value to change and for the UI to react.

Theme mode is a good example. No sequence of steps. No loading state. No error handling. Just a value that updates.

```dart
@singleton
class ThemeService {
  final ValueNotifier<ThemeMode> themeMode =
      ValueNotifier(ThemeMode.system);

  void setThemeMode(ThemeMode mode) {
    themeMode.value = mode;
  }
}
```

```dart
ValueListenableBuilder<ThemeMode>(
  valueListenable: themeService.themeMode,
  builder: (context, mode, _) {
    return MaterialApp(themeMode: mode, ...);
  },
);
```

Use ValueNotifier when the complexity is just a value changing.

## 3. Controllers for coordination

Some screens coordinate multiple services and UI elements. A multi-step registration form is a common example.

The services hold state. The controller coordinates them.

```dart
class RegistrationWizardController {
  final PersonalInfoService personalInfoService;
  final AddressService addressService;
  final PaymentInfoService paymentService;
  final PageController pageController = PageController();
  int currentStep = 0;

  bool validateCurrentStep() => switch (currentStep) {
        0 => personalInfoService.isValid(),
        1 => addressService.isValid(),
        2 => paymentService.isValid(),
        _ => false,
      };

  void nextStep() {
    if (!validateCurrentStep()) return;
    currentStep++;
    pageController.nextPage(...);
  }

  Future<void> submit() async {
    await registrationService.submit(RegistrationData(...));
  }

  void dispose() => pageController.dispose();
}
```

Use a controller when one screen needs to orchestrate multiple pieces.

## 4. Service Locator + Provider for dependencies

I use:

- A single Service Locator (e.g. GetIt + injectable) for object creation and wiring.
- Provider to expose only what a specific part of the widget tree needs.

The locator creates things. Provider controls visibility.

```dart
void main() async {
  await initializeServiceLocator('prod');
  configureInjection('prod');
  runApp(MyApp());
}
```

```dart
class HomeProvider extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<ThemeService>(
          create: (_) => ServiceLocator.instance.get<ThemeService>(),
        ),
        BlocProvider<CheckoutBloc>.value(
          value: ServiceLocator.instance.get<CheckoutBloc>(),
        ),
      ],
      child: child,
    );
  }
}
```

## Why not just use one pattern?

You absolutely can.

- **Everything BLoC** → consistent, highly testable, more boilerplate.
- **Everything lightweight** → simple at first, but flows get messy.
- **Hybrid** → structure where you need it, simplicity where you don’t.

The only requirement is clarity: the team should agree on when to use what.

## When I’d still use a single pattern

- Small app or small team
- Team new to Flutter
- Mostly CRUD with no complex flows
- Strong preference for uniformity over flexibility

Hybrid is not a rule. It’s a trade-off.

## Summary

- State is not a uniform entity.
- Use BLoC for multi-step flows with side effects.
- Use ValueNotifier for simple reactive values.
- Use Controllers to coordinate complex screens.
- Use Service Locator + Provider to manage dependencies.

The goal isn’t architectural purity. It’s choosing the right level of structure for the problem in front of you.
