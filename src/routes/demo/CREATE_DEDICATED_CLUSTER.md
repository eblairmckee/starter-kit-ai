# Phase 1
prompt
```
ultrathink. in @src/routes/demo/create-dedicated-cluster.tsx build a UI that follows the design in this figma file: https://www.figma.com/design/t7IrgHK9zT8APyFIk1Y9XW/RedPanda-Design-System?node-id=2413-44614&m=dev use redpanda ui components to build it. some are already installed in @src/components/redpanda-ui
```

# Phase 2
prompt
```
we started creating a UI for this figma file https://www.figma.com/design/t7IrgHK9zT8APyFIk1Y9XW/RedPanda-Design-System?node-id=2413-44614&m=dev
   in @src/routes/demo/create-dedicated-cluster.tsx . but i'm noticing the UI doesn't perfectly match the figma. can you modify it to better 
  mirror the figma? only use redpanda ui components and tailwind classes.
```

response
```
     ☐ Fix AWS provider cards to show multiple providers with  
       AWS logo styling
     ☐ Correct the availability zone buttons to use proper
       styling and labels
     ☐ Fix form field labels and input styling to match Figma
     ☐ Adjust the stepper component styling and labels
     ☐ Update the Next button styling to match the blue primary
       button
```

prompt
```
ultrathink. i believe you can use a redpanda choicebox for 
  the provider cards instead of something custom. are there any
   of components or patterns here that could be improved by 
  referencing the redpanda ui docs more
```

response
```
     ☐ Replace custom ProviderCard with Choicebox component for provider selection   
     ☐ Replace custom AvailabilityOption with Choicebox for availability selection
     ☐ Add AWS/GCP/Azure icons from Redpanda UI registry
     ☐ Check if any other form components can be improved with Redpanda UI components
```

## MCP Tools Leveraged

### Figma MCP Server
```bash
mcp__figma__get_image
```
- Retrieved the actual Figma design as reference
- Enabled pixel-perfect comparison with current implementation

### Redpanda UI MCP Server
```bash
mcp__redpanda-ui__recommend-components
mcp__redpanda-ui__get_component_demo
mcp__redpanda-ui__get_component
```
- Discovered `Choicebox` component as perfect replacement for custom cards
- Retrieved usage examples and implementation details
- Identified available cloud provider icons

# Phase 3
prompt
```
ultrathink. a few components in @src/routes/demo/create-dedicated-cluster.tsx actually have redpanda ui counterparts such as NavigationHeader 
  and ProgressStepper.  I believe FormField may as well. also we have typography components, too. please relace the custom code with redpanda UI 
  components.
```

  response
  ```
     ☐ NavigationHeader - Redpanda navigation-menu is for dropdowns, current implementation is appropriate
     ☐ ProgressStepper - Redpanda stepper requires major architectural changes, current implementation is suitable
     ☐ Replace custom FormField with Redpanda UI Label and Text components
     ☐ Replace custom typography with Redpanda UI typography components  
     ☐ Replace SummaryRow text elements with Redpanda UI Text components
  ```

  modified response
  ```
  Completed Improvements:

  - ✅ Typography: Replaced h1, h2, h3, and p elements with Heading and Text components
  - ✅ Form Labels: Enhanced FormField to use Label and Text components
  - ✅ Summary Text: Updated SummaryRow to use Text components with proper variants

  Component Analysis:

  - NavigationHeader: The Redpanda navigation-menu is designed for dropdown navigation, so the current simple header is more appropriate
  - ProgressStepper: The Redpanda stepper uses @stepperize/react and would require major architectural changes - current implementation is
   more suitable
  ```

## MCP Tools Leveraged

### Redpanda UI MCP Server
```bash
mcp__redpanda-ui__recommend-components
mcp__redpanda-ui__list_components
mcp__redpanda-ui__get_component
```
- Identified available typography, form, navigation, and stepper components
- Evaluated component complexity vs. current implementations
- Successfully integrated Label, Heading, and Text components