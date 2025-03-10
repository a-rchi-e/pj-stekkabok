import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Facilities from './Facilities'

describe('Facilities', () => {
  it('renders the Facilities component', () => {
    render(<Facilities />)
    
    expect(screen.getByText('OUR FACILITIES')).toBeInTheDocument();
    screen.debug();
  })
})