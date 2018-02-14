/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('hero-carousel', require('./hero-carousel.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> hero-carousel @root}}
		</hbs>`,
  require('./data.json'),
);
