# React Best Practices

- Always use functional React components, never class-based
- Never cast or type variables as `any`, instead deduce the correct type
- Don't leave comments or `console.log`s in generated code, keep it clean and production-ready
- `forwardRef` components when applicable
- Avoid adding unnecessary `div`s, prefer fragments when reasonable.

## Performance optimizations

- `useMemo` for variables when appropriate
- `memo` components that receive props
- Hoist static content outside component body

## UI Registry Best Practices

- Always install UI Registry components following using the installation instructions available in each component's documentation. Never copy/paste library source code.
- When installing multiple dependencies from the registry join them with a space, eg: `bunx @fumadocs/cli add --dir https://redpanda-ui-registry.netlify.app/r card accordion calendar`
- Create reusable components within the same file if logic or UI is repeated
- Try to use UI Registry components as often as possible rather than generating new ones.
- Never install external libraries (that aren't the UI Registry) when generating a UI, only use UI Registry and tailwind `className`s.
- Rely on component variants and other exposed props rather than passing in `className` to alter styling.
- Never use the `style` prop on a UI Registry component, use `className` instead.
- UI's should be responsive and follow accessibility best practices.
- Don't add margin `className`s to UI Registry components, instead wrap them in a `div` and add necessary padding.

# UI Generation Workflow

1. Find the nearest CLAUDE.md file in the repo for project context
2. Understand what data will be passed into the UI, types, and context
3. Determine which UI Registry components you will need to create the desired UI and run the appropriate script to install them.
4. Create the requested UI with thte installed UI Registry components and utils.
5. Create unit tests following consumer app's testing practices
6. Validate that tests pass
7. Follow consumer repo instructions to build app and ensure no build errors
8. Run dev server if possible and check for runtime errors
9. Provide a succint summary of implementation
