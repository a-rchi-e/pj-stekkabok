import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react';
import { getAllRooms, getAvailableRooms, requestCheckout } from '../helper_funcs';

describe('testing get all rooms api', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
      });
    it('should render all rooms from server', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ name: 'bob', prod_id: '123', imgPath:'testimg', price:999, desc:'lol', sleeps: 13, days:13 }));
        const result = await getAllRooms();
        expect(result).toEqual({ name: 'bob', prod_id: '123', imgPath:'testimg', price:999, desc:'lol', sleeps: 13, days:13 });
        screen.debug();
    })
})