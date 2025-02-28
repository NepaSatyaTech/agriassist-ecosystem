
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of farmers who are already using AgriAssist to increase yields, reduce costs, and farm smarter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" className="bg-white text-green-700 hover:bg-green-50 border-white">
            Get Started for Free
          </Button>
          <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
