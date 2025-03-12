import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Thanks from '../components/payment/Thanks'

describe('Thanks', () => {
  it('should render the Thanks component', () => {
    render(<Thanks />)
    
    expect(screen.getByText('THANK YOU FOR YOUR BOOKING')).toBeInTheDocument();
    expect(screen.getByText('We look forward to welcoming you!')).toBeInTheDocument();
    screen.debug();
  })
})