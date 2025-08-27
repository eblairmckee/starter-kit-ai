'use client';

import React, { useState } from 'react';
import { defineStepper } from '@/components/redpanda-ui/components/stepper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/redpanda-ui/components/card';
import { Button } from '@/components/redpanda-ui/components/button';
import { Checkbox } from '@/components/redpanda-ui/components/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/redpanda-ui/components/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/redpanda-ui/components/select';
import { Label } from '@/components/redpanda-ui/components/label';
import { Badge } from '@/components/redpanda-ui/components/badge';
import { Separator } from '@/components/redpanda-ui/components/separator';
import { ChefHat, Clock, Users, Globe, ShoppingBasket, Sparkles } from 'lucide-react';

// Define wizard data types
interface WizardData {
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    allergies: string[];
    dislikes: string[];
  };
  mealContext: {
    mealType: string;
    cookingTime: string;
    servings: string;
    complexity: string;
  };
  cuisines: string[];
  ingredients: {
    proteins: string[];
    pantryItems: string[];
    freshItems: string[];
    equipment: string[];
  };
}

// Define the stepper with 6 steps
const { Stepper } = defineStepper(
  { id: 'welcome', title: 'Welcome' },
  { id: 'dietary', title: 'Dietary Preferences' },
  { id: 'meal-context', title: 'Meal Context' },
  { id: 'cuisines', title: 'Cuisine Preferences' },
  { id: 'ingredients', title: 'Available Ingredients' },
  { id: 'recommendations', title: 'Recommendations' }
);

// Sample data for selections
const cuisineOptions = [
  { value: 'italian', label: 'Italian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'indian', label: 'Indian' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'thai', label: 'Thai' },
  { value: 'american', label: 'American' },
  { value: 'french', label: 'French' },
  { value: 'greek', label: 'Greek' },
  { value: 'middle-eastern', label: 'Middle Eastern' }
];

const commonAllergens = ['Nuts', 'Shellfish', 'Eggs', 'Soy', 'Fish'];
const commonDislikes = ['Mushrooms', 'Onions', 'Tomatoes', 'Spicy Food', 'Seafood'];
const proteinOptions = ['Chicken', 'Beef', 'Pork', 'Fish', 'Tofu', 'Beans', 'Eggs'];
const pantryItems = ['Rice', 'Pasta', 'Bread', 'Olive Oil', 'Garlic', 'Onions', 'Canned Tomatoes'];
const freshItems = ['Bell Peppers', 'Carrots', 'Broccoli', 'Spinach', 'Herbs', 'Lemon'];
const equipmentOptions = ['Oven', 'Stovetop', 'Microwave', 'Grill', 'Air Fryer', 'Slow Cooker'];

// Sample dinner recommendations
const dinnerRecommendations = [
  {
    name: 'Mediterranean Chicken Bowl',
    cuisine: 'Mediterranean',
    prepTime: '25 minutes',
    difficulty: 'Easy',
    description: 'Grilled chicken with quinoa, cucumber, tomatoes, and tzatziki sauce',
    ingredients: ['Chicken', 'Quinoa', 'Cucumber', 'Tomatoes', 'Greek Yogurt']
  },
  {
    name: 'Vegetable Stir Fry',
    cuisine: 'Asian',
    prepTime: '20 minutes', 
    difficulty: 'Easy',
    description: 'Quick and healthy stir-fried vegetables with soy sauce and ginger',
    ingredients: ['Mixed Vegetables', 'Soy Sauce', 'Ginger', 'Garlic', 'Rice']
  },
  {
    name: 'Pasta Primavera',
    cuisine: 'Italian',
    prepTime: '30 minutes',
    difficulty: 'Medium',
    description: 'Fresh pasta with seasonal vegetables and parmesan cheese',
    ingredients: ['Pasta', 'Mixed Vegetables', 'Parmesan', 'Olive Oil', 'Herbs']
  }
];

export const DinnerWizard: React.FC = () => {
  const [wizardData, setWizardData] = useState<WizardData>({
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      allergies: [],
      dislikes: []
    },
    mealContext: {
      mealType: '',
      cookingTime: '',
      servings: '',
      complexity: ''
    },
    cuisines: [],
    ingredients: {
      proteins: [],
      pantryItems: [],
      freshItems: [],
      equipment: []
    }
  });

  const updateWizardData = <K extends keyof WizardData>(
    section: K, 
    data: Partial<WizardData[K]>
  ) => {
    setWizardData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateWizardArray = (section: 'cuisines', value: string[]) => {
    setWizardData(prev => ({ ...prev, [section]: value }));
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <Stepper.Provider className="space-y-6" variant="horizontal">
          {({ methods }) => (
            <>
              {/* Header */}
              <div className="text-center space-y-2 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <ChefHat className="h-6 w-6 text-primary" />
                  <h1 className="text-2xl font-bold">Dinner Decision Wizard</h1>
                </div>
                <p className="text-muted-foreground">
                  Let us help you decide what to make for dinner tonight!
                </p>
              </div>

              {/* Stepper Navigation */}
              <Stepper.Navigation className="mb-8">
                {methods.all.map((step) => (
                  <Stepper.Step key={step.id} of={step.id} onClick={() => methods.goTo(step.id)}>
                    <Stepper.Title>{step.title}</Stepper.Title>
                  </Stepper.Step>
                ))}
              </Stepper.Navigation>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {methods.switch({
                  'welcome': () => (
                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          Welcome to Your Dinner Decision Wizard
                        </CardTitle>
                        <CardDescription className="text-lg">
                          We'll guide you through a few quick questions to find the perfect dinner for tonight
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex flex-col items-center space-y-2">
                            <Users className="h-8 w-8 text-primary" />
                            <span className="font-medium">Personalized</span>
                            <span className="text-muted-foreground">Based on your preferences</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Clock className="h-8 w-8 text-primary" />
                            <span className="font-medium">Quick & Easy</span>
                            <span className="text-muted-foreground">Matches your available time</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Globe className="h-8 w-8 text-primary" />
                            <span className="font-medium">Diverse Options</span>
                            <span className="text-muted-foreground">From cuisines you love</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          This should take about 2-3 minutes. Ready to get started?
                        </p>
                      </CardContent>
                    </Card>
                  ),

                  'dietary': () => (
                    <Card>
                      <CardHeader>
                        <CardTitle>Dietary Preferences & Restrictions</CardTitle>
                        <CardDescription>
                          Help us understand your dietary needs so we can recommend suitable meals
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Dietary Preferences</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="vegetarian"
                                checked={wizardData.dietary.vegetarian}
                                onCheckedChange={(checked) => updateWizardData('dietary', { vegetarian: !!checked })}
                              />
                              <Label htmlFor="vegetarian">Vegetarian</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="vegan"
                                checked={wizardData.dietary.vegan}
                                onCheckedChange={(checked) => updateWizardData('dietary', { vegan: !!checked })}
                              />
                              <Label htmlFor="vegan">Vegan</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="glutenFree"
                                checked={wizardData.dietary.glutenFree}
                                onCheckedChange={(checked) => updateWizardData('dietary', { glutenFree: !!checked })}
                              />
                              <Label htmlFor="glutenFree">Gluten Free</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="dairyFree"
                                checked={wizardData.dietary.dairyFree}
                                onCheckedChange={(checked) => updateWizardData('dietary', { dairyFree: !!checked })}
                              />
                              <Label htmlFor="dairyFree">Dairy Free</Label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-3">Food Allergies</h3>
                          <div className="flex flex-wrap gap-2">
                            {commonAllergens.map((allergen) => (
                              <Badge
                                key={allergen}
                                variant={wizardData.dietary.allergies.includes(allergen) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => updateWizardData('dietary', {
                                  allergies: toggleArrayItem(wizardData.dietary.allergies, allergen)
                                })}
                              >
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Foods to Avoid</h3>
                          <div className="flex flex-wrap gap-2">
                            {commonDislikes.map((dislike) => (
                              <Badge
                                key={dislike}
                                variant={wizardData.dietary.dislikes.includes(dislike) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => updateWizardData('dietary', {
                                  dislikes: toggleArrayItem(wizardData.dietary.dislikes, dislike)
                                })}
                              >
                                {dislike}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),

                  'meal-context': () => (
                    <Card>
                      <CardHeader>
                        <CardTitle>Meal Context</CardTitle>
                        <CardDescription>
                          Tell us about the meal you're planning
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="mealType" className="font-medium">Meal Type</Label>
                            <Select value={wizardData.mealContext.mealType} onValueChange={(value) => updateWizardData('mealContext', { mealType: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select meal type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="breakfast">Breakfast</SelectItem>
                                <SelectItem value="lunch">Lunch</SelectItem>
                                <SelectItem value="dinner">Dinner</SelectItem>
                                <SelectItem value="snack">Snack</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="servings" className="font-medium">Number of Servings</Label>
                            <Select value={wizardData.mealContext.servings} onValueChange={(value) => updateWizardData('mealContext', { servings: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="How many people?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Just me</SelectItem>
                                <SelectItem value="2">2 people</SelectItem>
                                <SelectItem value="3-4">3-4 people</SelectItem>
                                <SelectItem value="5+">5+ people</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="font-medium">Available Cooking Time</Label>
                          <RadioGroup 
                            value={wizardData.mealContext.cookingTime} 
                            onValueChange={(value) => updateWizardData('mealContext', { cookingTime: value })}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="15min" id="15min" />
                              <Label htmlFor="15min">15 minutes or less</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="30min" id="30min" />
                              <Label htmlFor="30min">30 minutes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1hour" id="1hour" />
                              <Label htmlFor="1hour">1 hour</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2hours" id="2hours" />
                              <Label htmlFor="2hours">2+ hours</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="font-medium">Preferred Complexity</Label>
                          <RadioGroup 
                            value={wizardData.mealContext.complexity} 
                            onValueChange={(value) => updateWizardData('mealContext', { complexity: value })}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="simple" id="simple" />
                              <Label htmlFor="simple">Simple & Quick</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="moderate" id="moderate" />
                              <Label htmlFor="moderate">Moderate Effort</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="complex" id="complex" />
                              <Label htmlFor="complex">I enjoy cooking challenges</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>
                  ),

                  'cuisines': () => (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="h-5 w-5" />
                          Cuisine Preferences
                        </CardTitle>
                        <CardDescription>
                          Select the types of cuisine you're interested in (you can choose multiple)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {cuisineOptions.map((cuisine) => (
                            <Badge
                              key={cuisine.value}
                              variant={wizardData.cuisines.includes(cuisine.value) ? "default" : "outline"}
                              className="cursor-pointer justify-center py-2 text-center"
                              onClick={() => updateWizardArray('cuisines', toggleArrayItem(wizardData.cuisines, cuisine.value))}
                            >
                              {cuisine.label}
                            </Badge>
                          ))}
                        </div>
                        {wizardData.cuisines.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                              Selected: {wizardData.cuisines.length} cuisine{wizardData.cuisines.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ),

                  'ingredients': () => (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShoppingBasket className="h-5 w-5" />
                          Available Ingredients & Equipment
                        </CardTitle>
                        <CardDescription>
                          Let us know what you have available in your kitchen
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Proteins</h3>
                          <div className="flex flex-wrap gap-2">
                            {proteinOptions.map((protein) => (
                              <Badge
                                key={protein}
                                variant={wizardData.ingredients.proteins.includes(protein) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => updateWizardData('ingredients', {
                                  proteins: toggleArrayItem(wizardData.ingredients.proteins, protein)
                                })}
                              >
                                {protein}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Pantry Items</h3>
                          <div className="flex flex-wrap gap-2">
                            {pantryItems.map((item) => (
                              <Badge
                                key={item}
                                variant={wizardData.ingredients.pantryItems.includes(item) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => updateWizardData('ingredients', {
                                  pantryItems: toggleArrayItem(wizardData.ingredients.pantryItems, item)
                                })}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Fresh Ingredients</h3>
                          <div className="flex flex-wrap gap-2">
                            {freshItems.map((item) => (
                              <Badge
                                key={item}
                                variant={wizardData.ingredients.freshItems.includes(item) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => updateWizardData('ingredients', {
                                  freshItems: toggleArrayItem(wizardData.ingredients.freshItems, item)
                                })}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Kitchen Equipment</h3>
                          <div className="flex flex-wrap gap-2">
                            {equipmentOptions.map((equipment) => (
                              <Badge
                                key={equipment}
                                variant={wizardData.ingredients.equipment.includes(equipment) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => updateWizardData('ingredients', {
                                  equipment: toggleArrayItem(wizardData.ingredients.equipment, equipment)
                                })}
                              >
                                {equipment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),

                  'recommendations': () => (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          Your Dinner Recommendations
                        </CardTitle>
                        <CardDescription>
                          Based on your preferences, here are some great dinner options for tonight
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {dinnerRecommendations.map((recipe) => (
                          <Card key={recipe.name} className="border-l-4 border-l-primary/50">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">{recipe.name}</CardTitle>
                                <Badge variant="outline">{recipe.cuisine}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {recipe.prepTime}
                                </div>
                                <Badge variant="secondary">{recipe.difficulty}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-muted-foreground mb-3">{recipe.description}</p>
                              <div>
                                <p className="text-sm font-medium mb-2">Key Ingredients:</p>
                                <div className="flex flex-wrap gap-1">
                                  {recipe.ingredients.map((ingredient) => (
                                    <Badge key={ingredient} variant="outline" className="text-xs">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <div className="text-center pt-4">
                          <Button 
                            onClick={() => methods.reset()} 
                            variant="outline" 
                            className="mr-2"
                          >
                            Start Over
                          </Button>
                          <Button onClick={() => window.location.reload()}>
                            Find More Recipes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                })}
              </div>

              {/* Navigation Controls */}
              <Stepper.Controls className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={methods.prev} 
                  disabled={methods.isFirst}
                >
                  Previous
                </Button>
                <Button 
                  onClick={methods.isLast ? methods.reset : methods.next}
                  disabled={methods.current.id === 'recommendations'}
                >
                  {methods.isLast ? 'Start Over' : 'Next'}
                </Button>
              </Stepper.Controls>
            </>
          )}
        </Stepper.Provider>
      </div>
    </div>
  );
};