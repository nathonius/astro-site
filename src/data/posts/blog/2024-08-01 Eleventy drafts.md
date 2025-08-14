---
title: Managing drafts for Eleventy
summary: Eleventy v3 includes a great new feature that supports draft documents
date: "2024-08-01T00:00:00.000-04:00"
update_date: "2024-08-05T00:00:00.000-04:00"
slug: eleventy-drafts
draft: false
tags:
  - eleventy
---
The latest version of [Eleventy](https://www.11ty.dev/) v3 (`3.0.0-alpha.18` at time of writing) includes a new feature that it calls "preprocessors". Using these we can not only transform the content of a document, but exclude it entirely.

If you just want the plugin, you can see the code [at my site's repo](https://github.com/nathonius/11ty-site/blob/main/config/drafts.js). Just import that into your Eleventy config and add the plugin:

```js ; .eleventy.js
import DraftsPlugin from './drafts.js';

export default function(eleventyConfig) {
	// Use the default meta key and formats
	eleventyConfig.addPlugin(DraftsPlugin);
	// Or, set your own:
	eleventyConfig.addPlugin(DraftsPlugin, {
		draftKey: "doNotPublish",
		formats: "njk,md,liquid,css,html"
	});
}
```

Then in your template files, set the draft key:

```markdown
---
doNotPublish: true
---
# My draft

This won't be published, but you can still add it to source control!
```

When you're ready to publish, set `doNotPublish: false` or remove the property from metadata.

## How it works

Here's an annotated version of the plugin code:

```js ; drafts-plugin.js
export function draftsPlugin(config, options) {
	// Combine default options with user provided
	const opts = Object.assign(
		{ draftKey: "draft", formats: "njk,md,liquid" },
		options
	);

	// Skip drafts
	config.addPreprocessor("drafts", opts.formats, (data) => {
		// Check if draft key is in metadata and is true
		if (data[opts.draftKey]) {
			// Returning false skips this file
		    return false;
	    }
	});
}
```

You could also reverse it to add an opt-in publish key, only deploying files where it is true.