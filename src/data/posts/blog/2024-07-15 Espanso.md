---
title: Managing snippets with Espanso
summary: An open-source way to improve productivity.
date: "2024-07-15T00:00:00.000-04:00"
update_date: "2024-07-19T00:00:00.000-04:00"
slug: "espanso"
tags:
  - espanso
---
[Espanso](https://espanso.org/) is a cross-platform, open-source tool for text expansion, macros, and other replacements. It's driven entirely by YAML config files, which can be shared via cloud or version control.

## Setup

Espanso is very configurable; the config can be as simple as a single yaml file or as complicated as multiple root yaml files that conditionally include other files along with scripts. [Espanso's docs](https://espanso.org/docs/get-started/) are great, but you can view [my espanso config and matches](https://github.com/nathonius/dotfiles/tree/main/espanso) in my dotfiles repo.

## My matches

The following are matches I use to speed up certain workflow tasks.

## Test data generation

One of the things I use Espanso for the most is generating test data. To this end I use two tools: [faker](https://faker.readthedocs.io/en/master/) and [lorem-ipsum-cli](https://www.npmjs.com/package/lorem-ipsum-cli).

### faker

I use the [python version](https://faker.readthedocs.io/en/master/) of faker, but there are also other platforms available including [NodeJS](https://fakerjs.dev/), [Perl](https://metacpan.org/dist/Data-Faker), [Ruby](https://github.com/faker-ruby/faker), and [Java](https://github.com/DiUS/java-faker). Faker includes a substantial dataset to generate fake names, organization names, phone numbers, file names, anything you might need when doing testing of your current project with realistic data.

I use a combination of a choice match and a shell match to input fake data:

```yaml ; match/faker.yml
matches:
  - trigger: ":faker"
    replace: "{{output}}"
    vars:
      # Supported options, each id should match a faker module
      - name: module
        type: choice
        params:
          values:
            - label: "First Name"
              id: "first_name"
            - label: "Company"
              id: "company"
            - label: "Phone Number"
              id: "phone_number"
            - label: "File Name"
              id: "file_name"
            - label: "Street Address"
              id: "address"
            - label: "SSN"
              id: "ssn"
            - label: "Email"
              id: "email"
      - name: output
        type: shell
        params:
          cmd: 'pyenv exec python "$CONFIG/scripts/fake.py"'
```

```python ; scripts/fake.py
from faker import Faker
from os import environ
fake = Faker()
# the module is set as an environment variable
module = environ["ESPANSO_MODULE"]
print(getattr(fake, module)())
```

### lorem

The lorem ipsum match is a little simpler. There are certainly other tools, but I use the [lorem-ipsum-cli](https://www.npmjs.com/package/lorem-ipsum-cli) node package. I have two matches - one for a single sentence and one for a single paragraph.

```yaml ; match/dev.yml
matches:
  - trigger: ":lorem"
    label: "Paragraph"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "lorem -p"
  - trigger: ":lorem"
    label: "Sentence"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "lorem"
```

### Dev

VS Code is my primary editor and supports snippets out the box, but I find a universal, application agnostic solution works best. So, I keep various development-related snippets in Espanso as well.

#### Eslint comments

When working with legacy code (or on the occasion you actually have to write one of these anti-patterns), it can be useful to disable linting rules for a single line of code. For me, it's usually null assertions or line length issues. I have these eslint comment replacements for use in VS Code.

```yaml ; match/dev.yml
matches:
  - trigger: ":nonnull"
    replace: "// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- This will not be null."
  - trigger: ":protect"
    replace: "// @ts-expect-error - Accessing a protected member"
  - trigger: ":private"
    replace: "// @ts-expect-error - Accessing a private member"
  - trigger: ":readonly"
    replace: "// @ts-expect-error - Writing a readonly property"
  - trigger: ":maxlen"
    replace: "// eslint-disable-next-line max-len"
```

#### PR and commit messages

```yaml
- trigger: ":commit"
  replace: |
    feat():

    Refs #{{clipboard}}
  vars:
    - name: "clipboard"
      type: "clipboard"
- trigger: ":prdesc"
  replace: "# Summary:

    Brief summary of what this change does. Usually can be an elaboration on your commit messages.

    Ticket reference: [AB-](https://my-jira-domain.atlassian.net/browse/AB-)

    ## Changed:

    ~~ Stuff changed, but not new stuff

    ## Added:

    ~~ New stuff

    ## Removed:

    ~~ Deleted stuff

    ## Fixed:

    ~~ Bugs fixed, usually to call out specific bugs if necessary

    # Validation Steps:

    ~~ Used for steps to validate the change"
```

## Misc

### Commonly misspelled words

It's simple, but if I have to type the same word over and over again and misspell it half the time - Espanso to the rescue!

```yaml ; match/words.yml
matches:
  - trigger: ":elg"
    replace: "eligibility"
  - trigger: ":Elg"
    replace: "Eligibility"
```