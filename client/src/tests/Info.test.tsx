import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Info from './Info'

describe('Info', () => {
  it('renders the Info component', () => {
    render(<Info />)
    
    expect(screen.getByText('GENERAL INFO')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
    screen.debug();
  })
})