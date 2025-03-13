import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Patro from '../components/navpages/Patro'
import toMatchImageSnapshot from 'jest-image-snapshot';

// describe('image snapshot', () => {
//     it('should render the Patro image file', () => {
//         render(<Patro />)
//         expect('./Patro.test.jpg').toMatchImageSnapshot();
//         screen.debug();
//     })
// })


// TODO: Do we need to test visual components as well?