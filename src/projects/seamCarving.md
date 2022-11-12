---
title: 'Seam Carving'
date: '2022-04-01'
when: 'Apr 2022 - May 2022'
techStack: ['python']
source: 'https://github.com/imaginelenses/seamCarving'
---

Content Aware Resizing - An application of Seam Carving.

<a href="https://en.wikipedia.org/wiki/Seam_carving" target="_blank">Seam Carving</a> is an algorithm for content-aware image resizing.

It functions by establishing a number of seams (paths of least importance) in an image and automatically removes seams to reduce image size or inserts seams to extend it.

This is an implementation of the algorithm in Python - Jupyter Notebook, which tends to be pretty slow. However a faster implementation can be achieved using {% link "https://julialang.org/", "Julia" %}.

{% link "https://twitter.com/3blue1brown", "Grant Sanderson" %} from the <a href="https://www.youtube.com/@3blue1brown" target="_blank">YouTube channel</a> {% link "https://www.3blue1brown.com/", "3Blue1Brown" %} has given a <a href="https://youtu.be/rpB6zQNsbQU" target="_blank" rel="noopener noreferrer">great lecture</a> demonstrating just that!


<div class="fullWidth">
{% youtube "rpB6zQNsbQU", "Seam Carving | Week 2 | 18.S191 MIT Fall 2020 | Grant Sanderson" %}
</div>