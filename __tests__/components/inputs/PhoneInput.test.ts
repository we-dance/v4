import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import PhoneInput from '~/components/inputs/PhoneInput.vue'

// Do not mock base-vue-phone-input to use the actual component

// Mock the components used in PhoneInput
vi.mock('~/components/ui/popover', () => ({
  Popover: {
    template: '<div class="popover"><slot /></div>',
  },
  PopoverTrigger: {
    template: '<div class="popover-trigger"><slot /></div>',
  },
  PopoverContent: {
    template: '<div class="popover-content"><slot /></div>',
  },
}))

vi.mock('~/components/ui/command', () => ({
  Command: {
    template: '<div class="command"><slot /></div>',
  },
  CommandInput: {
    template: '<input class="command-input" />',
  },
  CommandEmpty: {
    template: '<div class="command-empty"><slot /></div>',
  },
  CommandList: {
    template: '<div class="command-list"><slot /></div>',
  },
  CommandGroup: {
    template: '<div class="command-group"><slot /></div>',
  },
  CommandItem: {
    template: '<div class="command-item"><slot /></div>',
    props: ['value'],
  },
}))

vi.mock('~/components/ui/button', () => ({
  default: {
    name: 'Button',
    template: '<button class="button"><slot /></button>',
    props: ['variant'],
  },
}))

vi.mock('~/components/ui/input', () => ({
  default: {
    name: 'Input',
    template: '<input class="input-mock" />',
    props: ['modelValue', 'placeholder', 'type'],
  },
}))

vi.mock('~/components/FlagComponent.vue', () => ({
  default: {
    name: 'FlagComponent',
    template: '<div class="flag">{{ country }}</div>',
    props: ['country'],
  },
}))

vi.mock('lucide-vue-next', () => ({
  ChevronsUpDown: {
    template: '<div class="chevrons-up-down"></div>',
  },
}))

vi.mock('@vueuse/core', () => ({
  useFocus: () => ({
    focused: ref(false),
  }),
}))

// Helper to access component internal properties for testing
const getComponentVM = (wrapper: any) => wrapper.vm as any

describe('PhoneInput', () => {
  beforeEach(() => {
    // Reset timers before each test
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('has no validation errors on mount', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Verify initial state
    expect(vm.hasInitialized).toBe(false)

    // Advance timers to trigger the setTimeout in onMounted
    vi.advanceTimersByTime(100)
    await flushPromises()

    // Now hasInitialized should be true
    expect(vm.hasInitialized).toBe(true)
  })

  it('emits change event when phone number changes after initialization', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Advance timers to complete initialization
    vi.advanceTimersByTime(100)
    await flushPromises()

    // Simulate phone number update
    vm.res = { e164: '+12345678901' }
    await flushPromises()

    // Check if change event was emitted with correct value
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['+12345678901'])
  })

  it('does not emit change event before initialization', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Simulate phone number update before initialization completes
    vm.res = { e164: '+12345678901' }
    await flushPromises()

    // Change event should not be emitted yet
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('emits blur event when input is blurred', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Instead of trying to find and trigger the input element,
    // directly call the handleBlur method with a mock event
    const blurEvent = new FocusEvent('blur')
    vm.handleBlur(blurEvent)

    // Check if blur event was emitted
    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.emitted('blur')?.[0][0]).toBeInstanceOf(FocusEvent)

    // hasInitialized should be set to true on blur
    expect(vm.hasInitialized).toBe(true)
  })

  it('updates input value when external value changes', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        value: '+12345678901',
      },
    })
    const vm = getComponentVM(wrapper)

    // Advance timers to complete initialization
    vi.advanceTimersByTime(100)
    await flushPromises()

    // Update the prop
    await wrapper.setProps({ value: '+44987654321' })
    await flushPromises()

    // Check if internal value was updated
    expect(vm.res).toEqual({ e164: '+44987654321' })
  })

  it('handles country selection correctly', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Mock the updateInputValue function
    const updateInputValue = vi.fn()

    // Call the handleCountrySelect method
    vm.handleCountrySelect('GB', updateInputValue)

    // Check if updateInputValue was called with correct country code
    expect(updateInputValue).toHaveBeenCalledWith('GB')

    // Check if popover was closed
    expect(vm.open).toBe(false)

    // Check if hasInitialized was set to true
    expect(vm.hasInitialized).toBe(true)
  })

  it('initializes with a delay to prevent validation on initial load', async () => {
    // Spy on setTimeout
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Check that setTimeout was called with the correct delay
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100)

    // Initially hasInitialized should be false
    expect(vm.hasInitialized).toBe(false)

    // Advance time by 50ms (half the delay)
    vi.advanceTimersByTime(50)
    await flushPromises()

    // hasInitialized should still be false
    expect(vm.hasInitialized).toBe(false)

    // Advance time by another 50ms to complete the delay
    vi.advanceTimersByTime(50)
    await flushPromises()

    // Now hasInitialized should be true
    expect(vm.hasInitialized).toBe(true)

    // Clean up
    setTimeoutSpy.mockRestore()
  })

  it('renders the base-vue-phone-input component', () => {
    const wrapper = mount(PhoneInput)

    // Check if the base component is rendered
    const baseComponent = wrapper.findComponent({ name: 'PhoneInput' })
    expect(baseComponent.exists()).toBe(true)
  })

  it('passes the fetchCountry prop to the base component', () => {
    const wrapper = mount(PhoneInput)

    // Check if the fetchCountry prop is passed
    const baseComponent = wrapper.findComponent({ name: 'PhoneInput' })
    expect(baseComponent.props('fetchCountry')).toBe(true)
  })

  it('handles the update event from the base component', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    // Advance timers to complete initialization
    vi.advanceTimersByTime(100)
    await flushPromises()

    // Find the base component
    const baseComponent = wrapper.findComponent({ name: 'PhoneInput' })

    // Simulate the update event from the base component
    await baseComponent.vm.$emit('update', { e164: '+12345678901' })

    // Check if the res property was updated
    expect(vm.res).toEqual({ e164: '+12345678901' })

    // Check if the change event was emitted
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['+12345678901'])
  })
})
