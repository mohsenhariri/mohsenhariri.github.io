---
title: "Markdown and Gray-Matter Features Demo"
author: "Your Name"
date: "2024-11-26"
toc:
  - name: Introduction
  - name: When do Models stop Generating New Tokens?
  - name: Motivating Experiments
    subsections:
    - name: Block-wise Analysis
    - name: Token-wise Analysis
  - name: Proposed Methods
    subsections:
    - name: Suppressing the EOS 
    - name: Modified Sampling Method Post-EOS
    - name: Regnerating Prior to EOS
    - name: Regenerating and Resampling Prior to EOS with Dynamic Temperature Adjustment
  - name: Conclusion and Looking Forward
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


## Math

### Inline Math
Here's an inline math equation: $E = mc^2$

### Block Math
And a block math equation:

$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$


$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$


Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

The mass-energy equivalence is described by the famous equation:

$$
E=mc^2
$$

### More Math Examples

$$
a^2 + b^2 = c^2
$$

$$
\sum_{i=1}^n X_i
$$

$$
x + \begin{bmatrix} 3 & 2 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 6 & 3 \\ 7 & -1 \end{bmatrix}
$$


$$
\begin{equation} \begin{pmatrix}
a & b \cr
c & d
\end{pmatrix}
+
\begin{pmatrix}
e & f \cr
g & h
\end{pmatrix}
\end{equation}
$$

$$
\begin{equation} \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} \cdot \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 14 \\ 32 \\ 50 \end{bmatrix} \end{equation}
$$

$$
\begin{equation}
\begin{bmatrix}
1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9
\end{bmatrix} \cdot \begin{bmatrix}
1 \\ 2 \\ 3 \end{bmatrix} =
\begin{bmatrix} 14 \\ 32 \\ 50
\end{bmatrix}
\end{equation}
$$

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

JavaScript code block:

```javascript
function greet() {
    console.log("Hello, Markdown!");
}
greet();
```

Python code block:

```python
def greet():
    print("Hello, Markdown!")
greet()
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

