'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, Heart, MapPin, User, Crown, Star, Shield } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/redpanda-ui/components/card';
import { Button } from '../../components/redpanda-ui/components/button';
import { Input } from '../../components/redpanda-ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/redpanda-ui/components/select';
import { RadioGroup, RadioGroupItem } from '../../components/redpanda-ui/components/radio-group';
import { Label } from '../../components/redpanda-ui/components/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormSection } from '../../components/redpanda-ui/components/form';
import { defineStepper } from '../../components/redpanda-ui/components/stepper';
import { RunningRedpanda } from '../../components/redpanda-ui/components/running-redpanda';
import { Badge } from '../../components/redpanda-ui/components/badge';

// Define form schema
const signupSchema = z.object({
  // Account Information
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  
  // Plan Selection
  plan: z.enum(['basic', 'premium', 'ultimate'], {
    required_error: 'Please select a subscription plan',
  }),
  
  // Payment Information
  cardNumber: z.string().min(16, 'Please enter a valid card number'),
  expiryDate: z.string().min(5, 'Please enter expiry date (MM/YY)'),
  cvv: z.string().min(3, 'Please enter CVV'),
  cardName: z.string().min(1, 'Cardholder name is required'),
  
  // Billing Address
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

// Define stepper steps
const { Stepper, useStepper } = defineStepper(
  { id: 'account', title: 'Account' },
  { id: 'plan', title: 'Plan' },
  { id: 'payment', title: 'Payment' },
  { id: 'confirmation', title: 'Confirmation' }
);

// Plan options
const plans = [
  {
    id: 'basic',
    name: 'Basic Panda',
    price: 9.99,
    description: 'Perfect for casual red panda enthusiasts',
    features: [
      '5 daily red panda photos',
      'Weekly fun facts',
      'Basic red panda cam access',
      'Email updates'
    ],
    icon: Heart,
    color: 'bg-blue-50 border-blue-200',
    badge: null
  },
  {
    id: 'premium',
    name: 'Premium Panda',
    price: 19.99,
    description: 'For the dedicated red panda lover',
    features: [
      '15 daily red panda photos',
      'Daily fun facts & videos',
      'HD red panda cam access',
      'Priority email & SMS updates',
      'Monthly wallpaper pack',
      'Exclusive behind-the-scenes content'
    ],
    icon: Star,
    color: 'bg-orange-50 border-orange-200',
    badge: 'Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Panda',
    price: 29.99,
    description: 'The complete red panda experience',
    features: [
      'Unlimited red panda content',
      '4K red panda cam access',
      'Live feeding notifications',
      'Virtual zoo tours',
      'Red panda naming rights voting',
      'Exclusive merch discounts',
      'Direct keeper Q&A sessions',
      'Annual conservation report'
    ],
    icon: Crown,
    color: 'bg-purple-50 border-purple-200',
    badge: 'Best Value'
  }
];

function RedPandaSignup() {
  const { current, next, prev } = useStepper();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      plan: undefined,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  });

  const selectedPlan = form.watch('plan');
  const currentPlan = plans.find(p => p.id === selectedPlan);

  const onSubmit = async (data: SignupFormData) => {
    if (current.id === 'confirmation') {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Welcome to Red Panda Feed! 🐾 Your subscription has been activated.');
      setIsSubmitting(false);
      return;
    }
    
    // Validate current step
    const fieldsToValidate = getFieldsForStep(current.id);
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid) {
      next();
    }
  };

  const getFieldsForStep = (stepId: string): (keyof SignupFormData)[] => {
    switch (stepId) {
      case 'account':
        return ['email', 'password', 'confirmPassword', 'firstName', 'lastName'];
      case 'plan':
        return ['plan'];
      case 'payment':
        return ['cardNumber', 'expiryDate', 'cvv', 'cardName', 'address', 'city', 'state', 'zipCode', 'country'];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <RunningRedpanda className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Red Panda Feed</h1>
              <p className="text-gray-600">Join thousands of red panda enthusiasts</p>
            </div>
          </div>
        </div>

        <Stepper.Provider variant="horizontal" tracking>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Stepper Navigation */}
              <Card className="p-6">
                <Stepper.Navigation>
                  <Stepper.Step of="account" icon={<User className="w-4 h-4" />}>
                    <Stepper.Title>Account Info</Stepper.Title>
                    <Stepper.Description>Create your account</Stepper.Description>
                  </Stepper.Step>
                  
                  <Stepper.Step of="plan" icon={<Heart className="w-4 h-4" />}>
                    <Stepper.Title>Choose Plan</Stepper.Title>
                    <Stepper.Description>Select your subscription</Stepper.Description>
                  </Stepper.Step>
                  
                  <Stepper.Step of="payment" icon={<CreditCard className="w-4 h-4" />}>
                    <Stepper.Title>Payment</Stepper.Title>
                    <Stepper.Description>Billing information</Stepper.Description>
                  </Stepper.Step>
                  
                  <Stepper.Step of="confirmation" icon={<Shield className="w-4 h-4" />}>
                    <Stepper.Title>Confirm</Stepper.Title>
                    <Stepper.Description>Review & complete</Stepper.Description>
                  </Stepper.Step>
                </Stepper.Navigation>
              </Card>

              {/* Step Content */}
              <Card size="full" className="min-h-[500px]">
                
                {/* Account Information Step */}
                <Stepper.Step of="account">
                  <Stepper.Panel>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-orange-500" />
                        Create Your Account
                      </CardTitle>
                      <CardDescription>
                        Let's get you set up with your red panda feed account
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <FormSection variant="default" className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormSection>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormSection variant="default" className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Create a password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormSection>
                    </CardContent>
                  </Stepper.Panel>
                </Stepper.Step>

                {/* Plan Selection Step */}
                <Stepper.Step of="plan">
                  <Stepper.Panel>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Choose Your Red Panda Plan
                      </CardTitle>
                      <CardDescription>
                        Select the perfect plan for your red panda obsession
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid gap-4"
                              >
                                {plans.map((plan) => {
                                  const IconComponent = plan.icon;
                                  return (
                                    <Label
                                      key={plan.id}
                                      htmlFor={plan.id}
                                      className={`relative flex cursor-pointer rounded-lg border-2 p-6 transition-all hover:bg-gray-50 ${
                                        field.value === plan.id 
                                          ? 'border-orange-500 bg-orange-50' 
                                          : 'border-gray-200'
                                      }`}
                                    >
                                      <RadioGroupItem
                                        value={plan.id}
                                        id={plan.id}
                                        className="sr-only"
                                      />
                                      
                                      <div className="flex flex-1 items-start gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${plan.color}`}>
                                          <IconComponent className="h-6 w-6 text-gray-700" />
                                        </div>
                                        
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                                            {plan.badge && (
                                              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                                {plan.badge}
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-gray-600 mb-3">{plan.description}</p>
                                          <ul className="space-y-1">
                                            {plan.features.map((feature, index) => (
                                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="h-1 w-1 bg-gray-400 rounded-full" />
                                                {feature}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        
                                        <div className="text-right">
                                          <div className="text-2xl font-bold text-gray-900">${plan.price}</div>
                                          <div className="text-sm text-gray-600">per month</div>
                                        </div>
                                      </div>
                                    </Label>
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Stepper.Panel>
                </Stepper.Step>

                {/* Payment Information Step */}
                <Stepper.Step of="payment">
                  <Stepper.Panel>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-500" />
                        Payment Information
                      </CardTitle>
                      <CardDescription>
                        Secure payment processing to start your red panda journey
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Credit Card Section */}
                      <FormSection 
                        title="Credit Card Information"
                        variant="card"
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name as it appears on card" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel required>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel required>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </FormSection>

                      {/* Billing Address Section */}
                      <FormSection 
                        title="Billing Address"
                        variant="card"
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main Street" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel required>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel required>State</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel required>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="12345" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel required>Country</FormLabel>
                                <FormControl>
                                  <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="United States">United States</SelectItem>
                                      <SelectItem value="Canada">Canada</SelectItem>
                                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                      <SelectItem value="Australia">Australia</SelectItem>
                                      <SelectItem value="Germany">Germany</SelectItem>
                                      <SelectItem value="France">France</SelectItem>
                                      <SelectItem value="Japan">Japan</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </FormSection>
                    </CardContent>
                  </Stepper.Panel>
                </Stepper.Step>

                {/* Confirmation Step */}
                <Stepper.Step of="confirmation">
                  <Stepper.Panel>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-500" />
                        Confirm Your Subscription
                      </CardTitle>
                      <CardDescription>
                        Review your information and complete your red panda feed subscription
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Plan Summary */}
                      {currentPlan && (
                        <FormSection variant="card" className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${currentPlan.color}`}>
                              <currentPlan.icon className="h-6 w-6 text-gray-700" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{currentPlan.name}</h3>
                              <p className="text-gray-600">${currentPlan.price}/month</p>
                            </div>
                          </div>
                          <ul className="space-y-1">
                            {currentPlan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="h-1 w-1 bg-gray-400 rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </FormSection>
                      )}

                      {/* Account Summary */}
                      <FormSection variant="card" className="p-6">
                        <h4 className="font-semibold mb-3">Account Information</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-gray-600">Name:</span> {form.getValues('firstName')} {form.getValues('lastName')}</div>
                          <div><span className="text-gray-600">Email:</span> {form.getValues('email')}</div>
                        </div>
                      </FormSection>

                      {/* Payment Summary */}
                      <FormSection variant="card" className="p-6">
                        <h4 className="font-semibold mb-3">Payment Method</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-gray-600">Card:</span> •••• •••• •••• {form.getValues('cardNumber').slice(-4)}</div>
                          <div><span className="text-gray-600">Billing:</span> {form.getValues('city')}, {form.getValues('state')} {form.getValues('zipCode')}</div>
                        </div>
                      </FormSection>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-orange-800">
                          <Heart className="w-4 h-4" />
                          <span className="font-medium">Welcome to the Red Panda Family!</span>
                        </div>
                        <p className="text-orange-700 text-sm mt-1">
                          You'll receive a welcome email with access instructions after completing your subscription.
                        </p>
                      </div>
                    </CardContent>
                  </Stepper.Panel>
                </Stepper.Step>

              </Card>

              {/* Navigation Controls */}
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prev}
                  disabled={current.id === 'account'}
                >
                  Previous
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Processing...
                    </>
                  ) : (
                    current.id === 'confirmation' ? 'Complete Subscription' : 'Continue'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Stepper.Provider>
      </div>
    </div>
  );
}

export { RedPandaSignup };
