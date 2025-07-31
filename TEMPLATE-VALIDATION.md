# Template Validation

This system includes a template validation tool to help catch Handlebars syntax errors before running the system in Foundry VTT.

## Usage

Run the following command to validate all Handlebars templates:

```bash
npm run validate
```

This will check all `.hbs` files in the templates directory for syntax errors.

## What It Checks

- Proper opening and closing of Handlebars blocks (`{{#each}}`, `{{/each}}`)
- Valid Handlebars syntax
- Missing or extra closing tags

## Common Template Mistakes

1. Mismatched opening and closing Handlebars tags
2. Extra closing tags at the end of partial templates
3. Improper nesting of HTML and Handlebars blocks
4. Using `{{/each}}` without a matching `{{#each}}`

Fix any errors reported by the validation tool before loading the system in Foundry VTT.
