import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renders the Home component', () => {
    render(<Home />)
    
    expect(screen.getByText('WELCOME')).toBeInTheDocument();
    expect(screen.getByText('TO')).toBeInTheDocument();
    expect(screen.getByText('STEKKABÓL')).toBeInTheDocument();
    expect(screen.getByText('GUESTHOUSE')).toBeInTheDocument();
    screen.debug();
  })
})