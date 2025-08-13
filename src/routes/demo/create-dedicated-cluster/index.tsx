'use client';

import { ArrowRight, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/redpanda-ui/breadcrumb';
import { Button } from '@/components/redpanda-ui/button';
import { Card } from '@/components/redpanda-ui/card';
import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
} from '@/components/redpanda-ui/choicebox';
import { AwsIcon } from '@/components/redpanda-ui/icons';
import { Input } from '@/components/redpanda-ui/input';
import { Label } from '@/components/redpanda-ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/redpanda-ui/select';
import { defineStepper } from '@/components/redpanda-ui/stepper';
import { Heading, Text } from '@/components/redpanda-ui/typography';

// Navigation Header Component
function NavigationHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-red-600 font-bold text-xl">Redpanda</div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex space-x-6">
              <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">Clusters</div>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold"
              >
                Networks
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold"
              >
                IAM
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold"
              >
                Quotas
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold"
              >
                Billing
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold"
              >
                Org settings
              </button>
            </nav>
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Define stepper steps
const { Stepper } = defineStepper(
  { id: 'cluster-settings', title: 'Cluster' },
  { id: 'network-settings', title: 'Cluster' },
);

// Form Field Component
interface FormFieldProps {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

function FormField({ label, optional, children, htmlFor }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center space-x-1">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">
          {label}
        </Label>
        {optional && (
          <Text as="span" variant="muted" className="text-sm text-gray-500">
            (Optional)
          </Text>
        )}
      </div>
      {children}
    </div>
  );
}

// Summary Row Component
interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center space-x-3">
      <Text as="div" variant="muted" className="text-sm text-gray-500 w-36">
        {label}
      </Text>
      <Text as="div" variant="small" className="text-sm font-medium text-gray-700 flex-1">
        {value}
      </Text>
    </div>
  );
}

// Cluster Settings Step Component
function ClusterSettingsStepContent({
  formData,
  updateFormData,
  methods,
}: {
  formData: Record<string, string>;
  updateFormData: (field: string, value: string) => void;
  methods: { next: () => void; prev: () => void };
}) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200 p-6">
      <div className="space-y-6">
        {/* Form Header */}
        <div className="space-y-4">
          <Heading level={2} className="text-2xl font-medium text-gray-900">
            Cluster settings
          </Heading>
          <Text variant="muted" className="text-gray-600 text-sm leading-relaxed">
            Configure your Redpanda cluster to meet your workload requirements. Select the cloud provider, region, and
            availability zones that meet your requirements.
          </Text>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Cluster Name */}
          <FormField label="Cluster name" optional>
            <Input
              value={formData.clusterName}
              onChange={(e) => updateFormData('clusterName', e.target.value)}
              placeholder="green-marine-lion"
              className="h-9"
            />
          </FormField>

          {/* Provider */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">Provider</Label>
            <Choicebox
              value={formData.provider}
              onValueChange={(value) => updateFormData('provider', value)}
              className="flex space-x-4"
            >
              <ChoiceboxItem value="aws" className="min-w-[120px]">
                <ChoiceboxItemHeader className="flex-1">
                  <ChoiceboxItemTitle className="flex items-center justify-center gap-2">
                    <AwsIcon className="h-5 w-8" />
                    <span className="text-sm font-semibold">AWS</span>
                  </ChoiceboxItemTitle>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>

              <ChoiceboxItem value="aws-2" className="min-w-[120px]">
                <ChoiceboxItemHeader className="flex-1">
                  <ChoiceboxItemTitle className="flex items-center justify-center gap-2">
                    <AwsIcon className="h-5 w-8" />
                    <span className="text-sm font-semibold">AWS</span>
                  </ChoiceboxItemTitle>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>

              <ChoiceboxItem value="aws-3" className="min-w-[120px]">
                <ChoiceboxItemHeader className="flex-1">
                  <ChoiceboxItemTitle className="flex items-center justify-center gap-2">
                    <AwsIcon className="h-5 w-8" />
                    <span className="text-sm font-semibold">AWS</span>
                  </ChoiceboxItemTitle>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>
            </Choicebox>
          </div>

          {/* Region */}
          <FormField label="Region" optional>
            <Select value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east-1">us-east-1</SelectItem>
                <SelectItem value="us-east-2">us-east-2</SelectItem>
                <SelectItem value="us-west-1">us-west-1</SelectItem>
                <SelectItem value="us-west-2">us-west-2</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">Availability</Label>
            <Choicebox
              value={formData.availability}
              onValueChange={(value) => updateFormData('availability', value)}
              className="flex space-x-4"
            >
              <ChoiceboxItem value="single-az" className="min-w-[120px] whitespace-nowrap">
                <ChoiceboxItemHeader className="flex-1">
                  <ChoiceboxItemTitle className="text-sm font-medium text-center">Single AZ</ChoiceboxItemTitle>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>

              <ChoiceboxItem value="multi-az" className="min-w-[120px] whitespace-nowrap">
                <ChoiceboxItemHeader className="flex-1">
                  <ChoiceboxItemTitle className="text-sm font-medium text-center">Multi AZ</ChoiceboxItemTitle>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>
            </Choicebox>
          </div>

          {/* Zone Selection */}
          <FormField label="Select a zone">
            <Select value={formData.zone} onValueChange={(value) => updateFormData('zone', value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="use2-az1">use2-az1</SelectItem>
                <SelectItem value="use2-az2">use2-az2</SelectItem>
                <SelectItem value="use2-az3">use2-az3</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {/* Tiers */}
          <FormField label="Tiers">
            <Select value={formData.tier} onValueChange={(value) => updateFormData('tier', value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tier-1">Tier 1 (20 MBps max write / 60 MBps max read)</SelectItem>
                <SelectItem value="tier-2">Tier 2 (40 MBps max write / 120 MBps max read)</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {/* Label */}
          <FormField label="Label">
            <Input
              value={formData.label}
              onChange={(e) => updateFormData('label', e.target.value)}
              placeholder="Content"
              className="h-9"
            />
          </FormField>

          {/* Redpanda Version */}
          <FormField label="Redpanda version">
            <Input
              value={formData.redpandaVersion}
              onChange={(e) => updateFormData('redpandaVersion', e.target.value)}
              placeholder="23.2.18"
              className="h-9"
            />
          </FormField>
        </div>
      </div>

      {/* Form Actions */}
      <div className="mt-8 pt-6">
        <Button size="lg" onClick={methods.next} className="bg-blue-600 hover:bg-blue-700 text-white">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}

// Network Settings Step Component
function NetworkSettingsStepContent({ methods }: { methods: { prev: () => void; next: () => void } }) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200 p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <Heading level={2} className="text-2xl font-medium text-gray-900">
            Network settings
          </Heading>
          <Text variant="muted" className="text-gray-600 text-sm leading-relaxed">
            Configure network and security settings for your cluster.
          </Text>
        </div>

        <div className="space-y-6">
          <Text>Network configuration options will go here...</Text>
        </div>
      </div>

      <div className="mt-8 pt-6 flex gap-3">
        <Button variant="outline" onClick={methods.prev}>
          Back
        </Button>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          Create Cluster
        </Button>
      </div>
    </Card>
  );
}

export default function CreateDedicatedCluster() {
  const [formData, setFormData] = useState({
    clusterName: 'green-marine-lion',
    provider: 'aws-3',
    region: 'us-east-2',
    availability: 'single-az',
    zone: 'use2-az1',
    tier: 'tier-1',
    label: 'Content',
    redpandaVersion: '23.2.18',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Stepper.Provider className="min-h-screen bg-gray-100" variant="horizontal">
      {({ methods }) => (
        <React.Fragment>
          {/* Navigation Header */}
          <NavigationHeader />

          {/* Dark Header Section with Breadcrumbs and Title */}
          <div className="bg-gray-900 pb-8">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
              <div className="pt-8 space-y-8">
                {/* Breadcrumbs */}
                <Breadcrumb>
                  <BreadcrumbList className="text-gray-300">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className="text-gray-300 hover:text-white">
                        some-fun-organization
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-400">
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className="text-gray-300 hover:text-white">
                        default
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-400">
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className="text-gray-300 hover:text-white">
                        Create Cluster
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-400">
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-400">Dedicated</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                {/* Page Title */}
                <div>
                  <Heading level={1} className="text-white text-3xl font-medium tracking-tight">
                    Create Dedicated cluster
                  </Heading>
                </div>

                {/* Progress Stepper */}
                <Stepper.Navigation className="flex items-center space-x-4">
                  {methods.all.map((step) => (
                    <Stepper.Step
                      key={step.id}
                      of={step.id}
                      onClick={() => methods.goTo(step.id)}
                      className="flex items-center space-x-3"
                    >
                      <Stepper.Title
                        className={
                          methods.current.id === step.id
                            ? 'text-white font-medium text-sm'
                            : 'text-gray-300 font-medium text-sm'
                        }
                      >
                        {step.title}
                      </Stepper.Title>
                    </Stepper.Step>
                  ))}
                </Stepper.Navigation>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8 -mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                {methods.switch({
                  'cluster-settings': () => (
                    <ClusterSettingsStepContent formData={formData} updateFormData={updateFormData} methods={methods} />
                  ),
                  'network-settings': () => <NetworkSettingsStepContent methods={methods} />,
                })}
              </div>

              {/* Summary Panel */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-50 shadow-sm border border-gray-200 p-6">
                  <div className="space-y-4">
                    {/* Summary Header */}
                    <div>
                      <Heading level={3} className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        SUMMARY
                      </Heading>
                    </div>

                    {/* Summary Content */}
                    <div className="space-y-2">
                      <SummaryRow label="Cluster name" value={formData.clusterName} />
                      <SummaryRow
                        label="Provider"
                        value={formData.provider.startsWith('aws') ? 'AWS' : formData.provider.toUpperCase()}
                      />
                      <SummaryRow label="Region" value={formData.region} />
                      <SummaryRow label="Zones" value={formData.zone} />
                      <SummaryRow label="Tier" value="Tier 1" />
                      <SummaryRow label="Tier" value="Tier 1" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Stepper.Provider>
  );
}
