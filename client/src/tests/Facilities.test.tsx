import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Facilities from '../components/navpages/Facilities'

describe('Facilities', () => {
  it('should render the Facilities component', () => {
    render(<Facilities />)
    
    expect(screen.getByText('OUR FACILITIES')).toBeInTheDocument();
    screen.debug();
  })
})