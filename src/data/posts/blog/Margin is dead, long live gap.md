---
title: Margin is dead, long live gap
summary: The introduction of the CSS gap property has made spacing elements on the page easier than ever.
date: "2024-08-14T00:00:00.000-04:00"
slug: margin-is-dead-long-live-gap
draft: false
tags:
  - css
---
If [the best new CSS function](/posts/the-best-new-css-function) is `color-mix`, then the best CSS property added in the last ten years is `gap`.

## Margin hacks begone

Creating non-linear HTML layouts was difficult for most of CSS's life; HTML was originally only intended to represent documents and CSS was just a way to lay out the document. We have a "margin" property today because we had margins on printed documents. Even the way [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout) and its positioning modes work comes from documents: paragraphs are blocks, items within a paragraph are inline. Even the "float" property calls to mind positioning an image within a typed report.

When fledgling web designers wanted to break outside of the strict, linear bounds of flow layout, they reached for the only tools they had. Layouts built on elements with margins or an HTML table were workable, but inelegant solutions. They were tricky to maintain, and certainly weren't responsive by today's standards. The advent of [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) changed everything. For the first time, HTML and CSS were breaking free from their roots as a method of displaying documents and moving towards a way to build an interactive application, especially one that worked at different screen sizes without having to deploy a separate, mobile version of a site.

But even with flexbox, it took the often underutilized, sometimes overlooked [grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) to truly move the web past using outdated layout methods with the introduction of the `row-gap` and `column-gap` properties.

### Gap for layout, margin for text

So maybe margin isn't dead, but I almost never reach for it anymore when doing any sort of page layout. Gap is just better. Consider the following, where I want to add space between each card element in a row, but have the cards butt up against the container at the edges. Here's an example using margin:

```html
<style>
.margin-card-list .card {
	margin-right: 4px;
}
.margin-card-list .card:last-of-type {
	margin-right: 0;
}
</style>
<div class="card-list margin-card-list">
	<div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>
</div>
```

<style>
.card {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border: 2px solid cornflowerblue;
}
.card-list {
	width: fit-content;
	border: 5px solid deeppink;
}
.margin-card-list .card {
	margin-right: 4px;
}
.margin-card-list .card:last-of-type {
	margin-right: 0;
}
</style>
<div class="card-list margin-card-list">
	<div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>
</div>

You need a `:first-of-type` or `:last-of-type` rule to remove one of the margins to fit the container. In addition, the styles to space the elements are applied to the elements themselves, which can be problematic when using a UI framework that provides style encapsulation. Margins also collapse when adjacent, so spacing them can be tricky. In this case I even had to ensure there was no whitespace between each card element to ensure consistent spacing. Here's the same layout with gap:

```html
<style>
.gap-card-list {
	display: flex;
	gap: 4px;
}
</style>
<div class="card-list gap-card-list">
	<div class="card">1</div>
	<div class="card">2</div>
	<div class="card">3</div>
	<div class="card">4</div>
	<div class="card">5</div>
</div>
```

<style>
.gap-card-list {
	display: flex;
	gap: 4px;
}
</style>
<div class="card-list gap-card-list">
	<div class="card">1</div>
	<div class="card">2</div>
	<div class="card">3</div>
	<div class="card">4</div>
	<div class="card">5</div>
</div>

Two lines! That's all it takes. The parent lays out its children. Gap proves its usefulness even further if the list of items needs to wrap; you can even set independent row and column gap properties:

```html
<style>
#big-gap-list {
	flex-wrap: wrap;
	row-gap: 15px;
	column-gap: 4px;
	max-width: 200px;
}
</style>
<div id="big-gap-list" class="card-list gap-card-list">
	<div class="card">1</div>
	<div class="card">2</div>
	<div class="card">3</div>
	<div class="card">4</div>
	<div class="card">5</div>
</div>
```

<style>
#big-gap-list {
	flex-wrap: wrap;
	row-gap: 15px;
	column-gap: 4px;
	max-width: 200px;
}
</style>
<div id="big-gap-list" class="card-list gap-card-list">
	<div class="card">1</div>
	<div class="card">2</div>
	<div class="card">3</div>
	<div class="card">4</div>
	<div class="card">5</div>
</div>

Try doing that with margin; you'll quickly find that it's nearly impossible to have a responsive grid with spaced items without JavaScript or fixed widths.

### When to use gap

Any time you're trying to add space between multiple elements... use gap. It has enough adoption in 2024 that, unless you're still supporting IE11 for some reason, you can and should make use of it. Margin is still useful when you want space *around* an element (though spacing *within* an element should be handled with padding), or in situations where you can't use flexbox or grid layout, but those situations are few and far between. Gap has changed the way I write CSS and saved me hours of development time.