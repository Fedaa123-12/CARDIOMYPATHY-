import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Navigation from '@/components/Navigation.vue';

describe('Navigation', () => {
  it('renders correctly if user not logged in', () => {
    const currentUser = null;
    const wrapper = mount(Navigation, { props: { currentUser } });
    expect(wrapper.find('[data-test="login-link"]').exists()).toBe(true);
  });
});
