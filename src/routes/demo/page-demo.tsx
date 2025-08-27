'use client';

import { DemoBreadcrumbs } from '@/components/custom/demo-breadcrumbs';
import { DemoSidebar } from '@/components/custom/demo-sidebar';
import { Separator } from '@/redpanda-ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/redpanda-ui/components/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/redpanda-ui/components/card';
import { Badge } from '@/components/redpanda-ui/components/badge';
import { ChefHat, Clock, Users, Sparkles } from 'lucide-react';
import { DinnerWizard } from './dinner-wizard';

export const PageDemo = () => {
  return (
    <SidebarProvider>
      <DemoSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DemoBreadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Demo Header */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Dinner Wizard</CardTitle>
                </div>
                <CardDescription>
                  Interactive wizard to help you decide what to make for dinner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4" />
                  <span>2-3 minutes</span>
                  <Badge variant="secondary">Featured</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Personalized meal recommendations based on your preferences, available time, and ingredients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Multi-Step Forms</CardTitle>
                </div>
                <CardDescription>
                  Stepper component with form validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Demonstrates the use of Redpanda UI's Stepper component with complex form state management.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Interactive UI</CardTitle>
                </div>
                <CardDescription>
                  Rich user interactions and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Showcases dynamic content updates, badge selection, and real-time form validation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Dinner Wizard */}
          <div className="flex-1">
            <DinnerWizard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
