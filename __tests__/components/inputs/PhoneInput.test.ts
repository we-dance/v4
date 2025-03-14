import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import PhoneInput from '~/components/inputs/PhoneInput.vue'

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

const getComponentVM = (wrapper: any) => wrapper.vm as any

describe('PhoneInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('has no validation errors on mount', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    expect(vm.hasInitialized).toBe(false)

    vi.advanceTimersByTime(100)
    await flushPromises()

    expect(vm.hasInitialized).toBe(true)
  })

  it('emits change event when phone number changes after initialization', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    vi.advanceTimersByTime(100)
    await flushPromises()

    vm.res = { e164: '+12345678901' }
    await flushPromises()

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['+12345678901'])
  })

  it('does not emit change event before initialization', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    vm.res = { e164: '+12345678901' }
    await flushPromises()

    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('emits blur event when input is blurred', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    const blurEvent = new FocusEvent('blur')
    vm.handleBlur(blurEvent)

    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.emitted('blur')?.[0][0]).toBeInstanceOf(FocusEvent)

    expect(vm.hasInitialized).toBe(true)
  })

  it('updates input value when external value changes', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        value: '+12345678901',
      },
    })
    const vm = getComponentVM(wrapper)

    vi.advanceTimersByTime(100)
    await flushPromises()

    await wrapper.setProps({ value: '+44987654321' })
    await flushPromises()

    expect(vm.res).toEqual({ e164: '+44987654321' })
  })

  it('handles country selection correctly', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    const updateInputValue = vi.fn()

    vm.handleCountrySelect('GB', updateInputValue)

    expect(updateInputValue).toHaveBeenCalledWith('GB')

    expect(vm.open).toBe(false)

    expect(vm.hasInitialized).toBe(true)
  })

  it('initializes with a delay to prevent validation on initial load', async () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100)

    expect(vm.hasInitialized).toBe(false)

    vi.advanceTimersByTime(50)
    await flushPromises()

    expect(vm.hasInitialized).toBe(false)

    vi.advanceTimersByTime(50)
    await flushPromises()

    expect(vm.hasInitialized).toBe(true)

    setTimeoutSpy.mockRestore()
  })

  it('renders the base-vue-phone-input component', () => {
    const wrapper = mount(PhoneInput)

    const baseComponent = wrapper.findComponent({ name: 'PhoneInput' })
    expect(baseComponent.exists()).toBe(true)
  })

  it('passes the fetchCountry prop to the base component', () => {
    const wrapper = mount(PhoneInput)

    const baseComponent = wrapper.findComponent({ name: 'PhoneInput' })
    expect(baseComponent.props('fetchCountry')).toBe(true)
  })

  it('handles the update event from the base component', async () => {
    const wrapper = mount(PhoneInput)
    const vm = getComponentVM(wrapper)

    vi.advanceTimersByTime(100)
    await flushPromises()

    const baseComponent = wrapper.findComponent({ name: 'PhoneInput' })

    await baseComponent.vm.$emit('update', { e164: '+12345678901' })

    expect(vm.res).toEqual({ e164: '+12345678901' })

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['+12345678901'])
  })
})
