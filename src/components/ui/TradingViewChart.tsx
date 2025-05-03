'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
  height?: number;
  width?: number;
  interval?: string;
  timezone?: string;
  locale?: string;
  style?: 'regular' | 'large' | 'compact';
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  theme = 'dark',
  autosize = true,
  height = 500,
  width = '100%',
  interval = '1D',
  timezone = 'Etc/UTC',
  locale = 'en',
  style = 'regular',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Function to load TradingView widget
    const loadTradingViewScript = () => {
      if (!scriptRef.current) {
        scriptRef.current = document.createElement('script');
        scriptRef.current.type = 'text/javascript';
        scriptRef.current.src = 'https://s3.tradingview.com/tv.js';
        scriptRef.current.async = true;
        scriptRef.current.onload = createWidget;
        document.head.appendChild(scriptRef.current);
      } else {
        createWidget();
      }
    };

    // Create widget once script is loaded
    const createWidget = () => {
      if (containerRef.current && window.TradingView) {
        if (widgetRef.current) {
          // Clean up previous widget instance if it exists
          containerRef.current.innerHTML = '';
        }

        widgetRef.current = new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: `CRYPTO:${symbol}USD`,
          theme: theme,
          autosize: autosize,
          height: height,
          width: width,
          interval: interval,
          timezone: timezone,
          locale: locale,
          style: style,
          toolbar_bg: theme === 'dark' ? '#1F1F1F' : '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: false,
          withdateranges: true,
          save_image: false,
          hide_side_toolbar: false,
          allow_symbol_change: false,
          studies: ['RSI@tv-basicstudies'],
          hide_legend: false,
        });
      }
    };

    loadTradingViewScript();

    return () => {
      // Cleanup function when component unmounts
      if (widgetRef.current && widgetRef.current.iframe) {
        try {
          widgetRef.current.iframe.remove();
          widgetRef.current = null;
        } catch (e) {
          console.error('Error removing TradingView widget:', e);
        }
      }
    };
  }, [symbol, theme, autosize, height, width, interval, timezone, locale, style]);

  return <div id="tradingview-widget-container" ref={containerRef} style={{ width: '100%', height: height }} />;
};

export default TradingViewChart; 