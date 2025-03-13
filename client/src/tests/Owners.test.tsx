import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Owners from '../components/navpages/Owners'

describe('Owners', () => {
  it('should render the Owner component', () => {
    render(<Owners />)
    
    expect(screen.getByText('THE OWNERS')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore perspiciatis minus ipsam maxime. Earum voluptates, aliquam sunt amet ab, sequi rem quo quisquam omnis ea a error numquam voluptatibus.')).toBeInTheDocument();
    screen.debug();
  })
})