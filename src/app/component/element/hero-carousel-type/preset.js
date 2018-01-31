/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('hero-carousel-type', require('./hero-carousel-type.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> hero-carousel-type @root}}
		</hbs>`,
  {},
);
