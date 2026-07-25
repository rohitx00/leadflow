import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnalyticsCards } from '../../features/dashboard/components/AnalyticsCards.jsx';

describe('AnalyticsCards Component', () => {
  const mockAnalytics = {
    total: 120,
    newLeads: 45,
    wonLeads: 30,
    lostLeads: 10
  };

  it('renders all analytics cards with correct titles', () => {
    render(<AnalyticsCards analytics={mockAnalytics} />);
    
    expect(screen.getByText('Total Leads')).toBeInTheDocument();
    expect(screen.getByText('New Leads')).toBeInTheDocument();
    expect(screen.getByText('Won Leads')).toBeInTheDocument();
    expect(screen.getByText('Win Rate')).toBeInTheDocument();
  });

  it('displays the correct values and computes win rate correctly', () => {
    render(<AnalyticsCards analytics={mockAnalytics} />);
    
    // total
    expect(screen.getByText('120')).toBeInTheDocument();
    // newLeads
    expect(screen.getByText('45')).toBeInTheDocument();
    // wonLeads
    expect(screen.getByText('30')).toBeInTheDocument();
    
    // winRate = 30 / (30 + 10) = 75%
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders correctly when analytics prop has no data (zeros)', () => {
    const emptyAnalytics = {
      total: 0,
      newLeads: 0,
      wonLeads: 0,
      lostLeads: 0
    };
    
    render(<AnalyticsCards analytics={emptyAnalytics} />);
    
    // There should be multiple '0' values, so we use getAllByText
    const zeroes = screen.getAllByText('0');
    expect(zeroes.length).toBeGreaterThan(0);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('returns null if analytics prop is missing', () => {
    const { container } = render(<AnalyticsCards />);
    expect(container).toBeEmptyDOMElement();
  });
});
