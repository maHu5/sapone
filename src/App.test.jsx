import React from 'react'

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('something truthy and falsy', () => {
    it('renders headline', () => {
        render(<App />)

        expect(screen.getByText('SAP One Computer')).toBeInTheDocument()
        expect(screen.getByRole('main')).toBeInTheDocument()
        screen.debug()
    })
})
