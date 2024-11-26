---
title: "Markdown and Gray-Matter Features Demo"
author: "Your Name"
date: "2024-11-26"
tags: 
  - markdown
  - gray-matter
summary: "A demonstration of Markdown features and how to use gray-matter metadata."
---

# Markdown and Gray-Matter Features Demo

Welcome to this demo of Markdown's capabilities, including its integration with **gray-matter** frontmatter!

## Headings

Markdown supports six levels of headings:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6



## Text Formatting

- **Bold text**: `**text**` → **text**
- *Italic text*: `*text*` → *text*
- ~~Strikethrough~~: `~~text~~` → ~~text~~
- **_Combined formatting_**: `**_text_**` → **_text_**


## Lists

### Unordered List
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
- Item 3

### Ordered List
1. Item 1
2. Item 2
3. Item 3



## Links and Images

### Links
[Markdown Guide](https://www.markdownguide.org)

### Images
![Sample Image](https://placehold.co/600x400)



## Code Blocks and Inline Code

### Inline Code
Use `console.log('Hello, world!');` for logging.

### Code Block
```javascript
function greet() {
    console.log("Hello, Markdown!");
}
greet();
```

## Blockquotes

> This is a blockquote.
>
> - You can include lists.
> - Or any other Markdown formatting within it.



## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data A   | Data B   | Data C   |
| Data 1   | Data 2   | Data 3   |



## Math

### Inline Math
Here's an inline math equation: $E = mc^2$

### Block Math
And a block math equation:

$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$


## Task Lists

- [x] Write the Markdown template
- [ ] Review the template
- [ ] Publish the demo


## Horizontal Rule

---

## Embedding HTML

If your Markdown processor allows raw HTML, you can embed it like this:

<div style="background-color: #eef; padding: 10px; border: 1px solid #ccc;">
    This is custom HTML content embedded inside Markdown.
</div>


## Gray-Matter Metadata Usage

The frontmatter block at the top of this file includes:
- **Title**: The title of the document.
- **Author**: The creator of the document.
- **Date**: The creation date.
- **Tags**: Keywords to categorize the content.
- **Summary**: A brief description of the content.

This metadata is parsed by `gray-matter` and can be used for dynamic rendering, categorization, or as metadata for your application.



### How to Use

1. Save the template as a `.md` file, for example: `demo.md`.
2. Use `gray-matter` to parse the file and extract the frontmatter metadata.
3. Render the Markdown using your processing pipeline (e.g., `unified`, `remark-html`).

