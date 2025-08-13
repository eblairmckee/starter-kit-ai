'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/redpanda-ui/button';
import { Input } from '@/components/redpanda-ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/redpanda-ui/select';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/redpanda-ui/breadcrumb';
import { Card } from '@/components/redpanda-ui/card';
import { Choicebox, ChoiceboxItem, ChoiceboxItemHeader, ChoiceboxItemTitle, ChoiceboxItemContent, ChoiceboxItemIndicator } from '@/components/redpanda-ui/choicebox';
import { AwsIcon, AzureIcon, GcpIcon } from '@/components/redpanda-ui/icons';
import { Heading, Text } from '@/components/redpanda-ui/typography';
import { Label } from '@/components/redpanda-ui/label';

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
              <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">
                Clusters
              </div>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">
                Networks
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">
                IAM
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">
                Quotas
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">
                Billing
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">
                Org settings
              </button>
            </nav>
          </div>
          
          {/* User Avatar */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Progress Stepper Component
function ProgressStepper() {
  return (
    <div className="flex items-center space-x-4">
      {/* Step 1 - Active */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center font-semibold text-sm">
          1
        </div>
        <span className="text-white font-medium text-sm">Cluster</span>
      </div>
      
      <div className="w-8 h-px bg-gray-500"></div>
      
      {/* Step 2 - Inactive */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-transparent border-2 border-gray-500 text-gray-300 rounded-full flex items-center justify-center font-semibold text-sm">
          2
        </div>
        <span className="text-gray-300 font-medium text-sm">Cluster</span>
      </div>
    </div>
  );
}



// Form Field Component
interface FormFieldProps {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

function FormField({ label, optional, children, htmlFor }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">{label}</Label>
        {optional && (
          <Text as="span" variant="muted" className="text-sm text-gray-500">(Optional)</Text>
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
      <Text as="div" variant="muted" className="text-sm text-gray-500 w-36">{label}</Text>
      <Text as="div" variant="small" className="text-sm font-medium text-gray-700 flex-1">{value}</Text>
    </div>
  );
}

export default function CreateDedicatedCluster() {
  const [formData, setFormData] = useState({
    clusterName: 'green-marine-lion',
    provider: 'aws',
    region: 'us-east-2', 
    availability: 'single-az',
    zone: 'use2-az1',
    tier: 'tier-1',
    label: 'Content',
    redpandaVersion: '23.2.18'
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <NavigationHeader />
      
      {/* Dark Header Section with Breadcrumbs and Title */}
      <div className="bg-gray-900 pb-10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="pt-10 space-y-10">
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
            <ProgressStepper />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm border border-gray-200 p-6">
              <div className="space-y-8">
                {/* Form Header */}
                <div className="space-y-4">
                  <Heading level={2} className="text-2xl font-medium text-gray-900">Cluster settings</Heading>
                  <Text variant="muted" className="text-gray-600 text-sm leading-relaxed">
                    Configure your Redpanda cluster to meet your workload requirements. 
                    Select the cloud provider, region, and availability zones that meet your requirements.
                  </Text>
                </div>
                
                {/* Form Fields */}
                <div className="space-y-6">
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
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-900">Provider</Label>
                    <Choicebox value={formData.provider} onValueChange={(value) => updateFormData('provider', value)} className="flex space-x-4">
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
                      
                      <ChoiceboxItem value="gcp" className="min-w-[120px]">
                        <ChoiceboxItemHeader className="flex-1">
                          <ChoiceboxItemTitle className="flex items-center justify-center gap-2">
                            <GcpIcon className="h-5 w-8" />
                            <span className="text-sm font-semibold">GCP</span>
                          </ChoiceboxItemTitle>
                        </ChoiceboxItemHeader>
                        <ChoiceboxItemContent>
                          <ChoiceboxItemIndicator />
                        </ChoiceboxItemContent>
                      </ChoiceboxItem>
                      
                      <ChoiceboxItem value="azure" className="min-w-[120px]">
                        <ChoiceboxItemHeader className="flex-1">
                          <ChoiceboxItemTitle className="flex items-center justify-center gap-2">
                            <AzureIcon className="h-5 w-8" />
                            <span className="text-sm font-semibold">Azure</span>
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
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-900">Availability</Label>
                    <Choicebox value={formData.availability} onValueChange={(value) => updateFormData('availability', value)} className="flex space-x-4">
                      <ChoiceboxItem value="single-az" className="min-w-[120px]">
                        <ChoiceboxItemHeader className="flex-1">
                          <ChoiceboxItemTitle className="text-sm font-medium">
                            Single AZ
                          </ChoiceboxItemTitle>
                        </ChoiceboxItemHeader>
                        <ChoiceboxItemContent>
                          <ChoiceboxItemIndicator />
                        </ChoiceboxItemContent>
                      </ChoiceboxItem>
                      
                      <ChoiceboxItem value="multi-az" className="min-w-[120px]">
                        <ChoiceboxItemHeader className="flex-1">
                          <ChoiceboxItemTitle className="text-sm font-medium">
                            Multi AZ
                          </ChoiceboxItemTitle>
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
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-50 shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                {/* Summary Header */}
                <div>
                  <Heading level={3} className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    SUMMARY
                  </Heading>
                </div>
                
                {/* Summary Content */}
                <div className="space-y-2">
                  <SummaryRow label="Cluster name" value={formData.clusterName} />
                  <SummaryRow label="Provider" value="AWS" />
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
    </div>
  );
}