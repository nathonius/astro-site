---
title: Git checkout + fzf ❤️
summary: The best way to find the branch you want, quickly
date: "2024-05-28T00:00:00.000-04:00"
slug: git-checkout-fzf
tags:
  - til
---

There are a ton of uses for [fzf](https://github.com/junegunn/fzf) and this is my absolute favorite. I work in a big monorepo with a team of nearly twenty engineers and it can be hard to find the branch I want since everyone is always pushing new branches. Fzf to the rescue!

<script src="https://asciinema.org/a/uMWwQT5Gk901b8bnQcnJqrFX5.js" id="asciicast-uMWwQT5Gk901b8bnQcnJqrFX5" async="true"></script>

The script gathers a list of all known branches, outputs them in a nice format, pipes that to fzf, and, once an option is selected, gets just the branch name from that selection, checks the branch out, and finally pushes the `git checkout` command that was used to history.

> [!NOTE]
> That last command to push the command to history may not be compatible with all shells. I know it works in zsh, but cannot guarantee it works in others. I've noted in a comment that you may need to remove that line.

Here's the function (or you can [see it in my zshrc](https://github.com/nathonius/dotfiles/blob/03e62024f37ce8a41dc98d02efbe3ba055103427/.zshrc#L66)):

```shell
gch() {
    GCH_FORMAT="%(HEAD) %(refname:short) - %(objectname:short) - %(contents:subject) - %(authorname) (%(committerdate:relative))"
    GCH_BRANCH="$(git branch --all --format="$GCH_FORMAT" | fzf | awk -F ' ' '{print $1}')"
    if [ -n "$GCH_BRANCH" ]; then
        git checkout "$GCH_BRANCH"
        print -S "git checkout $GCH_BRANCH" # this may be zsh only
    fi
}
```

The format can be customized with the `GCH_FORMAT` variable; check out all the field options at the [official git docs](https://git-scm.com/docs/git-for-each-ref#_field_names).

There's probably a cleaner way to do this; my bash script kung fu is weak, but I use this command every single day and it saves me a ton of time.