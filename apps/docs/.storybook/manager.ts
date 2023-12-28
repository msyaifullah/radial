import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

/**
 * Storybook Interface Theming API
 * https://storybook.js.org/docs/react/configure/theming
 */

const theme = create({
    base: 'light',
    brandTitle: 'Radial Component Library 0.0.1',
    brandUrl: 'https://github.com/xendit/ui-toolkit/',
});

addons.setConfig({theme});


