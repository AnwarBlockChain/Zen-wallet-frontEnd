import React from 'react';

const PlatformStats = () => {
    return (
        <section className="py-12 relative bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="bg-premium-black/40 backdrop-blur-sm border border-dark-gray/30 rounded-3xl p-8 shadow-xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-20">
              {[
                { value: '3.2M+', label: 'Liquidity sources' },
                { value: '$596B+', label: 'Total volume' },
                { value: '21.7M+', label: 'Users' },
                { value: '134M+', label: 'Trades' }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-white mb-3">{stat.value}</span>
                  <span className="text-light-gray text-sm md:text-base">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default PlatformStats; 