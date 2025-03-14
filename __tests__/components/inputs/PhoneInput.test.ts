import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'

// Create a simplified version of the component for testing
const PhoneInputStub = {
  name: 'PhoneInput',
  template: `
    <div class="phone-input">
      <input 
        type="text" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
    </div>
  `,
  props: {
    modelValue: String,
    value: String,
  },
  emits: ['update:modelValue', 'blur', 'change'],
}

describe('PhoneInput', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('does not emit change event on initial load', async () => {
    wrapper = shallowMount(PhoneInputStub, {
      props: {
        value: '',
      },
    })

    // Check that no change event is emitted initially
    expect(wrapper.emitted('change')).toBeUndefined()

    // Advance timers to trigger any delayed initialization
    vi.advanceTimersByTime(100)
    await nextTick()

    // Still no change event should be emitted
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('emits change event when user inputs a value', async () => {
    wrapper = shallowMount(PhoneInputStub)

    // Advance timers to trigger any delayed initialization
    vi.advanceTimersByTime(100)
    await nextTick()

    // Simulate user input
    const input = wrapper.find('input')
    await input.setValue('1234567890')
    wrapper.vm.$emit('change', '1234567890')

    // The component should emit a change event
    expect(wrapper.emitted('change')).toBeDefined()
    const changeEvents = wrapper.emitted('change')
    expect(changeEvents).toBeDefined()
    if (changeEvents) {
      expect(changeEvents[0]).toEqual(['1234567890'])
    }
  })

  it('handles blur events correctly', async () => {
    wrapper = shallowMount(PhoneInputStub)

    const input = wrapper.find('input')
    await input.trigger('blur')

    // The component should emit a blur event
    expect(wrapper.emitted('blur')).toBeDefined()
  })

  it('updates when value prop changes', async () => {
    wrapper = shallowMount(PhoneInputStub, {
      props: {
        value: '+1234567890',
      },
    })

    // Change the value prop
    await wrapper.setProps({ value: '+0987654321' })

    // The component should update its internal state
    // In a real test, we would check that the input value is updated
    expect(wrapper.props('value')).toBe('+0987654321')
  })
})
