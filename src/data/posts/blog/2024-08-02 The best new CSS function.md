---
title: The best new CSS function
summary: Color mix makes life that much easier
date: "2024-08-02T00:00:00.000-04:00"
slug: the-best-new-css-function
draft: false
tags:
  - css
---
It's `color-mix`. Check out the [MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix).

## The problem

CSS variables give us a ton of power, but they have some important limitations. For example, consider the following styles:

```css
:root {
    --color-text: black;
    --color-bg: white;
    --color-primary: #114b5f;
    --color-secondary: #456990;
}

.semi-transparent-primary-element {
    /* this should have 0.8 alpha */
    color: var(--color-primary);
}
```

How do we set the alpha channel on the primary color for the `.semi-transparent-primary-element` class? Historically, we couldn't. Instead, a common pattern was to set the variable instead to the RGB triplet, or even worse one variable for each channel:

```css
:root {
    /* as triplet */
    --color-primary-rgb: 17, 75, 95;
    --color-primary: rgb(var(--color-primary));
    /* individual values */
    --color-secondary-r: 69;
    --color-secondary-g: 105;
    --color-secondary-b: 144;
    --color-secondary: rgb(var(--color-secondary-r), var(--color-secondary-g), var(--color-secondary-b));
}

.semi-transparent-primary-element {
    /* this works */
    color: rgba(var(--color-primary-rgb), 0.8);
    /* this works, but at what cost */
    color: rgba(var(--color-secondary-r), var(--color-secondary-g), var(--color-secondary-b), 0.8);
}
```

This gives us control, but isn't ideal. Instead of just defining our colors once, we've had to combine multiple declarations to get the same result.

## Color mix to the rescue

We don't have to do this anymore. Sure, there are other usecases for defining each channel of a color individually, and those cases are still solvable, but `color-mix` makes it possible to create ad-hoc new colors from any number of other colors. Here's the updated CSS:

```css
:root {
    --color-text: black;
    --color-bg: white;
    --color-primary: #114b5f;
    --color-secondary: #456990;
}

.semi-transparent-primary-element {
    color: color-mix(in srgb, var(--color-primary) 80%, transparent);
}
```

Isn't that nicer? I find the color mix syntax is very clear and immediately useful. I don't find myself mixing multiple colors often, but for transparency with existing colors it really shines.

## Bonus: are CSS preprocessors dead?

When CSS variables were introduced, there were immediately some that predicted the demise of CSS preprocessors like SASS and LESS, but they are still thriving. There were just too many things we couldn't do at all in pure CSS. With `color-mix`, we got one step closer to no longer needing preprocessors. Now, CSS has implemented [native rule nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting), *the* killer feature from the preprocessors. What's left for SASS and LESS?

A lot, probably. There are plenty of large codebases entirely reliant on non-native features like mixins and functions. Many of the best new CSS features don't yet have widespread browser support, though it's getting better every day. The gap is closing; while I'll always think of SASS fondly, I don't think I'll mourn on the day I never have to use a preprocessor again.
