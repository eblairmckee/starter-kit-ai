'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/redpanda-ui/button';
import { Input } from '@/components/redpanda-ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/redpanda-ui/select';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/redpanda-ui/breadcrumb';
import { Card } from '@/components/redpanda-ui/card';
import { cn } from '@/lib/utils';

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
    <div className="flex items-center space-x-3">
      {/* Step 1 - Active */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center font-medium text-base">
          1
        </div>
        <span className="text-white font-medium text-base">Cluster</span>
        <div className="w-10 h-px bg-gray-500"></div>
      </div>
      
      {/* Step 2 - Inactive */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-800 border border-gray-300 text-white rounded-full flex items-center justify-center font-medium text-base">
          2
        </div>
        <span className="text-white font-medium text-base">Cluster</span>
      </div>
    </div>
  );
}

// Provider Card Component
interface ProviderCardProps {
  selected: boolean;
  onClick: () => void;
}

function ProviderCard({ selected, onClick }: ProviderCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative border rounded-lg px-20 py-8 cursor-pointer transition-colors",
        selected 
          ? "bg-blue-50 border-blue-200" 
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      {/* AWS Logo placeholder */}
      <div className="w-16 h-6 bg-orange-400 rounded flex items-center justify-center text-white font-bold text-xs">
        AWS
      </div>
      
      {/* Radio button */}
      <div className={cn(
        "absolute left-3 top-3 w-5 h-5 rounded-full border-2 flex items-center justify-center",
        selected 
          ? "border-blue-500 bg-blue-500" 
          : "border-gray-300 bg-white"
      )}>
        {selected && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}
      </div>
    </div>
  );
}

// Availability Option Component
interface AvailabilityOptionProps {
  value: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function AvailabilityOption({ label, selected, onClick }: AvailabilityOptionProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 border rounded-lg px-3 py-3 cursor-pointer transition-colors w-56",
        selected 
          ? "bg-blue-50 border-blue-200" 
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      {/* Radio button */}
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
        selected 
          ? "border-blue-500 bg-blue-500" 
          : "border-gray-300 bg-white"
      )}>
        {selected && (
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        )}
      </div>
      
      <span className="text-gray-900 text-sm">{label}</span>
    </div>
  );
}

// Form Field Component
interface FormFieldProps {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}

function FormField({ label, optional, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        <label className="text-sm font-semibold text-gray-600">{label}</label>
        {optional && (
          <span className="text-sm text-gray-500">(Optional)</span>
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
      <div className="text-sm text-gray-500 w-36">{label}</div>
      <div className="text-sm font-medium text-gray-700 flex-1">{value}</div>
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
              <h1 className="text-white text-3xl font-medium tracking-tight">
                Create Dedicated cluster
              </h1>
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
                  <h2 className="text-2xl font-medium text-gray-900">Cluster settings</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Configure your Redpanda cluster to meet your workload requirements. 
                    Select the cloud provider, region, and availability zones that meet your requirements.
                  </p>
                </div>
                
                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Cluster Name */}
                  <FormField label="Cluster name" optional>
                    <Input 
                      value={formData.clusterName}
                      onChange={(e) => updateFormData('clusterName', e.target.value)}
                      placeholder="green-marine-lion"
                      className="h-10"
                    />
                  </FormField>
                  
                  {/* Provider */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Provider</label>
                    <div className="flex space-x-3">
                      <ProviderCard 
                        selected={formData.provider === 'aws'}
                        onClick={() => updateFormData('provider', 'aws')}
                      />
                      <ProviderCard 
                        selected={false}
                        onClick={() => {}}
                      />
                      <ProviderCard 
                        selected={false}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                  
                  {/* Region */}
                  <FormField label="Region" optional>
                    <Select value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
                      <SelectTrigger className="h-10">
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
                    <label className="text-sm font-medium text-gray-900">Availability</label>
                    <div className="flex space-x-3">
                      <AvailabilityOption
                        value="single-az"
                        label="Single AZ"
                        selected={formData.availability === 'single-az'}
                        onClick={() => updateFormData('availability', 'single-az')}
                      />
                      <AvailabilityOption
                        value="multi-az"
                        label="Multi AZ"
                        selected={formData.availability === 'multi-az'}
                        onClick={() => updateFormData('availability', 'multi-az')}
                      />
                    </div>
                  </div>
                  
                  {/* Zone Selection */}
                  <FormField label="Select a zone">
                    <Select value={formData.zone} onValueChange={(value) => updateFormData('zone', value)}>
                      <SelectTrigger className="h-10">
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
                      <SelectTrigger className="h-10">
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
                      className="h-8"
                    />
                  </FormField>
                  
                  {/* Redpanda Version */}
                  <FormField label="Redpanda version">
                    <Input 
                      value={formData.redpandaVersion}
                      onChange={(e) => updateFormData('redpandaVersion', e.target.value)}
                      placeholder="23.2.18"
                      className="h-10"
                    />
                  </FormField>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="mt-8 pt-6">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
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
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    SUMMARY
                  </h3>
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