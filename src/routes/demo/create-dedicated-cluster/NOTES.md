Process for using the `redpanda-ui` mcp with `figma-dev-mode` mcp to recreate [this figma frame](https://www.figma.com/design/t7IrgHK9zT8APyFIk1Y9XW/RedPanda-Design-System?node-id=2413-44614&m=dev).

# ACTION ITEMS

- add a CLAUDE.md, biome config to this repo
- not all components are indexed (eg: stepper) only 48 currently indexed, but we know there are 70+
- need a navbar component
- need a formfield (label/slots) component
- add figma-dev-mode mcp setup instructions
- add playwright setup instructions so mcp can compare rendered UI with figma

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

# Phase 4

prompt

```
ultrathink. i disagree, this will be a multistep form, we should use the redpanda progress stepper. if you want to create multiple components in this file for each step, that's preferable.
```

response

```
     ☐ Study Redpanda stepper component API and usage patterns
     ☐ Define steps for the multistep form (Cluster settings, Network settings, etc.)
     ☐ Replace custom ProgressStepper with Redpanda stepper implementation
     ☐ Create separate step components for each form section
     ☐ Implement proper step navigation and state management
```

## MCP Tools Leveraged

### Redpanda UI MCP Server

```bash
mcp__redpanda-ui__get_component_demo
```

- Attempted to find stepper demo examples
- Analyzed component file directly when demo not available
- Successfully implemented defineStepper with proper step architecture

```bash
mcp__redpanda-ui__recommend-components
mcp__redpanda-ui__list_components
mcp__redpanda-ui__get_component
```

- Identified available typography, form, navigation, and stepper components
- Evaluated component complexity vs. current implementations
- Successfully integrated Label, Heading, and Text components

# Phase 4

prompt

```
ultrathink. i disagree, this will be a multistep form, we should use the redpanda progress stepper. if you want to create multiple
  components in this file for each step, that's preferable.
```

response

```
- Study Redpanda stepper API: Used defineStepper from @stepperize/react
  - Defined multistep form: Created "cluster-settings" and "network-settings" steps
  - Replaced custom stepper: Now using proper Stepper.Navigation and step components
  - Created separate step components: ClusterSettingsStep and NetworkSettingsStep
  - Implemented navigation: Proper next/prev with Stepper.Controls
```

## MCP Tools Leverages

### Redpanda UI MCP Server

```bash
mcp__redpanda-ui__search-docs
WebFetch(url: stepper documentation)
```

- Referenced official stepper documentation to fix implementation
- Used proper methods.switch() pattern instead of nested components
- Corrected stepper positioning and navigation flow

# Phase 5

(reorganized directories and ran lint with biome, so diffs are annoying, sorry!)

prompt

```
 ultrathink. this is a lot closer! let's make sure the rendered UI matches the figma file I provided earlier. here's a screenshot of the   │
│   rendered UI @src/routes/demo/create-dedicated-cluster/Screenshot-phase5.1.png . please improve the layout, spacing, etc.
```

response

```
 ☐ Fix stepper positioning - should be above content, not overlapping
     ☐ Ensure all form fields are rendering (missing availability, zones, etc.)
     ☐ Fix main content layout structure to match Figma spacing
     ☐ Add missing Next button and proper form actions
```

prompt

```
ultrathink. let's take a second pass and ensuring the rendered UI matches the figma exactly. pay attention to layout, spacing,
  responsiveness, etc. see @src/routes/demo/create-dedicated-cluster/Screenshot-phase5.2.png and
  @src/routes/demo/create-dedicated-cluster/Screenshot-phase5.3.png for the rendered UI. since it's overflowing past the window height the
   second screenshot is the second half of the page.
```

response

```
☐ Compare current rendered UI with Figma design
     ☐ Fix layout and spacing discrepancies
     ☐ Ensure proper responsiveness
     ☐ Update availability zone labels to match Figma
     ☐ Fix provider section to show 3 AWS options
     ☐ Fix stepper labels to match Figma
```

## MCP Tools Leveraged

### Figma MCP Server

```bash
mcp__figma__get_image
```

- Retrieved current Figma design for comparison with screenshot
- Enabled side-by-side comparison to identify layout discrepancies
