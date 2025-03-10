import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router'

describe('NavBar', () => {
  it('renders the NavBar component', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
    
    screen.debug();
  })
})