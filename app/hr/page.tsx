"use client";

import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Clock, MapPin, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { DemoPopup } from '@/components/demo-popup';

const HRPage = () => {
  const [showDemoPopup, setShowDemoPopup] = React.useState(false);

  useEffect(() => {
    // Show demo popup when HR page loads
    const timer = setTimeout(() => {
      setShowDemoPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Digital Artist",
      department: "Creative",
      location: "Remote",
      type: "Full-time",
      salary: "50-80 XRP/month",
      experience: "3+ years",
      skills: ["Digital Art", "Photoshop", "Illustrator", "NFT Design"]
    },
    {
      id: 2,
      title: "XRPL Developer",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      salary: "100-150 XRP/month",
      experience: "5+ years",
      skills: ["XRPL", "JavaScript", "React", "Node.js"]
    },
    {
      id: 3,
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
      salary: "30-50 XRP/month",
      experience: "2+ years",
      skills: ["Social Media", "Content Creation", "Community Building"]
    },
    {
      id: 4,
      title: "NFT Curator",
      department: "Creative",
      location: "Remote",
      type: "Contract",
      salary: "40-60 XRP/month",
      experience: "3+ years",
      skills: ["Art Curation", "NFT Markets", "Trend Analysis"]
    },
    {
      id: 5,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "60-90 XRP/month",
      experience: "4+ years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Hybrid",
      type: "Full-time",
      salary: "45-70 XRP/month",
      experience: "3+ years",
      skills: ["Digital Marketing", "SEO", "Analytics", "Campaign Management"]
    }
  ];

  const benefits = [
    { icon: Clock, title: "Flexible Hours", description: "Work when you're most productive" },
    { icon: MapPin, title: "Remote First", description: "Work from anywhere in the world" },
    { icon: TrendingUp, title: "Growth Opportunities", description: "Continuous learning and development" },
    { icon: Star, title: "Competitive Pay", description: "XRP-based compensation packages" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/20 via-white to-brand-accent/10">
      {/* Demo Popup */}
      <DemoPopup />
      
      {/* Top Bar */}
      <div className="bg-brand-primary text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Users className="h-5 w-5" />
            <span className="font-medium">Join Our Creative Team</span>
          </div>
          <div className="text-sm">
            <span className="opacity-90">💼 6 Open Positions</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Careers at <span className="text-brand-primary">EMC Store</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the future of digital art and NFT marketplace. We're building the next generation 
            of creative commerce on the XRPL blockchain.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="brand-card p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="bg-brand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-brand-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="brand-card p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-brand-primary font-medium">{job.department}</p>
                  </div>
                  <Badge variant="secondary" className="bg-brand-light text-brand-primary">
                    {job.type}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {job.experience}
                  </div>
                  <div className="flex items-center text-sm font-medium text-brand-primary">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-brand-primary/30 text-brand-primary">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white">
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-lg mb-6 opacity-90">
            We're always looking for talented individuals to join our team. 
            Send us your portfolio and let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" className="bg-white text-brand-primary hover:bg-gray-100">
              Send Portfolio
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPage;