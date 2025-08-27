# Dinner Decision Wizard Implementation Plan

## Project Overview
Building a multi-step wizard UI to help users decide what to make for dinner using Redpanda UI components.

## Available Components Research
From Redpanda UI registry, we have access to:
- **Stepper Component**: Perfect for wizard navigation with horizontal/vertical variants
- **Form Components**: Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- **Card Components**: Card, CardHeader, CardContent, CardFooter for step containers  
- **Input Components**: Input, Select, MultiSelect, Checkbox, Radio for user preferences
- **Button Component**: For navigation controls
- **AutoForm**: For automatic form generation from Zod schemas

## Wizard Flow Design

### Step 1: Welcome
- Introduction to the dinner decision wizard
- Brief explanation of the process
- Start button to begin

### Step 2: Dietary Preferences  
- Vegetarian/Vegan options
- Food allergies (nuts, dairy, gluten, etc.)
- Foods to avoid
- Special dietary requirements

### Step 3: Meal Context
- Meal type: Breakfast, Lunch, Dinner, Snack
- Available cooking time: 15min, 30min, 1hr, 2hr+
- Number of people to serve
- Preferred meal complexity

### Step 4: Cuisine Preferences
- Multiple selection of cuisines:
  - Italian, Chinese, Mexican, Indian
  - Mediterranean, Japanese, Thai, American
  - French, Greek, Middle Eastern

### Step 5: Available Ingredients
- Common pantry items checklist
- Proteins available
- Fresh ingredients on hand
- Kitchen equipment available

### Step 6: Final Recommendations
- Display 3-5 dinner suggestions
- Include recipe links/descriptions
- Prep time and difficulty level
- Option to restart wizard

## Technical Implementation Plan
- **Stepper Component**: `defineStepper` with 6 steps for navigation
- **Card Components**: Wrap each step content in cards
- **Form Components**: Use AutoForm with Zod schemas for validation
- **State Management**: React useState for wizard data persistence
- **Components**: Button, Select, MultiSelect, Checkbox, Radio for inputs

## Component Architecture
```
DinnerWizard
├── Stepper.Provider (manages step state)
├── Stepper.Navigation (progress indicator)
├── Step Content Renderer
│   ├── WelcomeStep (Card with introduction)
│   ├── DietaryStep (Form with checkboxes)
│   ├── MealContextStep (Select + Radio inputs)
│   ├── CuisineStep (MultiSelect component)
│   ├── IngredientsStep (Checkbox grid)
│   └── RecommendationsStep (Results display)
└── Stepper.Controls (Previous/Next buttons)
```

## File Structure
- `/src/routes/demo/dinner-wizard.tsx` - Main wizard component ✅
- Add route to `/src/routes/demo/index.tsx` for wizard access ✅
- Components will use existing Redpanda UI imports ✅

## Implementation Status

### ✅ Completed
1. **Research Phase**: Identified all necessary Redpanda UI components
2. **Type-Safe Implementation**: Fixed all TypeScript type errors with proper generics
3. **Full Wizard Flow**: Implemented all 6 steps with proper state management
4. **UI Integration**: Embedded wizard in page-demo.tsx with informational cards
5. **Component Usage**:
   - Stepper component with horizontal navigation
   - Card components for step containers
   - Form inputs (Checkbox, RadioGroup, Select)
   - Badge components for multi-selection
   - Button components for navigation
   - Icons from Lucide React

### Key Features Implemented
- **Welcome Step**: Introduction with feature highlights
- **Dietary Preferences**: Checkboxes for dietary restrictions, badge selection for allergies/dislikes
- **Meal Context**: Select dropdowns and radio groups for meal planning
- **Cuisine Selection**: Multi-select badge interface for cuisine preferences
- **Ingredients**: Badge-based selection for proteins, pantry items, fresh ingredients, and equipment
- **Recommendations**: Display of sample dinner suggestions with recipe details

### Technical Highlights
- **Type Safety**: Generic `updateWizardData` function ensures type-safe state updates
- **State Management**: Comprehensive wizard data interface with nested objects
- **Responsive Design**: Mobile-friendly grid layouts and flexible components
- **Accessibility**: Proper ARIA labels and semantic HTML structure