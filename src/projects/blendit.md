---
title: 'Blendit'
date: '2022-08-01'
when: 'Aug 2022 - Sep 2022'
techStack: ['python', 'pygit2', {
    'Blender API': 'https://docs.blender.org/api/current/index.html',
    'Git': 'https://git-scm.com/'
    }]
source: 'https://github.com/imaginelenses/blendit'
---

<a href="https://blendit.imaginelenses.com/" target="_blank">Blendit</a> (Blender + Git) - A Git integration that brings Version Control to Blender.

<div>
{% image "https://raw.githubusercontent.com/imaginelenses/blendit/main/splash.png", "", "fullWidth" %}
</div>

While Git and other Version Control Systems (VCS) can track `.blend` (binary) files it does not make much sense as they are designed for textual files.

That said, according to {% link "https://twitter.com/sastuvel", "Sybren" %} on <a href="https://blender.stackexchange.com/a/108186/154740" target="_blank">Blender Stack Exchange</a>, Blender Institute uses <a href="https://subversion.apache.org/" target="_blank">Subversion</a>.

<blockquote>
At the Blender Institute / Blender Animation Studio we use Subversion for our projects. It works fine for blend files, but you have to make sure they are not compressed. Compression can cause the entire file to be different when only a single byte changed, whereas in the uncompressed blend file only that one byte will differ. As a result, binary diffs will be much smaller, and your repository will be faster to work with.
</blockquote>

#### How does Blendit work?

Instead of tracking the `.blend` (binary) files itself, Blendit tracks the *changes* you make to the `.blend` file in real time. It does so by keeping track of the python commands, from the Blender API.

Each time you open a Blendit project, it regenerates the `.blend` files. This means you can delete the `.blend` file and still retain the project.

This way we only track a textual (`.py`) file as Git was intended to be used. 

In theory the size of the entire project should be lower than using any other VSC.
