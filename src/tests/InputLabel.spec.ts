import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';

import InputLabel from '@/components/InputLabel.vue';

describe('InputLabel', () => {
  it('renders correctly', () => {
    const { container } = render(InputLabel, { props: { text: 'label text' } });

    expect(container).toMatchSnapshot();
  });

  it('renders the correct tag when passed', () => {
    const screen = render(InputLabel, { props: { text: "I'm a div", tag: 'div' } });

    expect(screen.getByText("I'm a div").tagName).toBe('DIV');
  });
});
