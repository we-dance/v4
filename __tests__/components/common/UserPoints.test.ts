import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserPoints from '~/components/common/UserPoints.vue'

describe('UserPoints', () => {
  it('formats numbers correctly', () => {
    const cases = [
      { input: 500, expected: '500' },
      { input: 1500, expected: '2K' },
      { input: 999999, expected: '1000K' },
      { input: 1500000, expected: '2M' },
    ]

    cases.forEach(({ input, expected }) => {
      const wrapper = mount(UserPoints, {
        props: { points: input },
      })
      expect(wrapper.text()).toContain(expected)
    })
  })

  it('displays string points as-is', () => {
    const wrapper = mount(UserPoints, {
      props: { points: 'Top 10' },
    })
    expect(wrapper.text()).toContain('Top 10')
  })
})
